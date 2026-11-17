/**
 * ─────────────────────────────────────────────────────────────
 *  EAGLEWING EXPRESS — SITE CONTENT
 *  Every piece of business info lives here.
 *  Details below were supplied by the client (Nov 2026).
 *  Items marked `CONFIRM` are reasonable defaults the client
 *  should check before launch.
 * ─────────────────────────────────────────────────────────────
 */
import {
  Truck, Package, Boxes, Zap, Building2, Home, Route, MapPin, Clock,
  Headset, BadgeDollarSign, HandHeart, CalendarSync, Mountain,
  PhoneCall, ClipboardList, PackageCheck, Store, HardHat, Factory,
  Stethoscope, ShoppingBag, Wheat,
} from 'lucide-react'

export const company = {
  name: 'EagleWing Express',
  legalName: 'EagleWing Express Ltd.',
  tagline: 'Fast, reliable freight across Vancouver Island.',
  description:
    'EagleWing Express delivers parcels, pallets and full loads up and down Vancouver Island — from Victoria to Campbell River — with friendly dispatch and upfront quotes.',
  phone: '(778) 268-5136',
  email: 'expresseaglewing@gmail.com',
  region: 'Vancouver Island, British Columbia',
  hours: 'Monday – Friday · 8:00 am – 8:00 pm',
  hoursShort: 'Mon – Fri, 8 am – 8 pm',
  serviceDays: 'Mon – Fri',
  url: import.meta.env.VITE_SITE_URL || 'https://wing-express.ishita-8ab.workers.dev',
}

export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'How it works', href: '#process' },
  { label: 'Coverage', href: '#coverage' },
  { label: 'Why us', href: '#why' },
  { label: 'FAQ', href: '#faq' },
]

export const heroBadges = [
  'Victoria to Campbell River',
  company.hoursShort,
  'Parcels, pallets & full loads',
  'Fast, upfront quotes',
]

export const stats = [
  { value: 8, suffix: '', label: 'Island communities served' },
  { value: 5, suffix: ' days', label: 'Service every week' },
  { value: 12, suffix: ' hrs', label: 'Dispatch open daily' },
  { value: 1, suffix: ' call', label: 'Is all it takes to book' },
]

// CONFIRM: service list with the client.
export const services = [
  {
    icon: Route,
    title: 'Scheduled Island Runs',
    text: 'Regular runs up and down the Island between Victoria and Campbell River, so your freight moves on a schedule you can plan around.',
  },
  {
    icon: Zap,
    title: 'Express Delivery',
    text: 'Time-sensitive shipment? We prioritise urgent freight and keep you updated from pickup to drop-off.',
  },
  {
    icon: Boxes,
    title: 'Pallet & LTL Freight',
    text: 'From a single pallet to several — pay only for the space your shipment needs on a shared run.',
  },
  {
    icon: Truck,
    title: 'Full Loads',
    text: 'A dedicated truck for your load only. Direct, with no transfers and no shared stops.',
  },
  {
    icon: Building2,
    title: 'Business & Commercial',
    text: 'Retail restocks, job-site materials, office and trade deliveries — handled professionally and on time.',
  },
  {
    icon: Home,
    title: 'Residential Delivery',
    text: 'Careful final-mile delivery to homes across the Island, with clear communication about timing.',
  },
]

export const shipmentSizes = [
  {
    icon: Package,
    name: 'Parcels & boxes',
    text: 'Small shipments, documents and boxed goods moving between Island communities.',
    examples: ['Business parcels', 'Retail orders', 'Parts & supplies'],
  },
  {
    icon: Boxes,
    name: 'Pallets & LTL',
    text: 'One or more pallets riding on a shared run — the most cost-effective way to move bulk.',
    examples: ['Palletised stock', 'Building materials', 'Wholesale orders'],
    featured: true,
  },
  {
    icon: Truck,
    name: 'Full loads',
    text: 'A dedicated truck from pickup to delivery when you need the whole deck.',
    examples: ['Large orders', 'Moves & equipment', 'Time-critical loads'],
  },
]

export const process = [
  {
    icon: PhoneCall,
    title: 'Call or request a quote',
    text: `Call ${'(778) 268-5136'} or send the quote form. We reply with a clear, upfront price.`,
  },
  {
    icon: ClipboardList,
    title: 'We schedule your pickup',
    text: 'Dispatch confirms the pickup time and the best run for your shipment.',
  },
  {
    icon: Truck,
    title: 'On the road',
    text: 'Your freight travels the Island highway with a team that knows every stop.',
  },
  {
    icon: PackageCheck,
    title: 'Delivered & confirmed',
    text: 'We deliver with care and confirm as soon as your shipment arrives.',
  },
]

export const features = [
  { icon: Mountain, title: 'Island-wide coverage', text: 'Eight communities from Victoria to Campbell River, including Port Alberni.' },
  { icon: Headset, title: 'Real people at dispatch', text: 'Talk directly to the team moving your freight — no call centres.' },
  { icon: BadgeDollarSign, title: 'Upfront quotes', text: 'Clear pricing before we move anything. No surprises on the invoice.' },
  { icon: HandHeart, title: 'Careful handling', text: 'Every shipment is loaded, secured and delivered as if it were our own.' },
  { icon: CalendarSync, title: 'Regular pickups', text: 'Ask us about recurring pickups for businesses that ship every week.' },
  { icon: Clock, title: 'Long service hours', text: `Dispatch is open ${'8 am to 8 pm'}, Monday to Friday.` },
]

/**
 * Coverage — Vancouver Island, south to north.
 * Port Alberni sits on Hwy 4, branching west from Parksville.
 */
export const coverage = {
  mainLine: ['Victoria', 'Duncan', 'Ladysmith', 'Nanaimo', 'Parksville', 'Courtenay', 'Campbell River'],
  branch: { from: 'Parksville', to: 'Port Alberni', highway: 'Hwy 4' },
  highways: [
    { label: 'Hwy 1', from: 'Victoria', to: 'Nanaimo' },
    { label: 'Hwy 19', from: 'Nanaimo', to: 'Campbell River' },
  ],
  all: ['Victoria', 'Duncan', 'Ladysmith', 'Nanaimo', 'Parksville', 'Port Alberni', 'Courtenay', 'Campbell River'],
}

export const industries = [
  { icon: Store, label: 'Retail & Wholesale' },
  { icon: HardHat, label: 'Construction' },
  { icon: Factory, label: 'Manufacturing' },
  { icon: Stethoscope, label: 'Healthcare' },
  { icon: ShoppingBag, label: 'E-commerce' },
  { icon: Wheat, label: 'Agriculture' },
]

export const faqs = [
  {
    q: 'Which areas does EagleWing Express serve?',
    a: `We deliver across Vancouver Island: ${coverage.all.slice(0, -1).join(', ')} and ${coverage.all.at(-1)}. Not on the list? Ask us — we will let you know if we can help.`,
  },
  {
    q: 'What are your business hours?',
    a: `Our dispatch team is available ${company.hours}.`,
  },
  {
    q: 'What size of shipment can you take?',
    a: 'Anything from a single parcel or box to pallets and full truckloads.',
  },
  {
    q: 'How do I book a delivery?',
    a: `Call us at ${company.phone}, email ${company.email}, or fill in the quote form on this page. We confirm your pickup time and price before anything moves.`,
  },
  {
    q: 'How are rates calculated?',
    a: 'Rates depend on distance, the size and weight of your shipment, and any special handling. You always get an upfront quote first.',
  },
  {
    q: 'Do you offer regular pickups for businesses?',
    a: 'Yes — if you ship regularly, ask us about setting up recurring pickups on the days that suit you.',
  },
]

export const quoteOptions = {
  timing: ['As soon as possible', 'Today', 'Tomorrow', 'This week', 'Regular / recurring'],
  service: ['Scheduled run', 'Express delivery', 'Pallet / LTL', 'Full load', 'Residential delivery', 'Not sure'],
}
