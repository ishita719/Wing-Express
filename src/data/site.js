/**
 * ─────────────────────────────────────────────────────────────
 *  WING EXPRESS — SITE CONTENT
 *  Every piece of business info lives here. Replace the values
 *  marked `TODO` with the real company details before launch.
 * ─────────────────────────────────────────────────────────────
 */
import {
  Truck, Package, Warehouse, Clock, ShieldCheck, MapPin, Route, Snowflake,
  CalendarCheck, Zap, Headset, Radar, Forklift, Boxes, Store, Factory,
  Stethoscope, HardHat, ShoppingBag, Wheat, BadgeCheck, Timer, PackageCheck,
} from 'lucide-react'

export const company = {
  name: 'Wing Express',
  legalName: 'Wing Express Inc.', // TODO: confirm legal name
  tagline: 'Freight that moves like it has wings.',
  description:
    'Wing Express is a reliable trucking and freight company offering scheduled daily runs, full truckload, LTL, tailgate and last-mile delivery for businesses of every size.',
  phone: '+1 (555) 010-2040', // TODO: real dispatch phone
  phoneAlt: '+1 (555) 010-2041', // TODO: real alternate phone
  email: 'dispatch@wingexpress.ca', // TODO: real email
  address: '100 Freightway Drive, Your City, BC', // TODO: real address
  hours: 'Monday – Saturday · 7:00 am – 7:00 pm',
  serviceDays: 'Mon – Sat',
  cutoff: '4:00 pm',
  url: import.meta.env.VITE_SITE_URL || 'https://wing-express.pages.dev',
  founded: '2026',
}

export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Fleet', href: '#fleet' },
  { label: 'How it works', href: '#process' },
  { label: 'Coverage', href: '#coverage' },
  { label: 'FAQ', href: '#faq' },
]

export const heroBadges = [
  'Daily scheduled runs',
  'Tailgate on every truck',
  'Fully insured & NSC compliant',
  'Same-day quotes',
]

export const stats = [
  { value: 98, suffix: '%', label: 'On-time delivery' },
  { value: 6, suffix: ' days', label: 'Service every week' },
  { value: 3, suffix: ' sizes', label: '16, 20 & 26 ft trucks' },
  { value: 24, suffix: 'h', label: 'Typical transit, hub to door' },
]

export const services = [
  {
    icon: Route,
    title: 'Scheduled Daily Freight',
    text: 'Fixed departures on a set route so you always know when your freight leaves and when it lands. Book by the cutoff, delivered next day.',
  },
  {
    icon: Truck,
    title: 'Full Truckload (FTL)',
    text: 'A dedicated truck for your load only — direct, no transfers, no shared stops. Ideal for large orders and time-critical shipments.',
  },
  {
    icon: Boxes,
    title: 'LTL & Pallet Shipping',
    text: 'From a single parcel to multiple pallets. Pay only for the deck space you use while riding on our scheduled network.',
  },
  {
    icon: Forklift,
    title: 'Tailgate Delivery',
    text: 'No dock or forklift at your site? Every Wing Express truck carries a power tailgate to set freight down right where you need it.',
  },
  {
    icon: PackageCheck,
    title: 'Last-Mile & Residential',
    text: 'Careful final-leg delivery to shops, job sites and homes, with photo proof of delivery and recipient sign-off.',
  },
  {
    icon: Warehouse,
    title: 'Cross-Dock & Storage',
    text: 'Drop freight at our secure hub, consolidate shipments, or hold stock short-term until your customer is ready to receive.',
  },
]

export const fleet = [
  {
    size: '16 ft',
    name: 'City Runner',
    capacity: 'Up to 6 pallets · 3,000 lb',
    best: 'Parcels, retail restocks and residential drops in tight streets.',
    features: ['Power tailgate', 'E-track tie-downs', 'GPS tracked'],
  },
  {
    size: '20 ft',
    name: 'Regional Workhorse',
    capacity: 'Up to 10 pallets · 5,500 lb',
    best: 'Mixed LTL loads on scheduled daily runs between hubs.',
    features: ['Power tailgate', 'Pallet jack on board', 'GPS tracked'],
    featured: true,
  },
  {
    size: '26 ft',
    name: 'Heavy Hauler',
    capacity: 'Up to 14 pallets · 10,000 lb',
    best: 'Full truckloads, building supplies and bulk commercial orders.',
    features: ['Power tailgate', 'Air-ride suspension', 'GPS tracked'],
  },
]

export const process = [
  {
    icon: CalendarCheck,
    step: '01',
    title: 'Book before cutoff',
    text: `Request a quote or call dispatch. Freight booked by ${company.cutoff} rides the next departure.`,
  },
  {
    icon: Package,
    step: '02',
    title: 'Pickup & load',
    text: 'We collect from your door or you drop at our hub. Freight is loaded in stop order that evening.',
  },
  {
    icon: Radar,
    step: '03',
    title: 'Tracked in transit',
    text: 'Every truck is GPS tracked. Dispatch keeps you posted with real updates — not guesses.',
  },
  {
    icon: BadgeCheck,
    step: '04',
    title: 'Delivered & confirmed',
    text: 'Freight lands next day with photo proof of delivery and a confirmation sent straight to you.',
  },
]

export const features = [
  { icon: Clock, title: 'On-time, every run', text: 'Fixed schedules and a cutoff you can plan around.' },
  { icon: ShieldCheck, title: 'Insured & compliant', text: 'Cargo insurance, WCB coverage and NSC-certified carrier.' },
  { icon: Headset, title: 'Real people at dispatch', text: 'Call and talk to the team that is actually moving your freight.' },
  { icon: Zap, title: 'Same-day quotes', text: 'Clear, upfront rates — usually within a few business hours.' },
  { icon: Snowflake, title: 'All-season reliability', text: 'Winter-ready trucks and experienced drivers on every road.' },
  { icon: Timer, title: 'Standing bookings', text: 'Weekly reserved deck space and locked-in rates for regular shippers.' },
]

// TODO: replace with the real stops / cities Wing Express serves.
export const coverage = {
  hub: 'Main Hub',
  stops: [
    { name: 'Main Hub', km: 0 },
    { name: 'Stop 2', km: 120 },
    { name: 'Stop 3', km: 245 },
    { name: 'Stop 4', km: 380 },
    { name: 'Stop 5', km: 520 },
    { name: 'Coast Terminal', km: 700 },
  ],
  pickups: ['Metro Region', 'Valley Region', 'Interior Region'],
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
    q: 'What areas does Wing Express service?',
    a: 'We run scheduled daily freight across our core route and offer pickups from surrounding regions. Not sure if we reach you? Send a quote request and dispatch will confirm the same day.',
  },
  {
    q: 'How often do your trucks run?',
    a: `Our scheduled runs operate ${company.serviceDays}. Freight booked before the ${company.cutoff} cutoff ships on the next departure.`,
  },
  {
    q: 'What size of shipment can you take?',
    a: 'Anything from a single parcel to a full 26 ft truckload. LTL customers pay only for the space their freight uses.',
  },
  {
    q: 'Do I need a loading dock or forklift?',
    a: 'No. Every Wing Express truck has a power tailgate, and our 20 ft trucks carry a pallet jack, so we can deliver to sites without a dock.',
  },
  {
    q: 'Is my freight insured?',
    a: 'Yes. We carry cargo insurance and full commercial liability, are WCB covered, and operate as an NSC-certified carrier. Certificates are available on request.',
  },
  {
    q: 'How are rates calculated?',
    a: 'Rates depend on distance, weight or pallet count, and any extras such as tailgate or residential delivery. Standing weekly bookings receive locked-in pricing.',
  },
]

export const quoteOptions = {
  timing: ['Ready now', 'Today', 'Tomorrow', 'This week', 'Weekly standing booking'],
  service: ['Scheduled daily freight', 'Full truckload', 'LTL / pallets', 'Last-mile delivery', 'Storage / cross-dock', 'Not sure'],
}
