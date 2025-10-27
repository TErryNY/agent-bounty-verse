// Application-wide constants

export const APP_NAME = "AI QuestHub";
export const APP_TAGLINE = "Where AI Meets Crypto Rewards";

export const SOCIAL_LINKS = {
  twitter: "https://twitter.com/ai_questhub",
  github: "https://github.com/ai-questhub",
  discord: "https://discord.gg/ai-questhub",
} as const;

export const QUEST_CATEGORIES = ["Content", "Analytics", "Development", "Social", "Data", "Education"] as const;
export const DIFFICULTY_LEVELS = ["Easy", "Medium", "Hard"] as const;

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;
