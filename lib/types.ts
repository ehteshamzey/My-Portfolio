export interface SiteConfig {
  name: string;
  headline: string;
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
