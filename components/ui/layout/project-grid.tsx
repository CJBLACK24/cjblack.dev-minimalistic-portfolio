"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";

export const ProjectGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const ProjectGridItem = ({
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
  index?: number;
}) => {
  return (
    <div
      className={cn(
        "group/bento relative flex h-full flex-col rounded-2xl border border-neutral-800/50 bg-neutral-950/80 p-4 backdrop-blur-sm md:p-5",
        className,
      )}
      onClick={onClick}
    >
      {/* Header Image */}
      <div className="relative mb-5 aspect-16/10 w-full overflow-hidden rounded-xl border border-neutral-800/30">
        {header}
      </div>

      {/* Content */}
      <div className="flex grow flex-col space-y-3">
        {icon && <div className="hidden">{icon}</div>}
        <h3 className="text-lg leading-tight font-bold text-white md:text-xl">
          {title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-neutral-400 md:text-base">
          {description}
        </p>
      </div>

      {/* Footer - Tech Stack & Actions */}
      <div className="mt-5 flex items-center justify-between border-t border-neutral-800/50 pt-4">
        {/* Tech Stack - Circular Icons */}
        <div className="flex items-center -space-x-1">{techStack}</div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {customAction}
          {viewButton && (
            <Link
              href={viewButton}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-400 transition-colors duration-200 hover:text-cyan-300"
            >
              <span>View Project</span>
              <IconArrowUpRight className="h-4 w-4" />
            </Link>
          )}
          {liveDemo && (
            <Link
              href={liveDemo}
              target={liveDemo.startsWith("http") ? "_blank" : undefined}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-400 transition-colors duration-200 hover:text-cyan-300"
            >
              <span>Check Live Site</span>
              <IconArrowUpRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
