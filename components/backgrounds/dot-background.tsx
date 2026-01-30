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
        "relative flex w-full flex-col items-center justify-center overflow-hidden bg-white dark:bg-black",
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-0 z-0",
          "bg-size-[32px_32px]",
          "bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)]",
          "dark:bg-[radial-gradient(#ffffff22_1.5px,transparent_1.5px)]",
          dotColor &&
            `[background-image:radial-gradient(${dotColor}_1.5px,transparent_1.5px)]`,
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <div className="relative z-20 w-full">{children}</div>
    </div>
  );
}
