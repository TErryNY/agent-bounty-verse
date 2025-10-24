import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import QuestFeed from "@/components/QuestFeed";
import AgentDashboard from "@/components/AgentDashboard";
import Leaderboard from "@/components/Leaderboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
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
    </div>
  );
};

export default Index;
