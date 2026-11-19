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
  Stethoscope, ShoppingBag, Wheat, PackageOpen, Layers, Tag, TriangleAlert,
  DoorOpen, AlarmClock,
} from 'lucide-react'

export const company = {
  name: 'EagleWing Express',
  legalName: 'EagleWing Express Ltd.',
  tagline: 'Fast, reliable freight across Vancouver Island.',
  description:
    'EagleWing Express delivers parcels, pallets and full loads up and down Vancouver Island — from Victoria to Campbell River — with friendly dispatch and upfront quotes.',
  phone: '(778) 268-5136',
  email: 'expresseaglewing@gmail.com',
  region: 'Vancouver Island, British Columbia, Canada',
  regionShort: 'Vancouver Island, BC',
  hours: 'Monday – Friday · 8:00 am – 8:00 pm',
  hoursShort: 'Mon – Fri, 8 am – 8 pm',
  serviceDays: 'Mon – Fri',
  url: import.meta.env?.VITE_SITE_URL || 'https://eaglewingexpress.ca',
}

export const navLinks = [
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'How it works', to: '/how-it-works' },
  { label: 'Coverage', to: '/coverage' },
  { label: 'FAQ', to: '/faq' },
]

export const heroBadges = [
  'Victoria to Campbell River',
  company.hoursShort,
  'Parcels, pallets & full loads',
  'Based on Vancouver Island, BC',
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

/**
 * Communities served — public facts about each place, plus approximate
 * road distance from Victoria (rounded; actual routes vary).
 */
export const communities = [
  { name: 'Victoria', km: 0, region: 'Capital Region', fact: "British Columbia's capital, at the southern tip of the Island — the start of every northbound run." },
  { name: 'Duncan', km: 60, region: 'Cowichan Valley', fact: 'Known as the "City of Totems", at the heart of the Cowichan Valley over the Malahat.' },
  { name: 'Ladysmith', km: 88, region: 'Cowichan Valley', fact: 'Historic seaside town on the 49th parallel, between Duncan and Nanaimo on Hwy 1.' },
  { name: 'Nanaimo', km: 111, region: 'Central Island', fact: 'The "Harbour City" and the mid-Island hub where Hwy 1 meets the Inland Island Highway (Hwy 19).' },
  { name: 'Parksville', km: 150, region: 'Oceanside', fact: 'Oceanside community where Hwy 4 branches west across the Island toward Port Alberni.' },
  { name: 'Port Alberni', km: 195, region: 'Alberni Valley', fact: 'At the head of the Alberni Inlet, reached from Parksville on Hwy 4.' },
  { name: 'Courtenay', km: 220, region: 'Comox Valley', fact: 'The largest city in the Comox Valley, on the Inland Island Highway.' },
  { name: 'Campbell River', km: 265, region: 'North Island', fact: 'Known as the "Salmon Capital of the World" — the northern end of our network.' },
]

export const about = {
  title: 'Locally based. Island focused.',
  paragraphs: [
    'EagleWing Express Ltd. is a freight and delivery company based on Vancouver Island, British Columbia. We focus on one thing: moving goods safely and reliably between the communities of the Island.',
    'Our runs follow the Island’s main corridor — the Trans-Canada Highway (Hwy 1) from Victoria to Nanaimo, then the Inland Island Highway (Hwy 19) north through Parksville and Courtenay to Campbell River — with service west to Port Alberni on Highway 4.',
    'Because we work the same roads every week, we know the routes, the towns and the people we deliver to. When you call, you speak with the team that is actually handling your shipment.',
  ],
  highways: [
    { code: '1', name: 'Trans-Canada Highway', span: 'Victoria → Duncan → Ladysmith → Nanaimo' },
    { code: '19', name: 'Inland Island Highway', span: 'Nanaimo → Parksville → Courtenay → Campbell River' },
    { code: '4', name: 'Pacific Rim Highway', span: 'Parksville → Port Alberni' },
  ],
  facts: [
    { value: '~265 km', label: 'Victoria to Campbell River' },
    { value: '3', label: 'Island highways we run' },
    { value: '8', label: 'Communities on our network' },
  ],
}

/** Practical, general shipping-prep advice. */
export const prepTips = [
  { icon: PackageOpen, title: 'Pack it securely', text: 'Use sturdy boxes, fill empty space and tape every seam. Heavier items go at the bottom.' },
  { icon: Layers, title: 'Build stable pallets', text: 'Stack evenly with no overhang, stretch-wrap the load to the pallet and keep the top flat.' },
  { icon: Tag, title: 'Label every piece', text: 'Mark each box or pallet with the delivery name, address and a contact phone number.' },
  { icon: TriangleAlert, title: 'Flag anything special', text: 'Tell us in advance about fragile, oversized or high-value items so we can plan the handling.' },
  { icon: DoorOpen, title: 'Share site access', text: 'Let us know about loading docks, stairs, narrow driveways or delivery-time windows at either end.' },
  { icon: AlarmClock, title: 'Be ready on time', text: 'Have your shipment packed and accessible at the agreed pickup time so the run stays on schedule.' },
]

/** What dispatch needs for a fast, accurate quote. */
export const quoteChecklist = [
  'Pickup and delivery towns (and addresses if you have them)',
  'What you are shipping and how many pieces',
  'Approximate weight and size of each piece',
  'Your preferred pickup date',
  'Any access notes — dock, stairs, residential, time windows',
]

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
  {
    q: 'Where is EagleWing Express based?',
    a: `We are a local company based on ${company.region}, serving communities from Victoria to Campbell River.`,
  },
  {
    q: 'What information do you need to give me a quote?',
    a: 'The pickup and delivery towns, what you are shipping, the number of pieces with approximate weight and size, your preferred date, and any access notes for either site.',
  },
  {
    q: 'How should I prepare my shipment?',
    a: 'Pack items in sturdy boxes, wrap pallets securely with no overhang, label each piece with delivery details and a phone number, and tell us in advance about anything fragile or oversized.',
  },
  {
    q: 'Can I request a quote outside business hours?',
    a: `Yes. Send the quote form or an email any time, and our team will reply during business hours (${company.hoursShort}).`,
  },
  {
    q: 'Are you open on weekends?',
    a: 'No. Our dispatch team works Monday to Friday, 8 am to 8 pm, and we are closed on Saturdays and Sundays. Quote requests sent over the weekend are answered on the next business day.',
  },
  {
    q: 'What items can you not ship?',
    a: 'We do not carry dangerous goods regulated under the Transportation of Dangerous Goods Act, explosives, firearms or ammunition, illegal items, live animals, perishable goods that need refrigeration, or cash and valuables. If you are unsure, ask dispatch before booking.',
  },
  {
    q: 'Do you publish your prices?',
    a: 'No — every shipment is different, so we quote each one individually based on distance, size, weight and handling. Quotes are free and you get your price before anything moves.',
  },
]

export const quoteOptions = {
  timing: ['As soon as possible', 'Today', 'Tomorrow', 'This week', 'Regular / recurring'],
  service: ['Scheduled run', 'Express delivery', 'Pallet / LTL', 'Full load', 'Residential delivery', 'Not sure'],
}

/* ───────────── Business details & policies ─────────────
 * Facts below come from the client's email. Anything the client has not
 * confirmed is worded neutrally ("as stated in your quote") — do NOT add
 * specific amounts, fees or reviews until the client provides them.
 */

export const weeklyHours = [
  { day: 'Monday', time: '8:00 am – 8:00 pm' },
  { day: 'Tuesday', time: '8:00 am – 8:00 pm' },
  { day: 'Wednesday', time: '8:00 am – 8:00 pm' },
  { day: 'Thursday', time: '8:00 am – 8:00 pm' },
  { day: 'Friday', time: '8:00 am – 8:00 pm' },
  { day: 'Saturday', time: 'Closed', closed: true },
  { day: 'Sunday', time: 'Closed', closed: true },
]

/** What EagleWing Express carries. */
export const weDeliver = [
  'Parcels and boxed goods',
  'Documents and envelopes',
  'Single and multiple pallets (LTL)',
  'Full truckloads',
  'Business and commercial supplies',
  'Residential deliveries',
]

/**
 * Items not accepted — standard exclusions for a general freight carrier.
 * CONFIRM with client before launch.
 */
export const notAccepted = [
  "Dangerous goods regulated under Canada's Transportation of Dangerous Goods (TDG) Act — e.g. flammables, compressed gases, corrosives",
  'Explosives, firearms and ammunition',
  'Illegal, stolen or restricted items',
  'Live animals',
  'Perishable or temperature-controlled goods that need refrigeration',
  'Cash, jewellery, negotiable documents and irreplaceable items',
]

export const pricing = {
  model: 'Quote-based pricing',
  text: 'We do not publish fixed prices because every shipment is different. Your price depends on distance, the size and weight of your freight, and any special handling — and you always get a clear quote before anything moves.',
}

export const legal = {
  updated: 'November 2026',
  privacyContact: `Privacy contact: ${company.legalName}, ${company.email}, ${company.phone}`,
}
