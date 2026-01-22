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
        "mx-auto grid max-w-7xl grid-cols-1 gap-6 md:gap-8 md:grid-cols-2",
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
        "group/bento relative flex flex-col rounded-2xl border border-neutral-800/50 bg-neutral-950/80 backdrop-blur-sm p-4 md:p-5 h-full",
        className,
      )}
      onClick={onClick}
    >
      {/* Header Image */}
      <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-5 border border-neutral-800/30">
        {header}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow space-y-3">
        {icon && <div className="hidden">{icon}</div>}
        <h3 className="font-bold text-lg md:text-xl text-white leading-tight">
          {title}
        </h3>
        <p className="text-sm md:text-base text-neutral-400 leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      {/* Footer - Tech Stack & Actions */}
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-neutral-800/50">
        {/* Tech Stack - Circular Icons */}
        <div className="flex items-center -space-x-1">{techStack}</div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {customAction}
          {viewButton && (
            <Link
              href={viewButton}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors duration-200"
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
              className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors duration-200"
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
