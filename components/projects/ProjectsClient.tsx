"use client";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolio } from "@/data/projects";
import { FilterBar } from "@/components/projects/FilterBar";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project } from "@/data/projects";

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

export function ProjectsClient() {
  const [activeCategory, setActiveCategory] = React.useState("All");
  const filtered = reorderFeatured(
    portfolio.projects.filter(
      (p) => activeCategory === "All" || p.category === activeCategory
    )
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
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

      {/* Grid — each ProjectCard handles its own scroll-in animation internally */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Empty state */}
      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-24 text-center text-muted-foreground"
        >
          No projects in this category yet.
        </motion.div>
      )}
    </div>
  );
}