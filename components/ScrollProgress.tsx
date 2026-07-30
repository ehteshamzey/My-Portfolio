"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    mass: 0.2,
    restDelta: 0.001,
  });

  const [percent, setPercent] = useState(0);
  useMotionValueEvent(smoothed, "change", (value) => setPercent(Math.round(value * 100)));

  return (
    <div
      className="border-border bg-background/95 text-primary pointer-events-none fixed right-4 bottom-4 z-50 border px-2 py-1 font-mono text-xs backdrop-blur"
      aria-hidden="true"
    >
      [ scroll: {percent}% ]
      <motion.div className="bg-primary/60 mt-1 h-px origin-left" style={{ scaleX: smoothed }} />
    </div>
  );
}
