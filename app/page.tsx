import Hero from "@/components/ui/Hero/Hero";
import demo_babul from "@/data/team/demo/ba6ul_index_demo";
import { FeaturedProjects } from "@/components/projects/FeaturedProjects";
import { TechStackTicker } from "@/components/TechStackTicker";
import Experience from "@/components/Experience";
import { VideoShowcase } from "@/components/VideoShowcase";

export default function YourPage() {
  return (
    <>
      <Hero person={demo_babul} />
      <TechStackTicker />
      {/* {githubUsername && <GitHubActivity username={githubUsername} />} */}
      <Experience items={demo_babul.experience} />
      <FeaturedProjects />
      <VideoShowcase />
    </>
  );
}