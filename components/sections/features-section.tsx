"use client";
import { SparklesCore } from "@/components/ui/backgrounds/sparkles";
import {
  IconBuildingArch,
  IconMessageCircle,
  IconBolt,
} from "@tabler/icons-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <IconBuildingArch className="w-10 h-10 text-cyan-400" />,
      title: "Quality Focus",
      description:
        "Delivering high-quality results while maintaining attention to every detail.",
    },
    {
      icon: <IconMessageCircle className="w-10 h-10 text-cyan-400" />,
      title: "Reliable Communication",
      description:
        "Keeping you updated at every step to ensure transparency and clarity.",
    },
    {
      icon: <IconBolt className="w-10 h-10 text-cyan-400" />,
      title: "On-Time Delivery",
      description:
        "Making sure projects are completed on schedule, with quality & attention to detail.",
    },
  ];

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
          {features.map((feature, index) => (
            <div
              key={index}
              className="border border-neutral-900 rounded-2xl p-8 hover:border-cyan-500/50 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)] transition-all duration-300 group"
              style={{ backgroundColor: "#0E0E10" }}
            >
              <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-100 transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base md:text-lg font-normal text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
