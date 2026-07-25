"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

import { siteConfig } from "@/content/siteConfig";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { TypewriterText } from "@/components/TypewriterText";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  InstagramIcon,
  TelegramIcon,
  PhoneIcon,
} from "@/components/icons/social-icons";

const SOCIAL_LINKS = [
  ...(siteConfig.phone
    ? [{ label: "Call", href: `tel:${siteConfig.phone.replace(/\s+/g, "")}`, icon: PhoneIcon }]
    : []),
  { label: "Email", href: `mailto:${siteConfig.email}`, icon: Mail },
  { label: "GitHub", href: siteConfig.github, icon: GithubIcon },
  { label: "LinkedIn", href: siteConfig.linkedin, icon: LinkedinIcon },
  ...(siteConfig.twitter
    ? [{ label: "Twitter", href: siteConfig.twitter, icon: TwitterIcon }]
    : []),
  ...(siteConfig.instagram
    ? [{ label: "Instagram", href: siteConfig.instagram, icon: InstagramIcon }]
    : []),
  ...(siteConfig.telegram
    ? [{ label: "Telegram", href: siteConfig.telegram, icon: TelegramIcon }]
    : []),
];

const HERO_IMAGE = "/images/profile-hero.jpg";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: "easeOut" as const },
});

function HeroAvatar() {
  const [errored, setErrored] = useState(false);

  const initials = siteConfig.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  if (errored) {
    return (
      <div className="border-primary/50 bg-card text-primary flex h-28 w-28 items-center justify-center rounded-full border-2 text-3xl font-semibold sm:h-32 sm:w-32">
        {initials}
      </div>
    );
  }

  return (
    <div className="border-primary/50 relative h-28 w-28 overflow-hidden rounded-full border-2 shadow-[0_0_30px_-8px_var(--color-primary)] sm:h-32 sm:w-32">
      <Image
        src={HERO_IMAGE}
        alt={`Portrait of ${siteConfig.name}`}
        fill
        sizes="8rem"
        className="object-cover"
        priority
        onError={() => setErrored(true)}
      />
    </div>
  );
}

export function Hero() {
  return (
    <Section className="relative overflow-hidden py-0">
      <div aria-hidden="true" className="node-field pointer-events-none absolute inset-0 -z-20" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
      >
        <div className="bg-primary/10 h-[32rem] w-[32rem] rounded-full blur-3xl" />
      </div>

      <Container className="flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center text-center">
        <motion.div {...fadeUp(0)} className="mb-6">
          <HeroAvatar />
        </motion.div>

        <motion.div
          {...fadeUp(0.05)}
          className="border-border bg-card text-muted-foreground mb-8 inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm shadow-[0_0_30px_-12px_var(--color-primary)]"
        >
          <span className="text-primary">&gt;_</span>
          <span className="text-primary">~$</span>
          <span>whoami</span>
          <span aria-hidden="true" className="terminal-cursor bg-primary h-4" />
        </motion.div>

        <motion.p {...fadeUp(0.1)} className="text-foreground text-lg font-medium sm:text-xl">
          Hi, I&apos;m
        </motion.p>

        <motion.h1
          {...fadeUp(0.2)}
          className="text-primary mt-2 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
        >
          {siteConfig.name}
        </motion.h1>

        <motion.p
          {...fadeUp(0.3)}
          className="text-foreground mt-4 flex items-center gap-2 text-lg font-medium sm:text-xl"
        >
          <span className="text-muted-foreground">&gt;</span>
          <TypewriterText words={siteConfig.roles} />
        </motion.p>

        <motion.p {...fadeUp(0.4)} className="text-muted-foreground mt-4 max-w-xl text-base">
          {siteConfig.tagline}
        </motion.p>

        <motion.div
          {...fadeUp(0.5)}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border bg-card text-muted-foreground hover:border-primary/60 hover:text-primary focus-visible:ring-ring focus-visible:ring-offset-background flex w-20 flex-col items-center gap-2 rounded-lg border px-3 py-3 text-xs transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              {label}
            </a>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
