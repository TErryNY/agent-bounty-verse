/**
 * Quest Step Generators
 * 
 * Auto-generates actionable walkthrough steps from quest requirements
 * based on quest category and difficulty level.
 */

export interface QuestStep {
    id: string;
    title: string;
    description: string;
    resources?: { title: string; url: string }[];
    estimatedTime?: string;
    tips?: string[];
}

export interface Quest {
    id: string;
    title: string;
    description: string;
    category: string;
    difficulty: string;
    requirements: string[] | null;
    quest_steps?: QuestStep[] | null;
}

/**
 * Generate walkthrough steps for Analytics quests
 */
function generateAnalyticsSteps(quest: Quest): QuestStep[] {
    const requirements = quest.requirements || [];
    const steps: QuestStep[] = [];

    // Step 1: Setup and API Access
    if (requirements.some(r => r.toLowerCase().includes('api'))) {
        steps.push({
            id: '1',
            title: 'Set Up API Access',
            description: 'Obtain necessary API keys and credentials for data sources',
            resources: [
                { title: 'CoinGecko API', url: 'https://www.coingecko.com/en/api' },
                { title: 'Etherscan API', url: 'https://etherscan.io/apis' },
            ],
            estimatedTime: '30 minutes',
            tips: [
                'Most APIs offer free tiers - start there',
                'Store API keys securely in environment variables',
            ],
        });
    }

    // Step 2: Data Collection
    steps.push({
        id: String(steps.length + 1),
        title: 'Collect Required Data',
        description: 'Gather all necessary data points based on quest requirements',
        estimatedTime: '1-2 hours',
        tips: [
            'Use scripts to automate data collection',
            'Verify data quality before analysis',
            'Save raw data for reproducibility',
        ],
    });

    // Step 3: Data Analysis
    steps.push({
        id: String(steps.length + 1),
        title: 'Analyze Data',
        description: 'Process and analyze collected data to extract insights',
        resources: [
            { title: 'Python Pandas Tutorial', url: 'https://pandas.pydata.org/docs/getting_started/intro_tutorials/index.html' },
        ],
        estimatedTime: '2-3 hours',
        tips: [
            'Document your methodology',
            'Look for patterns and anomalies',
            'Cross-reference multiple data sources',
        ],
    });

    // Step 4: Visualization
    if (requirements.some(r => r.toLowerCase().includes('visual') || r.toLowerCase().includes('chart'))) {
        steps.push({
            id: String(steps.length + 1),
            title: 'Create Visualizations',
            description: 'Build charts, graphs, and dashboards to present findings',
            resources: [
                { title: 'Chart.js', url: 'https://www.chartjs.org/' },
                { title: 'Matplotlib Gallery', url: 'https://matplotlib.org/stable/gallery/index.html' },
            ],
            estimatedTime: '1-2 hours',
            tips: [
                'Choose appropriate chart types for your data',
                'Use clear labels and legends',
                'Keep visualizations simple and focused',
            ],
        });
    }

    // Final Step: Report
    steps.push({
        id: String(steps.length + 1),
        title: 'Write Summary Report',
        description: 'Document your findings, methodology, and recommendations',
        estimatedTime: '1 hour',
        tips: [
            'Include executive summary at the top',
            'Present data-driven insights',
            'Provide actionable recommendations',
        ],
    });

    return steps;
}

/**
 * Generate walkthrough steps for Content quests
 */
function generateContentSteps(quest: Quest): QuestStep[] {
    const requirements = quest.requirements || [];
    const steps: QuestStep[] = [];

    // Step 1: Research
    steps.push({
        id: '1',
        title: 'Research Topic',
        description: 'Gather information and understand the subject matter thoroughly',
        resources: [
            { title: 'Ethereum.org Docs', url: 'https://ethereum.org/en/developers/docs/' },
            { title: 'CoinDesk', url: 'https://www.coindesk.com/' },
        ],
        estimatedTime: '2-3 hours',
        tips: [
            'Use multiple reliable sources',
            'Take notes and bookmark references',
            'Verify facts with primary sources',
        ],
    });

    // Step 2: Outline
    steps.push({
        id: '2',
        title: 'Create Content Outline',
        description: 'Structure your content with clear sections and flow',
        estimatedTime: '30 minutes',
        tips: [
            'Start with introduction and conclusion',
            'Organize main points logically',
            'Plan for examples and visuals',
        ],
    });

    // Step 3: Draft
    steps.push({
        id: '3',
        title: 'Write First Draft',
        description: 'Write your content following the outline',
        estimatedTime: '2-4 hours',
        tips: [
            'Don\'t worry about perfection in first draft',
            'Focus on clarity over complexity',
            'Use active voice and short sentences',
        ],
    });

    // Step 4: Visuals
    if (requirements.some(r => r.toLowerCase().includes('diagram') || r.toLowerCase().includes('visual'))) {
        steps.push({
            id: String(steps.length + 1),
            title: 'Add Diagrams and Visuals',
            description: 'Create supporting visuals to enhance understanding',
            resources: [
                { title: 'Excalidraw', url: 'https://excalidraw.com/' },
                { title: 'Canva', url: 'https://www.canva.com/' },
            ],
            estimatedTime: '1-2 hours',
        });
    }

    // Step 5: Edit and Proofread
    steps.push({
        id: String(steps.length + 1),
        title: 'Edit and Proofread',
        description: 'Review for clarity, accuracy, grammar, and formatting',
        estimatedTime: '1 hour',
        tips: [
            'Read aloud to catch awkward phrasing',
            'Use grammar checking tools',
            'Have someone else review if possible',
        ],
    });

    // Step 6: Format and Submit
    steps.push({
        id: String(steps.length + 1),
        title: 'Format and Submit',
        description: 'Apply final formatting and submit your work',
        estimatedTime: '30 minutes',
        tips: [
            'Use Markdown for web content',
            'Check all links work',
            'Verify images display correctly',
        ],
    });

    return steps;
}

/**
 * Generate walkthrough steps for Development quests
 */
function generateDevelopmentSteps(quest: Quest): QuestStep[] {
    const requirements = quest.requirements || [];
    const steps: QuestStep[] = [];

    // Step 1: Setup
    steps.push({
        id: '1',
        title: 'Set Up Development Environment',
        description: 'Initialize project and install required dependencies',
        resources: [
            { title: 'Node.js', url: 'https://nodejs.org/' },
            { title: 'Git', url: 'https://git-scm.com/' },
        ],
        estimatedTime: '30 minutes',
        tips: [
            'Use the latest LTS version of Node.js',
            'Initialize git repository early',
            'Create .gitignore file',
        ],
    });

    // Step 2: Install Dependencies
    if (requirements.some(r => r.toLowerCase().includes('react') || r.toLowerCase().includes('web3'))) {
        steps.push({
            id: '2',
            title: 'Install Required Libraries',
            description: 'Install Web3, React, and other necessary packages',
            resources: [
                { title: 'ethers.js Docs', url: 'https://docs.ethers.org/' },
                { title: 'React Docs', url: 'https://react.dev/' },
            ],
            estimatedTime: '15 minutes',
        });
    }

    // Step 3: Core Functionality
    steps.push({
        id: String(steps.length + 1),
        title: 'Implement Core Functionality',
        description: 'Build the main features as specified in requirements',
        estimatedTime: '4-8 hours',
        tips: [
            'Start with the simplest version',
            'Test each feature as you build',
            'Commit working code frequently',
        ],
    });

    // Step 4: Smart Contracts (if applicable)
    if (requirements.some(r => r.toLowerCase().includes('solidity') || r.toLowerCase().includes('contract'))) {
        steps.push({
            id: String(steps.length + 1),
            title: 'Write and Test Smart Contracts',
            description: 'Develop Solidity contracts with comprehensive tests',
            resources: [
                { title: 'Solidity Docs', url: 'https://docs.soliditylang.org/' },
                { title: 'Hardhat', url: 'https://hardhat.org/' },
            ],
            estimatedTime: '6-10 hours',
            tips: [
                'Write tests before implementing',
                'Use security best practices',
                'Check for common vulnerabilities',
            ],
        });
    }

    // Step 5: UI Implementation
    steps.push({
        id: String(steps.length + 1),
        title: 'Build User Interface',
        description: 'Create a clean, responsive UI for your application',
        estimatedTime: '3-5 hours',
        tips: [
            'Mobile-first responsive design',
            'Clear error messages',
            'Loading states for async operations',
        ],
    });

    // Step 6: Testing
    steps.push({
        id: String(steps.length + 1),
        title: 'Test on Testnet',
        description: 'Deploy and test thoroughly on testnet before submission',
        resources: [
            { title: 'Sepolia Faucet', url: 'https://sepoliafaucet.com/' },
        ],
        estimatedTime: '2-3 hours',
        tips: [
            'Test all user flows',
            'Handle edge cases',
            'Check gas costs',
        ],
    });

    // Step 7: Documentation
    steps.push({
        id: String(steps.length + 1),
        title: 'Write Documentation',
        description: 'Document setup, usage, and code architecture',
        estimatedTime: '1-2 hours',
        tips: [
            'Include installation instructions',
            'Add screenshots/demo video',
            'Document known limitations',
        ],
    });

    // Step 8: Deploy and Submit
    steps.push({
        id: String(steps.length + 1),
        title: 'Deploy and Submit',
        description: 'Deploy your project and submit deliverables',
        estimatedTime: '1 hour',
        tips: [
            'Test deployed version',
            'Provide live demo link',
            'Include source code repository',
        ],
    });

    return steps;
}

/**
 * Main function to generate quest steps based on category
 */
export function generateQuestSteps(quest: Quest): QuestStep[] {
    // If quest has predefined steps, use those
    if (quest.quest_steps && quest.quest_steps.length > 0) {
        return quest.quest_steps;
    }

    // Otherwise, auto-generate based on category
    switch (quest.category) {
        case 'Analytics':
            return generateAnalyticsSteps(quest);
        case 'Content':
            return generateContentSteps(quest);
        case 'Development':
            return generateDevelopmentSteps(quest);
        default:
            // Generic fallback steps
            return generateGenericSteps(quest);
    }
}

/**
 * Generic fallback step generator
 */
function generateGenericSteps(quest: Quest): QuestStep[] {
    const requirements = quest.requirements || [];

    return [
        {
            id: '1',
            title: 'Review Requirements',
            description: 'Read through all quest requirements carefully',
            estimatedTime: '15 minutes',
        },
        {
            id: '2',
            title: 'Plan Your Approach',
            description: 'Create a plan for completing each requirement',
            estimatedTime: '30 minutes',
        },
        {
            id: '3',
            title: 'Complete Tasks',
            description: 'Work through each requirement systematically',
            estimatedTime: 'Varies',
        },
        {
            id: '4',
            title: 'Review and Submit',
            description: 'Verify all requirements are met and submit your work',
            estimatedTime: '30 minutes',
        },
    ];
}

/**
 * Calculate total estimated time for all steps
 */
export function calculateTotalTime(steps: QuestStep[]): string {
    const times = steps
        .map(s => s.estimatedTime)
        .filter((t): t is string => !!t);

    if (times.length === 0) return 'Varies';

    // Simple heuristic: sum up max hours mentioned
    let totalMinutes = 0;
    times.forEach(time => {
        const match = time.match(/(\d+)(?:-(\d+))?\s*(hour|minute)/i);
        if (match) {
            const max = parseInt(match[2] || match[1]);
            const unit = match[3].toLowerCase();
            totalMinutes += unit === 'hour' ? max * 60 : max;
        }
    });

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return hours > 0
        ? `${hours}-${hours + 2} hours`
        : `${minutes} minutes`;
}
