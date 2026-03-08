/**
 * Skeleton loading components for dynamic section placeholders.
 * Replaces blank `min-h-screen` divs with content-shaped skeletons
 * that prevent cumulative layout shift (CLS) and provide visual feedback.
 */

interface SectionSkeletonProps {
  /** Number of skeleton cards to render in the grid */
  cards?: number;
  /** Visual variant for different section shapes */
  variant?: "grid" | "hero" | "list" | "contact";
}

export function SectionSkeleton({
  cards = 3,
  variant = "grid",
}: SectionSkeletonProps) {
  if (variant === "hero") {
    return (
      <div
        className="w-full animate-pulse py-32 md:py-48"
        aria-hidden="true"
        aria-label="Loading section..."
      >
        {/* Headline */}
        <div className="mx-auto mb-6 h-16 w-2/3 rounded-2xl bg-neutral-900" />
        <div className="mx-auto mb-4 h-16 w-1/2 rounded-2xl bg-neutral-900" />
        {/* Subtext */}
        <div className="mx-auto mb-12 h-6 w-1/3 rounded-xl bg-neutral-800/60" />
        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-4">
          <div className="h-12 w-36 rounded-full bg-neutral-800" />
          <div className="h-12 w-36 rounded-full bg-neutral-900" />
        </div>
      </div>
    );
  }

  if (variant === "contact") {
    return (
      <div
        className="w-full animate-pulse py-32 md:py-48"
        aria-hidden="true"
        aria-label="Loading section..."
      >
        {/* Header */}
        <div className="mx-auto mb-16 h-10 w-1/4 rounded-xl bg-neutral-900" />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Form side */}
          <div className="h-[500px] rounded-[3rem] bg-neutral-900/60 lg:col-span-1" />
          {/* Info grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:col-span-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-48 rounded-[2.5rem] bg-neutral-900/40"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div
        className="w-full animate-pulse py-32 md:py-48"
        aria-hidden="true"
        aria-label="Loading section..."
      >
        <div className="mx-auto mb-16 h-10 w-1/4 rounded-xl bg-neutral-900" />
        <div className="flex flex-col gap-6">
          {Array.from({ length: cards }).map((_, i) => (
            <div
              key={i}
              className="h-32 w-full rounded-3xl bg-neutral-900/60"
              style={{ opacity: 1 - i * 0.15 }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Default: grid variant
  return (
    <div
      className="w-full animate-pulse py-32 md:py-48"
      aria-hidden="true"
      aria-label="Loading section..."
    >
      {/* Section header */}
      <div className="mx-auto mb-6 h-10 w-48 rounded-xl bg-neutral-900" />
      <div className="mx-auto mb-16 h-5 w-64 rounded-lg bg-neutral-800/60" />
      {/* Card grid */}
      <div
        className={`grid grid-cols-1 gap-8 ${
          cards === 2
            ? "md:grid-cols-2"
            : cards >= 3
              ? "md:grid-cols-2 lg:grid-cols-3"
              : "md:grid-cols-1"
        }`}
      >
        {Array.from({ length: cards }).map((_, i) => (
          <div
            key={i}
            className="h-64 rounded-3xl bg-neutral-900/60"
            style={{ opacity: 1 - i * 0.1 }}
          />
        ))}
      </div>
    </div>
  );
}
