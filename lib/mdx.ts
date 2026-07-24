import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import type { BlogPost, BlogPostMeta } from "@/lib/types";

const BLOG_DIR = path.join(process.cwd(), "content/blog");
const WORDS_PER_MINUTE = 200;

function calculateReadingTime(text: string) {
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
  return { wordCount, readingTime };
}

function parseFrontmatter(data: Record<string, unknown>) {
  return {
    title: typeof data.title === "string" ? data.title : "",
    date: typeof data.date === "string" ? data.date : "",
    description: typeof data.description === "string" ? data.description : "",
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
  };
}

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getAllPosts(): BlogPostMeta[] {
  const posts = getPostSlugs().map((slug) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
    const { data, content } = matter(raw);
    const { wordCount, readingTime } = calculateReadingTime(content);

    return {
      slug,
      ...parseFrontmatter(data),
      wordCount,
      readingTime,
    };
  });

  return posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const { wordCount, readingTime } = calculateReadingTime(content);

  return {
    slug,
    ...parseFrontmatter(data),
    wordCount,
    readingTime,
    content,
  };
}
