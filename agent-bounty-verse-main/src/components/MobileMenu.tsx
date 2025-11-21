import { Button } from "@/components/ui/button";
import { Menu, Home, Target, Settings, Trophy, BookOpen, LogOut, User } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const MobileMenu = ({ isOpen, setIsOpen }: MobileMenuProps) => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    toast({
      title: "Signed Out",
      description: "You have been signed out successfully.",
    });
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
              setIsOpen(false);
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
                className="justify-start gap-3"
                onClick={() => {
                  navigate('/profile');
                  setIsOpen(false);
                }}
              >
                <User className="w-5 h-5" />
                Profile
              </Button>
              <Button
                variant="ghost"
                className="justify-start gap-3"
                onClick={() => {
                  navigate('/settings');
                  setIsOpen(false);
                }}
              >
                <Settings className="w-5 h-5" />
                Settings
              </Button>
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
  );
};

export default MobileMenu;
