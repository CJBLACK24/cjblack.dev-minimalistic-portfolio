"use client";

import React from "react";
import { IconX, IconDownload, IconEye } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

interface CVPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  cvUrl: string;
}

export function CVPreviewModal({
  isOpen,
  onClose,
  cvUrl,
}: CVPreviewModalProps) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-100 bg-black/60 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm will-change-[backdrop-filter]"
          onClick={onClose}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl h-[90vh] bg-neutral-900/95 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col backdrop-blur-2xl will-change-transform"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-white/5 backdrop-blur-xl shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                  <IconDownload size={20} className="text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white tracking-tight uppercase">
                    Curriculum Vitae
                  </h2>
                  <p className="text-[10px] text-neutral-500 font-mono tracking-widest uppercase mt-0.5">
                    Interactive Preview
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href={cvUrl}
                  download="CJBLACK_Resume.pdf"
                  className="hidden sm:flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-black bg-white rounded-xl hover:bg-neutral-200 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl"
                >
                  <IconDownload size={16} />
                  <span>Download PDF</span>
                </a>
                <button
                  onClick={onClose}
                  className="p-2.5 text-neutral-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 border border-transparent hover:border-white/10"
                  aria-label="Close"
                >
                  <IconX size={22} />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden relative">                  
              {isMobile ? (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-black/20">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-cyan-500/10 blur-2xl rounded-full" />
                    <div className="relative w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center border border-white/10 backdrop-blur-lg">
                      <IconDownload size={48} className="text-cyan-400" />
                    </div>
                  </div>
                  <h3 className="text-white text-2xl font-bold mb-3 tracking-tight">Curriculum Vitae</h3>
                  <p className="text-neutral-400 text-sm max-w-[280px] mb-10 leading-relaxed font-medium">
                    To provide the best viewing experience, please choose an option below.
                  </p>
                  <div className="flex flex-col gap-4 w-full max-w-xs">
                    <a
                      href={cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold text-white bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 backdrop-blur-md"
                    >
                      <IconEye size={18} />
                      Open Full Preview
                    </a>
                    <a
                      href={cvUrl}
                      download="CJBLACK_Resume.pdf"
                      className="flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold text-black bg-cyan-400 rounded-2xl hover:bg-cyan-300 transition-all duration-300 shadow-lg shadow-cyan-500/20"
                    >
                      <IconDownload size={18} />
                      Download Now
                    </a>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-neutral-900/60 transition-opacity duration-500">
                  <iframe
                    src={`${cvUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                    className="w-full h-full border-none"
                    title="CV Preview"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
