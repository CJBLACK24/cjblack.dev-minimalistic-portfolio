import React from "react";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";
import { BugReportButton } from "@/components/feedback/BugReportButton";

const socialLinks = [
  {
    href: "https://github.com/CJBLACK24",
    icon: IconBrandGithub,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/cj-black-a5b110335",
    icon: IconBrandLinkedin,
    label: "LinkedIn",
  },
  { href: "https://x.com/JohnCjblack", icon: IconBrandX, label: "X" },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-neutral-100 bg-white dark:border-white/10 dark:bg-black">
      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center justify-between gap-6 px-6 py-8 md:flex-row md:gap-0 md:px-8">
        {/* Left: Copyright */}
        <p className="text-sm text-neutral-500 dark:text-neutral-500">
          © {new Date().getFullYear()} CJBLACK. All rights reserved.
        </p>

        {/* Right: Actions & Socials */}
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 transition-colors hover:text-neutral-900 dark:hover:text-white"
                aria-label={social.label}
              >
                <social.icon size={20} strokeWidth={1.5} />
              </a>
            ))}
          </div>

          {/* Bug Report - distinct but minimal */}
          <BugReportButton />
        </div>
      </div>
    </footer>
  );
}
