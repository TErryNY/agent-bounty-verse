import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wallet, Menu, LogOut, User, Settings, Home, Target, Trophy, BookOpen, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@/hooks/use-wallet";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { analytics, ANALYTICS_EVENTS } from "@/lib/analytics";
import { rateLimiter, RATE_LIMITS } from "@/lib/rate-limit";
import NotificationsDropdown from "@/components/NotificationsDropdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navigation = () => {
  const { toast } = useToast();
  const { address, isConnected, isConnecting, connect, disconnect } = useWallet();
  const { user, signOut } = useAuth();
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

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    toast({
      title: "Signed Out",
      description: "You have been signed out successfully.",
    });
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
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
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="md:hidden"
                    aria-label="Open mobile menu"
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] glass-strong">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <span className="text-white font-bold text-sm">AQ</span>
                      </div>
                      AI QuestHub
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-4 mt-8">
                    <Button
                      variant="ghost"
                      className="justify-start gap-3"
                      onClick={() => {
                        navigate('/');
                        setMobileMenuOpen(false);
                      }}
                    >
                      <Home className="w-5 h-5" />
                      Home
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start gap-3"
                      onClick={() => scrollToSection('quests')}
                    >
                      <Target className="w-5 h-5" />
                      Quests
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start gap-3"
                      onClick={() => scrollToSection('dashboard')}
                    >
                      <Settings className="w-5 h-5" />
                      Dashboard
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start gap-3"
                      onClick={() => scrollToSection('leaderboard')}
                    >
                      <Trophy className="w-5 h-5" />
                      Leaderboard
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start gap-3"
                      onClick={() => scrollToSection('docs')}
                    >
                      <BookOpen className="w-5 h-5" />
                      Docs
                    </Button>
                    
                    {user && (
                      <>
                        <div className="border-t border-border my-2" />
                        <Button
                          variant="ghost"
                          className="justify-start gap-3 text-destructive hover:text-destructive"
                          onClick={handleSignOut}
                        >
                          <LogOut className="w-5 h-5" />
                          Sign Out
                        </Button>
                      </>
                    )}
                  </nav>
                </SheetContent>
              </Sheet>
              
              {/* User Menu - Desktop */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="gap-2 hidden md:flex"
                      aria-label="User profile menu"
                    >
                      <User className="w-4 h-4" />
                      <span className="hidden sm:inline">
                        {user.email?.split('@')[0]}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 glass-strong">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/')}>
                      <Home className="mr-2 h-4 w-4" />
                      Home
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toast({
                      title: "Coming Soon",
                      description: "Profile settings will be available soon!",
                    })}>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
