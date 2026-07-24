import type { Metadata } from "next";
import Link from "next/link";

import { getAllPosts } from "@/lib/mdx";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on machine learning, security, and software engineering.",
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <Section className="scroll-mt-24">
      <Container>
        <p className="text-primary text-center font-mono text-sm">
          <span className="text-muted-foreground">$</span> ls -la ./content/blog
        </p>
        <h1 className="text-foreground mt-2 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Blog
        </h1>

        <div className="border-border bg-card mt-10 border">
          <div className="border-border text-muted-foreground flex items-center gap-2 border-b px-4 py-2 font-mono text-xs">
            <span className="bg-destructive/70 h-2.5 w-2.5 rounded-full" aria-hidden="true" />
            <span className="bg-primary/50 h-2.5 w-2.5 rounded-full" aria-hidden="true" />
            <span className="bg-primary/70 h-2.5 w-2.5 rounded-full" aria-hidden="true" />
            <span className="ml-2">blog@portfolio:~/content</span>
          </div>

          <div className="divide-border divide-y">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="hover:bg-accent group flex flex-col gap-1 px-4 py-3 font-mono text-sm transition-colors sm:flex-row sm:items-center sm:gap-4"
              >
                <span className="text-muted-foreground w-24 shrink-0">
                  {formatDate(post.date)}
                </span>
                <span className="text-muted-foreground w-28 shrink-0">
                  [{post.readingTime} min read]
                </span>
                <span className="text-primary group-hover:underline">./{post.slug}.mdx</span>
                <span className="text-muted-foreground sm:ml-auto sm:text-right">
                  {post.description}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
