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
      icon: <IconShieldCheck className="h-10 w-10 text-white mb-2" />,
    },
    {
      title: "Reliable Communication",
      description:
        "Keeping you updated at every step to ensure transparency and clarity.",
      revealColor: [6, 182, 212], // matches #06b6d4
      icon: <IconMessage2Share className="h-10 w-10 text-white mb-2" />,
    },
    {
      title: "On-Time Delivery",
      description:
        "Making sure projects are completed on schedule, with quality & attention to detail.",
      revealColor: [47, 164, 255],
      icon: <IconClockBolt className="h-10 w-10 text-white mb-2" />,
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
    <section ref={sectionRef} className="w-full py-20 bg-black">
      <div className="flex flex-col lg:flex-row items-center justify-center bg-black w-full gap-4 mx-auto px-8">
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
            <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50" />
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
      className="border border-white/20 group/canvas-card flex items-center justify-center max-w-sm w-full mx-auto p-4 relative h-[30rem] lg:h-[35rem]"
    >
      <Icon className="absolute h-6 w-6 -top-3 -left-3 text-white" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-white" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 text-white" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-white" />

      <AnimatePresence>
        {effectiveReveal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 flex flex-col items-center justify-center">
        <div
          className={`text-center transition duration-200 w-full mx-auto flex items-center justify-center ${effectiveReveal ? "opacity-100 -translate-y-2" : "opacity-100"}`}
        >
          {effectiveReveal ? icon : defaultIcon}
        </div>
        <h2
          className={`text-white text-3xl ${effectiveReveal ? "opacity-100 -translate-y-2" : "opacity-0 group-hover/canvas-card:opacity-100 group-hover/canvas-card:-translate-y-2"} relative z-10 mt-4 font-bold transition duration-200 text-center`}
        >
          {title}
        </h2>
        {description && (
          <p
            className={`text-sm text-neutral-300 ${effectiveReveal ? "opacity-100 -translate-y-2" : "opacity-0 group-hover/canvas-card:opacity-100 group-hover/canvas-card:-translate-y-2"} relative z-10 mt-4 font-normal transition duration-200 text-center`}
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
        className="text-white h-20 w-20"
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
