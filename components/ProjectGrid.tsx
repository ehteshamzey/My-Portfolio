"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ProjectCard } from "@/components/ProjectCard";

const ALL = "All";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [activeFilter, setActiveFilter] = useState<string>(ALL);

  const filters = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((project) => project.tags.forEach((tag) => tags.add(tag)));
    return [ALL, ...Array.from(tags)];
  }, [projects]);

  const visibleProjects = useMemo(() => {
    if (activeFilter === ALL) return projects;
    return projects.filter((project) => project.tags.includes(activeFilter));
  }, [projects, activeFilter]);

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {filters.map((filter) => {
          const isActive = filter === activeFilter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              aria-pressed={isActive}
              className={cn(
                "focus-visible:ring-ring focus-visible:ring-offset-background border px-3 py-1 font-mono text-xs transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                isActive
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/60 hover:text-primary",
              )}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <motion.div
        key={activeFilter}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {visibleProjects.map((project) => (
          <motion.div key={project.slug} variants={itemVariants} transition={{ duration: 0.4 }}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
