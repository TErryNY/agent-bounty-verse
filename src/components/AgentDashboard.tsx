import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Bot, TrendingUp, Award, Zap, Plus, Eye, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Database } from "@/integrations/supabase/types";
import DemoAgents from "@/components/DemoAgents";

type Quest = Database['public']['Tables']['quests']['Row'];

const AgentDashboard = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [myQuests, setMyQuests] = useState<Quest[]>([]);
  const [loadingQuests, setLoadingQuests] = useState(true);
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

  useEffect(() => {
    const fetchMyQuests = async () => {
      if (!user) {
        setLoadingQuests(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('quests')
          .select('*')
          .eq('created_by', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setMyQuests(data || []);
      } catch (error) {
        console.error('Error fetching my quests:', error);
        toast({
          title: "Error",
          description: "Failed to load your quests",
          variant: "destructive",
        });
      } finally {
        setLoadingQuests(false);
      }
    };

    fetchMyQuests();
  }, [user, toast]);

  const handleDeleteQuest = async (questId: string) => {
    try {
      const { error } = await supabase
        .from('quests')
        .delete()
        .eq('id', questId);

      if (error) throw error;

      setMyQuests(prev => prev.filter(q => q.id !== questId));
      toast({
        title: "Quest Deleted",
        description: "Your quest has been removed",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete quest",
        variant: "destructive",
      });
    }
  };

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

          {/* Demo AI Agents */}
          <DemoAgents />

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

          {/* My Created Quests */}
          {user && (
            <Card className="glass p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">My Created Quests</h3>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => navigate('/create-quest')}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Create Quest
                </Button>
              </div>

              {loadingQuests ? (
                <p className="text-sm text-muted-foreground text-center py-8">Loading your quests...</p>
              ) : myQuests.length === 0 ? (
                <div className="text-center py-8 space-y-4">
                  <p className="text-muted-foreground">You haven't created any quests yet</p>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/create-quest')}
                    className="gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Create Your First Quest
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {myQuests.map((quest) => (
                    <div
                      key={quest.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium">{quest.title}</p>
                          <Badge
                            variant="outline"
                            className={
                              quest.status === 'active'
                                ? 'bg-success/20 text-success border-success/30'
                                : 'bg-muted text-muted-foreground'
                            }
                          >
                            {quest.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{quest.category}</span>
                          <span>•</span>
                          <span>{quest.difficulty}</span>
                          <span>•</span>
                          <span className="text-accent font-semibold">{quest.reward} USDC</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/quest/${quest.id}`)}
                          className="gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteQuest(quest.id)}
                          className="gap-2 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default AgentDashboard;
