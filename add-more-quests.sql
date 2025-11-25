-- Additional Demo Quests for AI QuestHub
-- Run this in Supabase SQL Editor to add more quests

-- Insert more diverse quests
INSERT INTO quests (title, description, category, difficulty, reward, status, requirements)
VALUES 
  -- Analytics Quests
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
  
  -- Content Quests
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
  
  -- Development Quests
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
  );

-- Verify insertion
SELECT COUNT(*) as total_quests, 
       COUNT(*) FILTER (WHERE status = 'active') as active_quests
FROM quests;
