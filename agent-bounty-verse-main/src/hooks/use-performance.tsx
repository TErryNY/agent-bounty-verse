import { useEffect } from "react";

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
        console.log(`${componentName} - ${entry.name}:`, entry.duration);
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
    console.log(`${name} completed in ${duration.toFixed(2)}ms`);
    return result;
  } catch (error) {
    const duration = performance.now() - start;
    console.error(`${name} failed after ${duration.toFixed(2)}ms`, error);
    throw error;
  }
}

/**
 * Report Web Vitals metrics
 */
export function reportWebVitals() {
  if ("web-vital" in window) {
    // Report Core Web Vitals
    const reportMetric = (metric: any) => {
      console.log(metric.name, metric.value);
      // Send to analytics service in production
    };

    // This would typically use the web-vitals library
    // import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';
    // getCLS(reportMetric);
    // getFID(reportMetric);
    // getFCP(reportMetric);
    // getLCP(reportMetric);
    // getTTFB(reportMetric);
  }
}
