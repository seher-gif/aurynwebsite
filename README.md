# Auryn Dijital — Website & SEO Platform

Production website, blog CMS, lead-management admin panel and AI-assisted SEO
analysis tool for Auryn Dijital, a data-driven digital marketing & SEO
consultancy.

## Tech stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS**
- **PostgreSQL** via **Prisma ORM** (Prisma Accelerate connection)
- **Auth.js (NextAuth v5)** — credentials-based admin authentication
- **Zod** + **React Hook Form** for validation
- **Resend** for transactional email
- **Google Gemini** for AI-assisted SEO interpretation
- **Google PageSpeed Insights API** (optional) for Core Web Vitals

## Getting started (local development)

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment template and fill in real values:

   ```bash
   cp .env.example .env
   ```

   See [Environment variables](#environment-variables) below for what each
   one does and where to get it.

3. Sync the Prisma schema to your database (no migration history is kept in
   this repo — the project uses `db push`):

   ```bash
   npx prisma db push
   npx prisma generate
   ```

4. Seed an admin user (edit the email/password in `prisma/seed.ts` first):

   ```bash
   npx prisma db seed
   ```

5. Run the dev server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000). The admin panel is at
   `/login` → `/admin`.

## Environment variables

All variables are documented in [`.env.example`](.env.example). Summary:

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | Yes | Runtime Postgres/Accelerate connection string |
| `DIRECT_URL` | Yes | Direct (non-pooled) connection, used by `prisma db push` |
| `NEXTAUTH_SECRET` | Yes | Session encryption secret — generate with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Yes | Canonical site URL used by Auth.js |
| `NEXT_PUBLIC_APP_URL` | Yes | Public site URL, used for sitemap/canonical/OG URLs |
| `GEMINI_API_KEY` | No | Enables AI-written SEO recommendations. Without it, only the deterministic/measured findings are shown |
| `GOOGLE_PAGESPEED_API_KEY` | No | Enables Core Web Vitals / Lighthouse scoring in the SEO analyzer. Without it, the analyzer still runs on measured HTML findings only, and the UI shows "Performans verisi bu analizde kullanılabilir değil." instead of a fabricated score |
| `RESEND_API_KEY` / `CONTACT_NOTIFICATION_EMAIL` | No | Enables email notifications for contact form submissions and SEO analyses. Without them, submissions are still saved to the database, just without email alerts |
| `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_GTM_ID` | No | Analytics, only loaded when set |
| `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` / `FACEBOOK_ACCESS_TOKEN` | No | Meta Pixel / Conversions API |
| `BLOB_READ_WRITE_TOKEN` | No | Reserved for future media upload support |

Never commit `.env` or `.env.local` — they are gitignored. Only
`.env.example` (with placeholder values) is tracked.

## Database

Schema lives in [`prisma/schema.prisma`](prisma/schema.prisma). Key models:
`User`, `Page`, `HomepageHero`, `Redirect`, `NotFoundLog`, `Post` (blog),
`ContactMessage`, `SeoAnalysis`, `MarketingTool`, `Client`, `CaseStudy`,
`SiteSetting`.

This project has no migration history (`prisma/migrations` does not exist) —
schema changes are applied additively with:

```bash
npx prisma db push
```

Review the diff `db push` reports before confirming against a production
database; it warns before anything destructive.

## Admin panel

- Route: `/admin`, gated by `/login`.
- No public registration — admin users are created via `prisma/seed.ts` or
  directly in the database.
- Every `/admin/*` page is protected by the `authorized()` callback in
  [`src/auth.config.ts`](src/auth.config.ts); every `/api/admin/*` route
  additionally checks the session server-side in the route handler itself.
- Sections: Blog, Case Studies, Clients, Messages (contact inbox), SEO
  Results, SEO Score, Pages, Redirects, Settings, Users, Profile.

## SEO analyzer

Route: `/seo-analizi`. Flow:

1. User submits a URL.
2. `POST /api/seo/analyze` validates the URL server-side
   ([`src/lib/seo/safe-fetch.ts`](src/lib/seo/safe-fetch.ts)) — only
   `http`/`https`, hostname must resolve to a public IP (blocks localhost,
   private/reserved ranges, and cloud metadata addresses like
   `169.254.169.254`), fetch has a timeout, a redirect limit (each hop
   re-validated), and a response size cap.
3. The page HTML is parsed server-side (Cheerio) for measurable SEO signals
   (title/meta length, H1 count, alt text, viewport, HTTPS, links).
4. If `GOOGLE_PAGESPEED_API_KEY` is set, Core Web Vitals/Lighthouse data is
   also fetched and folded into the score; otherwise the score is derived
   only from the measured HTML findings and the UI says so explicitly.
5. The result is persisted to `SeoAnalysis`.

## Deployment (Vercel)

The project is already linked to Vercel (`.vercel/project.json`). To deploy:

```bash
vercel --prod
```

Set every variable from `.env.example` in the Vercel project's Environment
Variables settings before deploying. `postinstall` runs `prisma generate`
automatically on Vercel builds.

## Security notes

- The SEO analyzer fetch path is SSRF-hardened (see above) — do not bypass
  `safeFetchPublicUrl`/`assertPublicHttpUrl` when adding new URL-fetching
  features.
- Admin credentials are bcrypt-hashed; there is no fallback/bypass login path
  — do not reintroduce one, even temporarily.
- Contact form has server-side Zod validation, a honeypot field, and basic
  IP-based rate limiting on `/api/contact`.
