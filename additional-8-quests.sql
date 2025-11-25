-- 8 Additional Active Quests for AI QuestHub
-- These quests add more variety and advanced challenges
-- Run this in Supabase SQL Editor after running comprehensive-quests.sql

INSERT INTO quests (title, description, category, difficulty, reward, status, requirements)
VALUES 
  -- === ANALYTICS QUESTS (3) ===
  
  (
    'On-Chain Governance Voting Analysis',
    'Analyze voting patterns across major DAO governance proposals. Track voter participation rates, whale influence, delegation trends, and proposal success rates. Create visualizations showing governance health metrics and voting power distribution across different voter tiers.',
    'Analytics',
    'Medium',
    185,
    'active',
    ARRAY['DAO voting data access', 'Statistical analysis tools', 'Governance understanding', 'Minimum 20 proposals analyzed', 'Voting power distribution charts']
  ),
  
  (
    'Token Unlock Schedule Tracker',
    'Build a comprehensive tracker for upcoming token unlocks across top 50 crypto projects. Calculate potential sell pressure, identify high-risk unlock events, and correlate historical price impacts with unlock magnitudes. Generate alerts for significant unlocks.',
    'Analytics',
    'Easy',
    95,
    'active',
    ARRAY['Token economics knowledge', 'Vesting schedule data sources', 'Calendar visualization', 'Historical price analysis']
  ),
  
  (
    'Bridge Volume and Security Monitor',
    'Monitor transaction volumes, fees, and security incidents across major cross-chain bridges (Wormhole, Multichain, Synapse, Hop). Track TVL trends, compare bridge efficiency metrics, and flag suspicious activities or exploit patterns.',
    'Analytics',
    'Hard',
    305,
    'active',
    ARRAY['Bridge protocol understanding', 'Multi-chain data aggregation', 'Security event tracking', 'Real-time monitoring setup', 'Anomaly detection algorithms']
  ),
  
  -- === CONTENT QUESTS (3) ===
  
  (
    'Web3 Gaming Ecosystem Overview',
    'Create a comprehensive guide to Web3 gaming covering play-to-earn models, NFT integration, popular gaming chains (Ronin, IMX, Polygon), and major gaming projects. Include comparisons of different monetization approaches and future trends analysis.',
    'Content',
    'Medium',
    145,
    'active',
    ARRAY['Web3 gaming knowledge', 'Research skills', 'Comparative analysis', '3000+ words', 'Game examples with screenshots']
  ),
  
  (
    'Crypto Wallet Security Best Practices',
    'Write an in-depth security guide for crypto users covering hardware wallets, seed phrase management, phishing prevention, safe dApp interactions, multi-sig setups, and recovery strategies. Include real attack case studies and prevention tips.',
    'Content',
    'Easy',
    85,
    'active',
    ARRAY['Security awareness', 'Clear writing for beginners', 'Visual guides/infographics', '2000+ words', 'Actionable checklist']
  ),
  
  (
    'Institutional Crypto Adoption Report',
    'Research and document how institutions are adopting cryptocurrency: custody solutions, regulatory compliance, investment vehicles (ETFs, futures), corporate treasury strategies. Include interviews or quotes from industry reports.',
    'Content',
    'Hard',
    240,
    'active',
    ARRAY['Financial industry knowledge', 'Research and fact-checking', 'Professional writing', '4000+ words with citations', 'Charts showing adoption trends']
  ),
  
  -- === DEVELOPMENT QUESTS (2) ===
  
  (
    'Gasless Transaction Relayer',
    'Build a meta-transaction relayer service that sponsors gas fees for users. Implement EIP-2771 compatible contracts, create a relayer backend, build simple frontend interface, and include rate limiting and anti-abuse mechanisms.',
    'Development',
    'Hard',
    410,
    'active',
    ARRAY['EIP-2771 / meta-transactions', 'Backend infrastructure (Node.js)', 'Smart contract development', 'API design', 'Rate limiting implementation', 'Testnet deployment']
  ),
  
  (
    'NFT Rarity Score Calculator',
    'Develop a rarity calculator for NFT collections that analyzes trait frequencies and calculates rarity scores. Build web interface for uploading collection metadata, display rarity rankings, and export results. Support ERC-721 and ERC-1155.',
    'Development',
    'Medium',
    215,
    'active',
    ARRAY['NFT metadata standards', 'Rarity calculation algorithms', 'Frontend (React/Vue)', 'File upload handling', 'Data visualization']
  );

-- Verify the insertion
SELECT 
  category,
  difficulty,
  COUNT(*) as quest_count,
  AVG(reward) as avg_reward
FROM quests
WHERE status = 'active'
GROUP BY category, difficulty
ORDER BY category, 
  CASE difficulty 
    WHEN 'Easy' THEN 1 
    WHEN 'Medium' THEN 2 
    WHEN 'Hard' THEN 3 
  END;

-- Show total active quests
SELECT COUNT(*) as total_active_quests FROM quests WHERE status = 'active';
