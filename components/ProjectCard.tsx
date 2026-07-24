import Link from "next/link";

import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "focus-visible:ring-ring focus-visible:ring-offset-background group block h-full focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        className,
      )}
    >
      <Card className="hover:border-primary/60 flex h-full flex-col transition-colors">
        <CardHeader>
          <p className="text-muted-foreground font-mono text-xs">
            <span className="text-primary">$</span> open {project.slug}.md
          </p>
          <CardTitle className="text-primary group-hover:text-primary mt-1 text-lg">
            {project.title}
          </CardTitle>
          <p className="text-muted-foreground font-mono text-xs">{project.date}</p>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col justify-between gap-4">
          <p className="text-muted-foreground text-sm">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="border-primary/40 text-primary inline-flex items-center border px-2 py-0.5 font-mono text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
