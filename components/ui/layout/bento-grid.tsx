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
        className,
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
        "group/bento relative row-span-1 flex flex-col justify-between space-y-2 rounded-xl border p-3 transition-all duration-300 sm:p-4",
        "border-neutral-800 bg-[#0a0a0a] hover:border-neutral-500",
        className,
      )}
      onClick={onClick}
    >
      {/* Card content - NOT clickable */}
      <div className="mb-6 flex h-full flex-col justify-between sm:mb-8 md:mb-6">
        {header}
        <div className="transition duration-200 group-hover/bento:translate-x-2">
          {icon}
          <div className="mt-1 mb-1 font-sans text-base font-bold text-white sm:text-lg md:text-xl">
            {title}
          </div>
          <div className="font-sans text-xs font-normal text-neutral-400 sm:text-sm">
            {description}
          </div>
        </div>
      </div>

      {/* Footer Area - Bottom of Card */}
      <div className="absolute right-2 bottom-2 left-2 z-20 flex items-center justify-between gap-2 md:right-4 md:bottom-4 md:left-4">
        {/* Tech Stack */}
        <div className="flex items-center">{techStack}</div>

        {/* Actions - Avatar, View Button and Live Demo */}
        <div className="flex items-center gap-2 md:gap-3">
          {customAction}
          {viewButton && (
            <Link
              href={viewButton}
              onClick={(e) => e.stopPropagation()}
              className="animate-shimmer inline-flex h-8 items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-size-[200%_100%] px-3 text-xs font-medium text-slate-400 transition-colors hover:border-cyan-500/50 hover:text-cyan-400 focus:outline-none md:h-9 md:px-4 md:text-sm"
            >
              View
            </Link>
          )}
          {liveDemo && (
            <Link
              href={liveDemo}
              target={liveDemo.startsWith("http") ? "_blank" : undefined}
              onClick={(e) => e.stopPropagation()}
              className="group/demo flex items-center gap-1 text-xs font-semibold whitespace-nowrap text-cyan-500 transition-colors duration-200 hover:text-cyan-400 md:gap-1.5 md:text-sm"
            >
              <span>Live Demo</span>
              <IconArrowUpRight className="h-3 w-3 transition-transform group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5 md:h-4 md:w-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
