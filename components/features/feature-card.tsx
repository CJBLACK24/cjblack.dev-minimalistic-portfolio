"use client";

import React, { useRef } from "react";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "motion/react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType<{ className?: string }>;
  accent: string;
}

export const FeatureCard = ({
  title,
  description,
  icon: Icon,
}: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // High-performance motion values for hover position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Optimized Tilt - very subtle for a clean, professional feel
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 150,
    damping: 20,
  });

  // Performance optimized background gradients
  const borderGradientStyle = useMotionTemplate`radial-gradient(400px circle at calc(50% + ${useTransform(mouseX, (x) => x * 100)}%) calc(50% + ${useTransform(mouseY, (y) => y * 100)}%), rgba(120, 119, 198, 0.3), transparent 40%), linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))`;
  const spotlightStyle = useMotionTemplate`radial-gradient(600px circle at calc(50% + ${useTransform(mouseX, (x) => x * 100)}%) calc(50% + ${useTransform(mouseY, (y) => y * 100)}%), rgba(34, 211, 238, 0.05) 0%, transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative h-full w-full group overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/5 transition-all duration-500 will-change-transform"
    >
      {/* 
          BORDER GRADIENT RADIANT EFFECT 
          Hardware accelerated via useMotionTemplate
      */}
      <motion.div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl p-[1.5px] pointer-events-none"
        style={{
          background: borderGradientStyle,
          maskImage:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskImage:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
      />

      {/* Subtle Background Glow Spotlight */}
      <motion.div
        className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: spotlightStyle,
        }}
      />

      <div className="relative z-20 flex flex-col items-center justify-center p-12 h-full text-center">
        {/* Centered Icon Container */}
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-cyan-500/30 transition-all duration-500 group-hover:shadow-[0_0_25px_rgba(34,211,238,0.15)] mb-8">
          <Icon className="w-8 h-8 text-neutral-400 group-hover:text-cyan-400 transition-colors duration-500" />
        </div>

        <h3 className="text-2xl font-extrabold mb-4 text-white tracking-tight group-hover:text-cyan-50 transition-colors duration-500">
          {title}
        </h3>

        <p className="text-base leading-relaxed text-neutral-400 group-hover:text-neutral-300 transition-colors duration-500 max-w-[280px]">
          {description}
        </p>
      </div>
    </motion.div>
  );
};
