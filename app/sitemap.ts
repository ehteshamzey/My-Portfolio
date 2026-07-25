import type { MetadataRoute } from "next";

import { getAllPosts } from "@/lib/mdx";
import { projects } from "@/content/projects";
import { siteConfig } from "@/content/siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const buildTime = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified: buildTime, changeFrequency: "monthly", priority: 1 },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: buildTime,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/resume`,
      lastModified: buildTime,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteConfig.url}/projects/${project.slug}`,
    lastModified: buildTime,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes, ...projectRoutes];
}
