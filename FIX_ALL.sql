-- ============================================
-- AI QUESTHUB - COMPLETE DATABASE FIX & SETUP
-- ============================================
-- Run this entire script in Supabase SQL Editor to fix everything at once
-- This includes: migrations, security policies, indexes, constraints, and demo quests

-- ===========================================
-- STEP 1: FIX USER CREATION TRIGGER
-- ===========================================

-- Drop existing function first
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- Recreate with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  generated_username TEXT;
  attempt_count INTEGER := 0;
  max_attempts INTEGER := 5;
BEGIN
  -- Start with provided username or derive from email
  generated_username := COALESCE(
    NEW.raw_user_meta_data->>'username',
    split_part(NEW.email, '@', 1)
  );
  
  -- Remove invalid characters and ensure it's not empty
  generated_username := regexp_replace(generated_username, '[^a-zA-Z0-9_]', '', 'g');
  
  -- If username becomes empty after cleanup, use a default
  IF generated_username = '' OR generated_username IS NULL THEN
    generated_username := 'user';
  END IF;
  
  -- Ensure minimum length
  IF length(generated_username) < 3 THEN
    generated_username := generated_username || '_' || substring(NEW.id::text, 1, 6);
  END IF;
  
  -- Try to insert profile with conflict resolution
  LOOP
    BEGIN
      INSERT INTO public.profiles (id, username, avatar_url)
      VALUES (
        NEW.id,
        generated_username,
        NEW.raw_user_meta_data->>'avatar_url'
      );
      EXIT;
      
    EXCEPTION WHEN unique_violation THEN
      attempt_count := attempt_count + 1;
      
      IF attempt_count >= max_attempts THEN
        generated_username := split_part(NEW.email, '@', 1) || '_' || substring(NEW.id::text, 1, 8);
        INSERT INTO public.profiles (id, username, avatar_url)
        VALUES (
          NEW.id,
          generated_username,
          NEW.raw_user_meta_data->>'avatar_url'
        )
        ON CONFLICT (username) DO UPDATE
        SET username = EXCLUDED.username || '_' || substring(md5(random()::text), 1, 4);
        EXIT;
      ELSE
        generated_username := regexp_replace(generated_username, '_\d+$', '') || '_' || attempt_count::text;
      END IF;
    END;
  END LOOP;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'Error creating profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ===========================================
-- STEP 2: ADD MISSING RLS POLICIES
-- ===========================================

-- Delete policies for quests
DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can delete own quests" ON public.quests;
EXCEPTION WHEN undefined_object THEN NULL;
END $$;

CREATE POLICY "Users can delete own quests"
  ON public.quests FOR DELETE
  USING (auth.uid() = created_by);

-- Delete policies for user_progress
DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can delete own progress" ON public.user_progress;
EXCEPTION WHEN undefined_object THEN NULL;
END $$;

CREATE POLICY "Users can delete own progress"
  ON public.user_progress FOR DELETE
  USING (auth.uid() = user_id);

-- Delete policies for notifications
DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can delete own notifications" ON public.notifications;
EXCEPTION WHEN undefined_object THEN NULL;
END $$;

CREATE POLICY "Users can delete own notifications"
  ON public.notifications FOR DELETE
  USING (auth.uid() = user_id);

-- Delete policies for notification_preferences  
DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can delete own preferences" ON public.notification_preferences;
EXCEPTION WHEN undefined_object THEN NULL;
END $$;

CREATE POLICY "Users can delete own preferences"
  ON public.notification_preferences FOR DELETE
  USING (auth.uid() = user_id);

-- ===========================================
-- STEP 3: ADD PERFORMANCE INDEXES
-- ===========================================

CREATE INDEX IF NOT EXISTS idx_quests_status ON public.quests(status);
CREATE INDEX IF NOT EXISTS idx_quests_category ON public.quests(category);
CREATE INDEX IF NOT EXISTS idx_quests_difficulty ON public.quests(difficulty);
CREATE INDEX IF NOT EXISTS idx_quests_created_by ON public.quests(created_by);
CREATE INDEX IF NOT EXISTS idx_quests_created_at ON public.quests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON public.user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_quest_id ON public.user_progress(quest_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_status ON public.user_progress(status);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_quest ON public.user_progress(user_id, quest_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON public.notifications(user_id, read) WHERE read = false;
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_total_points ON public.profiles(total_points DESC);

-- ===========================================
-- STEP 4: ADD DATA CONSTRAINTS
-- ===========================================

-- Username constraints
DO $$ BEGIN
  ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS username_not_empty;
  ALTER TABLE public.profiles ADD CONSTRAINT username_not_empty 
    CHECK (username IS NOT NULL AND length(trim(username)) >= 3 AND length(username) <= 20);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Quest reward constraints
DO $$ BEGIN
  ALTER TABLE public.quests DROP CONSTRAINT IF EXISTS reward_positive;
  ALTER TABLE public.quests ADD CONSTRAINT reward_positive CHECK (reward > 0);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Points constraints
DO $$ BEGIN
  ALTER TABLE public.user_progress DROP CONSTRAINT IF EXISTS points_not_negative;
  ALTER TABLE public.user_progress ADD CONSTRAINT points_not_negative CHECK (points_earned >= 0);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ===========================================
-- STEP 5: FIX STORAGE BUCKET
-- ===========================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/jpg']
) ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/jpg'];

-- ===========================================
-- STEP 6: SEED DEMO QUESTS
-- ===========================================

-- Insert comprehensive demo quests
INSERT INTO quests (title, description, category, difficulty, reward, status, requirements)
VALUES 
  -- Original 3 quests
  (
    'Market Sentiment Analysis',
    'Analyze cryptocurrency market sentiment across Twitter, Reddit, and Discord. Track trending tokens, sentiment shifts, and community reactions. Generate a comprehensive report with visualizations showing bullish/bearish sentiment distribution, most discussed projects, and potential market-moving narratives.',
    'Analytics',
    'Medium',
    150,
    'active',
    ARRAY['Access to social media APIs', 'Sentiment analysis tools', 'Data visualization capabilities', 'Minimum 1000 posts analyzed']
  ),
  (
    'Technical Documentation Review',
    'Review and summarize the latest Ethereum EIP proposals and protocol upgrades. Identify breaking changes, new features, and deprecated functionality. Create a developer-friendly summary highlighting migration paths and implementation timelines for each major change.',
    'Content',
    'Easy',
    75,
    'active',
    ARRAY['Understanding of Ethereum protocol', 'Technical writing skills', 'Ability to synthesize complex information', 'Markdown formatting']
  ),
  (
    'Smart Contract Security Audit',
    'Perform comprehensive security analysis on a DeFi lending protocol smart contract. Identify potential vulnerabilities including reentrancy attacks, integer overflows, access control issues, and economic exploits. Provide detailed remediation recommendations with code examples and estimated gas impact.',
    'Development',
    'Hard',
    300,
    'active',
    ARRAY['Solidity expertise', 'Security audit tools (Slither, Mythril)', 'Understanding of DeFi protocols', 'Formal verification knowledge']
  ),
  
  -- Additional Analytics Quests
  (
    'NFT Market Trend Analysis',
    'Analyze trading volumes, floor prices, and holder distribution across major NFT marketplaces (OpenSea, Blur, LooksRare). Identify emerging collections with high growth potential. Generate comprehensive charts showing 30-day trends, whale movements, and collection correlations.',
    'Analytics',
    'Hard',
    250,
    'active',
    ARRAY['NFT marketplace API access', 'Data visualization tools', 'Statistical analysis skills', 'Minimum 10 collections analyzed']
  ),
  (
    'DeFi Protocol Risk Assessment',
    'Evaluate smart contract risks, liquidity depth, and historical exploit patterns for top 20 DeFi protocols. Create a risk matrix categorizing protocols by security score, TVL volatility, and governance strength. Include recommendations for portfolio allocation.',
    'Analytics',
    'Hard',
    300,
    'active',
    ARRAY['DeFi protocol understanding', 'Smart contract analysis', 'Risk modeling', 'Excel/Python skills']
  ),
  (
    'Crypto Twitter Sentiment Tracker',
    'Build a real-time sentiment analysis dashboard for cryptocurrency-related tweets. Track top influencers, trending topics, and sentiment shifts. Identify potential pump-and-dump schemes through anomaly detection in social engagement patterns.',
    'Analytics',
    'Medium',
    175,
    'active',
    ARRAY['Twitter API access', 'NLP/sentiment analysis', 'Real-time data processing', 'Minimum 50K tweets analyzed']
  ),
  
  -- Additional Content Quests
  (
    'Beginner''s Guide to Layer 2 Scaling',
    'Write a comprehensive yet accessible guide explaining Layer 2 scaling solutions (Arbitrum, Optimism, zkSync, Polygon). Include comparisons of transaction costs, finality times, and security models. Add visual diagrams showing how rollups work.',
    'Content',
    'Easy',
    80,
    'active',
    ARRAY['Clear writing skills', 'Understanding of blockchain scaling', 'Ability to create diagrams', '2000+ words minimum']
  ),
  (
    'Weekly Crypto News Digest',
    'Curate and summarize the top 10 most important crypto news stories from the past week. Include regulatory updates, major protocol launches, security incidents, and market-moving events. Write concise summaries with source links.',
    'Content',
    'Easy',
    60,
    'active',
    ARRAY['News aggregation', 'Concise writing', 'Fact verification', 'Weekly commitment']
  ),
  (
    'DAO Governance Deep Dive',
    'Research and document governance mechanisms of 5 major DAOs (MakerDAO, Uniswap, Compound, Aave, ENS). Compare voting systems, proposal processes, and token distribution. Analyze recent governance proposals and their outcomes.',
    'Content',
    'Medium',
    120,
    'active',
    ARRAY['DAO understanding', 'Research skills', 'Technical writing', '3000+ words with examples']
  ),
  
  -- Additional Development Quests
  (
    'Build a Token Swap Interface',
    'Develop a clean, responsive token swap interface using React and ethers.js. Integrate with Uniswap V3 for price quotes and swaps. Include features: token search, price impact warnings, slippage controls, and transaction history.',
    'Development',
    'Hard',
    350,
    'active',
    ARRAY['React/TypeScript', 'Web3 integration (ethers.js/viem)', 'Uniswap SDK experience', 'UI/UX design skills']
  ),
  (
    'Multi-Chain Wallet Balance Tracker',
    'Create a portfolio tracker that displays token balances across Ethereum, BSC, Polygon, and Arbitrum. Support ERC-20 tokens and native coins. Show USD valuations, 24h changes, and aggregate portfolio worth.',
    'Development',
    'Medium',
    200,
    'active',
    ARRAY['Multi-chain RPC integration', 'Token price APIs (CoinGecko/CoinMarketCap)', 'Database (optional)', 'Responsive design']
  ),
  (
    'Gas Price Optimization Tool',
    'Build a tool that analyzes historical gas prices and recommends optimal times to execute transactions. Include predictions based on day-of-week patterns and current mempool state. Display gas trends with charts.',
    'Development',
    'Medium',
    180,
    'active',
    ARRAY['Ethereum gas mechanics', 'Data visualization', 'Historical data analysis', 'API integration']
  ),
  (
    'Solidity Contract Fuzzer',
    'Develop a fuzzing tool that generates random inputs to test Solidity smart contracts for edge cases. Integrate with Hardhat/Foundry testing frameworks. Include reports showing code coverage and discovered vulnerabilities.',
    'Development',
    'Hard',
    400,
    'active',
    ARRAY['Advanced Solidity', 'Fuzzing techniques', 'Testing frameworks', 'Security mindset']
  )
ON CONFLICT DO NOTHING;

-- ===========================================
-- STEP 7: ANALYZE & VERIFY
-- ===========================================

-- Analyze tables for query optimization
ANALYZE public.quests;
ANALYZE public.user_progress;
ANALYZE public.notifications;
ANALYZE public.profiles;

-- Verification Query - Check everything is working
SELECT 
  'Database Fix Complete!' as status,
  (SELECT COUNT(*) FROM quests WHERE status = 'active') as active_quests,
  (SELECT COUNT(*) FROM profiles) as total_users,
  (SELECT COUNT(*) FROM pg_indexes WHERE schemaname = 'public') as total_indexes,
  (SELECT COUNT(*) FROM pg_policies WHERE schemaname = 'public') as total_policies;

-- Show quest distribution
SELECT 
  category,
  difficulty,
  COUNT(*) as quest_count,
  AVG(reward)::int as avg_reward
FROM quests
WHERE status = 'active'
GROUP BY category, difficulty
ORDER BY category, difficulty;
