import Link from "next/link";
import { Star } from "lucide-react";
import { ProjectCard } from "@/components/projects/ProjectCard";
// Import both the data and the type right from your data file
import { portfolio, type Project } from "@/data/projects";

/**
 * Takes an array of 3 projects and moves the featured project 
 * exactly to the center position (index 1).
 */
function reorderFeaturedToCenter(projects: Project[]): Project[] {
  const featuredIndex = projects.findIndex((p) => p.featured);
  
  // If no featured project exists, or it's already in the middle, change nothing
  if (featuredIndex === -1) return projects;

  const copy = [...projects];
  const [featuredItem] = copy.splice(featuredIndex, 1);
  
  // Splice it directly into index 1 (the center of 3 elements)
  copy.splice(1, 0, featuredItem);
  return copy;
}

export function FeaturedProjects() {
  // Pull the top 3 projects from your portfolio data
  const initialProjects = portfolio.projects.slice(0, 3);
  const featuredProjects = reorderFeaturedToCenter(initialProjects);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-foreground">
          {/* Custom color hex injected using Tailwind's arbitrary bracket syntax */}
          <Star className="h-5 w-5 fill-[#2440D6] text-[#2440D6]" />
          Selected Work
        </h2>
        <Link
          href="/projects"
          className="text-sm font-medium text-[#2440D6] hover:text-[#1d33ab] transition-colors"
        >
          View all projects →
        </Link>
      </div>
      
      {/* 3-column grid structure */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}