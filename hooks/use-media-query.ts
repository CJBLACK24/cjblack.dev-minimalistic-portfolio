import { useEffect, useState } from "react";

/**
 * useMediaQuery — reactively tracks a CSS media query match.
 *
 * Server-safe: returns false on initial SSR render to avoid hydration mismatch.
 *
 * @param query CSS media query string
 * @returns     Whether the query currently matches
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)')
 * const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
 * const isTouch = useMediaQuery('(hover: none) and (pointer: coarse)')
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia(query);

    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    mq.addEventListener("change", handler);

    return () => mq.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
