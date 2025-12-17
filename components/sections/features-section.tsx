"use client";
import React from "react";
import { SparklesCore } from "@/components/ui/backgrounds/sparkles";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { AnimatePresence, motion } from "motion/react";
import {
  IconBuildingArch,
  IconMessageCircle,
  IconBolt,
} from "@tabler/icons-react";

export function FeaturesSection() {
  return (
    <section className="py-20 px-4 w-full relative">
      {/* Sparkles Background Effect */}
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="features-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={6}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            title="Quality Focus"
            description="Delivering high-quality results while maintaining attention to every detail."
            icon={
              <IconBuildingArch className="h-10 w-10 text-white group-hover/canvas-card:text-cyan-400 transition-colors" />
            }
          >
            <CanvasRevealEffect
              animationSpeed={5.1}
              containerClassName="bg-emerald-900"
            />
          </Card>
          <Card
            title="Reliable Communication"
            description="Keeping you updated at every step to ensure transparency and clarity."
            icon={
              <IconMessageCircle className="h-10 w-10 text-white group-hover/canvas-card:text-cyan-400 transition-colors" />
            }
          >
            <CanvasRevealEffect
              animationSpeed={3}
              containerClassName="bg-black"
              colors={[
                [236, 72, 153],
                [232, 121, 249],
              ]}
              dotSize={2}
            />
          </Card>
          <Card
            title="On-Time Delivery"
            description="Making sure projects are completed on schedule, with quality & attention to detail."
            icon={
              <IconBolt className="h-10 w-10 text-white group-hover/canvas-card:text-cyan-400 transition-colors" />
            }
          >
            <CanvasRevealEffect
              animationSpeed={3}
              containerClassName="bg-sky-600"
              colors={[[125, 211, 252]]}
            />
          </Card>
        </div>
      </div>
    </section>
  );
}

const Card = ({
  title,
  icon,
  children,
  description,
}: {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  description: string;
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2] max-w-sm w-full mx-auto p-4 relative h-[30rem]"
    >
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
            <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 w-full flex flex-col items-center justify-center text-center">
        <div className="group-hover/canvas-card:-translate-y-4 transition duration-200">
          {icon}
        </div>
        <h2 className="dark:text-white text-xl text-black mt-4 font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
          {title}
        </h2>
        <h2
          className="text-sm dark:text-neutral-300 text-neutral-600 opacity-0 group-hover/canvas-card:opacity-100 relative z-10 mt-2 font-normal group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200"
          style={{ color: "#e4e4e7" }}
        >
          {description}
        </h2>
      </div>
    </div>
  );
};

export const Icon = ({ className, ...rest }: React.SVGProps<SVGSVGElement>) => {
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
