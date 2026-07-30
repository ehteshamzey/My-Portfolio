import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { ExperienceEducation } from "@/components/ExperienceEducation";
import { Blog } from "@/components/sections/blog";
import { Contact } from "@/components/sections/contact";
import { Leadership } from "@/components/Leadership";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <ExperienceEducation />
      <Blog />
      <Contact />
      <Leadership />
    </>
  );
}
