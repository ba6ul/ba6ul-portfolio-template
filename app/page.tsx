import Hero from "@/components/Hero";
import demo_babul from "@/data/demo_ba6ul";
import { FeaturedProjects } from "@/components/projects/FeaturedProjects";



export default function Home() {
  return (
    <>
      <Hero person={demo_babul} />
      <FeaturedProjects />

    </>
  );
}