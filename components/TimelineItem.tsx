"use client";

import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface TimelineItemProps {
  title: string;
  subtitle: string;
  meta?: string;
  description?: string;
}

export function TimelineItem({ title, subtitle, meta, description }: TimelineItemProps) {
  return (
    <motion.div
      variants={itemVariants}
      transition={{ duration: 0.4 }}
      className="border-border relative border-l-2 pb-10 pl-6 last:pb-0"
    >
      <span
        className="bg-background text-primary absolute top-0 -left-[11px] font-mono text-sm leading-none"
        aria-hidden="true"
      >
        &gt;
      </span>
      <p className="text-primary font-mono text-lg font-bold tracking-tight">{title}</p>
      <p className="text-muted-foreground mt-1 font-mono text-xs">
        {subtitle}
        {meta ? ` — ${meta}` : ""}
      </p>
      {description ? <p className="text-foreground mt-3 leading-relaxed">{description}</p> : null}
    </motion.div>
  );
}
