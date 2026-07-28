"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { MediaEntry } from "@/data/content/media";

const INTERVAL_MS = 6000;

interface SlideshowCardProps {
  media: MediaEntry;
}

// Rendered as a full slot — the same tier as ProjectCard, not paired up
// like VideoCard — since these are vertical/portrait sources, unlike a
// horizontal YouTube thumbnail. h-full instead of a fixed aspect ratio: it
// fills whatever height the grid row gives it (naturally matching whatever
// ProjectCard ends up being in that row), cropping via object-cover.
export function SlideshowCard({ media }: SlideshowCardProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (media.images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % media.images.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [media.images.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-full"
    >
      <div className="relative h-full w-full overflow-hidden rounded-3xl border border-border bg-black">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Image
              src={media.images[index]}
              alt=""
              fill
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Progress dots — purely informational (how many images, which one
            we're on), not clickable/navigable. */}
        {media.images.length > 1 && (
          <div
            aria-hidden="true"
            className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5"
          >
            {media.images.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-4 bg-white" : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
