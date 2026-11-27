/**
 * Per-page SEO metadata — single source of truth.
 * Used at runtime (src/hooks/usePageMeta.js) and at build time
 * (scripts/seo-build.mjs writes a static HTML file per page so search
 * engines and link previews see the right title/description without JS).
 *
 * Keep titles under ~60 characters and descriptions around 140–160.
 * Plain JS only: this file is imported by Node too.
 */

export const SITE_NAME = 'EagleWing Express'

export const pages = [
  {
    path: '/',
    file: 'index.html',
    title: 'Vancouver Island Freight & Delivery | EagleWing Express',
    description:
      'Daily freight and tailgate delivery on Vancouver Island, Victoria to Campbell River and Port Alberni, plus a daily run to the Lower Mainland. Free quotes.',
    priority: '1.0',
  },
  {
    path: '/about',
    file: 'about.html',
    name: 'About us',
    title: 'About EagleWing Express | Vancouver Island Freight Company',
    description:
      'EagleWing Express Ltd. is a Nanaimo-based Vancouver Island freight company with 3 and 5 ton tailgate trucks on daily Island and Lower Mainland routes.',
    priority: '0.8',
  },
  {
    path: '/services',
    file: 'services.html',
    name: 'Services',
    title: 'Freight & Delivery Services | EagleWing Express',
    description:
      'Tailgate delivery, daily Island runs, a daily Lower Mainland run, express, pallet/LTL and full loads for businesses and homes on Vancouver Island.',
    priority: '0.9',
  },
  {
    path: '/how-it-works',
    file: 'how-it-works.html',
    name: 'How it works',
    title: 'How It Works | Book a Delivery with EagleWing Express',
    description:
      'Four simple steps from your first call to a confirmed delivery: request a quote, schedule pickup, on the road, delivered. Plus tips to prepare your shipment.',
    priority: '0.7',
  },
  {
    path: '/coverage',
    file: 'coverage.html',
    name: 'Coverage',
    title: 'Coverage Area: Victoria to Campbell River | EagleWing Express',
    description:
      'Daily service to 8 Vancouver Island communities from Victoria to Campbell River and Port Alberni, plus a daily run to the Lower Mainland via Tsawwassen.',
    priority: '0.9',
  },
  {
    path: '/faq',
    file: 'faq.html',
    name: 'FAQ',
    title: 'Frequently Asked Questions | EagleWing Express',
    description:
      'Answers about our service areas, business hours, booking, pricing, items we cannot ship and how to prepare your freight for delivery on Vancouver Island.',
    priority: '0.7',
  },
  {
    path: '/contact',
    file: 'contact.html',
    name: 'Contact & quote',
    title: 'Contact & Free Quote | EagleWing Express',
    description:
      'Request a free freight quote or call (236) 888-3135. Phones Mon–Fri 8 am–8 pm; deliveries 7 days a week by booking.',
    priority: '0.8',
  },
  {
    path: '/terms',
    file: 'terms.html',
    name: 'Terms of service',
    title: 'Terms of Service | EagleWing Express',
    description: 'The plain-language terms that apply when you ship freight with EagleWing Express on Vancouver Island, British Columbia.',
    priority: '0.3',
  },
  {
    path: '/privacy',
    file: 'privacy.html',
    name: 'Privacy policy',
    title: 'Privacy Policy | EagleWing Express',
    description:
      'How EagleWing Express collects, uses and protects your personal information under British Columbia’s Personal Information Protection Act (PIPA).',
    priority: '0.3',
  },
]

export const notFoundMeta = {
  title: `Page Not Found | ${SITE_NAME}`,
  description: 'The page you were looking for has moved or does not exist.',
}

export const pageFor = (path) => pages.find((p) => p.path === path)
