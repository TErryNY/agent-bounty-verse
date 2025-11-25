import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QUEST_CATEGORIES, DIFFICULTY_LEVELS } from "@/lib/constants";
import { z } from "zod";

const questSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title must be less than 100 characters"),
  description: z.string().min(20, "Description must be at least 20 characters").max(1000, "Description must be less than 1000 characters"),
  category: z.string().min(1, "Category is required"),
  difficulty: z.string().min(1, "Difficulty is required"),
  reward: z.number().min(1, "Reward must be at least 1").max(10000, "Reward must be less than 10,000"),
});

export default function CreateQuest() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "",
    reward: "",
  });

  const createMutation = useMutation({
    mutationFn: async (validatedData: {
      title: string;
      description: string;
      category: string;
      difficulty: string;
      reward: number;
    }) => {
      const { error } = await supabase.from("quests").insert({
        title: validatedData.title,
        description: validatedData.description,
        category: validatedData.category,
        difficulty: validatedData.difficulty,
        reward: validatedData.reward,
        created_by: user!.id,
        status: "active",
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Quest Created!",
        description: "Your quest has been created successfully",
      });
      navigate("/");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create quest. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to create a quest",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    setErrors({});

    try {
      // Validate form data
      const validatedData = questSchema.parse({
        ...formData,
        reward: parseInt(formData.reward),
      });
      createMutation.mutate(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        toast({
          title: "Error",
          description: "Failed to create quest. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Create New Quest</CardTitle>
            <CardDescription>
              Design a quest for AI agents and humans to complete for rewards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Quest Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter a clear and engaging title"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className={errors.title ? "border-destructive" : ""}
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the quest objectives, requirements, and deliverables"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className={`min-h-[120px] ${errors.description ? "border-destructive" : ""}`}
                />
                {errors.description && (
                  <p className="text-sm text-destructive">{errors.description}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleChange("category", value)}
                  >
                    <SelectTrigger className={errors.category ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-background">
                      {QUEST_CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-destructive">{errors.category}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty *</Label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={(value) => handleChange("difficulty", value)}
                  >
                    <SelectTrigger className={errors.difficulty ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent className="bg-background">
                      {DIFFICULTY_LEVELS.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.difficulty && (
                    <p className="text-sm text-destructive">{errors.difficulty}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reward">Reward (USDC) *</Label>
                <Input
                  id="reward"
                  type="number"
                  placeholder="100"
                  value={formData.reward}
                  onChange={(e) => handleChange("reward", e.target.value)}
                  className={errors.reward ? "border-destructive" : ""}
                  min="1"
                  max="10000"
                />
                {errors.reward && (
                  <p className="text-sm text-destructive">{errors.reward}</p>
                )}
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={createMutation.isPending} className="flex-1">
                  {createMutation.isPending ? "Creating..." : "Create Quest"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/")}
                  disabled={createMutation.isPending}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
