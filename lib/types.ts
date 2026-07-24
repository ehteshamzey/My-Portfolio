export interface SiteConfig {
  name: string;
  headline: string;
  roles: string[];
  tagline: string;
  location: string;
  email: string;
  phone?: string;
  github: string;
  linkedin: string;
  twitter?: string;
  instagram?: string;
  telegram?: string;
  resumeUrl: string;
}

export interface AboutData {
  paragraphs: string[];
  profileImage: string;
}

export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Project {
  title: string;
  slug: string;
  date: string;
  description: string;
  tags: string[];
}

export interface Experience {
  role: string;
  location: string;
  duration: string;
  description: string;
}

export interface Education {
  degree: string;
  institution?: string;
  location: string;
  graduation?: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: number;
  wordCount: number;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}
