/**
 * Arcjet Security — Helpers & Decision Utilities
 *
 * Shared utilities for inspecting Arcjet decisions and building
 * consistent error responses across all API routes.
 */

import { isSpoofedBot } from "@arcjet/inspect";
import type { ArcjetDecision } from "@arcjet/next";
import { redact } from "@arcjet/redact";
import { NextResponse } from "next/server";

// ────────────────────────────────────────────────────────────────────────────
// Decision inspection helpers
// ────────────────────────────────────────────────────────────────────────────

/** Check if any result indicates a spoofed bot (paid Arcjet feature). */
export function hasSpoofedBot(decision: ArcjetDecision): boolean {
  return decision.results.some(isSpoofedBot);
}

/** Check if the request comes from a hosting / datacenter IP. */
export function isFromHostingIP(decision: ArcjetDecision): boolean {
  return decision.ip.isHosting();
}

/** Check if the request comes from a VPN. */
export function isFromVPN(decision: ArcjetDecision): boolean {
  return decision.ip.isVpn();
}

/** Check if the request comes from a proxy. */
export function isFromProxy(decision: ArcjetDecision): boolean {
  return decision.ip.isProxy();
}

/** Check if the request comes from a Tor exit node. */
export function isFromTor(decision: ArcjetDecision): boolean {
  return decision.ip.isTor();
}

/** Check if the request comes from a relay (e.g. iCloud Private Relay). */
export function isFromRelay(decision: ArcjetDecision): boolean {
  return decision.ip.isRelay();
}

// ────────────────────────────────────────────────────────────────────────────
// Error response factory
// ────────────────────────────────────────────────────────────────────────────

interface ArcjetErrorOptions {
  /** HTTP status code (default 403). */
  status?: number;
  /** Human-readable error message. */
  message?: string;
  /** Whether to include the full Arcjet reason in the response body. */
  includeReason?: boolean;
}

/**
 * Build a consistent JSON error response for denied requests.
 * Automatically maps denial reasons to appropriate status codes.
 */
export function buildDeniedResponse(
  decision: ArcjetDecision,
  opts: ArcjetErrorOptions = {},
): NextResponse {
  const {
    includeReason = process.env.NODE_ENV === "development",
  } = opts;

  let status = opts.status ?? 403;
  let message = opts.message ?? "Forbidden";

  // Map specific denial reasons to better status codes & messages
  if (decision.reason.isRateLimit()) {
    status = 429;
    message = "Too many requests — please slow down";
  } else if (decision.reason.isBot()) {
    status = 403;
    message = "Automated access is not allowed";
  } else if (decision.reason.isEmail()) {
    status = 400;
    message = "The email address provided is not valid";
  } else if (decision.reason.isSensitiveInfo()) {
    status = 400;
    message = "Request contains unexpected sensitive information";
  } else if (decision.reason.isShield()) {
    status = 403;
    message = "Request blocked by security shield";
  }

  const body: Record<string, unknown> = { error: message };
  if (includeReason) {
    body.reason = decision.reason;
  }

  return NextResponse.json(body, { status });
}

// ────────────────────────────────────────────────────────────────────────────
// Logging helper
// ────────────────────────────────────────────────────────────────────────────

/**
 * Log the Arcjet decision in a structured, concise format.
 * Only includes detail in non-production environments.
 */
export function logDecision(
  route: string,
  decision: ArcjetDecision,
): void {
  const level = decision.isDenied() ? "warn" : "info";
  const summary = {
    route,
    conclusion: decision.conclusion,
    ruleResults: decision.results.map((r) => ({
      conclusion: r.conclusion,
      reason: r.reason,
    })),
    ip: {
      country: decision.ip.country,
      isHosting: decision.ip.isHosting(),
      isVpn: decision.ip.isVpn(),
      isProxy: decision.ip.isProxy(),
      isTor: decision.ip.isTor(),
      isSpoofedBot: hasSpoofedBot(decision),
    },
  };

  if (level === "warn") {
    console.warn("[Arcjet] DENIED", JSON.stringify(summary, null, 2));
  } else if (process.env.NODE_ENV === "development") {
    console.log("[Arcjet] ALLOWED", JSON.stringify(summary, null, 2));
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Redaction helper
// ────────────────────────────────────────────────────────────────────────────

/**
 * Redact sensitive information from a string using Arcjet Redact.
 * Redacts emails, credit cards, and phone numbers by default.
 */
export async function redactData(content: string): Promise<string> {
  const [redacted] = await redact(content, {
    entities: ["EMAIL", "CREDIT_CARD_NUMBER", "PHONE_NUMBER"],
  });
  return redacted;
}
