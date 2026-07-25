import { Mail } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ContactForm } from "@/components/ContactForm";
import { Comments } from "@/components/Comments";
import { PhoneIcon } from "@/components/icons/social-icons";

const QUICK_LINKS = [
  { label: "Email", href: "mailto:ehteshamzeya27@gmail.com", icon: Mail },
  { label: "Call", href: "tel:+916207149081", icon: PhoneIcon },
];

export function Contact() {
  return (
    <Section id="contact" className="scroll-mt-24">
      <Container>
        <p className="text-primary text-center font-mono text-sm">
          <span className="text-muted-foreground">$</span> cat contact.yaml
        </p>
        <h2 className="text-foreground mt-2 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Get in Touch
        </h2>

        <div className="border-border mx-auto mt-10 grid max-w-4xl grid-cols-1 border md:grid-cols-2">
          <div className="border-border bg-card border-b p-6 md:border-r md:border-b-0 md:p-8">
            <div className="border-border mb-4 flex items-center justify-between border-b pb-3">
              <span className="text-muted-foreground font-mono text-xs">contact.yaml</span>
              <span className="flex items-center gap-1.5">
                <span className="bg-destructive/70 h-2.5 w-2.5 rounded-full" aria-hidden="true" />
                <span className="bg-primary/50 h-2.5 w-2.5 rounded-full" aria-hidden="true" />
                <span className="bg-primary/70 h-2.5 w-2.5 rounded-full" aria-hidden="true" />
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {QUICK_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  className="border-border bg-card text-muted-foreground hover:border-primary/60 hover:text-primary focus-visible:ring-ring focus-visible:ring-offset-background flex w-20 flex-col items-center gap-2 rounded-lg border px-3 py-3 text-xs transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  {label}
                </a>
              ))}
            </div>

            <Comments />
          </div>

          <div className="bg-card p-6 md:p-8">
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
