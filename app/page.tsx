import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function Home() {
  return (
    <Section className="flex flex-col items-center gap-16">
      <Container className="flex flex-col items-center gap-6 text-center">
        <Badge variant="secondary">Design system preview</Badge>
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Hi, I&apos;m Your Name.
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          I build things for the web. This hero section is a placeholder used to verify the
          design system — fonts, colors, spacing, and component primitives — in both light and
          dark mode.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </Container>

      <Container className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Example Card</CardTitle>
            <CardDescription>Used to verify Card sub-components render correctly.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Card content area with body text styled via semantic tokens.
            </p>
          </CardContent>
          <CardFooter className="gap-2">
            <Badge>Default</Badge>
            <Badge variant="outline">Outline</Badge>
          </CardFooter>
        </Card>
      </Container>
    </Section>
  );
}
