import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Bot, Zap, TrendingUp, Code } from "lucide-react";
import { useEffect, useState } from "react";

interface Agent {
    id: string;
    name: string;
    specialty: string;
    icon: React.ReactNode;
    status: "working" | "idle" | "completed";
    currentQuest?: string;
    progress: number;
    color: string;
}

const DemoAgents = () => {
    const [agents, setAgents] = useState<Agent[]>([
        {
            id: "1",
            name: "SentimentAI",
            specialty: "Analytics",
            icon: <TrendingUp className="w-5 h-5" />,
            status: "working",
            currentQuest: "Market Sentiment Analysis",
            progress: 0,
            color: "text-accent",
        },
        {
            id: "2",
            name: "DocMaster",
            specialty: "Content",
            icon: <Bot className="w-5 h-5" />,
            status: "working",
            currentQuest: "Technical Documentation Review",
            progress: 0,
            color: "text-secondary",
        },
        {
            id: "3",
            name: "AuditBot",
            specialty: "Development",
            icon: <Code className="w-5 h-5" />,
            status: "working",
            currentQuest: "Smart Contract Security Audit",
            progress: 0,
            color: "text-primary",
        },
    ]);

    useEffect(() => {
        // Simulate agent progress
        const interval = setInterval(() => {
            setAgents((prev) =>
                prev.map((agent) => {
                    if (agent.progress >= 100) {
                        return { ...agent, status: "completed" as const };
                    }
                    // Different speeds for different agents
                    const speed = agent.specialty === "Content" ? 3 : agent.specialty === "Analytics" ? 2 : 1.5;
                    return {
                        ...agent,
                        progress: Math.min(agent.progress + speed, 100),
                    };
                })
            );
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Card className="glass p-6 space-y-6">
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                    <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <h3 className="text-xl font-bold">AI Agents at Work</h3>
                    <p className="text-sm text-muted-foreground">
                        Watch autonomous agents complete quests in real-time
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                {agents.map((agent) => (
                    <div
                        key={agent.id}
                        className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors space-y-3"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg bg-muted ${agent.color}`}>
                                    {agent.icon}
                                </div>
                                <div>
                                    <p className="font-semibold">{agent.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {agent.specialty} Specialist
                                    </p>
                                </div>
                            </div>
                            <Badge
                                variant="outline"
                                className={
                                    agent.status === "completed"
                                        ? "bg-success/20 text-success border-success/30"
                                        : agent.status === "working"
                                            ? "bg-primary/20 text-primary border-primary/30"
                                            : "bg-muted text-muted-foreground"
                                }
                            >
                                {agent.status === "completed" ? "✓ Complete" : agent.status === "working" ? "Working" : "Idle"}
                            </Badge>
                        </div>

                        {agent.currentQuest && (
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        {agent.currentQuest}
                                    </span>
                                    <span className="font-semibold">
                                        {Math.round(agent.progress)}%
                                    </span>
                                </div>
                                <Progress value={agent.progress} className="h-2" />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-xs text-muted-foreground text-center">
                    <span className="font-semibold text-primary">Demo Mode:</span> These agents are simulated for demonstration purposes
                </p>
            </div>
        </Card>
    );
};

export default DemoAgents;
