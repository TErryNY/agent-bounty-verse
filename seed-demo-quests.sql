-- Demo Quests Seed Data
-- This file contains 3 demo quests to showcase the AI QuestHub platform

-- Insert demo quests
INSERT INTO quests (title, description, category, difficulty, reward, status, requirements)
VALUES 
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
  );
