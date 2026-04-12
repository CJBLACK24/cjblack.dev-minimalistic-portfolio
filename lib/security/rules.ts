/**
 * Arcjet Security — Rule Presets
 *
 * Pre-configured rule factories for every Arcjet building block.
 * Import the ones you need and compose them with `aj.withRule(...)`.
 *
 * Features covered:
 *  1. Shield WAF          – applied globally in index.ts
 *  2. Bot Protection      – detectBot
 *  3. Rate Limiting       – tokenBucket / fixedWindow / slidingWindow
 *  4. Email Validation    – validateEmail
 *  5. Sensitive Info       – sensitiveInfo
 *  6. Signup Protection   – validateEmail + detectBot + shield (combo)
 *  7. Prompt Injection    – (coming via AI SDK integration)
 *  8. Filters             – fixedWindow with custom characteristics
 */

import {
  detectBot,
  detectPromptInjection,
  fixedWindow,
  sensitiveInfo,
  slidingWindow,
  tokenBucket,
  validateEmail,
} from "@arcjet/next";

// ────────────────────────────────────────────────────────────────────────────
// 1. BOT PROTECTION
// ────────────────────────────────────────────────────────────────────────────

/** Standard bot detection — allows search engines & monitoring bots. */
export const botProtectionRule = detectBot({
  mode: "LIVE",
  allow: [
    "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc.
    "CATEGORY:MONITOR",       // Uptime monitoring services
    "CATEGORY:PREVIEW",       // Link previews (Slack, Discord, etc.)
  ],
});

/** Strict bot detection — blocks all automated clients. */
export const strictBotProtectionRule = detectBot({
  mode: "LIVE",
  allow: [], // Block every detected bot
});

// ────────────────────────────────────────────────────────────────────────────
// 2. RATE LIMITING
// ────────────────────────────────────────────────────────────────────────────

/** General API rate limit — 60 requests per minute. */
export const generalRateLimitRule = fixedWindow({
  mode: "LIVE",
  window: "1m",
  max: 60,
});

/** Strict rate limit for auth endpoints — 10 requests per minute. */
export const authRateLimitRule = fixedWindow({
  mode: "LIVE",
  window: "1m",
  max: 10,
});

/** Per-user rate limit — 50 requests per minute. */
export const userRateLimitRule = fixedWindow({
  mode: "LIVE",
  window: "1m",
  max: 50,
  characteristics: ["userId"], // We will provide this in the .protect() call
});

/** Token-bucket for AI / chat endpoints — smooth bursts allowed. */
export const aiRateLimitRule = tokenBucket({
  mode: "LIVE",
  refillRate: 5,    // Refill 5 tokens per interval
  interval: 10,     // every 10 seconds
  capacity: 10,     // max 10 tokens
});

/** Sliding-window for contact form submissions — 5 per 10 minutes. */
export const contactFormRateLimitRule = slidingWindow({
  mode: "LIVE",
  interval: "10m",
  max: 5,
});

// ────────────────────────────────────────────────────────────────────────────
// 3. EMAIL VALIDATION
// ────────────────────────────────────────────────────────────────────────────

/** Block disposable, invalid, and domains with no MX records. */
export const emailValidationRule = validateEmail({
  mode: "LIVE",
  deny: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
});

// ────────────────────────────────────────────────────────────────────────────
// 4. SENSITIVE INFORMATION DETECTION
// ────────────────────────────────────────────────────────────────────────────

/**
 * Detect and deny requests that contain PII we don't want to handle.
 * Block: credit cards, phone numbers, SSN-like patterns.
 * Allow: emails (we need those for auth).
 */
export const sensitiveInfoRule = sensitiveInfo({
  mode: "LIVE",
  deny: ["CREDIT_CARD_NUMBER", "PHONE_NUMBER"],
});

/** Stricter variant — also blocks email addresses in free-text fields. */
export const strictSensitiveInfoRule = sensitiveInfo({
  mode: "LIVE",
  deny: ["EMAIL", "CREDIT_CARD_NUMBER", "PHONE_NUMBER"],
});

// ────────────────────────────────────────────────────────────────────────────
// 5. SIGNUP / FORM PROTECTION  (composite)
// ────────────────────────────────────────────────────────────────────────────

/** Signup-specific rate limit — 5 attempts per 10 minutes. */
export const signupRateLimitRule = slidingWindow({
  mode: "LIVE",
  interval: "10m",
  max: 5,
});

// ────────────────────────────────────────────────────────────────────────────
// 6. FILTERS — custom characteristic-based rules
// ────────────────────────────────────────────────────────────────────────────

/** Per-API-key rate limit (header-based). */
export const apiKeyRateLimitRule = fixedWindow({
  mode: "DRY_RUN", // Start in dry-run to observe before enforcing
  characteristics: ['http.request.headers["x-api-key"]'],
  window: "1h",
  max: 600,
});

// ────────────────────────────────────────────────────────────────────────────
// 7. PROMPT INJECTION DETECTION
// ────────────────────────────────────────────────────────────────────────────

/** Detect and block LLM prompt injection attacks. */
export const promptInjectionRule = detectPromptInjection({
  mode: "LIVE",
});
