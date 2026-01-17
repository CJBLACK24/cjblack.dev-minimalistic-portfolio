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
    <div className="w-full h-full flex flex-col justify-between">
      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-6 transition-colors duration-300 bg-[#111] border border-neutral-800 group-hover:border-neutral-600">
        <div className="transition-colors duration-300 text-white group-hover:text-neutral-200">
          {icon}
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-1 uppercase tracking-wide text-neutral-500">
          {title}
        </h4>
        <div className="flex items-center justify-between gap-2">
          <span className="font-medium truncate transition-colors duration-300 text-neutral-900 dark:text-white">
            {value}
          </span>
          {copyable && (
            <button
              onClick={handleCopy}
              className="transition-colors duration-300 cursor-pointer shrink-0 text-neutral-500 hover:text-white"
              aria-label={`Copy ${title}`}
            >
              <IconCopy className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const containerClasses =
    "border rounded-xl p-5 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 " +
    "bg-[#0a0a0a] " +
    "border-neutral-800 " +
    "hover:border-neutral-500";

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
