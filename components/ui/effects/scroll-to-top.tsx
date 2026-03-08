"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Scroll-to-top button.
 * Appears after the user scrolls past 600px and allows returning to the top
 * with a smooth animation. Respects reduced-motion preferences.
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "instant" : "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={handleClick}
      className="fixed right-8 bottom-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/80 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:border-cyan-500/40 hover:bg-neutral-800 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:outline-none"
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
