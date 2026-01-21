import React from "react";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";

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
    <footer className="w-full py-12 border-t border-neutral-200 dark:border-white/5 bg-neutral-50 dark:bg-black/40 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-linear-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-5">
        {/* Left: Location & Branding */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="text-[10px] font-bold tracking-[0.2em] text-neutral-400 dark:text-neutral-500 uppercase">
            Based in
          </p>
          <p className="text-base font-medium text-neutral-900 dark:text-white flex items-center gap-1.5">
            <span className="text-lg">📍</span> Iloilo City, Philippines
          </p>
        </div>

        {/* Center: Social Links */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-[10px] font-bold tracking-[0.2em] text-neutral-400 dark:text-neutral-500 uppercase">
            Let&apos;s Connect
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl transition-all duration-300 text-neutral-500 hover:text-cyan-500 dark:hover:text-cyan-400 bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-white/10 hover:scale-110 hover:shadow-xl hover:shadow-cyan-500/10 active:scale-95"
                aria-label={social.label}
              >
                <social.icon size={20} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        {/* Right: Copyright */}
        <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
          <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
            © {new Date().getFullYear()}{" "}
            <span className="font-bold text-neutral-900 dark:text-white tracking-tighter">
              CJBLACK
            </span>
          </p>
          <p className="text-[10px] text-neutral-400 dark:text-neutral-600 font-medium tracking-wide">
            Built with <span className="text-red-500">❤️</span> using Next.js &
            Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
