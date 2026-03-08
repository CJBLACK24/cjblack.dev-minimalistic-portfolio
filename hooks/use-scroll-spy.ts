import { useEffect, useRef, useState } from "react";

/**
 * useScrollSpy — tracks which section is currently visible in the viewport.
 *
 * Uses IntersectionObserver with a threshold so the section needs to be
 * meaningfully visible before being considered "active".
 *
 * @param sectionIds Array of element IDs to observe
 * @param options    Optional IntersectionObserver options
 * @returns          The ID of the currently active/visible section
 *
 * @example
 * const active = useScrollSpy(['hero', 'projects', 'contact'])
 * // 'hero' | 'projects' | 'contact' | null
 */
export function useScrollSpy(
  sectionIds: string[],
  options: IntersectionObserverInit = {},
): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const defaultOptions: IntersectionObserverInit = {
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
      ...options,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      }
    }, defaultOptions);

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    for (const el of elements) {
      observerRef.current.observe(el);
    }

    return () => {
      observerRef.current?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join(",")]);

  return activeId;
}
