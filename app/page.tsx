import Hero from "@/components/Hero";
import demo_babul from "@/data/demo_ba6ul";
import { FeaturedProjects } from "@/components/projects/FeaturedProjects";
import { TechStackTicker } from "@/components/TechStackTicker";



export default function Home() {
  return (
    <>
      <Hero person={demo_babul} />
      <TechStackTicker />
      <FeaturedProjects />

    </>
  );
}