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

    // Fire confetti on copy
    confetti({
      particleCount: 50,
      spread: 60,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      },
      colors: ["#06b6d4", "#ffffff"], // Cyan and White
      ticks: 200,
      gravity: 1.2,
      scalar: 0.8,
    });
  };

  const CardContent = () => (
    <>
      <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center mb-8 group-hover:bg-neutral-700 transition-colors">
        <div className="text-neutral-400 group-hover:text-white transition-colors">
          {icon}
        </div>
      </div>
      <div>
        <h4 className="text-neutral-400 font-medium mb-1">{title}</h4>
        <div className="flex items-center justify-between">
          <span className="text-white font-medium truncate mr-2">{value}</span>
          {copyable && (
            <button
              onClick={handleCopy}
              className="text-neutral-500 hover:text-white transition-colors cursor-pointer"
              aria-label={`Copy ${title}`}
            >
              <IconCopy className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </>
  );

  if (!clickable) {
    return (
      <div className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-6 flex flex-col justify-between group cursor-default">
        <CardContent />
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-6 flex flex-col justify-between hover:bg-neutral-800/50 transition-colors group cursor-pointer"
    >
      <CardContent />
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
