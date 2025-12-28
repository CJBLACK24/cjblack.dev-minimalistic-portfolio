import { cn } from "@/lib/utils";
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-2",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  onClick,
  liveDemo,
  viewButton,
  customAction,
  techStack,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  liveDemo?: string;
  viewButton?: string;
  customAction?: React.ReactNode;
  techStack?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 bg-white p-4 hover:shadow-xl dark:border-white/10 dark:bg-black dark:shadow-none relative",
        "dark:hover:border-cyan-500/50 dark:hover:shadow-[0_0_20px_rgba(6,182,212,0.15),0_0_40px_rgba(6,182,212,0.1)]",
        "transition-[border-color,box-shadow] duration-100",
        className
      )}
      onClick={onClick}
    >
      {/* Bottom gradient border line - like JSMastery */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="absolute bottom-0 left-[10%] right-[10%] h-px bg-linear-to-r from-transparent via-cyan-400/80 to-transparent blur-sm" />

      {/* Card content - NOT clickable */}
      <div className="flex flex-col justify-between h-full mb-12 sm:mb-14 md:mb-10">
        {header}
        <div className="transition duration-200 group-hover/bento:translate-x-2">
          {icon}
          <div className="mt-2 mb-2 font-sans font-bold text-lg sm:text-xl md:text-2xl text-neutral-600 dark:text-neutral-200">
            {title}
          </div>
          <div className="font-sans text-sm sm:text-base md:text-lg font-normal text-neutral-600 dark:text-neutral-300">
            {description}
          </div>
        </div>
      </div>

      {/* Footer Area - Bottom of Card */}
      <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4 z-20 flex items-center justify-between gap-2">
        {/* Tech Stack */}
        <div className="flex items-center">{techStack}</div>

        {/* Actions - Avatar, View Button and Live Demo */}
        <div className="flex items-center gap-2 md:gap-3">
          {customAction}
          {viewButton && (
            <Link
              href={viewButton}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex h-8 md:h-9 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-size-[200%_100%] px-3 md:px-4 text-xs md:text-sm font-medium text-slate-400 transition-colors focus:outline-none hover:text-cyan-400 hover:border-cyan-500/50"
            >
              View
            </Link>
          )}
          {liveDemo && (
            <Link
              href={liveDemo}
              target={liveDemo.startsWith("http") ? "_blank" : undefined}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 md:gap-1.5 text-cyan-500 hover:text-cyan-400 text-xs md:text-sm font-semibold transition-colors duration-200 group/demo whitespace-nowrap"
            >
              <span>Live Demo</span>
              <IconArrowUpRight className="h-3 w-3 md:h-4 md:w-4 group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
