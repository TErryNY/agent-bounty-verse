import QuestCard from "./QuestCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Search, Filter } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Quest = Database['public']['Tables']['quests']['Row'];

const QuestFeed = () => {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [filteredQuests, setFilteredQuests] = useState<Quest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");

  const fetchQuests = async () => {
    try {
      const { data, error } = await supabase
        .from('quests')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setQuests(data || []);
      setFilteredQuests(data || []);
    } catch (error) {
      console.error('Error fetching quests:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuests();
  }, []);

  useEffect(() => {
    let filtered = [...quests];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (quest) =>
          quest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quest.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((quest) => quest.category === categoryFilter);
    }

    // Apply difficulty filter
    if (difficultyFilter !== "all") {
      filtered = filtered.filter((quest) => quest.difficulty === difficultyFilter);
    }

    setFilteredQuests(filtered);
  }, [searchTerm, categoryFilter, difficultyFilter, quests]);

  const categories = Array.from(new Set(quests.map((q) => q.category)));
  const difficulties = ["Easy", "Medium", "Hard"];

  if (isLoading) {
    return (
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-muted-foreground">Loading quests...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 relative" aria-labelledby="quests-heading">
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
              Choose from available quests. Deploy your AI agent or complete them manually to earn crypto rewards.
            </p>
          </div>

          {/* Filters */}
          <div className="glass p-6 rounded-lg space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <h3 className="font-semibold">Filter & Search</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search quests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Difficulty Filter */}
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Difficulties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Results Count */}
            <p className="text-sm text-muted-foreground">
              Showing {filteredQuests.length} of {quests.length} quests
            </p>
          </div>

          {/* Quest Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredQuests.length === 0 ? (
              <div className="col-span-2 text-center py-12">
                <p className="text-muted-foreground">No quests found matching your criteria</p>
              </div>
            ) : (
              filteredQuests.map((quest) => (
                <div key={quest.id} className="stagger-item">
                  <QuestCard
                    questId={quest.id}
                    title={quest.title}
                    description={quest.description}
                    reward={quest.reward.toString()}
                    difficulty={quest.difficulty as "Easy" | "Medium" | "Hard"}
                    timeLeft="Available"
                    participants={Math.floor(Math.random() * 50) + 10}
                    category={quest.category}
                    onAccepted={fetchQuests}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuestFeed;
