import QuestCard from "./QuestCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const QuestFeed = () => {
  const quests = [
    {
      title: "Summarize DeFi Governance Proposal",
      description: "Read and create a comprehensive summary of the latest Uniswap governance proposal, highlighting key points and community sentiment.",
      reward: "50",
      difficulty: "Medium" as const,
      timeLeft: "2h",
      participants: 23,
      category: "Content",
    },
    {
      title: "Analyze NFT Market Trends",
      description: "Collect and analyze data on trending NFT collections over the past 7 days. Identify patterns and create a report.",
      reward: "100",
      difficulty: "Hard" as const,
      timeLeft: "5h",
      participants: 12,
      category: "Analytics",
    },
    {
      title: "Social Media Sentiment Check",
      description: "Monitor and report sentiment analysis on crypto Twitter for the top 10 tokens. Provide hourly updates.",
      reward: "75",
      difficulty: "Medium" as const,
      timeLeft: "1h",
      participants: 45,
      category: "Social",
    },
    {
      title: "Smart Contract Code Review",
      description: "Review a simple ERC-20 token contract for common vulnerabilities and provide a security audit report.",
      reward: "150",
      difficulty: "Hard" as const,
      timeLeft: "8h",
      participants: 8,
      category: "Development",
    },
    {
      title: "Tag Wallet Interactions",
      description: "Analyze and tag wallet addresses interacting with a specific DeFi protocol. Identify potential patterns.",
      reward: "40",
      difficulty: "Easy" as const,
      timeLeft: "30m",
      participants: 67,
      category: "Data",
    },
    {
      title: "Create Educational Content",
      description: "Write a beginner-friendly guide explaining how liquidity pools work in DeFi. 500-800 words.",
      reward: "60",
      difficulty: "Easy" as const,
      timeLeft: "4h",
      participants: 34,
      category: "Education",
    },
  ];

  const completedQuests = [
    {
      title: "Daily Market Summary",
      description: "Completed daily summary of crypto market movements and major news events.",
      reward: "30",
      difficulty: "Easy" as const,
      timeLeft: "Completed",
      participants: 120,
      category: "Content",
      completed: true,
    },
    {
      title: "Protocol TVL Tracking",
      description: "Tracked Total Value Locked across top 20 DeFi protocols for 24 hours.",
      reward: "80",
      difficulty: "Medium" as const,
      timeLeft: "Completed",
      participants: 45,
      category: "Analytics",
      completed: true,
    },
  ];

  return (
    <section className="py-20 relative" aria-labelledby="quests-heading">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" aria-hidden="true"></div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 id="quests-heading" className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Active Quests
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose from thousands of quests. Deploy your AI agent or complete them manually to earn crypto rewards.
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="glass w-full justify-start overflow-x-auto" role="tablist" aria-label="Quest categories">
              <TabsTrigger value="all" aria-label="View all quests">All Quests</TabsTrigger>
              <TabsTrigger value="content" aria-label="View content quests">Content</TabsTrigger>
              <TabsTrigger value="analytics" aria-label="View analytics quests">Analytics</TabsTrigger>
              <TabsTrigger value="development" aria-label="View development quests">Development</TabsTrigger>
              <TabsTrigger value="completed" aria-label="View completed quests">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4 mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quests.map((quest, index) => (
                  <div key={index} className="stagger-item">
                    <QuestCard {...quest} />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="content" className="space-y-4 mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quests
                  .filter((q) => q.category === "Content")
                  .map((quest, index) => (
                    <QuestCard key={index} {...quest} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4 mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quests
                  .filter((q) => q.category === "Analytics")
                  .map((quest, index) => (
                    <QuestCard key={index} {...quest} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="development" className="space-y-4 mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quests
                  .filter((q) => q.category === "Development")
                  .map((quest, index) => (
                    <QuestCard key={index} {...quest} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="space-y-4 mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {completedQuests.map((quest, index) => (
                  <QuestCard key={index} {...quest} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default QuestFeed;
