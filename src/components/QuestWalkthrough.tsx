import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
    CheckCircle2,
    Circle,
    Clock,
    ExternalLink,
    Lightbulb,
    ChevronDown,
    ChevronUp
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { generateQuestSteps, calculateTotalTime, type QuestStep } from "@/lib/questStepGenerators";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface Quest {
    id: string;
    title: string;
    description: string;
    category: string;
    difficulty: string;
    requirements: string[] | null;
    quest_steps?: QuestStep[] | null;
}

interface QuestWalkthroughProps {
    quest: Quest;
    userProgressId: string;
    userId: string;
    onAllStepsComplete?: () => void;
}

const QuestWalkthrough = ({ quest, userProgressId, userId, onAllStepsComplete }: QuestWalkthroughProps) => {
    const { toast } = useToast();
    const [steps, setSteps] = useState<QuestStep[]>([]);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [expandedSteps, setExpandedSteps] = useState<number[]>([0]); // First step expanded by default
    const [isSaving, setIsSaving] = useState(false);

    const loadProgress = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from("user_progress")
                .select("*")
                .eq("id", userProgressId)
                .single();

            if (error) throw error;

            // Gracefully handle deployments where steps_completed column isn't present
            const steps = (data as Record<string, unknown> | null)?.["steps_completed"] as number[] | undefined;
            if (Array.isArray(steps)) {
                setCompletedSteps(steps);
            }
        } catch (error) {
            console.error("Error loading progress:", error);
        }
    }, [userProgressId]);

    useEffect(() => {
        // Generate steps based on quest
        const questSteps = generateQuestSteps(quest);
        setSteps(questSteps);

        // Load saved progress
        loadProgress();
    }, [quest, loadProgress]);

    const saveProgress = async (completed: number[]) => {
        setIsSaving(true);
        try {
            const { error } = await supabase
                .from("user_progress")
                .update({ steps_completed: completed } as unknown as { steps_completed: number[] })
                .eq("id", userProgressId);

            if (error) {
                // 42703: undefined_column
                const code = (error as { code?: string } | null)?.code;
                if (code === "42703") {
                    toast({
                        title: "Progress tracking unavailable",
                        description: "Database migration for quest steps is not applied. Steps will not persist until migration runs.",
                        variant: "destructive",
                    });
                    return;
                }
                throw error;
            }
        } catch (error) {
            console.error("Error saving progress:", error);
            toast({
                title: "Error",
                description: "Failed to save progress. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSaving(false);
        }
    };

    const toggleStep = async (stepIndex: number) => {
        const newCompletedSteps = completedSteps.includes(stepIndex)
            ? completedSteps.filter(i => i !== stepIndex)
            : [...completedSteps, stepIndex].sort((a, b) => a - b);

        setCompletedSteps(newCompletedSteps);
        await saveProgress(newCompletedSteps);

        // Check if all steps are complete
        if (newCompletedSteps.length === steps.length && onAllStepsComplete) {
            onAllStepsComplete();
        }
    };

    const toggleExpanded = (stepIndex: number) => {
        setExpandedSteps(prev =>
            prev.includes(stepIndex)
                ? prev.filter(i => i !== stepIndex)
                : [...prev, stepIndex]
        );
    };

    const progressPercentage = steps.length > 0
        ? Math.round((completedSteps.length / steps.length) * 100)
        : 0;

    const totalTime = calculateTotalTime(steps);

    return (
        <Card className="glass p-6 space-y-6">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="text-2xl font-bold">Quest Walkthrough</h3>
                    <Badge variant="outline" className="text-sm">
                        <Clock className="w-3 h-3 mr-1" />
                        Est. Time: {totalTime}
                    </Badge>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                            Progress: {completedSteps.length} of {steps.length} steps
                        </span>
                        <span className="font-semibold">{progressPercentage}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                </div>
            </div>

            <Separator />

            {/* Steps List */}
            <div className="space-y-3">
                {steps.map((step, index) => {
                    const isCompleted = completedSteps.includes(index);
                    const isExpanded = expandedSteps.includes(index);

                    return (
                        <Collapsible
                            key={step.id}
                            open={isExpanded}
                            onOpenChange={() => toggleExpanded(index)}
                        >
                            <Card className={`p-4 transition-colors ${isCompleted ? 'bg-success/5 border-success/30' : 'hover:bg-muted/50'}`}>
                                {/* Step Header */}
                                <div className="flex items-start gap-3">
                                    {/* Checkbox */}
                                    <Checkbox
                                        checked={isCompleted}
                                        onCheckedChange={() => toggleStep(index)}
                                        className="mt-1"
                                        disabled={isSaving}
                                    />

                                    {/* Step Content */}
                                    <div className="flex-1 min-w-0">
                                        <CollapsibleTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="w-full justify-between p-0 h-auto hover:bg-transparent"
                                            >
                                                <div className="flex items-center gap-2 flex-1">
                                                    {isCompleted ? (
                                                        <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                                                    ) : (
                                                        <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                                                    )}
                                                    <div className="text-left">
                                                        <h4 className={`font-semibold ${isCompleted ? 'text-success' : ''}`}>
                                                            Step {index + 1}: {step.title}
                                                        </h4>
                                                        {!isExpanded && (
                                                            <p className="text-sm text-muted-foreground line-clamp-1">
                                                                {step.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                {isExpanded ? (
                                                    <ChevronUp className="w-4 h-4 flex-shrink-0" />
                                                ) : (
                                                    <ChevronDown className="w-4 h-4 flex-shrink-0" />
                                                )}
                                            </Button>
                                        </CollapsibleTrigger>

                                        {/* Expanded Content */}
                                        <CollapsibleContent className="mt-3 space-y-3">
                                            <p className="text-sm text-muted-foreground">
                                                {step.description}
                                            </p>

                                            {step.estimatedTime && (
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                    <Clock className="w-4 h-4" />
                                                    <span>Estimated time: {step.estimatedTime}</span>
                                                </div>
                                            )}

                                            {/* Resources */}
                                            {step.resources && step.resources.length > 0 && (
                                                <div className="space-y-2">
                                                    <p className="text-sm font-medium">Helpful Resources:</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {step.resources.map((resource, i) => (
                                                            <Button
                                                                key={i}
                                                                variant="outline"
                                                                size="sm"
                                                                asChild
                                                                className="text-xs"
                                                            >
                                                                <a
                                                                    href={resource.url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="flex items-center gap-1"
                                                                >
                                                                    <ExternalLink className="w-3 h-3" />
                                                                    {resource.title}
                                                                </a>
                                                            </Button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Tips */}
                                            {step.tips && step.tips.length > 0 && (
                                                <div className="space-y-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
                                                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                                                        <Lightbulb className="w-4 h-4" />
                                                        <span>Tips:</span>
                                                    </div>
                                                    <ul className="space-y-1 ml-6 text-sm text-muted-foreground">
                                                        {step.tips.map((tip, i) => (
                                                            <li key={i} className="list-disc">
                                                                {tip}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </CollapsibleContent>
                                    </div>
                                </div>
                            </Card>
                        </Collapsible>
                    );
                })}
            </div>

            {/* Completion Message */}
            {completedSteps.length === steps.length && steps.length > 0 && (
                <div className="p-4 rounded-lg bg-success/10 border border-success/30">
                    <div className="flex items-center gap-2 text-success font-semibold">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>All steps completed! You can now mark this quest as complete.</span>
                    </div>
                </div>
            )}
        </Card>
    );
};

export default QuestWalkthrough;
