"use client";

import React from "react";
import { IconX, IconDownload } from "@tabler/icons-react";
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/90"
          onClick={onClose}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full h-full bg-neutral-900 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-neutral-800 bg-neutral-900 shrink-0">
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                Curriculum Vitae
              </h2>
              <div className="flex items-center gap-2 sm:gap-4">
                <a
                  href={cvUrl}
                  download="CJBLACK_Resume.pdf"
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium text-black bg-white rounded-lg hover:bg-neutral-200 transition-colors"
                >
                  <IconDownload size={18} />
                  <span className="hidden sm:inline">Download</span>
                </a>
                <button
                  onClick={onClose}
                  className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <IconX size={24} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden bg-white">
              {isMobile ? (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-neutral-800">
                  <p className="text-white text-lg mb-6">
                    PDF preview is not available on mobile devices.
                  </p>
                  <div className="flex flex-col gap-4 w-full max-w-xs">
                    <a
                      href={cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-white bg-cyan-500 rounded-lg hover:bg-cyan-600 transition-colors"
                    >
                      Open in New Tab
                    </a>
                    <a
                      href={cvUrl}
                      download="CJBLACK_Resume.pdf"
                      className="flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-black bg-white rounded-lg hover:bg-neutral-200 transition-colors"
                    >
                      <IconDownload size={20} />
                      Download PDF
                    </a>
                  </div>
                </div>
              ) : (
                <iframe
                  src={`${cvUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                  className="w-full h-full border-none"
                  title="CV Preview"
                  loading="eager"
                />
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
