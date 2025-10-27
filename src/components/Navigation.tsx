import { Button } from "@/components/ui/button";
import { Wallet, Menu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Navigation = () => {
  const { toast } = useToast();
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
              <a 
                href="#docs" 
                className="text-sm font-medium hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
                aria-label="Read documentation"
              >
                Docs
              </a>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm" 
                className="md:hidden"
                onClick={() => toast({
                  title: "Menu",
                  description: "Mobile menu coming soon!",
                })}
                aria-label="Open mobile menu"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <Button 
                variant="hero" 
                size="sm"
                onClick={() => toast({
                  title: "Wallet Connection",
                  description: "Connecting to your Web3 wallet...",
                })}
                aria-label="Connect your Web3 wallet"
              >
                <Wallet className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">Connect Wallet</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
