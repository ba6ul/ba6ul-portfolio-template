"use client";
import Image from "next/image";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "@/data/content/projects";

interface VideoCardProps {
  project: Project;
}

// Deliberately not ProjectCard's look — a video isn't a coded project with
// an internal detail page, it's a link out to YouTube. Styled closer to
// VideoShowcaseClient's thumbnail-with-play-button treatment so the whole
// site's video language stays consistent, just sized to fit this grid.
export function VideoCard({ project }: VideoCardProps) {
  const { title, description, image, live, featured } = project;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-full"
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="h-full"
      >
        <a
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow duration-200 hover:shadow-md"
        >
          <div className="relative aspect-video w-full overflow-hidden bg-black">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/35">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 transition-transform duration-200 group-hover:scale-110">
                <Play className="h-5 w-5 fill-current text-black" />
              </div>
            </div>
            {featured && (
              <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-black">
                Featured
              </span>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-1 px-4 py-3">
            <h3 className="line-clamp-2 text-sm font-semibold text-foreground">
              {title}
            </h3>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        </a>
      </motion.div>
    </motion.div>
  );
}
