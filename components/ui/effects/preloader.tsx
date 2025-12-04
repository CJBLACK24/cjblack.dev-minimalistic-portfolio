"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { words } from "@/constants";

export const Preloader = ({ finishLoading }: { finishLoading: () => void }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index === words.length - 1) {
      setTimeout(() => {
        finishLoading();
      }, 1000);
      return;
    }

    const timeout = setTimeout(
      () => {
        setIndex(index + 1);
      },
      index === 0 ? 1000 : 400
    );

    return () => clearTimeout(timeout);
  }, [index, finishLoading]);

  return (
    <motion.div
      variants={fadeOut}
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
      style={{ height: "100vh", minHeight: "100vh" }}
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          variants={opacity}
          initial="initial"
          animate="enter"
          exit="exit"
          className="text-6xl font-bold text-white md:text-8xl lg:text-9xl"
        >
          {words[index]}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
};

const fadeOut = {
  initial: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1] as const,
      delay: 0.3,
    },
  },
};

const opacity = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.32, 0, 0.67, 0] as const,
    },
  },
};
