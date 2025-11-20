import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ArrowLeft, Bot, CheckCircle2, Clock, Coins, FileText, Sparkles } from "lucide-react";

interface Quest {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  reward: number;
  requirements: string[] | null;
}

interface UserProgress {
  id: string;
  status: string;
  points_earned: number;
  completed_at: string | null;
}

const QuestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [quest, setQuest] = useState<Quest | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleting, setIsCompleting] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>("");

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchQuestDetails();
  }, [id, user]);

  const fetchQuestDetails = async () => {
    try {
      const { data: questData, error: questError } = await supabase
        .from("quests")
        .select("*")
        .eq("id", id)
        .single();

      if (questError) throw questError;

      const { data: progressData, error: progressError } = await supabase
        .from("user_progress")
        .select("*")
        .eq("quest_id", id)
        .eq("user_id", user!.id)
        .single();

      if (progressError && progressError.code !== "PGRST116") throw progressError;

      setQuest(questData);
      setProgress(progressData || null);
      
      if (progressData?.status === "completed") {
        generateAIOutput(questData);
      }
    } catch (error) {
      console.error("Error fetching quest:", error);
      toast({
        title: "Error",
        description: "Failed to load quest details",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateAIOutput = (questData: Quest) => {
    const outputs: Record<string, string> = {
      Analytics: `# User Engagement Analysis Report\n\n## Executive Summary\nAnalyzed 10,000+ user interactions across Q4 2024.\n\n## Key Findings:\n- 📈 45% increase in daily active users\n- ⏱️ Average session time: 12.3 minutes (+22%)\n- 🎯 Conversion rate improved to 8.4%\n\n## Top Performing Features:\n1. Quest completion workflow (+67% engagement)\n2. Real-time notifications (+43% retention)\n3. Leaderboard system (+38% competition)\n\n## Recommendations:\n- Implement personalized quest suggestions\n- Add social sharing capabilities\n- Introduce streak bonuses for consistency`,
      Content: `# AI Research Paper Summary\n\n## Papers Analyzed: 15\n\n### Top 3 Breakthroughs:\n\n**1. Multimodal AI Systems**\n- Integration of vision, language, and reasoning\n- 40% improvement in task accuracy\n- Applications in robotics and healthcare\n\n**2. Efficient Model Training**\n- New techniques reduce training time by 60%\n- Lower computational costs\n- More accessible for smaller teams\n\n**3. AI Safety & Alignment**\n- Novel approaches to value alignment\n- Improved interpretability methods\n- Enhanced reliability in critical systems\n\n### Emerging Trends:\n- Edge AI deployment\n- Federated learning adoption\n- Quantum-AI hybrid systems`,
      Development: `# Code Review Report\n\n## E-commerce Checkout Flow Analysis\n\n### ✅ Strengths:\n- Clean component structure\n- Proper error handling\n- Type-safe implementation\n\n### ⚠️ Issues Found:\n\n**Critical (1):**\n- Payment validation lacks timeout handling\n- Risk: Transaction hanging indefinitely\n- Fix: Add 30s timeout with retry logic\n\n**Medium (3):**\n- Cart state not persisted on refresh\n- Missing loading states on payment\n- Address validation could be stricter\n\n**Low (5):**\n- Console.logs in production code\n- Unused imports in CheckoutForm.tsx\n- Consider memoizing expensive calculations\n\n### Performance:\n- Lighthouse Score: 94/100\n- Bundle size: 245KB (within target)\n\n### Recommendations:\n- Implement optimistic UI updates\n- Add payment method icons\n- Consider adding guest checkout`,
    };

    setAiOutput(outputs[questData.category] || outputs.Development);
  };

  const handleCompleteQuest = async () => {
    if (!quest || !progress || !user) return;

    setIsCompleting(true);
    try {
      const { error } = await supabase
        .from("user_progress")
        .update({
          status: "completed",
          completed_at: new Date().toISOString(),
          points_earned: quest.reward,
        })
        .eq("id", progress.id);

      if (error) throw error;

      generateAIOutput(quest);
      
      toast({
        title: "Quest Completed! 🎉",
        description: (
          <div className="space-y-2">
            <p>You've earned {quest.reward} USDC!</p>
            <p className="text-xs text-muted-foreground">Points added to your profile</p>
          </div>
        ),
      });

      fetchQuestDetails();
    } catch (error) {
      console.error("Error completing quest:", error);
      toast({
        title: "Error",
        description: "Failed to complete quest. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCompleting(false);
    }
  };

  const getAgentForCategory = (category: string) => {
    const agents: Record<string, { name: string; specialty: string }> = {
      Analytics: { name: "DataAnalyzer_AI", specialty: "Analytics" },
      Content: { name: "SummaryMaster_AI", specialty: "Content" },
      Development: { name: "CodeReviewer_AI", specialty: "Development" },
    };
    return agents[category] || agents.Development;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner />
        </div>
        <Footer />
      </div>
    );
  }

  if (!quest) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Quest Not Found</h1>
          <Button onClick={() => navigate("/")}>Return Home</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const agent = getAgentForCategory(quest.category);
  const isCompleted = progress?.status === "completed";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Back Button */}
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {/* Quest Header */}
          <Card className="glass p-8 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline">{quest.category}</Badge>
                  <Badge variant="outline" className={
                    quest.difficulty === "Easy" ? "bg-success/20 text-success border-success/30" :
                    quest.difficulty === "Medium" ? "bg-warning/20 text-warning border-warning/30" :
                    "bg-destructive/20 text-destructive border-destructive/30"
                  }>
                    {quest.difficulty}
                  </Badge>
                  {isCompleted && (
                    <Badge variant="outline" className="bg-success/20 text-success border-success/30">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Completed
                    </Badge>
                  )}
                </div>
                <h1 className="text-3xl font-bold">{quest.title}</h1>
                <p className="text-muted-foreground text-lg">{quest.description}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 text-accent font-bold text-2xl">
                  <Coins className="w-6 h-6" />
                  {quest.reward}
                </div>
                <p className="text-sm text-muted-foreground">USDC</p>
              </div>
            </div>

            <Separator />

            {/* AI Agent Assignment */}
            <div className="flex items-center gap-4 p-4 rounded-lg bg-primary/10">
              <Bot className="w-8 h-8 text-primary" />
              <div>
                <p className="font-semibold">{agent.name}</p>
                <p className="text-sm text-muted-foreground">Assigned AI Agent • {agent.specialty} Specialist</p>
              </div>
            </div>

            {/* Requirements */}
            {quest.requirements && quest.requirements.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Requirements
                </h3>
                <ul className="space-y-2">
                  {quest.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-success" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Button */}
            {progress && !isCompleted && (
              <Button 
                onClick={handleCompleteQuest} 
                disabled={isCompleting}
                className="w-full"
                size="lg"
              >
                {isCompleting ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Mark as Complete
                  </>
                )}
              </Button>
            )}
          </Card>

          {/* AI Output Section */}
          {isCompleted && aiOutput && (
            <Card className="glass p-8 space-y-6">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-accent" />
                <h2 className="text-2xl font-bold">AI Agent Results</h2>
              </div>
              <Separator />
              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap text-sm text-muted-foreground bg-muted/30 p-6 rounded-lg overflow-x-auto">
                  {aiOutput}
                </pre>
              </div>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default QuestDetails;
