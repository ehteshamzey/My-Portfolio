"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { aboutData } from "@/content/about";
import { siteConfig } from "@/content/siteConfig";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

function ProfileImage() {
  const [errored, setErrored] = useState(false);

  const initials = siteConfig.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  if (errored) {
    return (
      <div className="border-primary/50 bg-card text-primary flex aspect-square w-full max-w-sm items-center justify-center rounded-full border-2 text-6xl font-semibold">
        {initials}
      </div>
    );
  }

  return (
    <div className="border-primary/50 relative aspect-square w-full max-w-sm overflow-hidden rounded-full border-2 shadow-[0_0_40px_-8px_var(--color-primary)]">
      <Image
        src={aboutData.profileImage}
        alt={`Portrait of ${siteConfig.name}`}
        fill
        sizes="(min-width: 768px) 24rem, 80vw"
        className="object-cover"
        onError={() => setErrored(true)}
      />
    </div>
  );
}

export function About() {
  return (
    <Section id="about" className="scroll-mt-24 overflow-x-clip">
      <Container className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center"
        >
          <ProfileImage />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-4"
        >
          <p className="text-primary font-mono text-sm">
            <span className="text-muted-foreground">$</span> cat about.txt
          </p>
          <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            About Me
          </h2>
          {aboutData.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
