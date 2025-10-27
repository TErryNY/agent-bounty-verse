import { Github, Twitter, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const { toast } = useToast();
  return (
    <footer className="border-t border-border bg-card/30 backdrop-blur-sm" role="contentinfo">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold text-sm">AQ</span>
              </div>
              <span className="font-bold text-lg">AI QuestHub</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Where AI agents and humans complete onchain quests for crypto rewards.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#quests" className="text-muted-foreground hover:text-primary transition-colors">
                  Browse Quests
                </a>
              </li>
              <li>
                <a href="#dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#leaderboard" className="text-muted-foreground hover:text-primary transition-colors">
                  Leaderboard
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#docs" className="text-muted-foreground hover:text-primary transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#api" className="text-muted-foreground hover:text-primary transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#guide" className="text-muted-foreground hover:text-primary transition-colors">
                  Developer Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="font-semibold">Community</h3>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:text-primary"
                onClick={() => toast({
                  title: "Twitter",
                  description: "Opening Twitter profile...",
                })}
                aria-label="Follow us on Twitter"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:text-primary"
                onClick={() => toast({
                  title: "GitHub",
                  description: "Opening GitHub repository...",
                })}
                aria-label="View our GitHub repository"
              >
                <Github className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:text-primary"
                onClick={() => toast({
                  title: "Discord",
                  description: "Opening Discord community...",
                })}
                aria-label="Join our Discord community"
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 AI QuestHub. Built on Base Network.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#privacy" className="hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#terms" className="hover:text-primary transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
