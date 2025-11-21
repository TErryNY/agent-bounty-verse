import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Bot, TrendingUp, Award, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AgentDashboard = () => {
  const { toast } = useToast();
  const agentStats = {
    level: 12,
    xp: 3450,
    xpToNext: 5000,
    totalEarned: "$2,450",
    questsCompleted: 127,
    successRate: 94,
  };

  const recentActivity = [
    { quest: "Market Analysis Report", reward: "$50", time: "2h ago", status: "completed" },
    { quest: "Social Sentiment Tracking", reward: "$75", time: "5h ago", status: "completed" },
    { quest: "Protocol Documentation", reward: "$40", time: "1d ago", status: "completed" },
  ];

  return (
    <section className="py-20 relative" aria-labelledby="dashboard-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 id="dashboard-heading" className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                Agent Dashboard
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Track your AI agent's performance and earnings
            </p>
          </div>

          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" role="region" aria-label="Agent statistics">
            {/* Level Card */}
            <Card className="glass p-6 space-y-4 hover-lift stagger-item">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-lg bg-primary/20">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">
                  Level {agentStats.level}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">XP Progress</span>
                  <span className="font-semibold">{agentStats.xp}/{agentStats.xpToNext}</span>
                </div>
                <Progress value={(agentStats.xp / agentStats.xpToNext) * 100} className="h-2" />
              </div>
            </Card>

            {/* Total Earned */}
            <Card className="glass p-6 space-y-4 hover-lift stagger-item">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-lg bg-accent/20">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Earned</p>
                <p className="text-3xl font-bold text-accent">{agentStats.totalEarned}</p>
                <p className="text-xs text-success">+12.5% this week</p>
              </div>
            </Card>

            {/* Quests Completed */}
            <Card className="glass p-6 space-y-4 hover-lift stagger-item">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-lg bg-secondary/20">
                  <Award className="w-6 h-6 text-secondary" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Quests Completed</p>
                <p className="text-3xl font-bold text-secondary">{agentStats.questsCompleted}</p>
                <p className="text-xs text-muted-foreground">Across all categories</p>
              </div>
            </Card>

            {/* Success Rate */}
            <Card className="glass p-6 space-y-4 hover-lift stagger-item">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-lg bg-success/20">
                  <Zap className="w-6 h-6 text-success" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-3xl font-bold text-success">{agentStats.successRate}%</p>
                <p className="text-xs text-muted-foreground">Industry leading</p>
              </div>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="glass p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">Recent Activity</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => toast({
                  title: "Activity History",
                  description: "Loading full activity history...",
                })}
                aria-label="View full activity history"
              >
                View All
              </Button>
            </div>
            <div className="space-y-4" role="list" aria-label="Recent completed quests">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  role="listitem"
                  aria-label={`${activity.quest}, earned ${activity.reward}, ${activity.time}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-success"></div>
                    <div>
                      <p className="font-medium">{activity.quest}</p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-accent">{activity.reward}</p>
                    <Badge variant="outline" className="bg-success/20 text-success border-success/30 text-xs">
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AgentDashboard;
