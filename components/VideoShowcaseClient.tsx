// @/components/profile/VideoShowcaseClient.tsx

"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

// Extends your base VideoEntry with the metadata fetched from the server.
interface VideoWithMeta {
  id: string;
  url: string;
  featured?: boolean;
  title: string;
  channel: string;
  thumbnail: string;
}

// Sub-component: Handles displaying EITHER a thumbnail button OR an actual YouTube iframe.
function VideoPlayer({ video, size }: { video: VideoWithMeta; size: "large" | "small" }) {
  const [playing, setPlaying] = useState(false);

  // If clicked, load the heavy iframe. This is an EXCELLENT performance pattern known as a "Facade".
  // Loading 5 YouTube iframes on page load would kill your Lighthouse score. Loading images first fixes that.
  if (playing) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
          title={video.title}
          allow="accelerate-encoder; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  
  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block w-full overflow-hidden rounded-xl bg-secondary"
      aria-label={`Play ${video.title}`}
    >
      <div className="relative aspect-video w-full">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
          <div
            className={
              size === "large"
                ? "flex h-16 w-16 items-center justify-center rounded-full bg-white/90"
                : "flex h-8 w-8 items-center justify-center rounded-full bg-white/90"
            }
          >
            <Play className={size === "large" ? "h-6 w-6 fill-current text-black" : "h-3.5 w-3.5 fill-current text-black"} />
          </div>
        </div>
      </div>
    </button>
  );
}

export function VideoShowcaseClient({ videos }: { videos: VideoWithMeta[] }) {
  const featured = videos.find((v) => v.featured) ?? videos[0];
  const rest = videos.filter((v) => v.id !== featured.id);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8 space-y-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Edits & Motion Work
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Recent Cuts
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="lg:col-span-2"
        >
          <VideoPlayer video={featured} size="large" />
          <div className="mt-3 space-y-1">
            <h3 className="font-semibold text-foreground">{featured.title}</h3>
            {featured.channel && (
              <p className="text-sm text-muted-foreground">{featured.channel}</p>
            )}
          </div>
        </motion.div>

        <div className="flex flex-col gap-5">
          {rest.map((video) => (
            <motion.div
              key={video.id}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex gap-3"
            >
              <div className="w-32 flex-shrink-0">
                <VideoPlayer video={video} size="small" />
              </div>
              <div className="flex flex-col justify-center gap-0.5">
                <h3 className="text-sm font-semibold text-foreground">{video.title}</h3>
                {video.channel && (
                  <p className="text-xs text-muted-foreground">{video.channel}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}