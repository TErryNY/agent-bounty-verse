-- 4 Demonstration Quests for AI QuestHub
-- These quests are designed to showcase the platform's variety and appeal
-- Run this in Supabase SQL Editor to add demo quests

INSERT INTO quests (title, description, category, difficulty, reward, status, requirements)
VALUES 
  -- === AI & AUTOMATION QUEST ===
  (
    'AI Agent Trading Bot Performance Review',
    'Evaluate and compare the performance of different AI trading bots in the crypto market. Test bots from platforms like 3Commas, Cryptohopper, and TradeSanta using historical data. Analyze profitability, risk metrics, win rates, and drawdown percentages. Create a comprehensive comparison report with recommendations for different trader profiles (conservative, moderate, aggressive).',
    'Analytics',
    'Medium',
    'active',
    ARRAY['Trading bot platform access or trial accounts', 'Backtesting capabilities', 'Performance metrics analysis', 'Statistical comparison skills', 'Excel or data visualization tools']
  ),
  
  -- === CREATIVE/EDUCATIONAL QUEST ===
  (
    'Build a Crypto Learning Path for Beginners',
    'Create an interactive, step-by-step learning curriculum for complete crypto beginners. Cover fundamentals: blockchain basics, wallet setup, buying first crypto, DeFi introduction, security practices, and common scams to avoid. Include quizzes, video recommendations, hands-on exercises, and a final "graduation" project. Make it engaging and accessible.',
    'Content',
    'Easy',
    110,
    'active',
    ARRAY['Educational content creation', 'Crypto fundamentals knowledge', 'Curriculum design experience', 'Interactive elements (quizzes/exercises)', 'Minimum 10 lessons with practical tasks']
  ),
  
  -- === COMMUNITY/SOCIAL QUEST ===
  (
    'Decentralized Social Media Platform Comparison',
    'Research and compare emerging Web3 social media platforms (Lens Protocol, Farcaster, Mastodon, Bluesky, DESO). Analyze features, user experience, decentralization level, content moderation approaches, monetization models, and growth potential. Interview active users if possible. Create a detailed comparison guide helping users choose the right platform.',
    'Content',
    'Medium',
   155,
    'active',
    ARRAY['Web3 social media awareness', 'User research skills', 'Comparative analysis', 'Interview or survey data collection', '3000+ words with screenshots']
  ),
  
  -- === TECHNICAL INNOVATION QUEST ===
  (
    'Simple DeFi Yield Aggregator Dashboard',
    'Develop a user-friendly dashboard that aggregates yield farming opportunities across multiple DeFi protocols (Aave, Compound, Yearn, Curve). Display current APYs, risk levels, TVL, and historical performance. Include filtering by chain (Ethereum, Polygon, Arbitrum) and risk category. Add price alerts for APY changes above 10%. Focus on clean UX and real-time data.',
    'Development',
    'Medium',
    265,
    'active',
    ARRAY['DeFi protocol API integration', 'Frontend development (React/Vue)', 'Real-time data updates', 'Web3 libraries (ethers.js/web3.js)', 'Responsive design', 'Testnet or mainnet deployment']
  );

-- Verify the new quests
SELECT 
  title,
  category,
  difficulty,
  reward,
  status
FROM quests
WHERE title IN (
  'AI Agent Trading Bot Performance Review',
  'Build a Crypto Learning Path for Beginners',
  'Decentralized Social Media Platform Comparison',
  'Simple DeFi Yield Aggregator Dashboard'
)
ORDER BY category, difficulty;

-- Show updated quest count
SELECT 
  category,
  COUNT(*) as quest_count,
  AVG(reward)::numeric(10,2) as avg_reward
FROM quests
WHERE status = 'active'
GROUP BY category
ORDER BY category;
