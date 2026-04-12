/**
 * Arcjet Security — Email Validation API
 *
 * Validates email addresses using Arcjet's email validation rule.
 * Blocks disposable, invalid, and domains with no MX records.
 *
 * POST /api/arcjet/validate-email
 * Body: { "email": "user@example.com" }
 */

import aj from "@/lib/security";
import { buildDeniedResponse, logDecision } from "@/lib/security/helpers";
import {
  emailValidationRule,
  contactFormRateLimitRule,
} from "@/lib/security/rules";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = (await req.json()) as { email?: string };

  if (!email || typeof email !== "string") {
    return NextResponse.json(
      { error: "Email is required" },
      { status: 400 },
    );
  }

  const decision = await aj
    .withRule(emailValidationRule)
    .withRule(contactFormRateLimitRule)
    .protect(req, { email });

  logDecision("/api/arcjet/validate-email", decision);

  if (decision.isDenied()) {
    // Provide user-friendly messages for email-specific issues
    if (decision.reason.isEmail()) {
      const emailTypes = decision.reason.emailTypes;
      let message = "The email address provided is not valid";

      if (emailTypes.includes("INVALID")) {
        message = "Email address format is invalid — is there a typo?";
      } else if (emailTypes.includes("DISPOSABLE")) {
        message = "Disposable email addresses are not allowed";
      } else if (emailTypes.includes("NO_MX_RECORDS")) {
        message =
          "Your email domain does not have valid mail records — is there a typo?";
      }

      return NextResponse.json({ error: message }, { status: 400 });
    }

    return buildDeniedResponse(decision);
  }

  return NextResponse.json({
    valid: true,
    message: "Email address is valid",
  });
}
