# Wing Express — Website

Marketing website for **Wing Express**, a trucking and freight company.
Built with **React 19 + Vite + Tailwind CSS 4 + Lucide icons** and hosted on **Cloudflare Pages**.

## Quick start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the production build locally
```

## Project structure

```
├── functions/api/quote.js     Cloudflare Pages Function: emails quote requests (Resend)
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

## Deploying to Cloudflare Pages (from GitHub)

1. Push this repo to GitHub.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → pick the repo.
3. Build settings:
   - Framework preset: **Vite** (or "None")
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variable: `VITE_SITE_URL` = `https://wing-express.pages.dev` (later: your real domain)
4. Save and deploy. Every push to `main` now redeploys automatically, and pull requests get preview URLs.

### Quote form email (optional, recommended)

The quote form posts to `/api/quote`. To have requests emailed to dispatch:

1. Create a free account at [resend.com](https://resend.com) and verify the company domain.
2. In the Pages project → **Settings → Variables and Secrets**, add:
   - `RESEND_API_KEY` (as a secret)
   - `QUOTE_TO_EMAIL`: inbox that receives requests
   - `QUOTE_FROM_EMAIL`: sender on the verified domain, e.g. `website@wingexpress.ca`
3. Redeploy.

Until these are set, the form honestly tells visitors it could not send and offers a pre-filled email and the phone number instead.

### Connecting the real domain later

1. Pages project → **Custom domains → Set up a custom domain** → enter `wingexpress.ca` (and `www`).
2. If the domain's DNS is on Cloudflare, records are added automatically. Otherwise, follow the CNAME instructions shown.
3. Change `VITE_SITE_URL` to the new domain, update `robots.txt` and `sitemap.xml`, and redeploy.

### Manual deploy from your machine (alternative)

```bash
npx wrangler login
npm run deploy
```
