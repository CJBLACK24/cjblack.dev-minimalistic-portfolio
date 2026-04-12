/**
 * Arcjet Security — Central Configuration
 *
 * Single instance of the Arcjet client shared across all route handlers.
 * Feature-specific rule presets are composed from the sibling modules and
 * applied via `withRule()` per-route for maximum flexibility.
 *
 * @see https://docs.arcjet.com/reference/nextjs
 */

import arcjet, { shield } from "@arcjet/next";

/**
 * Base Arcjet instance with Shield WAF enabled globally.
 * Additional rules (bot detection, rate limiting, email validation, etc.)
 * are layered on per-route using `aj.withRule(...)`.
 */
const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    // ── Shield WAF ─────────────────────────────────────────────────────
    // Protects against common attacks: SQL injection, XSS, CSRF, etc.
    shield({ mode: "LIVE" }),
  ],
});

export default aj;
