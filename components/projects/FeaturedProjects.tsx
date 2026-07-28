"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { portfolio, type Project } from "@/data/content/projects";

function reorderFeaturedToCenter(projects: Project[]): Project[] {
  const featuredIndex = projects.findIndex((p) => p.featured);
  if (featuredIndex === -1) return projects;
  const copy = [...projects];
  const [featuredItem] = copy.splice(featuredIndex, 1);
  copy.splice(1, 0, featuredItem);
  return copy;
}

export function FeaturedProjects() {
  const initialProjects = portfolio.projects.slice(0, 3);
  const featuredProjects = reorderFeaturedToCenter(initialProjects);

  // Carousel tracking state
  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll loop effect
  useEffect(() => {
    if (featuredProjects.length === 0) return;
    timeoutRef.current = setTimeout(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === featuredProjects.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000); // 5 seconds
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [activeIndex, featuredProjects.length]);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 md:py-16">
      <div className="mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-0">
        <h2 className="flex items-center gap-2 text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          <Star className="h-4 sm:h-5 w-4 sm:w-5 shrink-0 fill-[#C15F3C] text-[#C15F3C]" />
          <span>Selected Work</span>
        </h2>
        <Link
          href="/projects"
          className="text-xs sm:text-sm font-medium text-[#C15F3C] hover:text-[#C15F3C]/80 transition-colors whitespace-nowrap"
        >
          View all projects →
        </Link>
      </div>

      {/* Mobile Animated Slider */}
      <div className="md:hidden w-full overflow-hidden px-1">
        <div className="relative w-full">
          <AnimatePresence mode="popLayout">
            {featuredProjects.map((project, index) => {
              if (index !== activeIndex) return null;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="w-full"
                >
                  <ProjectCard project={project} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* 3 Dot Navigation Indicators */}
        <div className="flex justify-center items-center gap-2 mt-4">
          {featuredProjects.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}

              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-6 bg-[#C15F3C]"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Grid - Visible on screens md (768px) and larger */}
      <div className="hidden md:grid grid-cols-2 gap-5 lg:grid-cols-3 lg:gap-6">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}