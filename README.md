# My Portfolio

## About

Personal portfolio of **Ehtesham Zeya**, built with [Next.js](https://nextjs.org) (App Router), TypeScript, Tailwind CSS, and Framer Motion. Showcases projects, skills, experience/education, leadership, and a blog, with a dark-mode terminal/code-editor aesthetic.

## Requirements

- Node.js 20.9+ (managed via [nvm](https://github.com/nvm-sh/nvm) recommended)
- npm 10+

## Local Development

Clone the repository:

```bash
git clone <repository-url>
cd My-Portfolio
```

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
- [Framer Motion](https://www.framer.com/motion/) (animations)
- ESLint + Prettier (with `prettier-plugin-tailwindcss`)

## Continuous Integration

Every pull request and push to `main` runs the GitHub Actions workflow in [`.github/workflows/ci.yml`](.github/workflows/ci.yml), which installs dependencies, lints, and builds the project to catch issues before merge.

## Deployment

This project is configured for deployment on [Vercel](https://vercel.com):

1. Push the repository to GitHub (or your Git provider of choice).
2. In the [Vercel dashboard](https://vercel.com/new), import the repository. Vercel auto-detects the Next.js framework preset.
3. Deploy — Vercel builds with `npm run build` and serves the output automatically. Every push to `main` triggers a new production deployment; pull requests get their own preview deployments.

Alternatively, deploy from the CLI:

```bash
npx vercel
```
