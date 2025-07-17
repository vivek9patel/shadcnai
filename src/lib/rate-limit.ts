import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const rateLimiters = {
  themeGeneration: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "10 m"),
    analytics: true,
    prefix: "theme-generator:theme-generation",
  }),

  api: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(60, "1 m"),
    analytics: true,
    prefix: "theme-generator:api",
  }),
};

export type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
};

/**
 * Check rate limit for theme generation endpoint
 * @param identifier - Usually IP address or user ID
 * @returns Rate limit result
 */
export async function checkThemeGenerationRateLimit(
  identifier: string
): Promise<RateLimitResult> {
  // Skip rate limiting in development environment
  if (process.env.NODE_ENV === "development") {
    return {
      success: true,
      limit: 10,
      remaining: 10,
      reset: Date.now() + 600000, // 10 minutes from now
    };
  }

  const result = await rateLimiters.themeGeneration.limit(identifier);
  return result;
}

/**
 * Check general API rate limit
 * @param identifier - Usually IP address or user ID
 * @returns Rate limit result
 */
export async function checkApiRateLimit(
  identifier: string
): Promise<RateLimitResult> {
  // Skip rate limiting in development environment
  if (process.env.NODE_ENV === "development") {
    return {
      success: true,
      limit: 60,
      remaining: 60,
      reset: Date.now() + 60000, // 1 minute from now
    };
  }

  const result = await rateLimiters.api.limit(identifier);
  return result;
}

/**
 * Get client IP address from request headers
 * @param request - Next.js request object
 * @returns IP address
 */
export function getClientIP(request: Request): string {
  // Check various headers for IP address
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const cfConnectingIP = request.headers.get("cf-connecting-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  if (realIP) {
    return realIP.trim();
  }

  if (cfConnectingIP) {
    return cfConnectingIP.trim();
  }

  return "johndoe";
}
