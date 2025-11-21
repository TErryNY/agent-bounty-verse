import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wallet, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@/hooks/use-wallet";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { analytics, ANALYTICS_EVENTS } from "@/lib/analytics";
import { rateLimiter, RATE_LIMITS } from "@/lib/rate-limit";
import MobileMenu from "@/components/MobileMenu";
import UserMenu from "@/components/UserMenu";

const Navigation = () => {
  const { toast } = useToast();
  const { address, isConnected, isConnecting, connect, disconnect } = useWallet();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleWalletClick = async () => {
    if (isConnected) {
      disconnect();
      analytics.track({
        name: ANALYTICS_EVENTS.WALLET_DISCONNECTED,
      });
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected successfully.",
      });
    } else {
      // Rate limiting
      if (!rateLimiter.check("wallet_connect", RATE_LIMITS.WALLET_CONNECT)) {
        toast({
          title: "Too Many Attempts",
          description: "Please wait a moment before trying to connect again.",
          variant: "destructive",
        });
        return;
      }

      try {
        await connect();
        analytics.track({
          name: ANALYTICS_EVENTS.WALLET_CONNECTED,
          properties: { address },
        });
        toast({
          title: "Wallet Connected",
          description: "Your wallet has been connected successfully!",
        });
      } catch (error) {
        analytics.track({
          name: ANALYTICS_EVENTS.ERROR_OCCURRED,
          properties: { context: "wallet_connection", error: String(error) },
        });
        toast({
          title: "Connection Failed",
          description: "Failed to connect to your wallet. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <header>
      <nav className="fixed top-0 left-0 right-0 z-50 glass" aria-label="Main navigation">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity" aria-label="AI QuestHub Home">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold text-sm" aria-hidden="true">AQ</span>
              </div>
              <span className="font-bold text-xl hidden sm:block">AI QuestHub</span>
            </a>

            {/* Navigation Links - Desktop */}
            <nav className="hidden md:flex items-center gap-6" aria-label="Primary">
              <button
                onClick={() => document.getElementById('quests')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-medium hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
                aria-label="View available quests"
              >
                Quests
              </button>
              <button
                onClick={() => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-medium hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
                aria-label="View your agent dashboard"
              >
                Dashboard
              </button>
              <button
                onClick={() => document.getElementById('leaderboard')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-medium hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
                aria-label="View leaderboard rankings"
              >
                Leaderboard
              </button>
              <button
                onClick={() => document.getElementById('docs')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-medium hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
                aria-label="Read documentation"
              >
                Docs
              </button>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Mobile Menu */}
              <MobileMenu isOpen={mobileMenuOpen} setIsOpen={setMobileMenuOpen} />

              {/* User Menu - Desktop */}
              {user ? (
                <UserMenu />
              ) : (
                <Button
                  variant="hero"
                  size="sm"
                  onClick={() => navigate('/auth')}
                  className="hidden md:flex"
                  aria-label="Sign in to your account"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </Button>
              )}

              <Button
                variant="hero"
                size="sm"
                onClick={handleWalletClick}
                disabled={isConnecting}
                aria-label={isConnected ? "Disconnect your Web3 wallet" : "Connect your Web3 wallet"}
              >
                <Wallet className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">
                  {isConnecting ? "Connecting..." : isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : "Connect Wallet"}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
