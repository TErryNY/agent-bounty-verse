import { Button } from "@/components/ui/button";
import { Wallet, Menu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Navigation = () => {
  const { toast } = useToast();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-bold text-sm">AQ</span>
            </div>
            <span className="font-bold text-xl hidden sm:block">AI QuestHub</span>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => document.getElementById('quests')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Quests
            </button>
            <button 
              onClick={() => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Dashboard
            </button>
            <button 
              onClick={() => document.getElementById('leaderboard')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Leaderboard
            </button>
            <a href="#docs" className="text-sm font-medium hover:text-primary transition-colors">
              Docs
            </a>
          </div>

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
            >
              <Wallet className="w-4 h-4" />
              <span className="hidden sm:inline">Connect Wallet</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
