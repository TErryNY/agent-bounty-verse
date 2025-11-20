import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface WalletState {
  address: string | null;
  balance: string;
  isConnected: boolean;
  isConnecting: boolean;
  provider: ethers.BrowserProvider | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  sendTransaction: (to: string, amount: string) => Promise<string>;
  updateBalance: () => Promise<void>;
}

export const useWallet = create<WalletState>()(
  persist(
    (set, get) => ({
      address: null,
      balance: "0",
      isConnected: false,
      isConnecting: false,
      provider: null,
      connect: async () => {
        set({ isConnecting: true });
        try {
          if (typeof window.ethereum === "undefined") {
            throw new Error("Please install MetaMask or another Web3 wallet");
          }

          const provider = new ethers.BrowserProvider(window.ethereum);
          
          const accounts = await provider.send("eth_requestAccounts", []);
          const address = accounts[0];
          
          const network = await provider.getNetwork();
          if (network.chainId !== 8453n) {
            try {
              await provider.send("wallet_switchEthereumChain", [{ chainId: "0x2105" }]);
            } catch (switchError: any) {
              if (switchError.code === 4902) {
                await provider.send("wallet_addEthereumChain", [{
                  chainId: "0x2105",
                  chainName: "Base",
                  nativeCurrency: { name: "Ethereum", symbol: "ETH", decimals: 18 },
                  rpcUrls: ["https://mainnet.base.org"],
                  blockExplorerUrls: ["https://basescan.org"]
                }]);
              } else {
                throw switchError;
              }
            }
          }

          set({ address, isConnected: true, isConnecting: false, provider });
          
          await get().updateBalance();

          window.ethereum.on("accountsChanged", (accounts: string[]) => {
            if (accounts.length === 0) {
              get().disconnect();
            } else {
              set({ address: accounts[0] });
              get().updateBalance();
            }
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });
        } catch (error: any) {
          console.error("Failed to connect wallet:", error);
          set({ isConnecting: false });
          throw new Error(error.message || "Failed to connect wallet");
        }
      },
      disconnect: () => {
        set({ address: null, isConnected: false, provider: null, balance: "0" });
      },
      sendTransaction: async (to: string, amount: string) => {
        const { provider, address } = get();
        if (!provider || !address) {
          throw new Error("Wallet not connected");
        }

        try {
          const signer = await provider.getSigner();
          
          const usdcAddress = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
          const usdcAbi = [
            "function transfer(address to, uint256 amount) returns (bool)"
          ];
          const usdcContract = new ethers.Contract(usdcAddress, usdcAbi, signer);
          
          const amountInWei = ethers.parseUnits(amount, 6);
          
          const tx = await usdcContract.transfer(to, amountInWei);
          await tx.wait();
          
          await get().updateBalance();
          
          return tx.hash;
        } catch (error: any) {
          console.error("Transaction failed:", error);
          throw new Error(error.message || "Transaction failed");
        }
      },
      updateBalance: async () => {
        const { provider, address } = get();
        if (!provider || !address) return;

        try {
          const usdcAddress = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
          const usdcAbi = [
            "function balanceOf(address account) view returns (uint256)"
          ];
          const usdcContract = new ethers.Contract(usdcAddress, usdcAbi, provider);
          
          const balance = await usdcContract.balanceOf(address);
          const formattedBalance = ethers.formatUnits(balance, 6);
          
          set({ balance: parseFloat(formattedBalance).toFixed(2) });
        } catch (error) {
          console.error("Failed to fetch balance:", error);
        }
      },
    }),
    {
      name: "wallet-storage",
      partialize: (state) => ({ address: state.address, isConnected: state.isConnected }),
    }
  )
);
