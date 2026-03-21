# Glitec ecosystem (monorepo)

[![Next.js](https://img.shields.io/badge/Next.js-16-blue?logo=next.js&logoColor=white)](https://nextjs.org)

This repository is a **Turborepo** monorepo. The public site and APIs live in [`apps/web`](apps/web) (Next.js App Router, React 19, Tailwind CSS 4).

## Prerequisites

- Node.js 20+ (CI uses 22)
- npm 11+

## Install

From the repository root:

```bash
npm install
```

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Start Next.js dev server for `@glitec/web` |
| `npm run build` | Production build (all workspaces) |
| `npm run lint` | ESLint via Turborepo |

To run only the web app:

```bash
npx turbo run dev --filter=@glitec/web
```

## Environment variables

- **Production:** Configure variables in the **Vercel** project (same keys you use locally). Set the project **Root Directory** to **`apps/web`** so they apply to the Next.js app.
- **Local:** Use **`apps/web/.env.local`** only — Next.js does not load `.env*` from the repository root.

## Deployment (Vercel)

Set the Vercel project **Root Directory** to **`apps/web`**, or use the [Turborepo + Vercel](https://vercel.com/docs/monorepos/turborepo) integration. Add the same environment variables you use in development to the Vercel dashboard (Production / Preview as needed).

## Production

See [`PRODUCTION.md`](PRODUCTION.md) for hosting, security, and observability notes.
