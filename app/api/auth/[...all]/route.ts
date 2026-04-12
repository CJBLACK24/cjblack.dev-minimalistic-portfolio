/**
 * Arcjet Security — Auth Route Protection
 *
 * Wraps the Better Auth handler with Arcjet protection.
 * Applies:
 *  - Shield WAF (global, via base instance)
 *  - Auth-specific rate limiting (10 req/min)
 *  - Bot detection (blocks automated auth attempts)
 */

import { auth } from "@/lib/auth";
import aj from "@/lib/security";
import { buildDeniedResponse, logDecision } from "@/lib/security/helpers";
import { authRateLimitRule, botProtectionRule } from "@/lib/security/rules";
import { toNextJsHandler } from "better-auth/next-js";

const { GET: authGET, POST: authPOST } = toNextJsHandler(auth);

/**
 * Run Arcjet checks before forwarding to Better Auth.
 * Returns a Response if denied, or null if allowed.
 */
async function checkArcjet(req: Request): Promise<Response | null> {
  const decision = await aj
    .withRule(authRateLimitRule)
    .withRule(botProtectionRule)
    .protect(req);

  logDecision("/api/auth", decision);

  if (decision.isDenied()) {
    return buildDeniedResponse(decision);
  }

  return null;
}

export async function GET(req: Request) {
  const denied = await checkArcjet(req);
  if (denied) return denied;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return authGET(req as any);
}

export async function POST(req: Request) {
  const denied = await checkArcjet(req);
  if (denied) return denied;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return authPOST(req as any);
}
