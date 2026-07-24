import { projects } from "@/content/projects";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ProjectGrid } from "@/components/ProjectGrid";

export function Projects() {
  return (
    <Section id="projects" className="scroll-mt-24">
      <Container>
        <p className="text-primary text-center font-mono text-sm">
          <span className="text-muted-foreground">$</span> ls projects/
        </p>
        <h2 className="text-foreground mt-2 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Things I&apos;ve Built
        </h2>

        <div className="mt-10">
          <ProjectGrid projects={projects} />
        </div>
      </Container>
    </Section>
  );
}
