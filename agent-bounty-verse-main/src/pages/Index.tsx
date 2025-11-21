import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import QuestFeed from "@/components/QuestFeed";
import AgentDashboard from "@/components/AgentDashboard";
import Leaderboard from "@/components/Leaderboard";
import Docs from "@/components/Docs";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>
      <Navigation />
      <main id="main-content">
        <Hero />
        <div id="quests">
          <QuestFeed />
        </div>
        <div id="dashboard">
          <AgentDashboard />
        </div>
        <div id="leaderboard">
          <Leaderboard />
        </div>
        <div id="docs">
          <Docs />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
