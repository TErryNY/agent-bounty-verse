/**
 * Environment variable validation and type-safe access
 */

interface EnvConfig {
  MODE: string;
  DEV: boolean;
  PROD: boolean;
  SUPABASE_URL?: string;
  SUPABASE_PUBLISHABLE_KEY?: string;
  SUPABASE_PROJECT_ID?: string;
}

function getEnv(): EnvConfig {
  return {
    MODE: import.meta.env.MODE || "development",
    DEV: import.meta.env.DEV || false,
    PROD: import.meta.env.PROD || false,
    SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    SUPABASE_PROJECT_ID: import.meta.env.VITE_SUPABASE_PROJECT_ID,
  };
}

export const env = getEnv();

/**
 * Validates required environment variables on app startup
 * @throws Error if required variables are missing
 */
export function validateEnv(): void {
  const required: string[] = [
    "VITE_SUPABASE_URL",
    "VITE_SUPABASE_PUBLISHABLE_KEY",
    "VITE_SUPABASE_PROJECT_ID"
  ];

  const missing = required.filter((key) => !import.meta.env[key]);

  if (missing.length > 0) {
    const errorMessage = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ CONFIGURATION ERROR: Missing Environment Variables
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The following required environment variables are not configured:
${missing.map(key => `  • ${key}`).join('\n')}

🔧 HOW TO FIX:

For Local Development:
  1. Create a .env file in the project root
  2. Copy the contents from .env.example
  3. Add your Supabase credentials

For Vercel Deployment:
  1. Go to your project in Vercel Dashboard
  2. Navigate to Settings → Environment Variables
  3. Add each missing variable with its value
  4. Select all environments (Production, Preview, Development)
  5. Redeploy your application

📚 See DEPLOYMENT.md for detailed instructions.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();

    console.error(errorMessage);
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }

  console.log("✅ Environment validation passed");
}
