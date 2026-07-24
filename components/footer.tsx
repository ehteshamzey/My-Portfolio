import { Mail } from "lucide-react";

import { siteConfig } from "@/content/siteConfig";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/icons/social-icons";

const SOCIAL_LINKS = [
  { label: "GitHub", href: siteConfig.github, icon: GithubIcon },
  { label: "LinkedIn", href: siteConfig.linkedin, icon: LinkedinIcon },
  ...(siteConfig.twitter
    ? [{ label: "Twitter / X", href: siteConfig.twitter, icon: TwitterIcon }]
    : []),
  { label: "Email", href: `mailto:${siteConfig.email}`, icon: Mail },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border w-full border-t">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 px-4 py-8 text-center sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted-foreground hover:text-foreground focus-visible:ring-ring transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </a>
          ))}
        </div>
        <p className="text-muted-foreground text-sm">
          © {year} {siteConfig.name}. All rights reserved.
        </p>
        <p className="text-muted-foreground text-xs">Built with Next.js & Tailwind CSS.</p>
      </div>
    </footer>
  );
}
