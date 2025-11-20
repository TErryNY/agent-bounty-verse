import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Coins, Users, CheckCircle2, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";

interface QuestCardProps {
  title: string;
  description: string;
  reward: string;
  difficulty: "Easy" | "Medium" | "Hard";
  timeLeft: string;
  participants: number;
  category: string;
  completed?: boolean;
  questId?: string;
  onAccepted?: () => void;
}

const QuestCard = ({
  title,
  description,
  reward,
  difficulty,
  timeLeft,
  participants,
  category,
  completed = false,
  questId,
  onAccepted,
}: QuestCardProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAccepting, setIsAccepting] = useState(false);
  
  const aiAgents = [
    { name: "DataAnalyzer_AI", specialty: "Analytics" },
    { name: "SummaryMaster_AI", specialty: "Content" },
    { name: "CodeReviewer_AI", specialty: "Development" },
    { name: "ResearchAssist_AI", specialty: "Development" },
  ];
  
  const getAssignedAgent = () => {
    if (category === "Analytics") return aiAgents[0];
    if (category === "Content") return aiAgents[1];
    return aiAgents[2];
  };
  
  const difficultyColors = {
    Easy: "bg-success/20 text-success border-success/30",
    Medium: "bg-warning/20 text-warning border-warning/30",
    Hard: "bg-destructive/20 text-destructive border-destructive/30",
  };

  const handleButtonClick = async () => {
    if (completed || questId) {
      navigate(`/quest/${questId}`);
      return;
    }
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to accept quests",
        variant: "destructive",
      });
      return;
    }
    
    if (!questId) {
      toast({
        title: "Error",
        description: "Quest ID is missing",
        variant: "destructive",
      });
      return;
    }
    
    setIsAccepting(true);
    
    try {
      const { error } = await supabase
        .from('user_progress')
        .insert({
          user_id: user.id,
          quest_id: questId,
          status: 'in_progress',
          points_earned: 0,
        });
      
      if (error) throw error;
      
      const assignedAgent = getAssignedAgent();
      
      toast({
        title: "Quest Accepted! 🎉",
        description: (
          <div className="space-y-2">
            <p>You've accepted "{title}"</p>
            <div className="flex items-center gap-2 text-sm">
              <Bot className="w-4 h-4" />
              <span className="font-semibold">{assignedAgent.name}</span>
              <span>assigned to assist</span>
            </div>
            <p className="text-xs text-muted-foreground">Reward: {reward} USDC</p>
          </div>
        ),
      });
      
      onAccepted?.();
    } catch (error) {
      console.error('Error accepting quest:', error);
      toast({
        title: "Error",
        description: "Failed to accept quest. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAccepting(false);
    }
  };

  return (
    <Card 
      className="glass p-6 space-y-4 hover-lift cursor-pointer group overflow-hidden"
      role="article"
      aria-labelledby={`quest-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="text-xs" aria-label={`Category: ${category}`}>
                {category}
              </Badge>
              <Badge variant="outline" className={`text-xs border ${difficultyColors[difficulty]}`} aria-label={`Difficulty: ${difficulty}`}>
                {difficulty}
              </Badge>
              {completed && (
                <Badge variant="outline" className="text-xs border bg-success/20 text-success border-success/30">
                  <CheckCircle2 className="w-3 h-3 mr-1" aria-hidden="true" />
                  Completed
                </Badge>
              )}
            </div>
            <h3 
              id={`quest-${title.replace(/\s+/g, '-').toLowerCase()}`} 
              className="text-lg font-bold group-hover:text-primary transition-all duration-300"
            >
              {title}
            </h3>
          </div>
          <div className="text-right" aria-label={`Reward: ${reward} USDC`}>
            <div className="flex items-center gap-1 text-accent font-bold text-xl">
              <Coins className="w-5 h-5" aria-hidden="true" />
              {reward}
            </div>
            <p className="text-xs text-muted-foreground">USDC</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1" aria-label={`Time remaining: ${timeLeft}`}>
              <Clock className="w-4 h-4" aria-hidden="true" />
              {timeLeft}
            </div>
            <div className="flex items-center gap-1" aria-label={`${participants} participants`}>
              <Users className="w-4 h-4" aria-hidden="true" />
              {participants}
            </div>
          </div>
          <Button 
            size="sm" 
            variant={completed ? "outline" : "default"} 
            disabled={completed || isAccepting}
            onClick={handleButtonClick}
            className="group-hover:scale-105 transition-transform duration-300"
            aria-label={completed ? `View details for ${title}` : `Accept quest: ${title}`}
          >
            {isAccepting ? "Accepting..." : completed ? "View Results" : "Accept Quest"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default QuestCard;
