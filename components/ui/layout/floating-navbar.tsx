"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const previous = scrollYProgress.getPrevious();
      const direction =
        previous !== null && previous !== undefined ? current - previous : 0;

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: string,
  ) => {
    if (pathname === "/" && link.startsWith("#")) {
      e.preventDefault();
      if (link === "#home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const targetId = link.replace("#", "");
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "fixed inset-x-0 top-10 z-50 mx-auto flex max-w-fit items-center justify-center space-x-4 rounded-full border py-2 pr-2 pl-8 shadow-lg backdrop-blur-md transition-colors duration-300",
          "bg-white/80 dark:bg-black/80",
          "border-neutral-200/50 dark:border-white/10",
          className,
        )}
      >
        {navItems.map((navItem, idx: number) => {
          const href = navItem.link.startsWith("#")
            ? `/${navItem.link}`
            : navItem.link;

          return (
            <Link
              key={`link=${idx}`}
              href={href}
              onClick={(e) => handleNavClick(e, navItem.link)}
              className="group relative flex items-center space-x-1 text-neutral-600 transition-colors duration-300 hover:text-cyan-600 dark:text-neutral-300 dark:hover:text-cyan-400"
              aria-label={`Navigate to ${navItem.name}`}
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="hidden text-sm font-medium sm:block">
                {navItem.name}
              </span>
            </Link>
          );
        })}

        <Link
          href="/#contact"
          onClick={(e) => handleNavClick(e, "#contact")}
          className="relative rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-900 transition-all duration-300 hover:border-cyan-400/50 hover:bg-neutral-100 dark:border-white/20 dark:text-white dark:hover:border-cyan-500/30 dark:hover:bg-neutral-800"
          aria-label="Navigate to Contact section"
        >
          <span>Contact</span>
          <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-linear-to-r from-transparent via-cyan-500 to-transparent" />
        </Link>
      </motion.div>
    </AnimatePresence>
  );
};
