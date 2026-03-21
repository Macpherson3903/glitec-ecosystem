# Production checklist (Glitec ecosystem)

This monorepo deploys the Next.js app from [`apps/web`](apps/web). Use this list when going live or hardening the stack.

## Hosting

- **Vercel (recommended):** Set the project **Root Directory** to `apps/web`, or connect the repo and use Turborepo’s Vercel integration so `turbo build` runs at the repository root.
- Add all required secrets and public env vars in the **Vercel project → Settings → Environment Variables** (mirror what you use in `apps/web/.env.local` for local dev). Use Production and Preview scopes as appropriate.

## Database (MongoDB Atlas)

- Use a dedicated database user with least privilege.
- Restrict network access (IP allowlist or VPC peering for production).
- Enable backups and monitoring alerts.
- Indexes: `JobApplication` defines `{ jobId: 1, createdAt: -1 }` for admin-style queries by role and time.

## Application security

- **Rate limiting:** Add middleware or an edge layer (e.g. Upstash Redis) on `POST` routes such as `/api/job-application`, `/api/instructor-application`, and `/api/apply` to reduce abuse.
- **CAPTCHA:** Consider hCaptcha or Turnstile on high-traffic public forms if spam becomes an issue.
- **Uploads:** Existing 500KB and MIME checks on CVs should stay; keep validating on the server only.

## Observability

- Add **Sentry** (or similar) for the Next.js server and browser bundles; capture API route failures and client exceptions.
- Log structured errors in API routes where `console.error` is used today.

## SEO and URLs

- Set **`metadataBase`** in [`apps/web/app/layout.js`](apps/web/app/layout.js) to your production origin so Open Graph images resolve correctly (Next.js will otherwise warn during build).

## Clerk

- If admin or dashboard routes should require sign-in, add [`middleware.ts`](apps/web/middleware.ts) with Clerk’s `authMiddleware` and match only those paths; public marketing and jobs pages can remain open.
