import { memo, useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/use-wallet";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Coins, TrendingUp, Wallet as WalletIcon, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const RewardClaim = memo(() => {
  const { address, isConnected, connect, sendTransaction } = useWallet();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isClaiming, setIsClaiming] = useState(false);
  const queryClient = useQueryClient();

  const { data: totalEarnings = 0 } = useQuery({
    queryKey: ["profile_total_points", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("total_points")
        .eq("id", user!.id)
        .single();
      if (error) throw error;
      return data?.total_points || 0;
    },
    staleTime: 30000,
  });

  const claimMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("profiles")
        .update({ total_points: 0 })
        .eq("id", user!.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile_total_points", user?.id] });
    },
  });

  const handleClaim = useCallback(async () => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }

    if (totalEarnings === 0) {
      toast({
        title: "No Earnings to Claim",
        description: "Complete quests to earn rewards",
        variant: "destructive",
      });
      return;
    }

    setIsClaiming(true);
    try {
      // In a real implementation, this would interact with a smart contract
      // For demo purposes, we'll simulate the claim
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await claimMutation.mutateAsync();

      toast({
        title: "Rewards Claimed! 🎉",
        description: (
          <div className="space-y-1">
            <p>Successfully claimed {totalEarnings} USDC</p>
            <p className="text-xs text-muted-foreground">
              Sent to {address?.slice(0, 6)}...{address?.slice(-4)}
            </p>
          </div>
        ),
      });

    } catch (error) {
      console.error("Claim error:", error);
      toast({
        title: "Claim Failed",
        description: (error as Error).message || "Failed to claim rewards",
        variant: "destructive",
      });
    } finally {
      setIsClaiming(false);
    }
  }, [isConnected, totalEarnings, toast, address, claimMutation]);

  if (!user) {
    return null;
  }

  return (
    <Card className="glass p-6 space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Coins className="w-5 h-5 text-accent" />
          Reward Earnings
        </h3>
        <p className="text-sm text-muted-foreground">
          Claim your accumulated quest rewards
        </p>
      </div>

      {/* Earnings Display */}
      <div className="space-y-4">
        <div className="p-6 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Available Balance</span>
            <TrendingUp className="w-4 h-4 text-success" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-accent">{totalEarnings}</span>
            <span className="text-lg text-muted-foreground">USDC</span>
          </div>
        </div>

        {/* Claim Progress */}
        {totalEarnings > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Claim Threshold</span>
              <span className="font-semibold">{totalEarnings} / 100 USDC</span>
            </div>
            <Progress value={(totalEarnings / 100) * 100} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {totalEarnings >= 100 ? "Ready to claim!" : `${100 - totalEarnings} USDC until next milestone`}
            </p>
          </div>
        )}

        {/* Wallet Status */}
        {isConnected ? (
          <Alert>
            <WalletIcon className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Connected: {address?.slice(0, 8)}...{address?.slice(-6)}
            </AlertDescription>
          </Alert>
        ) : (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Connect your wallet to claim rewards
            </AlertDescription>
          </Alert>
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          {!isConnected ? (
            <Button onClick={connect} className="w-full" size="lg">
              <WalletIcon className="w-4 h-4 mr-2" />
              Connect Wallet to Claim
            </Button>
          ) : (
            <Button
              onClick={handleClaim}
              disabled={isClaiming || totalEarnings === 0}
              className="w-full"
              size="lg"
            >
              {isClaiming ? (
                <>Processing...</>
              ) : (
                <>
                  <Coins className="w-4 h-4 mr-2" />
                  Claim {totalEarnings} USDC
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Info */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="text-xs">
          Rewards are automatically calculated based on completed quests. Claims are processed instantly to your connected wallet.
        </AlertDescription>
      </Alert>
    </Card>
  );
});

RewardClaim.displayName = "RewardClaim";

export default RewardClaim;
