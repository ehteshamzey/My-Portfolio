import type { Project } from "@/lib/types";

export const projects = [
  {
    title: "Optimization of ATDD Execution Pipeline",
    slug: "atdd-execution-pipeline",
    date: "Jun 2026 - Present",
    description:
      "Designed an automated Jenkins pipeline to fetch, sequentially merge, and validate GitLab merge requests targeting the ImsServerMaster branch on an hourly schedule. Implemented Epic-based ATDD tag resolution and conflict detection logic.",
    tags: ["Jenkins", "GitLab REST API", "Groovy"],
  },
  {
    title: "Enterprise Feature Usage Analytics Platform",
    slug: "enterprise-telemetry-pipeline",
    date: "Feb 2026 - May 2026",
    description:
      "Designed an end-to-end telemetry pipeline converting enterprise product-usage data into strategic intelligence. Built a React 18 dashboard with RBAC, adoption heatmaps, and churn-risk scoring.",
    tags: ["Node.js", "React", "SQLite", "JWT", "Docker"],
  },
  {
    title: "House Price Prediction",
    slug: "house-price-prediction",
    date: "May 2025 - July 2025",
    description:
      "Built a regression pipeline predicting property prices from 1,000+ housing records. Applied Ridge and Lasso regularization to handle multicollinearity and implemented polynomial feature engineering.",
    tags: ["Python", "Pandas", "NumPy", "Machine Learning"],
  },
] satisfies Project[];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
