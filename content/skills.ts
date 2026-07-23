import type { SkillCategory } from "@/lib/types";

export const skillCategories = [
  {
    category: "Languages & Querying",
    skills: [{ name: "Python" }, { name: "SQL" }, { name: "JavaScript" }, { name: "TypeScript" }],
  },
  {
    category: "Libraries & Frameworks",
    skills: [
      { name: "Pandas" },
      { name: "NumPy" },
      { name: "Scikit-learn" },
      { name: "Matplotlib" },
      { name: "Seaborn" },
      { name: "React" },
      { name: "Node.js" },
      { name: "Next.js" },
    ],
  },
  {
    category: "Data & Analytics",
    skills: [
      { name: "Data Cleaning" },
      { name: "EDA" },
      { name: "ETL" },
      { name: "Feature Engineering" },
      { name: "Predictive Modeling" },
      { name: "Dimensionality Reduction" },
      { name: "Statistical Analysis" },
    ],
  },
  {
    category: "Tools & Platforms",
    skills: [
      { name: "Jupyter Notebook" },
      { name: "Git" },
      { name: "Docker" },
      { name: "Vercel" },
      { name: "VS Code" },
    ],
  },
  {
    category: "Core Competencies",
    skills: [
      { name: "Data Modeling" },
      { name: "Business Intelligence" },
      { name: "Dashboarding" },
      { name: "System Architecture" },
      { name: "Communication" },
      { name: "Team Leadership" },
    ],
  },
] satisfies SkillCategory[];
