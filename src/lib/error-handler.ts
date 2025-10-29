/**
 * Global error handling utilities
 */

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function handleApiError(error: unknown): string {
  if (error instanceof AppError) {
    return error.message;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === "string") {
    return error;
  }
  
  return "An unexpected error occurred. Please try again.";
}

export function logError(error: unknown, context?: Record<string, unknown>): void {
  if (import.meta.env.DEV) {
    console.error("Error:", error);
    if (context) {
      console.error("Context:", context);
    }
  }
  
  // In production, send to error tracking service (e.g., Sentry)
}
