/* eslint-disable react-hooks/static-components */
"use client";

import React from "react";
import { motion } from "motion/react";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconMail,
  IconPhone,
  IconCopy,
} from "@tabler/icons-react";
import { useRef } from "react";
import gsap from "gsap";
import confetti from "canvas-confetti";
import { ContactCardProps, SectionProps } from "@/types";

const ContactCard = ({
  icon,
  title,
  value,
  href,
  copyable = false,
  clickable = true,
}: ContactCardProps) => {
  const cardRef = useRef<HTMLDivElement | HTMLAnchorElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(value);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      },
      colors: ["#06b6d4", "#ffffff"],
      ticks: 200,
      gravity: 1.2,
      scalar: 0.8,
    });
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Spotlight glow
    gsap.to(glowRef.current, {
      opacity: 1,
      x: x,
      y: y,
      duration: 0.4,
      ease: "power2.out",
    });

    // Suble 3D tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    gsap.to(cardRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const onMouseLeave = () => {
    if (!cardRef.current || !glowRef.current) return;

    gsap.to(glowRef.current, {
      opacity: 0,
      duration: 0.8,
    });

    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)",
    });
  };

  const CardInner = () => (
    <>
      {/* GTA 6 style glow spotlight */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(400px circle at center, rgba(6, 182, 212, 0.15), transparent 80%)",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "800px",
        }}
      />

      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center mb-8 group-hover:bg-neutral-700 transition-colors">
          <div className="text-neutral-400 group-hover:text-white transition-colors">
            {icon}
          </div>
        </div>
        <div>
          <h4 className="text-neutral-400 font-medium mb-1">{title}</h4>
          <div className="flex items-center justify-between">
            <span className="text-white font-medium truncate mr-2">
              {value}
            </span>
            {copyable && (
              <button
                onClick={handleCopy}
                className="text-neutral-500 hover:text-white transition-colors cursor-pointer relative z-20"
                aria-label={`Copy ${title}`}
              >
                <IconCopy className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );

  const containerClasses =
    "relative bg-neutral-900/50 border border-neutral-800 rounded-3xl p-6 flex flex-col justify-between group overflow-hidden transition-all duration-300 hover:border-neutral-700/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]";

  if (!clickable) {
    return (
      <div
        ref={cardRef as React.RefObject<HTMLDivElement>}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={containerClasses + " cursor-default"}
      >
        <CardInner />
      </div>
    );
  }

  return (
    <a
      ref={cardRef as React.RefObject<HTMLAnchorElement>}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={containerClasses + " cursor-pointer"}
    >
      <CardInner />
    </a>
  );
};

export const ContactInfo = ({ itemVariants }: SectionProps) => {
  return (
    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Phone */}
      <motion.div variants={itemVariants}>
        <ContactCard
          icon={<IconPhone className="w-6 h-6" />}
          title="Phone number"
          value="🇵🇭 +63 960 418 0219"
          href="#"
          clickable={false}
        />
      </motion.div>

      {/* Email */}
      <motion.div variants={itemVariants}>
        <ContactCard
          icon={<IconMail className="w-6 h-6" />}
          title="E-mail"
          value="duquechristianjohncalderon@gmail.com"
          href="#"
          clickable={false}
          copyable
        />
      </motion.div>

      {/* LinkedIn */}
      <motion.div variants={itemVariants}>
        <ContactCard
          icon={<IconBrandLinkedin className="w-6 h-6" />}
          title="LinkedIn"
          value="cj-black-a5b110335"
          href="https://www.linkedin.com/in/cj-black-a5b110335"
        />
      </motion.div>

      {/* GitHub */}
      <motion.div variants={itemVariants}>
        <ContactCard
          icon={<IconBrandGithub className="w-6 h-6" />}
          title="Github"
          value="github.com/CJBLACK24"
          href="https://github.com/CJBLACK24"
        />
      </motion.div>

      {/* Instagram */}
      <motion.div variants={itemVariants}>
        <ContactCard
          icon={<IconBrandInstagram className="w-6 h-6" />}
          title="Instagram"
          value="@cjblack_24"
          href="https://www.instagram.com/cjblack_24/"
        />
      </motion.div>
    </div>
  );
};
