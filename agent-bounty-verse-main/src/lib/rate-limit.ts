/**
 * Client-side rate limiting utilities
 */

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

class RateLimiter {
  private requests: Map<string, number[]> = new Map();

  check(key: string, config: RateLimitConfig): boolean {
    const now = Date.now();
    const requests = this.requests.get(key) || [];
    
    // Remove expired requests
    const validRequests = requests.filter(
      (timestamp) => now - timestamp < config.windowMs
    );
    
    // Check if limit exceeded
    if (validRequests.length >= config.maxRequests) {
      return false;
    }
    
    // Add new request
    validRequests.push(now);
    this.requests.set(key, validRequests);
    
    return true;
  }

  reset(key: string): void {
    this.requests.delete(key);
  }
}

export const rateLimiter = new RateLimiter();

export const RATE_LIMITS = {
  WALLET_CONNECT: { maxRequests: 3, windowMs: 60000 }, // 3 per minute
  QUEST_DEPLOY: { maxRequests: 5, windowMs: 300000 }, // 5 per 5 minutes
  API_CALL: { maxRequests: 30, windowMs: 60000 }, // 30 per minute
};
