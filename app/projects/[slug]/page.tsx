import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { projects, getProjectBySlug } from "@/content/projects";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return { title: `${project.title} — Projects`, description: project.description };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <Section className="scroll-mt-24">
      <Container>
        <Link
          href="/#projects"
          className="text-muted-foreground hover:text-primary focus-visible:ring-ring focus-visible:ring-offset-background inline-flex items-center font-mono text-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <span className="text-primary">$</span>&nbsp;cd ..
          <span className="text-muted-foreground">&nbsp;# ← back to projects</span>
        </Link>

        <div className="border-border bg-card mt-6 border">
          <div className="border-border text-muted-foreground flex items-center gap-2 border-b px-4 py-2 font-mono text-xs">
            <span className="bg-destructive/70 h-2.5 w-2.5 rounded-full" aria-hidden="true" />
            <span className="bg-primary/50 h-2.5 w-2.5 rounded-full" aria-hidden="true" />
            <span className="bg-primary/70 h-2.5 w-2.5 rounded-full" aria-hidden="true" />
            <span className="ml-2">{project.slug}.md</span>
          </div>

          <div className="p-6 sm:p-8">
            <p className="text-muted-foreground font-mono text-sm">{project.date}</p>
            <h1 className="text-primary mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="text-muted-foreground"># </span>
              {project.title}
            </h1>

            <p className="text-foreground mt-6 leading-relaxed">{project.description}</p>

            <div className="mt-8">
              <p className="text-muted-foreground font-mono text-xs">## tags</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border-primary/40 text-primary inline-flex items-center border px-2 py-0.5 font-mono text-xs before:mr-1 before:content-['['] after:ml-1 after:content-[']']"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
