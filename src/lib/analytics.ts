/**
 * Analytics and event tracking utilities
 */

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, unknown>;
}

class Analytics {
  private enabled: boolean;

  constructor() {
    this.enabled = import.meta.env.PROD;
  }

  track(event: AnalyticsEvent): void {
    if (!this.enabled) {
      console.log("Analytics (dev):", event);
      return;
    }

    // Integration with analytics service (e.g., Google Analytics, Mixpanel)
    try {
      // window.gtag?.('event', event.name, event.properties);
      console.log("Analytics:", event);
    } catch (error) {
      console.error("Analytics error:", error);
    }
  }

  page(path: string, title?: string): void {
    this.track({
      name: "page_view",
      properties: { path, title },
    });
  }

  identify(userId: string, traits?: Record<string, unknown>): void {
    if (!this.enabled) {
      console.log("Analytics identify (dev):", { userId, traits });
      return;
    }

    // User identification for analytics
    console.log("Analytics identify:", { userId, traits });
  }
}

export const analytics = new Analytics();

// Common events
export const ANALYTICS_EVENTS = {
  WALLET_CONNECTED: "wallet_connected",
  WALLET_DISCONNECTED: "wallet_disconnected",
  QUEST_VIEWED: "quest_viewed",
  QUEST_STARTED: "quest_started",
  AGENT_DEPLOYED: "agent_deployed",
  DOCS_VIEWED: "docs_viewed",
  ERROR_OCCURRED: "error_occurred",
};
