import { useEffect } from "react";
import { logger } from "@/lib/logger";

/**
 * Hook to monitor and report performance metrics
 */
export function usePerformance(componentName: string) {
  useEffect(() => {
    if (!import.meta.env.PROD) return;

    // Performance observer for component metrics
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Log performance metrics in production
        logger.info(`${componentName} - ${entry.name}:`, entry.duration);
      }
    });

    observer.observe({ entryTypes: ["measure", "navigation"] });

    return () => observer.disconnect();
  }, [componentName]);
}

/**
 * Measure the performance of an async operation
 */
export async function measureAsync<T>(
  name: string,
  fn: () => Promise<T>
): Promise<T> {
  const start = performance.now();
  try {
    const result = await fn();
    const duration = performance.now() - start;
    logger.info(`${name} completed in ${duration.toFixed(2)}ms`);
    return result;
  } catch (error) {
    const duration = performance.now() - start;
    logger.error(`${name} failed after ${duration.toFixed(2)}ms`, error);
    throw error;
  }
}


