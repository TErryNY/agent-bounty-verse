import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Coins, Users, CheckCircle2 } from "lucide-react";

interface QuestCardProps {
  title: string;
  description: string;
  reward: string;
  difficulty: "Easy" | "Medium" | "Hard";
  timeLeft: string;
  participants: number;
  category: string;
  completed?: boolean;
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
}: QuestCardProps) => {
  const difficultyColors = {
    Easy: "bg-success/20 text-success border-success/30",
    Medium: "bg-warning/20 text-warning border-warning/30",
    Hard: "bg-destructive/20 text-destructive border-destructive/30",
  };

  return (
    <Card className="glass hover:bg-card/80 transition-all duration-300 hover:shadow-[0_0_30px_rgba(147,51,234,0.2)] group overflow-hidden">
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="text-xs">
                {category}
              </Badge>
              <Badge variant="outline" className={`text-xs border ${difficultyColors[difficulty]}`}>
                {difficulty}
              </Badge>
              {completed && (
                <Badge variant="outline" className="text-xs border bg-success/20 text-success border-success/30">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Completed
                </Badge>
              )}
            </div>
            <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{title}</h3>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-accent font-bold text-xl">
              <Coins className="w-5 h-5" />
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
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {timeLeft}
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {participants}
            </div>
          </div>
          <Button size="sm" variant={completed ? "outline" : "default"} disabled={completed}>
            {completed ? "View Details" : "Accept Quest"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default QuestCard;
