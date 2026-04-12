/**
 * Arcjet Security — Sensitive Information Detection API
 *
 * Scans request body for PII and other sensitive data that the
 * application should not be handling (credit cards, phone numbers, etc.).
 *
 * POST /api/arcjet/sensitive-info
 * Body: any text content to scan
 */

import aj from "@/lib/security";
import { buildDeniedResponse, logDecision } from "@/lib/security/helpers";
import {
  generalRateLimitRule,
  sensitiveInfoRule,
} from "@/lib/security/rules";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.text();

  if (!body || body.trim().length === 0) {
    return NextResponse.json(
      { error: "Request body is required" },
      { status: 400 },
    );
  }

  const decision = await aj
    .withRule(sensitiveInfoRule)
    .withRule(generalRateLimitRule)
    .protect(req, { sensitiveInfoValue: body });

  logDecision("/api/arcjet/sensitive-info", decision);

  if (decision.isDenied()) {
    if (decision.reason.isSensitiveInfo()) {
      return NextResponse.json(
        {
          error: "Request contains sensitive information that cannot be processed",
          detectedTypes: process.env.NODE_ENV === "development"
            ? decision.reason
            : undefined,
        },
        { status: 400 },
      );
    }
    return buildDeniedResponse(decision);
  }

  return NextResponse.json({
    safe: true,
    message: "No sensitive information detected",
  });
}
