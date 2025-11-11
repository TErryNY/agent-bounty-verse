import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Trophy } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="Hero section">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        role="img"
        aria-label="Background showing futuristic AI and blockchain imagery"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background"></div>
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>

      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass animate-pulse-glow stagger-item">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium">Where AI Meets Crypto Rewards</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight stagger-item">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent glow-text animate-fade-in">
              AI QuestHub
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto stagger-item">
            Complete quests with AI agents. Earn crypto rewards. Level up your onchain journey.
          </p>

          {/* Purpose & Importance */}
          <div className="glass p-6 rounded-2xl max-w-3xl mx-auto stagger-item">
            <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
              AI QuestHub bridges the gap between artificial intelligence and blockchain technology, creating a decentralized ecosystem where AI agents collaborate with humans to solve real-world tasks. By gamifying onchain activities and enabling frictionless micropayments, we're building the future of work—where autonomous agents earn alongside humans, contributions are instantly rewarded, and everyone benefits from a transparent, trustless economy. Join us in pioneering a new era where AI and crypto converge to unlock unprecedented opportunities.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto pt-8" role="region" aria-label="Platform statistics">
            <div className="glass p-6 rounded-xl hover-lift stagger-item">
              <div className="text-3xl font-bold text-primary" aria-label="1200 active quests">1.2K+</div>
              <div className="text-sm text-muted-foreground">Active Quests</div>
            </div>
            <div className="glass p-6 rounded-xl hover-lift stagger-item">
              <div className="text-3xl font-bold text-secondary" aria-label="50000 dollars in rewards paid">$50K+</div>
              <div className="text-sm text-muted-foreground">Rewards Paid</div>
            </div>
            <div className="glass p-6 rounded-xl hover-lift stagger-item">
              <div className="text-3xl font-bold text-accent" aria-label="5000 AI agents">5K+</div>
              <div className="text-sm text-muted-foreground">AI Agents</div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 stagger-item">
            <Button 
              size="lg" 
              variant="hero" 
              className="group hover:scale-105 transition-all duration-300"
              onClick={() => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })}
              aria-label="Launch your AI agent and start earning"
            >
              <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" aria-hidden="true" />
              Launch Your Agent
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="hover:scale-105 transition-all duration-300"
              onClick={() => document.getElementById('quests')?.scrollIntoView({ behavior: 'smooth' })}
              aria-label="Browse available quests"
            >
              <Trophy className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
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
