import { experience } from "@/content/experience";
import { education } from "@/content/education";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Timeline } from "@/components/Timeline";
import { TimelineItem } from "@/components/TimelineItem";

export function ExperienceEducation() {
  return (
    <Section id="experience" className="scroll-mt-24">
      <Container>
        <p className="text-primary text-center font-mono text-sm">
          <span className="text-muted-foreground">$</span> ls experience/
        </p>
        <h2 className="text-foreground mt-2 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Experience &amp; Education
        </h2>

        <h3 className="text-foreground mt-12 text-center text-xl font-bold tracking-tight">
          Education
        </h3>
        <div className="mx-auto mt-8 max-w-2xl">
          <Timeline>
            {education.map((item) => (
              <TimelineItem
                key={item.degree}
                title={item.degree}
                subtitle={item.institution ?? item.location}
                meta={item.institution ? item.graduation : undefined}
                secondaryMeta={item.institution ? item.location : undefined}
              />
            ))}
          </Timeline>
        </div>

        <h3 className="text-foreground mt-16 text-center text-xl font-bold tracking-tight">
          Leadership/Extracurricular
        </h3>
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
