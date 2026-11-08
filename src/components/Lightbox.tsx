"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect } from "react";
import type { GalleryImage } from "../data/content";
import { Corners, Meta } from "./primitives";

export default function Lightbox({
  images,
  index,
  onClose,
  onIndex,
}: {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const open = index !== null;

  const next = useCallback(() => {
    if (index === null) return;
    onIndex((index + 1) % images.length);
  }, [index, images.length, onIndex]);

  const prev = useCallback(() => {
    if (index === null) return;
    onIndex((index - 1 + images.length) % images.length);
  }, [index, images.length, onIndex]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, next, prev, onClose]);

  return (
    <AnimatePresence>
      {open && index !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex flex-col bg-wine-950/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Photograph viewer"
          onClick={onClose}
        >
          {/* top bar */}
          <div className="flex items-center justify-between px-5 py-4 sm:px-8">
            <Meta className="text-cream/60">
              FR. {String(index + 1).padStart(3, "0")} / {String(images.length).padStart(3, "0")}
            </Meta>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close viewer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-brass-400 hover:text-brass-300"
            >
              <X size={18} />
            </button>
          </div>

          {/* image */}
          <div className="relative flex flex-1 items-center justify-center px-4 pb-4 sm:px-20">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous photograph"
              className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-cream/25 bg-wine-950/40 text-cream transition-colors hover:border-brass-400 hover:text-brass-300 sm:left-6"
            >
              <ChevronLeft size={20} />
            </button>

            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="relative max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <Corners className="text-brass-400/80" />
                <img
                  src={images[index].src}
                  alt={images[index].alt}
                  className="photo-grade max-h-[68vh] w-auto max-w-full object-contain shadow-lift sm:max-h-[72vh]"
                />
                <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <span className="font-display text-base italic text-cream/85 sm:text-lg">
                    {images[index].alt}
                  </span>
                  <Meta className="text-brass-400/80">ÉLORE · {new Date().getFullYear()}</Meta>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next photograph"
              className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-cream/25 bg-wine-950/40 text-cream transition-colors hover:border-brass-400 hover:text-brass-300 sm:right-6"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* thumbnails */}
          <div
            className="flex items-center justify-center gap-2.5 px-5 pb-6"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((img, i) => (
              <button
                key={img.src + i}
                type="button"
                onClick={() => onIndex(i)}
                aria-label={`Show photograph ${i + 1}`}
                className={`h-12 w-16 overflow-hidden border transition-all duration-300 ${
                  i === index
                    ? "border-brass-400 opacity-100"
                    : "border-transparent opacity-40 hover:opacity-80"
                }`}
              >
                <img src={img.src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
