import type { Metadata } from "next";

import { siteConfig } from "@/content/siteConfig";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Resume",
  description: `View or download the resume for ${siteConfig.name}.`,
};

export default function ResumePage() {
  return (
    <Section className="scroll-mt-24">
      <Container>
        <p className="text-primary text-center font-mono text-sm">
          <span className="text-muted-foreground">$</span> cat resume.pdf
        </p>
        <h1 className="text-foreground mt-2 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Resume
        </h1>

        <div className="mt-8 flex justify-center">
          <a
            href={siteConfig.resumeUrl}
            download
            className="border-primary/60 text-primary hover:bg-primary/10 hover:border-primary focus-visible:ring-ring inline-flex items-center gap-2 border px-6 py-3 font-mono text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            $ wget {siteConfig.resumeUrl}
          </a>
        </div>

        <div className="border-border bg-card mx-auto mt-10 max-w-3xl border">
          <div className="border-border flex items-center justify-between border-b p-3">
            <span className="text-muted-foreground font-mono text-xs">resume.pdf</span>
            <span className="flex items-center gap-1.5">
              <span className="bg-destructive/70 h-2.5 w-2.5 rounded-full" aria-hidden="true" />
              <span className="bg-primary/50 h-2.5 w-2.5 rounded-full" aria-hidden="true" />
              <span className="bg-primary/70 h-2.5 w-2.5 rounded-full" aria-hidden="true" />
            </span>
          </div>
          <object
            data={siteConfig.resumeUrl}
            type="application/pdf"
            className="h-[80vh] w-full"
            aria-label="Embedded resume PDF viewer"
          >
            <p className="text-muted-foreground p-6 text-center font-mono text-sm">
              Your browser can&apos;t preview PDFs inline.{" "}
              <a href={siteConfig.resumeUrl} download className="text-primary underline">
                Download the resume
              </a>{" "}
              instead.
            </p>
          </object>
        </div>
      </Container>
    </Section>
  );
}
