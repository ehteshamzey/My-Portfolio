# My Portfolio

Personal portfolio website built with Next.js (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## Requirements

- Node.js 20.9+ (managed via [nvm](https://github.com/nvm-sh/nvm) recommended)
- npm 10+

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

| Script                 | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start the local dev server (Turbopack)   |
| `npm run build`        | Production build                         |
| `npm run start`        | Serve the production build               |
| `npm run lint`         | Run ESLint                               |
| `npm run format`       | Format all files with Prettier           |
| `npm run format:check` | Check formatting without writing changes |

## Project Structure

```
app/          Next.js App Router routes, layouts, pages
components/   Reusable UI components (components/ui for primitives)
lib/          Shared utilities (e.g. cn() class merger)
content/      Site content data (skills, experience, projects, blog posts)
public/       Static assets
```

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) (animations, added in a later step)
- ESLint + Prettier (with `prettier-plugin-tailwindcss`)
