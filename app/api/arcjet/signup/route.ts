/**
 * Arcjet Security — Signup Protection API
 *
 * Combines multiple Arcjet security layers for signup form protection:
 *  - Email validation (blocks disposable / invalid emails)
 *  - Bot detection (blocks automated signups)
 *  - Rate limiting (prevents signup floods)
 *  - Sensitive info detection (blocks PII in form fields)
 *
 * POST /api/arcjet/signup
 * Body: { "email": "user@example.com", "name": "John Doe" }
 */

import aj from "@/lib/security";
import { buildDeniedResponse, logDecision } from "@/lib/security/helpers";
import {
  botProtectionRule,
  emailValidationRule,
  sensitiveInfoRule,
  signupRateLimitRule,
} from "@/lib/security/rules";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, name } = body as { email?: string; name?: string };

  if (!email || typeof email !== "string") {
    return NextResponse.json(
      { error: "Email is required" },
      { status: 400 },
    );
  }

  // Compose all protection layers together
  const decision = await aj
    .withRule(emailValidationRule)
    .withRule(botProtectionRule)
    .withRule(signupRateLimitRule)
    .withRule(sensitiveInfoRule)
    .protect(req, {
      email,
      // Check the name field for sensitive info (credit cards, phone, etc.)
      sensitiveInfoValue: name ?? "",
    });

  logDecision("/api/arcjet/signup", decision);

  if (decision.isDenied()) {
    // Provide specific feedback for email issues
    if (decision.reason.isEmail()) {
      const emailTypes = decision.reason.emailTypes;
      let message = "Invalid email address";

      if (emailTypes.includes("INVALID")) {
        message = "Email address format is invalid — is there a typo?";
      } else if (emailTypes.includes("DISPOSABLE")) {
        message = "Disposable email addresses are not allowed for signup";
      } else if (emailTypes.includes("NO_MX_RECORDS")) {
        message = "Email domain does not accept mail — is there a typo?";
      }

      return NextResponse.json({ error: message }, { status: 400 });
    }

    return buildDeniedResponse(decision);
  }

  return NextResponse.json({
    success: true,
    message: "Signup form validation passed",
  });
}
