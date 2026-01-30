"use client";
import React, { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

import {
  IconShieldCheck,
  IconMessage2Share,
  IconClockBolt,
} from "@tabler/icons-react";

export function FeaturesSection() {
  const [revealedCount, setRevealedCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const features = [
    {
      title: "Quality Focus",
      description:
        "Delivering high-quality results while maintaining attention to every detail.",
      revealColor: [47, 164, 255], // matches #2fa4ff
      icon: <IconShieldCheck className="mb-2 h-10 w-10 text-white" />,
    },
    {
      title: "Reliable Communication",
      description:
        "Keeping you updated at every step to ensure transparency and clarity.",
      revealColor: [6, 182, 212], // matches #06b6d4
      icon: <IconMessage2Share className="mb-2 h-10 w-10 text-white" />,
    },
    {
      title: "On-Time Delivery",
      description:
        "Making sure projects are completed on schedule, with quality & attention to detail.",
      revealColor: [47, 164, 255],
      icon: <IconClockBolt className="mb-2 h-10 w-10 text-white" />,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }, // Start when 20% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    const interval = setInterval(() => {
      setRevealedCount((prev) => {
        if (prev < features.length) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 1500); // Reveal a new one every 1.5 seconds for a faster "filling" effect

    return () => clearInterval(interval);
  }, [hasStarted, features.length]);

  return (
    <section ref={sectionRef} className="w-full bg-black py-20">
      <div className="mx-auto flex w-full flex-col items-center justify-center gap-4 bg-black px-8 lg:flex-row">
        {features.map((feature, idx) => (
          <Card
            key={idx}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            defaultIcon={<PhaseIcon />}
            isRevealed={idx < revealedCount}
            onHover={() => setRevealedCount(features.length)} // Display all immediately if user interacts
          >
            <CanvasRevealEffect
              animationSpeed={3}
              containerClassName="bg-black"
              colors={[feature.revealColor]}
              dotSize={2}
            />
            <div className="absolute inset-0 bg-black/50 [mask-image:radial-gradient(400px_at_center,white,transparent)]" />
          </Card>
        ))}
      </div>
    </section>
  );
}

const Card = ({
  title,
  icon,
  defaultIcon,
  children,
  description,
  isRevealed,
  onHover,
}: {
  title: string;
  icon: React.ReactNode;
  defaultIcon: React.ReactNode;
  children?: React.ReactNode;
  description?: string;
  isRevealed?: boolean;
  onHover?: () => void;
}) => {
  const [hovered, setHovered] = React.useState(false);

  // Combine internal hover and external reveal trigger
  const effectiveReveal = hovered || isRevealed;

  return (
    <div
      onMouseEnter={() => {
        setHovered(true);
        onHover?.();
      }}
      onMouseLeave={() => setHovered(false)}
      className="group/canvas-card relative mx-auto flex h-[30rem] w-full max-w-sm items-center justify-center border border-white/20 p-4 lg:h-[35rem]"
    >
      <Icon className="absolute -top-3 -left-3 h-6 w-6 text-white" />
      <Icon className="absolute -bottom-3 -left-3 h-6 w-6 text-white" />
      <Icon className="absolute -top-3 -right-3 h-6 w-6 text-white" />
      <Icon className="absolute -right-3 -bottom-3 h-6 w-6 text-white" />

      <AnimatePresence>
        {effectiveReveal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 h-full w-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 flex flex-col items-center justify-center">
        <div
          className={`mx-auto flex w-full items-center justify-center text-center transition duration-200 ${effectiveReveal ? "-translate-y-2 opacity-100" : "opacity-100"}`}
        >
          {effectiveReveal ? icon : defaultIcon}
        </div>
        <h2
          className={`text-3xl text-white ${effectiveReveal ? "-translate-y-2 opacity-100" : "opacity-0 group-hover/canvas-card:-translate-y-2 group-hover/canvas-card:opacity-100"} relative z-10 mt-4 text-center font-bold transition duration-200`}
        >
          {title}
        </h2>
        {description && (
          <p
            className={`text-sm text-neutral-300 ${effectiveReveal ? "-translate-y-2 opacity-100" : "opacity-0 group-hover/canvas-card:-translate-y-2 group-hover/canvas-card:opacity-100"} relative z-10 mt-4 text-center font-normal transition duration-200`}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

const PhaseIcon = () => {
  return (
    <div className="flex items-center justify-center">
      <svg
        width="60"
        height="60"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-20 w-20 text-white"
      >
        <path
          d="M9 6L15 12L9 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export const Icon = ({ className, ...rest }: React.ComponentProps<"svg">) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
