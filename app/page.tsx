import Hero from "@/components/Hero";
import demo_babul from "@/data/demo_ba6ul";
import { FeaturedProjects } from "@/components/projects/FeaturedProjects";
import { TechStackTicker } from "@/components/TechStackTicker";
import Experience from "@/components/Experience";
import { VideoShowcase } from "@/components/VideoShowcase";

export default function YourPage() {
  return (
    <>
      <Hero person={demo_babul} />
      <TechStackTicker />
      <Experience items={demo_babul.experience} />
      <FeaturedProjects />
      <VideoShowcase />
    </>
  );
}