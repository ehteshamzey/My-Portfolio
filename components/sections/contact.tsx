import { Mail, MapPin } from "lucide-react";

import { siteConfig } from "@/content/siteConfig";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { GithubIcon, LinkedinIcon, PhoneIcon, TwitterIcon } from "@/components/icons/social-icons";

const CONTACT_DETAILS = [
  { label: "email", value: siteConfig.email, href: `mailto:${siteConfig.email}`, icon: Mail },
  ...(siteConfig.phone
    ? [{ label: "phone", value: siteConfig.phone, href: `tel:${siteConfig.phone}`, icon: PhoneIcon }]
    : []),
  { label: "location", value: siteConfig.location, href: undefined, icon: MapPin },
];

const SOCIAL_LINKS = [
  { label: "GitHub", href: siteConfig.github, icon: GithubIcon },
  { label: "LinkedIn", href: siteConfig.linkedin, icon: LinkedinIcon },
  ...(siteConfig.twitter
    ? [{ label: "Twitter / X", href: siteConfig.twitter, icon: TwitterIcon }]
    : []),
];

export function Contact() {
  return (
    <Section id="contact" className="scroll-mt-24">
      <Container>
        <p className="text-primary text-center font-mono text-sm">
          <span className="text-muted-foreground">$</span> cat contact.txt
        </p>
        <h2 className="text-foreground mt-2 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Get in Touch
        </h2>

        <Card className="mx-auto mt-10 max-w-lg">
          <CardContent className="space-y-4 p-6 sm:p-8">
            {CONTACT_DETAILS.map(({ label, value, href, icon: Icon }) => {
              const row = (
                <span className="flex items-center gap-3 font-mono text-sm">
                  <Icon className="text-primary h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="text-muted-foreground w-20 shrink-0">{label}</span>
                  <span className="text-foreground">{value}</span>
                </span>
              );

              return (
                <div key={label}>
                  {href ? (
                    <a
                      href={href}
                      className="focus-visible:ring-ring rounded-sm transition-colors hover:opacity-80 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                      {row}
                    </a>
                  ) : (
                    row
                  )}
                </div>
              );
            })}

            <div className="border-border flex items-center gap-4 border-t pt-4">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-muted-foreground hover:text-primary focus-visible:ring-ring transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </Container>
    </Section>
  );
}
