import { Redis } from "@upstash/redis";

// ─── Singleton Redis Client ─────────────────────────────────────────────────
// Uses Upstash REST-based Redis (no persistent connections needed).
// If env vars are missing, all cache operations gracefully return null/void
// so the app continues to work without caching.

let redis: Redis | null = null;

function getRedisClient(): Redis | null {
  if (redis) return redis;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "⚠️ [Redis] UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN not set. Caching disabled.",
      );
    }
    return null;
  }

  redis = new Redis({ url, token });
  return redis;
}

export { getRedisClient };

// ─── Cache Utility Functions ────────────────────────────────────────────────

/** Default TTL in seconds (5 minutes) */
const DEFAULT_TTL = 300;

/**
 * Get a cached value by key.
 * Returns null if cache miss or Redis unavailable.
 */
export async function cacheGet<T>(key: string): Promise<T | null> {
  try {
    const client = getRedisClient();
    if (!client) return null;

    const data = await client.get<T>(key);
    return data;
  } catch (error) {
    console.error(`[Redis] Error getting key "${key}":`, error);
    return null;
  }
}

/**
 * Set a cached value with optional TTL.
 * @param key   Cache key
 * @param value Value to cache (will be JSON-serialized by Upstash)
 * @param ttl   Time-to-live in seconds (default: 300s / 5 min)
 */
export async function cacheSet<T>(
  key: string,
  value: T,
  ttl: number = DEFAULT_TTL,
): Promise<void> {
  try {
    const client = getRedisClient();
    if (!client) return;

    await client.set(key, value, { ex: ttl });
  } catch (error) {
    console.error(`[Redis] Error setting key "${key}":`, error);
  }
}

/**
 * Delete a specific cache key.
 */
export async function cacheDel(key: string): Promise<void> {
  try {
    const client = getRedisClient();
    if (!client) return;

    await client.del(key);
  } catch (error) {
    console.error(`[Redis] Error deleting key "${key}":`, error);
  }
}

/**
 * Invalidate all keys matching a prefix pattern.
 * Uses SCAN to find keys (safe for production, non-blocking).
 *
 * Example: invalidateByPrefix("feedback:") clears all feedback caches.
 */
export async function invalidateByPrefix(prefix: string): Promise<void> {
  try {
    const client = getRedisClient();
    if (!client) return;

    let cursor = 0;
    do {
      const result = await client.scan(cursor, {
        match: `${prefix}*`,
        count: 100,
      });
      cursor = Number(result[0]);
      const keys = result[1] as string[];

      if (keys.length > 0) {
        await client.del(...keys);
      }
    } while (cursor !== 0);
  } catch (error) {
    console.error(
      `[Redis] Error invalidating keys with prefix "${prefix}":`,
      error,
    );
  }
}

// ─── Cache Key Constants ────────────────────────────────────────────────────
// Centralized cache key definitions to prevent typos and ensure consistency.

export const CACHE_KEYS = {
  /** All feedbacks list */
  FEEDBACKS: "feedback:all",
  /** Reaction data (count + users) */
  REACTIONS: "reactions:heart",
  /** Feedback count */
  FEEDBACK_COUNT: "feedback:count",
} as const;

// ─── TTL Constants (seconds) ────────────────────────────────────────────────

export const CACHE_TTL = {
  /** Feedbacks: 2 minutes (changes occasionally) */
  FEEDBACKS: 120,
  /** Reactions: 1 minute (can change more often) */
  REACTIONS: 60,
  /** Short TTL for frequently changing data */
  SHORT: 30,
  /** Default TTL */
  DEFAULT: 300,
  /** Long TTL for rarely changing data */
  LONG: 600,
} as const;
