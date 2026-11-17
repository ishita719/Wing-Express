# EagleWing Express — Website

Marketing website for **EagleWing Express Ltd.**, a freight and delivery company serving Vancouver Island (Victoria → Campbell River).
Built with **React 19 + Vite + Tailwind CSS 4 + Lucide icons** and hosted on **Cloudflare Workers**.

## Quick start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the production build locally
```

## Project structure

```
├── worker/                    Cloudflare Worker: serves the site + /api/quote (emails via Resend)
├── wrangler.jsonc             Cloudflare Worker config
├── public/                    Static files: favicon, OG image, robots.txt, sitemap.xml, _headers
├── src/
│   ├── data/site.js           ★ ALL business content: name, phone, email, services, stops, FAQ
│   ├── components/
│   │   ├── layout/            Header (sticky nav + mobile menu), Footer
│   │   ├── sections/          Hero, Services, Stats, Fleet, Process, Coverage, WhyUs, Quote, Faq, CtaBand
│   │   └── ui/                Reusable pieces: Button, Reveal, SectionHeading, Logo, Counter, TruckIllustration
│   ├── hooks/                 useInView (scroll animations), useScrolled
│   ├── lib/utils.js           Small helpers
│   ├── App.jsx                Page composition
│   └── index.css              Tailwind theme: brand colours, fonts, animations
└── index.html                 SEO meta tags, Open Graph, JSON-LD structured data
```

**To update company details, edit `src/data/site.js`.** Every value marked `TODO` is a placeholder.
Also update the JSON-LD block in `index.html`, plus `public/robots.txt` and `public/sitemap.xml` once the real domain is known.

## Deployment: Cloudflare Workers (auto-deploys from GitHub)

The site runs as a Cloudflare Worker named `wing-express` with static assets (config: `wrangler.jsonc`).
Cloudflare Workers Builds is connected to this GitHub repo:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Every push to `main` builds and deploys automatically.

`worker/index.js` serves `/api/quote`; everything else is the static React build in `dist/`.
The public site URL used for SEO tags lives in `.env.production` (`VITE_SITE_URL`).

### Quote form email (optional, recommended)

The quote form posts to `/api/quote`. To have requests emailed to dispatch:

1. Create a free account at [resend.com](https://resend.com) and verify the company domain.
2. In Cloudflare → **Workers & Pages → wing-express → Settings → Variables and Secrets**, add:
   - `RESEND_API_KEY` (as a secret)
   - `QUOTE_TO_EMAIL`: inbox that receives requests
   - `QUOTE_FROM_EMAIL`: sender on the verified domain, e.g. `website@wingexpress.ca`
3. Redeploy.

Until these are set, the form honestly tells visitors it could not send and offers a pre-filled email and the phone number instead.

### Connecting the real domain later

1. Add the domain to Cloudflare (**Domains → Add a domain**) and point its nameservers to Cloudflare.
2. **Workers & Pages → wing-express → Settings → Domains & Routes → Add → Custom domain** → `wingexpress.ca` (and `www.wingexpress.ca`).
3. Change `VITE_SITE_URL` in `.env.production` to the new domain, update `robots.txt` and `sitemap.xml`, and push.

### Manual deploy from your machine (alternative)

```bash
npx wrangler login
npm run deploy
```
