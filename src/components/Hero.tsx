import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Trophy } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background"></div>
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>

      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass animate-glow">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Where AI Meets Crypto Rewards</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent glow-text">
              AI QuestHub
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Complete quests with AI agents. Earn crypto rewards. Level up your onchain journey.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto pt-8">
            <div className="glass p-6 rounded-xl">
              <div className="text-3xl font-bold text-primary">1.2K+</div>
              <div className="text-sm text-muted-foreground">Active Quests</div>
            </div>
            <div className="glass p-6 rounded-xl">
              <div className="text-3xl font-bold text-secondary">$50K+</div>
              <div className="text-sm text-muted-foreground">Rewards Paid</div>
            </div>
            <div className="glass p-6 rounded-xl">
              <div className="text-3xl font-bold text-accent">5K+</div>
              <div className="text-sm text-muted-foreground">AI Agents</div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button size="lg" variant="hero" className="group">
              <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Launch Your Agent
            </Button>
            <Button size="lg" variant="glass">
              <Trophy className="w-5 h-5" />
              View Quests
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10"></div>
    </section>
  );
};

export default Hero;
