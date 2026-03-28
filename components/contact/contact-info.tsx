/* eslint-disable react-hooks/static-components */
"use client";

import React from "react";
import { motion } from "motion/react";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandTiktok,
  IconMail,
  IconPhone,
  IconCopy,
} from "@tabler/icons-react";
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

  const CardInner = () => (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-colors duration-300 group-hover:border-white/20">
        <div className="text-white transition-colors duration-300 group-hover:text-neutral-200">
          {icon}
        </div>
      </div>
      <div>
        <h4 className="mb-1 text-sm font-medium tracking-wide text-neutral-600 uppercase dark:text-neutral-500">
          {title}
        </h4>
        <div className="flex items-center justify-between gap-2">
          <span className="truncate font-medium text-neutral-900 transition-colors duration-300 dark:text-white">
            {value}
          </span>
          {copyable && (
            <button
              onClick={handleCopy}
              className="shrink-0 cursor-pointer text-neutral-500 transition-colors duration-300 hover:text-white"
              aria-label={`Copy ${title}`}
            >
              <IconCopy className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const containerClasses =
    "border rounded-xl p-6 md:p-8 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 shadow-xl " +
    "bg-black " +
    "border-white/10 " +
    "hover:border-white/20";

  if (!clickable) {
    return (
      <div className={containerClasses + " cursor-default"}>
        <CardInner />
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={containerClasses + " cursor-pointer"}
    >
      <CardInner />
    </a>
  );
};

export const ContactInfo = ({ itemVariants }: SectionProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:col-span-2">
      {/* Phone */}
      <motion.div variants={itemVariants}>
        <ContactCard
          icon={<IconPhone className="h-6 w-6" />}
          title="Phone number"
          value="🇵🇭 +63 960 418 0219"
          href="#"
          clickable={false}
        />
      </motion.div>

      {/* Email */}
      <motion.div variants={itemVariants}>
        <ContactCard
          icon={<IconMail className="h-6 w-6" />}
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
          icon={<IconBrandLinkedin className="h-6 w-6" />}
          title="LinkedIn"
          value="cj-black-a5b110335"
          href="https://www.linkedin.com/in/cj-black-a5b110335"
        />
      </motion.div>

      {/* GitHub */}
      <motion.div variants={itemVariants}>
        <ContactCard
          icon={<IconBrandGithub className="h-6 w-6" />}
          title="Github"
          value="github.com/CJBLACK24"
          href="https://github.com/CJBLACK24"
        />
      </motion.div>

      {/* Instagram */}
      <motion.div variants={itemVariants}>
        <ContactCard
          icon={<IconBrandInstagram className="h-6 w-6" />}
          title="Instagram"
          value="@cjblack_24"
          href="https://www.instagram.com/cjblack_24/"
        />
      </motion.div>

      {/* TikTok */}
      <motion.div variants={itemVariants}>
        <ContactCard
          icon={<IconBrandTiktok className="h-6 w-6" />}
          title="TikTok"
          value="@cjblack.dev"
          href="https://www.tiktok.com/@cjblack.dev"
        />
      </motion.div>
    </div>
  );
};
