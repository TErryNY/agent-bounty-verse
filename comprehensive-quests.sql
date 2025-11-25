-- Comprehensive Quest Collection for AI QuestHub
-- This script adds 25+ diverse quests across all categories
-- Run this in Supabase SQL Editor

INSERT INTO quests (title, description, category, difficulty, reward, status, requirements)
VALUES 
  -- === ANALYTICS QUESTS (10) ===
  
  (
    'Cross-Chain DEX Volume Analysis',
    'Analyze trading volumes across major DEXes on Ethereum, BSC, Polygon, and Arbitrum. Identify liquidity migration patterns, compare fee structures, and highlight the most efficient trading routes for popular token pairs. Create interactive dashboards with 90-day historical data.',
    'Analytics',
    'Hard',
    280,
    'active',
    ARRAY['Multi-chain RPC access', 'DEX API integration', 'Data aggregation skills', 'Tableau/PowerBI or Python visualization']
  ),
  
  (
    'MEV Bot Activity Tracker',
    'Monitor and analyze MEV (Maximal Extractable Value) bot activities on Ethereum mainnet. Identify sandwich attacks, arbitrage opportunities, and liquidation patterns. Quantify total MEV extracted per day and categorize strategies used.',
    'Analytics',
    'Hard',
    350,
    'active',
    ARRAY['Understanding of MEV mechanics', 'Mempool monitoring tools', 'Transaction trace analysis', 'Flashbots knowledge']
  ),
  
  (
    'Stablecoin Depeg Monitor',
    'Build a real-time monitoring system for stablecoin price deviations. Track USDT, USDC, DAI, FRAX across multiple exchanges. Alert when prices deviate more than 0.5% from peg. Include historical depeg events analysis.',
    'Analytics',
    'Medium',
    160,
    'active',
    ARRAY['Exchange API integration', 'Real-time data streaming', 'Statistical alerting', 'Price feed aggregation']
  ),
  
  (
    'DAO Treasury Health Dashboard',
    'Analyze treasuries of top 10 DAOs. Track asset composition, runway calculations, diversification metrics, and spending patterns. Provide recommendations for treasury optimization and risk mitigation.',
    'Analytics',
    'Medium',
    190,
    'active',
    ARRAY['Blockchain data extraction', 'Financial modeling', 'DAO governance understanding', 'Excel or data analysis tools']
  ),
  
  (
    'Whale Wallet Movement Tracking',
    'Monitor top 100 Ethereum wallets for large transactions. Identify patterns in accumulation/distribution phases. Create alerts for significant movements (>$1M transactions) and correlate with market impacts.',
    'Analytics',
    'Medium',
    175,
    'active',
    ARRAY['Etherscan API', 'Pattern recognition', 'Real-time monitoring', 'Market correlation analysis']
  ),
  
  (
    'Gas Fee Prediction Model',
    'Develop a machine learning model to predict Ethereum gas prices for the next 24 hours. Use historical gas data, pending transactions, and day-of-week patterns. Achieve >80% accuracy in predictions.',
    'Analytics',
    'Hard',
    320,
    'active',
    ARRAY['Python/R programming', 'Machine learning (LSTM/Prophet)', 'Historical gas data access', 'Model evaluation skills']
  ),
  
  (
    'Crypto Exchange Reserves Analysis',
    'Track Bitcoin and Ethereum reserves on major centralized exchanges (Binance, Coinbase, Kraken). Identify reserve trends, correlate with price movements, and detect unusual withdrawals/deposits.',
    'Analytics',
    'Easy',
    90,
    'active',
    ARRAY['Exchange wallet identification', 'Blockchain data queries', 'Time-series analysis', 'Basic charting']
  ),
  
  (
    'NFT Wash Trading Detection',
    'Analyze NFT transaction patterns to identify potential wash trading. Look for circular transactions, self-dealing, and artificial volume inflation. Generate reports flagging suspicious collections.',
    'Analytics',
    'Hard',
    290,
    'active',
    ARRAY['NFT marketplace data', 'Graph analysis', 'Pattern detection algorithms', 'Wallet clustering techniques']
  ),
  
  (
    'Crypto Correlation Matrix Builder',
    'Build a correlation matrix showing price relationships between top 50 cryptocurrencies. Update daily. Identify highly correlated pairs and sector trends (DeFi, Layer1, Layer2, etc.).',
    'Analytics',
    'Easy',
    70,
    'active',
    ARRAY['Price data APIs', 'Statistical correlation', 'Matrix visualization', 'Python/R basics']
  ),
  
  (
    'DeFi TVL Tracker by Chain',
    'Track Total Value Locked (TVL) across all major chains and protocols. Create breakdowns by category (DEX, Lending, Yield), identify TVL migration patterns, and highlight fastest-growing protocols.',
    'Analytics',
    'Medium',
    140,
    'active',
    ARRAY['DeFiLlama API or similar', 'Data aggregation', 'Trend analysis', 'Dashboard creation']
  ),
  
  -- === CONTENT QUESTS (8) ===
  
  (
    'Zero-Knowledge Proofs Explainer',
    'Write a beginner-friendly guide to zero-knowledge proofs. Explain zk-SNARKs vs zk-STARKs, use cases in blockchains (Zcash, zkSync, StarkNet), and why they matter for privacy and scaling. Include visual diagrams.',
    'Content',
    'Medium',
    130,
    'active',
    ARRAY['Understanding of cryptography basics', 'Clear writing for non-technical audience', 'Diagram creation tools', '2500+ words']
  ),
  
  (
    'Crypto Regulatory Landscape Report',
    'Research and document current cryptocurrency regulations across US, EU, Asia, and emerging markets. Highlight key differences, upcoming legislation (MiCA, stablecoin bills), and compliance requirements.',
    'Content',
    'Hard',
    220,
    'active',
    ARRAY['Legal research skills', 'Global regulatory awareness', 'Structured documentation', '4000+ words with citations']
  ),
  
  (
    'Smart Contract Design Patterns Guide',
    'Create a comprehensive guide to Solidity design patterns: proxy patterns, factory patterns, pull-over-push, checks-effects-interactions. Include code examples, gas comparisons, and security considerations.',
    'Content',
    'Medium',
    150,
    'active',
    ARRAY['Solidity programming', 'Technical writing', 'Code documentation', 'Security awareness']
  ),
  
  (
    'DeFi Yield Farming Strategy Comparison',
    'Compare and explain different yield farming strategies: single-asset staking, LP provision, leveraged farming, auto-compounding vaults. Include risk levels, historical APY ranges, and impermanent loss calculations.',
    'Content',
    'Easy',
    95,
    'active',
    ARRAY['DeFi protocol knowledge', 'Financial calculations', 'Clear explanations', '2000+ words with tables']
  ),
  
  (
    'Blockchain Consensus Mechanisms Deep Dive',
    'Explain different consensus mechanisms: PoW, PoS, DPoS, PoA, Byzantine Fault Tolerance. Compare energy consumption, security models, decentralization trade-offs, and which chains use each.',
    'Content',
    'Easy',
    85,
    'active',
    ARRAY['Blockchain fundamentals', 'Comparative analysis', 'Technical accuracy', 'Clear diagrams']
  ),
  
  (
    'MEV Protection Guide for Users',
    'Write a practical guide on protecting against MEV attacks. Cover private RPCs, Flashbots Protect, MEV-blocker solutions, and best practices for traders. Include step-by-step setup instructions.',
    'Content',
    'Easy',
    75,
    'active',
    ARRAY['MEV understanding', 'User-focused writing', 'How-to guide experience', 'Screenshots/examples']
  ),
  
  (
    'Crypto Tax Guide 2024',
    'Create a comprehensive tax guide for crypto investors covering: taxable events, cost basis calculation, staking rewards, airdrops, NFT sales, and reporting requirements. Focus on US, EU, and UK.',
    'Content',
    'Hard',
    250,
    'active',
    ARRAY['Tax regulation knowledge', 'Accounting basics', 'Clear examples', 'Legal disclaimer inclusion']
  ),
  
  (
    'Account Abstraction (ERC-4337) Tutorial',
    'Explain Ethereum account abstraction: what it is, how it improves UX, gasless transactions, social recovery, bundlers, and paymasters. Include developer implementation examples.',
    'Content',
    'Medium',
    165,
    'active',
    ARRAY['ERC-4337 understanding', 'Technical + UX perspective', 'Code examples', '3000+ words']
  ),
  
  -- === DEVELOPMENT QUESTS (10) ===
  
  (
    'NFT Marketplace Smart Contract',
    'Develop a complete NFT marketplace contract with: listing, buying, bidding, royalties, and lazy minting. Include comprehensive tests, gas optimizations, and security best practices. Deploy to testnet.',
    'Development',
    'Hard',
    450,
    'active',
   ARRAY['Advanced Solidity', 'ERC-721/ERC-1155 standards', 'Hardhat/Foundry', 'Security audit mindset', '100% test coverage']
  ),
  
  (
    'Automated Portfolio Rebalancer',
    'Build a tool that automatically rebalances crypto portfolios based on target allocations. Support multiple exchanges via API. Include backtesting, dry-run mode, and configurable rebalancing triggers.',
    'Development',
    'Hard',
    380,
    'active',
    ARRAY['Exchange API integration', 'Portfolio management logic', 'Python/Node.js', 'Database for state management']
  ),
  
  (
    'Flash Loan Arbitrage Bot',
    'Create a flash loan arbitrage bot that identifies and executes profitable trades across DEXes. Must handle gas estimation, slippage protection, and revert on unprofitable trades. Testnet deployment required.',
    'Development',
    'Hard',
    420,
    'active',
    ARRAY['Solidity + Web3 integration', 'DEX aggregation', 'Flash loan protocols (Aave/dYdX)', 'Profit calculation algorithms']
  ),
  
  (
    'DAO Voting Dashboard',
    'Build a real-time dashboard showing active governance proposals across major DAOs. Display vote counts, time remaining, proposal details, and delegate voting patterns. Integrate Snapshot and on-chain governance.',
    'Development',
    'Medium',
    210,
    'active',
    ARRAY['GraphQL (Snapshot API)', 'Web3 for on-chain data', 'React/Vue.js', 'Data aggregation']
  ),
  
  (
    'Multisig Wallet with Time-Lock',
    'Develop a multisig wallet smart contract with time-lock functionality. Support multiple owners, configurable thresholds, transaction queuing, and cancellation. Include frontend interface.',
    'Development',
    'Hard',
    370,
    'active',
    ARRAY['Solidity security patterns', 'Smart contract testing', 'Frontend (React + Web3)', 'Time-lock mechanics']
  ),
  
  (
    'Token Vesting Contract Suite',
    'Create a flexible token vesting system supporting: cliff periods, linear vesting, milestone-based release, and revocation. Include admin dashboard and beneficiary claim interface.',
    'Development',
    'Medium',
    240,
    'active',
    ARRAY['Solidity', 'Vesting logic implementation', 'Frontend development', 'Time-based calculations']
  ),
  
  (
    'Cross-Chain Bridge Monitor',
    'Build a monitoring tool for popular cross-chain bridges (Stargate, Wormhole, Polygon Bridge). Track transaction status, fees, and identify stuck/failed transfers. Include notification system.',
    'Development',
    'Medium',
    195,
    'active',
    ARRAY['Multi-chain development', 'Bridge protocol APIs', 'WebSocket for real-time', 'Error detection logic']
  ),
  
  (
    'Crypto Payment Gateway',
    'Develop a payment gateway that merchants can integrate to accept crypto payments. Support multiple tokens, automatic fiat conversion quotes, webhook notifications, and payment confirmations.',
    'Development',
    'Hard',
    390,
    'active',
    ARRAY['Payment processing logic', 'Web3 integration', 'API development', 'Database design', 'Merchant SDK']
  ),
  
  (
    'On-Chain Options Protocol',
    'Create a simple options trading protocol for ERC-20 tokens. Implement call/put options, automated exercise on expiry, collateral management, and liquidation mechanisms. Testnet deployment.',
    'Development',
    'Hard',
    480,
    'active',
    ARRAY['Advanced DeFi mechanics', 'Options pricing knowledge', 'Solidity + Hardhat', 'Comprehensive testing', 'Oracle integration']
  ),
  
  (
    'Social Recovery Wallet',
    'Build a smart contract wallet with social recovery. Allow users to designate guardians who can recover the wallet if private key is lost. Include guardian threshold and recovery delay.',
    'Development',
    'Medium',
    220,
    'active',
    ARRAY['Solidity', 'Account abstraction concepts', 'Frontend (wallet interface)', 'Guardian management logic']
  );

-- Verify the insertion
SELECT 
  category,
  difficulty,
  COUNT(*) as quest_count,
  AVG(reward) as avg_reward,
  MIN(reward) as min_reward,
  MAX(reward) as max_reward
FROM quests
WHERE status = 'active'
GROUP BY category, difficulty
ORDER BY category, 
  CASE difficulty 
    WHEN 'Easy' THEN 1 
    WHEN 'Medium' THEN 2 
    WHEN 'Hard' THEN 3 
  END;

-- Show total count
SELECT COUNT(*) as total_active_quests FROM quests WHERE status = 'active';
