import { experience } from "@/content/experience";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Timeline } from "@/components/Timeline";
import { TimelineItem } from "@/components/TimelineItem";

export function Leadership() {
  return (
    <Section id="leadership" className="scroll-mt-24">
      <Container>
        <p className="text-primary text-center font-mono text-sm">
          <span className="text-muted-foreground">$</span> ls leadership/
        </p>
        <h2 className="text-foreground mt-2 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Leadership/Extracurricular
        </h2>

        <div className="mx-auto mt-10 max-w-2xl">
          <Timeline>
            {experience.map((item) => (
              <TimelineItem
                key={item.role}
                title={item.role}
                subtitle={item.location}
                meta={item.duration}
                description={item.description}
              />
            ))}
          </Timeline>
        </div>
      </Container>
    </Section>
  );
}
