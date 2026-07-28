import { Metadata } from "next";
import { portfolio, type Project } from "@/data/content/projects";
import { videos } from "@/data/content/videos";
import { getYoutubeMeta } from "@/lib/youtube";
import { ProjectsClient } from "@/components/projects/ProjectsClient";

export const metadata: Metadata = {
  title: "All Projects",
  description: "Every app, game, and video I've built and shipped.",
};

export default async function ProjectsPage() {
  const videosWithMeta = await Promise.all(
    videos.map(async (v) => ({
      ...v,
      ...(await getYoutubeMeta(v.id)),
    }))
  );

  const videoProjects: Project[] = videosWithMeta.map((v) => ({
    id: v.id,
    title: v.title,
    description: v.channel,
    category: "Video",
    image: v.thumbnail,
    type: "video",
    live: v.url,
    featured: v.featured,
  }));

  const allWorkItems = [...portfolio.projects, ...videoProjects];

  return <ProjectsClient projects={allWorkItems} />;
}
