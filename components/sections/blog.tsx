import Link from "next/link";

import { getAllPosts } from "@/lib/mdx";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const RECENT_POSTS_LIMIT = 3;

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export function Blog() {
  const posts = getAllPosts().slice(0, RECENT_POSTS_LIMIT);

  if (posts.length === 0) return null;

  return (
    <Section id="blog" className="scroll-mt-24">
      <Container>
        <p className="text-primary text-center font-mono text-sm">
          <span className="text-muted-foreground">$</span> ls blog/
        </p>
        <h2 className="text-foreground mt-2 text-center text-3xl font-bold tracking-tight sm:text-4xl">
          From the Blog
        </h2>

        <div className="border-border bg-card mx-auto mt-10 max-w-3xl border">
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
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center">
          <Link
            href="/blog"
            className="text-muted-foreground hover:text-primary focus-visible:ring-ring focus-visible:ring-offset-background inline-flex items-center font-mono text-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <span className="text-primary">$</span>&nbsp;cd ./blog
            <span className="text-muted-foreground">&nbsp;# view all posts</span>
          </Link>
        </p>
      </Container>
    </Section>
  );
}
