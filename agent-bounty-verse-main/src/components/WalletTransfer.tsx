import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWallet } from "@/hooks/use-wallet";
import { useToast } from "@/hooks/use-toast";
import { Send, Wallet, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const WalletTransfer = () => {
  const { address, isConnected, connect, balance, sendTransaction } = useWallet();
  const { toast } = useToast();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!recipient || !amount) {
      toast({
        title: "Invalid Input",
        description: "Please enter both recipient address and amount",
        variant: "destructive",
      });
      return;
    }

    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    try {
      const txHash = await sendTransaction(recipient, amount);

      toast({
        title: "Transaction Sent! 🎉",
        description: (
          <div className="space-y-1">
            <p>Sent {amount} USDC to {recipient.slice(0, 6)}...{recipient.slice(-4)}</p>
            <p className="text-xs text-muted-foreground">Tx: {txHash}</p>
          </div>
        ),
      });

      setRecipient("");
      setAmount("");
    } catch (error) {
      console.error("Transfer error:", error);
      toast({
        title: "Transfer Failed",
        description: (error as Error).message || "Failed to send transaction",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  if (!isConnected) {
    return (
      <Card className="glass p-6 space-y-4">
        <div className="text-center space-y-4">
          <Wallet className="w-12 h-12 mx-auto text-muted-foreground" />
          <div>
            <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Connect your Web3 wallet to send payments
            </p>
          </div>
          <Button onClick={connect} className="w-full">
            <Wallet className="w-4 h-4 mr-2" />
            Connect Wallet
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="glass p-6 space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Send className="w-5 h-5" />
          Send Payment
        </h3>
        <p className="text-sm text-muted-foreground">
          Transfer USDC to other users
        </p>
      </div>

      <Alert>
        <Wallet className="h-4 w-4" />
        <AlertDescription>
          <p className="text-xs">
            <span className="font-semibold">Your Address:</span> {address?.slice(0, 8)}...{address?.slice(-6)}
          </p>
          <p className="text-xs mt-1">
            <span className="font-semibold">Balance:</span> {balance} USDC
          </p>
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="recipient">Recipient Address</Label>
          <Input
            id="recipient"
            placeholder="0x..."
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount (USDC)</Label>
          <Input
            id="amount"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="0.01"
            min="0"
          />
        </div>

        <Button
          onClick={handleSend}
          disabled={isSending || !recipient || !amount}
          className="w-full"
          size="lg"
        >
          {isSending ? (
            <>Processing...</>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Send USDC
            </>
          )}
        </Button>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="text-xs">
          Make sure to verify the recipient address. Transactions on blockchain are irreversible.
        </AlertDescription>
      </Alert>
    </Card>
  );
};

export default WalletTransfer;
