import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";

import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

function BackLink() {
  return (
    <Link
      href="/blog"
      className="text-muted-foreground hover:text-primary focus-visible:ring-ring focus-visible:ring-offset-background inline-flex items-center font-mono text-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <span className="text-primary">$</span>&nbsp;cd ../
      <span className="text-muted-foreground">&nbsp;# ← back to blog</span>
    </Link>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return { title: `${post.title} — Blog`, description: post.description };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { content } = await compileMDX({
    source: post.content,
    options: { parseFrontmatter: false },
  });

  return (
    <Section className="scroll-mt-24">
      <Container>
        <BackLink />

        <div className="border-border bg-card mt-6 border">
          <div className="border-border text-muted-foreground flex items-center gap-2 border-b px-4 py-2 font-mono text-xs">
            <span className="bg-destructive/70 h-2.5 w-2.5 rounded-full" aria-hidden="true" />
            <span className="bg-primary/50 h-2.5 w-2.5 rounded-full" aria-hidden="true" />
            <span className="bg-primary/70 h-2.5 w-2.5 rounded-full" aria-hidden="true" />
            <span className="ml-2">{post.slug}.mdx</span>
          </div>

          <div className="p-6 sm:p-8">
            <p className="text-muted-foreground font-mono text-sm">{formatDate(post.date)}</p>
            <h1 className="text-primary mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="text-muted-foreground"># </span>
              {post.title}
            </h1>
            <p className="text-muted-foreground mt-2 font-mono text-xs">
              [{post.readingTime} min read]
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="border-primary/40 text-primary inline-flex items-center border px-2 py-0.5 font-mono text-xs before:mr-1 before:content-['['] after:ml-1 after:content-[']']"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="prose prose-invert dark:prose-invert mt-8 max-w-none font-mono">
              {content}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <BackLink />
        </div>
      </Container>
    </Section>
  );
}
