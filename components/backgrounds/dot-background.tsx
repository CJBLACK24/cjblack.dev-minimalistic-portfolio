import { cn } from "@/lib/utils";
import React from "react";

interface DotBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  dotColor?: string;
}

export function DotBackground({
  children,
  className,
  dotColor,
}: DotBackgroundProps) {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center bg-white dark:bg-black overflow-hidden",
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-0 z-0",
          "bg-size-[20px_20px]",
          "bg-[radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:bg-[radial-gradient(#404040_1px,transparent_1px)]",
          dotColor &&
            `[background-image:radial-gradient(${dotColor}_1px,transparent_1px)]`,
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-white mask-[radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <div className="relative z-20 w-full">{children}</div>
    </div>
  );
}
