# DigitalAccess Services

Bilingual (English / বাংলা) marketing site for DigitalAccess — web, app and business development.
Built with **Next.js 16** (App Router), **React 19**, **TypeScript** and **Tailwind CSS v4**.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3002
```

| Script | What it does |
|---|---|
| `npm run dev` | Start the dev server on port 3002 |
| `npm run build` | Production build |
| `npm start` | Serve the production build on port 3002 |
| `npm run lint` | ESLint |
| `npm run typecheck` | Generate route types and run `tsc` |

## Environment variables

| Name | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public URL (canonical links, sitemap, Open Graph). No trailing slash. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Inbox the contact form opens a pre-filled email to. |

## Project structure

```
src/
  app/[lang]/            # every page lives under /en or /bn (statically generated)
  app/sitemap.ts         # sitemap.xml with hreflang alternates
  app/robots.ts
  proxy.ts               # redirects / to the visitor's language
  components/sections/   # Hero, Services, Portfolio, Estimator, FAQ, Contact…
  components/ui/         # SilkBackground (WebGL), Reveal, CountUp…
  content/dictionaries/  # en.json / bn.json — all page text
  content/pricing.ts     # project estimator price list (BDT)
  content/media.ts       # image map
  assets/images/         # photos (Unsplash licence)
```

## Editing content

- **Text** (both languages): `src/content/dictionaries/en.json` and `bn.json` — keep the same keys in both.
- **Estimator prices**: `src/content/pricing.ts` (`[min, max]` in BDT).
- **Theme colours & fonts**: `src/app/globals.css` and `src/app/[lang]/layout.tsx`.
