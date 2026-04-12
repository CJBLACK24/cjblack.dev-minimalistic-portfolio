/**
 * Arcjet Demo / Health-Check Route
 *
 * Demonstrates ALL Arcjet security features working together:
 *  - Shield WAF (global)
 *  - Bot Protection
 *  - Rate Limiting (token bucket)
 *  - Spoofed Bot Detection
 *  - IP Analysis (hosting, VPN, proxy, Tor)
 *
 * GET  /api/arcjet  — protected demo endpoint
 * POST /api/arcjet  — protected with sensitive info detection
 */

import aj from "@/lib/security";
import {
  buildDeniedResponse,
  hasSpoofedBot,
  isFromHostingIP,
  logDecision,
} from "@/lib/security/helpers";
import {
  aiRateLimitRule,
  botProtectionRule,
  sensitiveInfoRule,
} from "@/lib/security/rules";
import { NextResponse } from "next/server";

// ── GET: Bot protection + rate limiting ─────────────────────────────────────
export async function GET(req: Request) {
  const decision = await aj
    .withRule(botProtectionRule)
    .withRule(aiRateLimitRule)
    .protect(req, { requested: 5 });

  logDecision("/api/arcjet [GET]", decision);

  if (decision.isDenied()) {
    return buildDeniedResponse(decision);
  }

  // Block hosting IPs (datacenter traffic is likely automated)
  if (isFromHostingIP(decision)) {
    return NextResponse.json(
      { error: "Datacenter traffic is not allowed" },
      { status: 403 },
    );
  }

  // Check for spoofed bots (paid Arcjet feature)
  if (hasSpoofedBot(decision)) {
    return NextResponse.json(
      { error: "Spoofed bot detected" },
      { status: 403 },
    );
  }

  return NextResponse.json({
    message: "Arcjet security is active",
    ip: {
      country: decision.ip.country,
      isHosting: decision.ip.isHosting(),
      isVpn: decision.ip.isVpn(),
      isProxy: decision.ip.isProxy(),
      isTor: decision.ip.isTor(),
      isRelay: decision.ip.isRelay(),
    },
  });
}

// ── POST: Sensitive info detection ──────────────────────────────────────────
export async function POST(req: Request) {
  const body = await req.text();

  const decision = await aj
    .withRule(sensitiveInfoRule)
    .withRule(botProtectionRule)
    .protect(req, { sensitiveInfoValue: body });

  logDecision("/api/arcjet [POST]", decision);

  if (decision.isDenied()) {
    return buildDeniedResponse(decision);
  }

  return NextResponse.json({
    message: "Request accepted — no sensitive data detected",
  });
}
