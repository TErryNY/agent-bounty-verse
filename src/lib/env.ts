/**
 * Environment variable validation and type-safe access
 */

interface EnvConfig {
  MODE: string;
  DEV: boolean;
  PROD: boolean;
}

function getEnv(): EnvConfig {
  return {
    MODE: import.meta.env.MODE || "development",
    DEV: import.meta.env.DEV || false,
    PROD: import.meta.env.PROD || false,
  };
}

export const env = getEnv();

/**
 * Validates required environment variables on app startup
 */
export function validateEnv(): void {
  const required: string[] = [];
  
  const missing = required.filter((key) => !import.meta.env[key]);
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }
}
