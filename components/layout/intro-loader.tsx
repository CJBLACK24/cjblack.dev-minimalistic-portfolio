"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export function IntroLoader() {
  const [helloIndex, setHelloIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [customDelay, setCustomDelay] = useState(500); // Start with .5 delay for first word

  const hellos = [
    "👋Hello",
    "👋Hola",
    "👋Bonjour",
    "👋hallå",
    "👋안녕하세요",
    "👋Ciao",
    "👋Hallo",
    "👋Olá",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHelloIndex((prev) => {
        const nextIndex = prev + 1;
        
        // First word - already handled by initial customDelay
        if (nextIndex === 1) {
          setCustomDelay(200); // Speed up after first word
        }
        
        // Last word - set 1 second delay and trigger fade out
        if (nextIndex === hellos.length - 1) {
          setCustomDelay(500); // 1 second delay for last word
          setTimeout(() => setIsLoading(false), 500); // Fade out after 1 second
        }
        
        // If we've shown all greetings, clear interval
        if (nextIndex >= hellos.length) {
          clearInterval(interval);
          return prev;
        }
        
        return nextIndex;
      });
    }, customDelay);

    return () => clearInterval(interval);
  }, [customDelay, hellos.length]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black"
        >
          <motion.div
            key={helloIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "linear" }}
            className="text-5xl md:text-7xl font-bold text-cyan-100"
          >
            {hellos[helloIndex]}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}