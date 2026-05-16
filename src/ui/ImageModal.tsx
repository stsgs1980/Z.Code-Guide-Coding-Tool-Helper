"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageModalProps {
  src: string;
  alt: string;
  className?: string;
  thumbnailHeight?: number;
  thumbnailWidth?: number;
}

export function ClickableImage({ 
  src, 
  alt, 
  className = "",
  thumbnailHeight,
  thumbnailWidth,
}: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeModal]);

  // Build inline styles for thumbnail sizing
  const thumbnailStyle: React.CSSProperties = {};
  if (thumbnailHeight) {
    thumbnailStyle.maxHeight = `${thumbnailHeight}px`;
  }
  if (thumbnailWidth) {
    thumbnailStyle.maxWidth = `${thumbnailWidth}px`;
  }

  return (
    <>
      {/* Clickable Image */}
      <div
        className={`relative group cursor-pointer overflow-hidden rounded-lg ${className}`}
        onClick={openModal}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-cover transition-transform duration-200 group-hover:scale-[1.02]"
          style={thumbnailStyle}
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-all duration-200 rounded-lg">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/50 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <ZoomIn className="h-3 w-3" />
            <span>Увеличить</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            {/* Image */}
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={src}
              alt={alt}
              className="max-w-[95vw] max-h-[95vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
