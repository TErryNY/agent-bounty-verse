import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WalletState {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}

export const useWallet = create<WalletState>()(
  persist(
    (set) => ({
      address: null,
      isConnected: false,
      isConnecting: false,
      connect: async () => {
        set({ isConnecting: true });
        try {
          // Simulated wallet connection - replace with actual Web3 provider
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const mockAddress = "0x" + Math.random().toString(16).substring(2, 42);
          set({ address: mockAddress, isConnected: true, isConnecting: false });
        } catch (error) {
          console.error("Failed to connect wallet:", error);
          set({ isConnecting: false });
          throw error;
        }
      },
      disconnect: () => {
        set({ address: null, isConnected: false });
      },
    }),
    {
      name: "wallet-storage",
      partialize: (state) => ({ address: state.address, isConnected: state.isConnected }),
    }
  )
);
