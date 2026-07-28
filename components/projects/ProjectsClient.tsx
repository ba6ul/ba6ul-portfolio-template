"use client";
import * as React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolio } from "@/data/content/projects";
import { VideoCard } from "@/components/projects/VideoCard";
import { SlideshowCard } from "@/components/projects/SlideshowCard";
import { FilterBar } from "@/components/projects/FilterBar";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project } from "@/data/content/projects";
import { media } from "@/data/content/media";
import type { MediaEntry } from "@/data/content/media";

function reorderFeatured(projects: Project[]): Project[] {
  const featuredIndex = projects.findIndex((p) => p.featured);
  if (featuredIndex === -1) return projects;

  const middle = Math.floor((projects.length - 1) / 2);
  if (featuredIndex === middle) return projects;

  const copy = [...projects];
  const [featuredItem] = copy.splice(featuredIndex, 1);
  copy.splice(middle, 0, featuredItem);
  return copy;
}

// "Open Source" isn't its own dimension of `category` (that's platform/type:
// Mobile/Web/Video) — it's whether the repo is public, which a `github`
// link already tells us. Keeps the data model from needing a project to
// pick between "Mobile" and "Open Source" when it's honestly both.
function matchesCategory(project: Project, category: string): boolean {
  if (category === "All") return true;
  if (category === "Open Source") return Boolean(project.github);
  return project.category === category;
}

// Fixed seed, not Math.random() or Date.now() — the arrangement needs to
// look organic (not "projects first, then all the videos, in list order")
// but still be the exact same arrangement on every visit, including
// matching between server render and client hydration.
const BENTO_SEED = 1932716;

// Every grid cell is one equal-height "slot" (2 units). A video is only
// half a unit tall (it's a horizontal YouTube thumbnail) so two of them
// always get stacked together to fill a slot. An image/gif/slideshow is
// vertical, not horizontal like a video thumbnail, so it fills a whole slot
// on its own instead — same tier as a Project, never paired up.
type BentoSlot =
  | { kind: "project"; id: string; project: Project }
  | { kind: "media"; id: string; media: MediaEntry }
  | { kind: "videoPair"; id: string; videos: [Project, Project] };

function createSeededRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };
}

function seededShuffle<T>(items: T[], random: () => number): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function chunk<T>(items: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    result.push(items.slice(i, i + size));
  }
  return result;
}

interface ProjectsClientProps {
  projects: Project[];
}

export function ProjectsClient({ projects }: ProjectsClientProps) {
  const [activeCategory, setActiveCategory] = React.useState("All");
  const isAll = activeCategory === "All";

  const codeItems = reorderFeatured(
    projects.filter(
      (p) => p.type !== "video" && matchesCategory(p, activeCategory)
    )
  );
  const videoItems = projects.filter(
    (p) => p.type === "video" && matchesCategory(p, activeCategory)
  );

  // Bento pairing only makes sense across the unfiltered "All" view — once
  // a specific category is picked there's usually only one content type
  // left to show, so there's nothing to pair.
  const showBento =
    isAll && codeItems.length > 0 && (videoItems.length > 0 || media.length > 0);

  const random = createSeededRandom(BENTO_SEED);
  const shuffledVideos = showBento ? seededShuffle(videoItems, random) : videoItems;

  // Pair videos 2-at-a-time (in shuffled order) into single slots. An odd
  // one out has no pair and is never placed in the grid — see leftoverVideo.
  const videoPairs = chunk(shuffledVideos, 2).filter(
    (pair): pair is [Project, Project] => pair.length === 2
  );
  const leftoverVideo =
    showBento && shuffledVideos.length % 2 === 1
      ? shuffledVideos[shuffledVideos.length - 1]
      : null;

  // Shuffle project-slots, media-slots, and video-pair-slots together so
  // which slot type lands where in the grid is random, while every slot
  // itself is always exactly one equal-height unit.
  const bentoSlots: BentoSlot[] = showBento
    ? seededShuffle<BentoSlot>(
        [
          ...codeItems.map((project) => ({
            kind: "project" as const,
            id: `p-${project.id}`,
            project,
          })),
          ...media.map((entry) => ({
            kind: "media" as const,
            id: `m-${entry.id}`,
            media: entry,
          })),
          ...videoPairs.map((pair) => ({
            kind: "videoPair" as const,
            id: `v-${pair[0].id}`,
            videos: pair,
          })),
        ],
        random
      )
    : [];

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to portfolio
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 space-y-2"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Portfolio
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          All Projects
        </h1>
        <p className="text-muted-foreground max-w-lg">
          A collection of projects I&apos;ve built — from full-stack web apps to
          open-source tools and UI experiments.
        </p>
      </motion.div>

      {/* Filter bar */}
      <div className="mb-10">
        <FilterBar active={activeCategory} onChange={setActiveCategory} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {showBento ? (
            // Bento grid: every cell is one equal-height slot — a project
            // alone, an image/gif/slideshow alone (vertical, so it takes a
            // full slot same as a project), or two videos stacked (a video
            // thumbnail is horizontal, so it's only half a slot on its
            // own). Which slot type lands where is shuffled, seeded so it's
            // stable across visits, not a fixed "projects first, then all
            // videos" pattern down the page.
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {bentoSlots.map((slot) => {
                  if (slot.kind === "project") {
                    return <ProjectCard key={slot.id} project={slot.project} />;
                  }
                  if (slot.kind === "media") {
                    return <SlideshowCard key={slot.id} media={slot.media} />;
                  }
                  return (
                    <div key={slot.id} className="flex flex-col gap-4">
                      <VideoCard project={slot.videos[0]} />
                      <VideoCard project={slot.videos[1]} />
                    </div>
                  );
                })}
              </div>

              {/* A video with no pair never joins the grid above — it would
                  only be half a slot tall and break alignment with its
                  row-mates. Shown separately at its natural size instead. */}
              {leftoverVideo && (
                <div className="max-w-80">
                  <VideoCard project={leftoverVideo} />
                </div>
              )}
            </div>
          ) : (
            <>
              {codeItems.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {codeItems.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              )}

              {videoItems.length > 0 && (
                <div className={codeItems.length > 0 ? "mt-16" : ""}>
                  <div className="grid gap-5 grid-cols-2 lg:grid-cols-4">
                    {videoItems.map((video) => (
                      <VideoCard key={video.id} project={video} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {codeItems.length === 0 && videoItems.length === 0 && (
            <div className="py-24 text-center text-muted-foreground">
              No projects in this category yet.
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
