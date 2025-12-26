"use client";

import { motion, Variants } from "motion/react";
import { BorderMagicButton } from "@/components/ui/buttons/border-magic-button";
import { Spotlight } from "@/components/ui/backgrounds/spotlight-new";
import { HoverBorderGradient } from "@/components/ui/buttons/hover-border-gradient";
import { AnimatedTooltip } from "@/components/ui/misc/animated-hero-tooltip";
import { Tooltip } from "@/components/ui/cards/tooltip-card";
import { FlipWords } from "@/components/ui/text/flip-words";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { MobileMenu } from "@/components/layout/mobile-menu";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconBrandX,
  IconBulb,
  IconPalette,
  IconMessageCircle,
  IconCode,
  IconLogout,
} from "@tabler/icons-react";
import { CVPreviewModal } from "@/components/modals/cv-preview-modal";
import confetti from "canvas-confetti";
import { useSession, signOut } from "@/lib/auth-client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/primitives/avatar";
import { useRouter } from "next/navigation";

export function HeroSectionOne() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { data: session, isPending } = useSession();
  const router = useRouter();

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await signOut();
    setShowUserMenu(false);
    router.refresh();
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const navItems = [
    { name: "Projects", link: "#projects" },
    { name: "Technologies", link: "#technologies" },
    { name: "Contact", link: "#contact" },
  ];

  const techStack = [
    {
      id: 1,
      name: "Next.js",
      designation: "React Framework",
      image: "/nextjs-logo.svg",
    },
    {
      id: 2,
      name: "React",
      designation: "UI Library",
      image:
        "https://camo.githubusercontent.com/afdf5a3b933086604f6acf89a8fa2a321aaa6d912919c573f87545587a59333f/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f72656163742d69636f6e2e737667",
    },
    {
      id: 3,
      name: "JavaScript",
      designation: "Language",
      image:
        "https://camo.githubusercontent.com/739ff4cc642d6d72a274d75aa0a16d85782c91011453641c1bcc47d872faf42d/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f6a732d69636f6e2e737667",
    },
    {
      id: 4,
      name: "TypeScript",
      designation: "Type Safety",
      image:
        "https://camo.githubusercontent.com/5c3873b6812ecfb1d2bc6ece8c2c548d53d151c2edbf6b0281207672ca3ab0a8/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f74732d69636f6e2e737667",
    },
    {
      id: 5,
      name: "Webpack",
      designation: "Bundler",
      image:
        "https://camo.githubusercontent.com/971dc0f889a81abf890b811ea97765459c01e50470aa92927fc63109867dc35e/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f7765627061636b2d69636f6e2e737667",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1], // Custom cubic bezier for smooth feel
      },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, rotate: -2 },
    visible: {
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" />

      {/* Header Navigation */}
      <header className="flex items-center justify-between py-4 w-full relative z-50">
        {/* Social Media Icons */}
        <div className="flex items-center gap-3">
          <Link
            href="https://github.com/CJBLACK24"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-all group"
            aria-label="Visit GitHub Profile"
          >
            <IconBrandGithub
              size={20}
              className="group-hover:scale-110 transition-transform"
            />
          </Link>
          <Link
            href="https://www.linkedin.com/in/cj-black-a5b110335"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-[#0A66C2] hover:border-[#0A66C2]/50 transition-all group"
            aria-label="Visit LinkedIn Profile"
          >
            <IconBrandLinkedin
              size={20}
              className="group-hover:scale-110 transition-transform"
            />
          </Link>
          <Link
            href="https://www.facebook.com/ChrisNoLimit1124"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-[#1877F2] hover:border-[#1877F2]/50 transition-all group"
            aria-label="Visit Facebook Profile"
          >
            <IconBrandFacebook
              size={20}
              className="group-hover:scale-110 transition-transform"
            />
          </Link>
          <Link
            href="https://x.com/JohnCjblack"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-all group"
            aria-label="Visit X Profile"
          >
            <IconBrandX
              size={20}
              className="group-hover:scale-110 transition-transform"
            />
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className="text-base font-medium text-neutral-300 hover:text-white transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <BorderMagicButton
            onClick={(e) => {
              setIsCVModalOpen(true);
              confetti({
                particleCount: 100,
                spread: 70,
                origin: {
                  x: e.clientX / window.innerWidth,
                  y: e.clientY / window.innerHeight,
                },
                colors: ["#06b6d4", "#3b82f6", "#ffffff"],
              });
            }}
          >
            Download CV
          </BorderMagicButton>

          <CVPreviewModal
            isOpen={isCVModalOpen}
            onClose={() => setIsCVModalOpen(false)}
            cvUrl="/CV/cjblack_resume.pdf"
          />
        </div>

        {/* Mobile Menu or Avatar */}
        <div className="md:hidden flex items-center">
          {!isPending && session?.user ? (
            // Show avatar when logged in
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="p-1 hover:bg-neutral-900 rounded-full transition-colors cursor-pointer"
                aria-label="User menu"
              >
                <Avatar className="w-10 h-10 border-2 border-neutral-800 hover:border-cyan-500 transition-colors">
                  <AvatarImage
                    src={session.user.image || ""}
                    alt={session.user.name || "User"}
                  />
                  <AvatarFallback className="bg-cyan-600 text-white font-semibold">
                    {getInitials(session.user.name || "User")}
                  </AvatarFallback>
                </Avatar>
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-56 bg-neutral-900 border border-neutral-800 rounded-lg shadow-lg overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-neutral-800">
                    <p className="text-white font-medium text-sm truncate">
                      {session.user.name}
                    </p>
                    <p className="text-neutral-400 text-xs truncate">
                      {session.user.email}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left text-red-400 hover:bg-neutral-800 transition-colors flex items-center gap-2"
                  >
                    <IconLogout size={18} />
                    <span className="text-sm">Logout</span>
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            // Show mobile menu when not logged in
            <MobileMenu />
          )}
        </div>
      </header>

      {/* Hero Content */}
      <motion.div
        className="flex-1 flex flex-col items-center justify-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="absolute inset-y-0 left-0 md:left-0 h-full w-px bg-neutral-800/50 ml-1 md:ml-0">
          <div className="absolute top-0 h-100 w-px bg-linear-to-b from-transparent via-cyan-500 to-transparent" />
        </div>
        <div className="absolute inset-y-0 right-0 md:right-0 h-full w-px bg-neutral-800/50 mr-1 md:mr-0">
          <div className="absolute h-100 w-px bg-linear-to-b from-transparent via-cyan-500 to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-800/50">
          <div className="absolute mx-auto h-px w-40 bg-linear-to-r from-transparent via-cyan-500 to-transparent" />
        </div>
        <div className="absolute inset-x-0 top-0 h-px w-full bg-neutral-800/50">
          <div className="absolute mx-auto h-px w-40 bg-linear-to-r from-transparent via-cyan-500 to-transparent" />
        </div>

        <div className="py-8 md:py-12">
          {/* Two Column Layout: Image Left, Content Right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 lg:gap-10 items-center md:-ml-20 lg:-ml-40">
            {/* Left Column - Image */}
            <motion.div
              variants={imageVariants}
              className="flex justify-center md:justify-end"
            >
              <div className="relative w-full max-w-[260px] h-[320px] sm:max-w-[300px] sm:h-[380px] md:max-w-[280px] md:h-[360px] lg:max-w-[380px] lg:h-[480px] xl:max-w-[420px] xl:h-[520px]">
                <Image
                  src="/cj.png"
                  alt="Profile"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="rounded-2xl object-cover shadow-2xl"
                  priority
                />
              </div>
            </motion.div>

            {/* Right Column - Content */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left mt-12 md:mt-4">
              {/* Hover Border Gradient Badge */}
              <motion.div variants={itemVariants} className="mb-5 mt-1">
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                  </span>
                  Available for Opportunities
                </HoverBorderGradient>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="relative z-10 max-w-4xl text-3xl sm:text-4xl md:text-3xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white mb-4 md:mb-6 leading-[1.1]"
              >
                <div className="flex flex-nowrap items-center justify-center md:justify-start gap-1.5 sm:gap-2">
                  <span className="inline-block text-white whitespace-nowrap">
                    Shaping&nbsp;
                  </span>

                  <motion.div
                    key={currentWordIndex}
                    initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-1 rounded-lg bg-neutral-900/50 border border-neutral-800 text-cyan-400 shrink-0"
                  >
                    {currentWordIndex === 0 && (
                      <IconBulb
                        className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
                        stroke={2}
                      />
                    )}
                    {currentWordIndex === 1 && (
                      <IconPalette
                        className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
                        stroke={2}
                      />
                    )}
                    {currentWordIndex === 2 && (
                      <IconMessageCircle
                        className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
                        stroke={2}
                      />
                    )}
                    {currentWordIndex === 3 && (
                      <IconCode
                        className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
                        stroke={2}
                      />
                    )}
                  </motion.div>

                  <div className="min-w-[70px] sm:min-w-[100px] md:min-w-[90px] lg:min-w-[160px] xl:min-w-[220px] 2xl:min-w-[280px]">
                    <FlipWords
                      words={["Ideas", "Plans", "Designs", "Code"]}
                      duration={2500}
                      className="text-white font-bold m-0! p-0! whitespace-nowrap"
                      onWordChange={setCurrentWordIndex}
                    />
                  </div>
                </div>

                <div className="block whitespace-nowrap">
                  <span className="inline-block text-white">
                    into Real Projects
                  </span>
                </div>

                <div className="block whitespace-nowrap">
                  <span className="text-white">that </span>
                  <span className="inline-block text-transparent bg-clip-text bg-linear-to-bl from-cyan-400 to-white">
                    Deliver Results
                  </span>
                </div>
              </motion.h1>

              <motion.div
                variants={itemVariants}
                className="relative z-10 max-w-xl text-xl font-normal mb-6 md:mb-8"
                style={{ color: "rgb(194, 205, 231)" }}
              >
                I&apos;m{" "}
                <Tooltip
                  content={
                    <div className="space-y-2">
                      <div className="border-b border-neutral-700 pb-2">
                        <p className="text-sm font-semibold text-white">
                          Christian John Calderon Duque
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-neutral-400">
                          Based in Iloilo, Philippines
                        </p>
                        <p className="text-xs text-neutral-400">
                          Born: November 24, 2002
                        </p>
                      </div>
                    </div>
                  }
                  containerClassName="inline"
                >
                  <span className="text-cyan-100 hover:text-cyan-300 cursor-help transition-colors">
                    CJ
                  </span>
                </Tooltip>
                , a{" "}
                <Tooltip
                  content={
                    <div className="space-y-3">
                      <div className="border-b border-neutral-700 pb-2">
                        <h3 className="text-base font-semibold text-white mb-1">
                          Western Institute of Technology
                        </h3>
                        <p className="text-xs text-neutral-500">
                          Iloilo City, Philippines
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs font-medium text-neutral-300">
                            Degree Program
                          </p>
                          <p className="text-sm text-white">
                            Bachelor of Science in Information Technology (BSIT)
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-xs font-medium text-neutral-300">
                              Started
                            </p>
                            <p className="text-sm text-white">2022</p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-neutral-300">
                              Expected Graduation
                            </p>
                            <p className="text-sm text-white">April 2026</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                  containerClassName="inline"
                >
                  <span className="text-cyan-100 hover:text-cyan-300 cursor-help transition-colors">
                    student
                  </span>
                </Tooltip>{" "}
                and developer with a passion for code.
              </motion.div>

              {/* View Works Button, GitHub Link, and Tech Stack */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center md:items-start gap-6 mb-10 w-full"
              >
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <a href="#projects" className="scroll-smooth">
                    <BorderMagicButton className="gap-2 group">
                      <IconPalette className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      View my works
                    </BorderMagicButton>
                  </a>

                  <Link
                    href="https://github.com/CJBLACK24"
                    target="_blank"
                    className="group relative inline-flex h-12 overflow-hidden rounded-full p-px focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                  >
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl transition-colors hover:text-cyan-400 gap-2">
                      <IconBrandGithub className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      GitHub
                    </span>
                  </Link>
                </div>

                <div className="flex items-center justify-center md:justify-start">
                  <AnimatedTooltip items={techStack} />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
