import { memo, useEffect, useState, useMemo, useCallback } from "react";
import QuestCard from "./QuestCard";
import QuestSkeleton from "./QuestSkeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { Search, Filter } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Quest = Database['public']['Tables']['quests']['Row'];

const QuestFeed = memo(() => {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");

  const fetchQuests = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('quests')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data && data.length > 0) {
        setQuests(data);
      } else {
        const fallbackQuests: Quest[] = [
          {
            id: '6b61e1f9-3c6c-4f1c-9a13-01a1ce1dd001',
            title: 'Index DeFi Protocols on Base',
            description: 'Research and document top DeFi protocols on Base chain with metrics.',
            category: 'Analytics',
            difficulty: 'Medium',
            reward: 60,
            status: 'active',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            created_by: null,
            requirements: ['Protocol list', 'TVL metrics', 'Risk notes'],
          },
          {
            id: '6b61e1f9-3c6c-4f1c-9a13-01a1ce1dd002',
            title: 'Write Wallet Connect Tutorial',
            description: 'Create a beginner-friendly tutorial to connect web wallets.',
            category: 'Content',
            difficulty: 'Easy',
            reward: 25,
            status: 'active',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            created_by: null,
            requirements: ['Screenshots', 'Code snippets', 'Step-by-step guide'],
          },
          {
            id: '6b61e1f9-3c6c-4f1c-9a13-01a1ce1dd003',
            title: 'Build NFT Mint dApp',
            description: 'Implement a simple NFT minting dApp with UI and contract.',
            category: 'Development',
            difficulty: 'Hard',
            reward: 120,
            status: 'active',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            created_by: null,
            requirements: ['Mint function', 'Wallet connect', 'Confirmations'],
          },
          {
            id: '6b61e1f9-3c6c-4f1c-9a13-01a1ce1dd004',
            title: 'Analyze Gas Fee Trends',
            description: 'Collect and analyze L2 gas fees over the last 30 days.',
            category: 'Analytics',
            difficulty: 'Easy',
            reward: 30,
            status: 'active',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            created_by: null,
            requirements: ['Data sources', 'Charts', 'Summary'],
          },
          {
            id: '6b61e1f9-3c6c-4f1c-9a13-01a1ce1dd005',
            title: 'Create L2 Comparison Chart',
            description: 'Compare throughput, fees, and activity across top L2s.',
            category: 'Content',
            difficulty: 'Medium',
            reward: 40,
            status: 'active',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            created_by: null,
            requirements: ['Data table', 'Charts', 'Narrative summary'],
          },
          {
            id: '6b61e1f9-3c6c-4f1c-9a13-01a1ce1dd006',
            title: 'Integrate Supabase Auth',
            description: 'Add Supabase email auth to an existing React app.',
            category: 'Development',
            difficulty: 'Medium',
            reward: 80,
            status: 'active',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            created_by: null,
            requirements: ['Sign in', 'Profile fetch', 'Protected routes'],
          },
        ];
        setQuests(fallbackQuests);
      }
    } catch (error) {
      console.error('Error fetching quests:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuests();
  }, [fetchQuests]);

  // Memoized filtered quests computation
  const filteredQuests = useMemo(() => {
    let filtered = [...quests];

    // Apply search filter
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (quest) =>
          quest.title.toLowerCase().includes(lowerSearchTerm) ||
          quest.description.toLowerCase().includes(lowerSearchTerm)
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

    return filtered;
  }, [searchTerm, categoryFilter, difficultyFilter, quests]);

  // Memoized categories list
  const categories = useMemo(() =>
    Array.from(new Set(quests.map((q) => q.category))),
    [quests]
  );
  const difficulties = ["Easy", "Medium", "Hard"];

  if (isLoading) {
    return (
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Section Header */}
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Active Quests
                </span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Loading available quests...
              </p>
            </div>

            {/* Skeleton Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <QuestSkeleton key={i} />
              ))}
            </div>
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
});

QuestFeed.displayName = "QuestFeed";

export default QuestFeed;
