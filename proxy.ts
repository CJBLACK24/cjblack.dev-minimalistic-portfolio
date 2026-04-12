import aj from "@/lib/security";
import { logDecision, buildDeniedResponse } from "@/lib/security/helpers";
import { botProtectionRule } from "@/lib/security/rules";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Edge Proxy — Security & Traffic Management
 *
 * This serves as the global gateway for all requests. 
 * Replaces the deprecated 'middleware' pattern in favor of the 'proxy' convention.
 *
 * Implements:
 *  1. Global Shield WAF (via Arcjet base instance)
 *  2. Baseline Bot Protection (blocks common malicious bots globally)
 *  3. Security Headers (X-Frame, CSP-ready, etc.)
 */
export async function proxy(req: NextRequest) {
  // ─── 1. Arcjet Protection ───────────────────────────────────────────
  // We apply a baseline bot detection rule to all non-static routes.
  // This helps prevent automated scraping and reconnaissance.
  const decision = await aj
    .withRule(botProtectionRule)
    .protect(req);

  logDecision("GLOBAL_PROXY", decision);

  // If Arcjet denies the request, we block immediately at the edge.
  if (decision.isDenied()) {
    return buildDeniedResponse(decision);
  }

  // ─── 2. Security Headers ──────────────────────────────────────────────
  const response = NextResponse.next();

  // Prevent Clickjacking
  response.headers.set("X-Frame-Options", "DENY");
  
  // Prevent MIME-type sniffing
  response.headers.set("X-Content-Type-Options", "nosniff");
  
  // Referrer Policy
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  
  // Implementation of HSTS (Strict-Transport-Security) for production
  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload"
    );
  }

  // Permissions Policy
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=()"
  );

  return response;
}

/**
 * Proxy Matcher Configuration
 *
 * Optimized to exclude static assets and internal Next.js paths.
 * Systemically ensuring that we don't waste Arcjet tokens on images or CSS.
 */
export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon)
     * - public files (images, manifest, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|json)$).*)",
  ],
};
