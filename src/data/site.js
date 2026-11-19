/**
 * ─────────────────────────────────────────────────────────────
 *  EAGLEWING EXPRESS — SITE CONTENT
 *  Every piece of business info lives here.
 *
 *  Facts confirmed by the client (OpsVera review, 19 Nov 2026):
 *   - daily runs, Victoria to Campbell River + Port Alberni
 *   - daily Island ↔ Lower Mainland lane via Duke Point – Tsawwassen
 *   - 7 trucks on the Island, 3 ton and 5 ton, with tailgate lifts
 *   - specialty: tailgate delivery; business and residential customers
 *   - phones Mon–Fri 8 am–8 pm; deliveries available 7 days by booking
 *
 *  NOT confirmed yet — do not add until the client provides them:
 *   insurance amount, NSC status, bill of lading, base town, founding
 *   year, owner/dispatcher name, mainland cities and cut-off times,
 *   photos, reviews. Never claim "best" without proof (Competition Act).
 * ─────────────────────────────────────────────────────────────
 */
import {
  Truck, Package, Boxes, Zap, Building2, Home, Route, Clock,
  Headset, BadgeDollarSign, HandHeart, Mountain, Ship, ArrowDownToLine,
  PhoneCall, ClipboardList, PackageCheck, Store, HardHat, Factory,
  ShoppingBag, Wheat, PackageOpen, Layers, Tag, TriangleAlert,
  DoorOpen, AlarmClock,
} from 'lucide-react'

export const company = {
  name: 'EagleWing Express',
  legalName: 'EagleWing Express Ltd.',
  tagline: 'Daily Island freight and tailgate delivery.',
  description:
    'EagleWing Express runs daily freight from Victoria to Campbell River and Port Alberni, plus a daily run to the Lower Mainland via Duke Point – Tsawwassen, with 3 and 5 ton tailgate trucks for businesses and homes.',
  phone: '(236) 888-3135',
  email: 'expresseaglewing@gmail.com', // TODO: switch to a branded address (e.g. dispatch@eaglewingexpress.ca) once it exists
  region: 'Vancouver Island, British Columbia, Canada',
  regionShort: 'Vancouver Island, BC',
  // One hours rule, used everywhere (review item C3)
  phoneHours: 'Monday – Friday · 8:00 am – 8:00 pm',
  phoneHoursShort: 'Mon – Fri, 8 am – 8 pm',
  deliveryDays: '7 days a week by booking',
  hoursRule: 'Phones Mon – Fri, 8 am – 8 pm · Deliveries 7 days a week by booking',
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
  'Victoria to Campbell River & Port Alberni',
  'Daily run to the Lower Mainland',
  '3 & 5 ton trucks with tailgate lifts',
  'Deliveries 7 days a week by booking',
]

/** Stats use real, confirmed facts. `value` animates; `text` is shown as-is. */
export const stats = [
  { value: 7, label: 'Trucks on the Island' },
  { text: 'Daily', label: 'Island and mainland runs' },
  { text: '3 & 5 ton', label: 'Trucks with tailgate lifts' },
  { value: 8, suffix: ' + mainland', label: 'Island communities served' },
]

export const services = [
  {
    icon: ArrowDownToLine,
    title: 'Tailgate Delivery',
    text: 'No dock needed. Our 3 and 5 ton trucks carry tailgate lifts, so we lower pallets and heavy items to the ground at homes, job sites and shops without a loading dock or forklift.',
    highlight: true,
  },
  {
    icon: Ship,
    title: 'Daily Mainland Run',
    text: 'We run Duke Point to Tsawwassen every day, moving freight between Vancouver Island and the Lower Mainland. Ask dispatch which mainland cities we can reach for your shipment.',
    highlight: true,
  },
  {
    icon: Route,
    title: 'Daily Island Runs',
    text: 'Daily runs between Victoria and Campbell River, with service to Port Alberni, so your freight moves on a schedule you can plan around.',
  },
  {
    icon: Zap,
    title: 'Express Delivery',
    text: 'Time-sensitive shipment? Tell us when you book and we will plan the fastest option and keep you updated.',
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
    text: 'Retail restocks, job-site materials, office and trade deliveries, handled professionally.',
  },
  {
    icon: Home,
    title: 'Residential Delivery',
    text: 'Careful delivery to homes, with tailgate lowering to the ground and clear communication about timing.',
  },
]

export const shipmentSizes = [
  {
    icon: Package,
    name: 'Parcels & boxes',
    text: 'Small shipments, documents and boxed goods moving between Island communities and the mainland.',
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
    examples: ['Large orders', 'Equipment & large items', 'Time-critical loads'],
  },
]

/** Fleet — confirmed: 7 trucks, 3 ton and 5 ton, with tailgate lifts. */
export const fleet = {
  total: 7,
  intro: 'Seven trucks based on Vancouver Island, running daily between Victoria, Campbell River, Port Alberni and the Lower Mainland.',
  types: [
    {
      name: '3 ton trucks',
      text: 'Nimble trucks for homes, shops and smaller loads, including tight residential streets.',
      features: ['Tailgate lift', 'Parcels to a few pallets', 'Island runs'],
    },
    {
      name: '5 ton trucks',
      text: 'Bigger decks for pallet loads, building materials and full-load orders.',
      features: ['Tailgate lift', 'Multiple pallets', 'Island & mainland runs'],
    },
  ],
}

export const process = [
  {
    icon: PhoneCall,
    title: 'Call or request a quote',
    text: `Call ${'(236) 888-3135'} or send the quote form. We reply with a clear, upfront price.`,
  },
  {
    icon: ClipboardList,
    title: 'We schedule your pickup',
    text: 'Dispatch confirms the pickup day and time — weekdays or weekends by booking.',
  },
  {
    icon: Truck,
    title: 'On the road',
    text: 'Your freight rides our daily Island run, or crosses to the mainland via Duke Point – Tsawwassen.',
  },
  {
    icon: PackageCheck,
    title: 'Delivered & confirmed',
    text: 'We deliver with care — lowered by tailgate if there is no dock — and confirm when it arrives.',
  },
]

export const features = [
  { icon: Mountain, title: 'Victoria to Campbell River', text: 'Daily service from Victoria to Campbell River and Port Alberni, plus the Lower Mainland.' },
  { icon: ArrowDownToLine, title: 'Tailgate trucks', text: '3 and 5 ton trucks with tailgate lifts — no dock or forklift needed at your end.' },
  { icon: Headset, title: 'Real people at dispatch', text: 'Talk directly to the team moving your freight — no call centres.' },
  { icon: BadgeDollarSign, title: 'Upfront quotes', text: 'Clear pricing before we move anything. No surprises on the invoice.' },
  { icon: HandHeart, title: 'Careful handling', text: 'Every shipment is loaded, secured and delivered as if it were our own.' },
  { icon: Clock, title: 'Deliveries 7 days a week', text: `Phones are answered ${'Mon – Fri, 8 am – 8 pm'}; deliveries any day of the week by booking.` },
]

/**
 * Coverage — Vancouver Island, south to north, plus the mainland lane.
 * Port Alberni sits on Hwy 4, branching west from Parksville.
 * Mainland: BC Ferries route Duke Point (Nanaimo) – Tsawwassen.
 */
export const coverage = {
  mainLine: ['Victoria', 'Duncan', 'Ladysmith', 'Nanaimo', 'Parksville', 'Courtenay', 'Campbell River'],
  branch: { from: 'Parksville', to: 'Port Alberni', highway: 'Hwy 4' },
  mainland: { from: 'Nanaimo', to: 'Lower Mainland', via: 'Duke Point – Tsawwassen ferry' },
  highways: [
    { label: 'Hwy 1', from: 'Victoria', to: 'Nanaimo' },
    { label: 'Hwy 19', from: 'Nanaimo', to: 'Campbell River' },
  ],
  all: ['Victoria', 'Duncan', 'Ladysmith', 'Nanaimo', 'Parksville', 'Port Alberni', 'Courtenay', 'Campbell River'],
  mainlandLabel: 'Lower Mainland (via Tsawwassen)',
}

/**
 * Communities served — public facts about each place, plus approximate
 * road distance from Victoria (rounded; actual routes vary).
 */
export const communities = [
  { name: 'Victoria', km: 0, region: 'Capital Region', fact: "British Columbia's capital, at the southern tip of the Island — the start of every northbound run." },
  { name: 'Duncan', km: 60, region: 'Cowichan Valley', fact: 'Known as the "City of Totems", at the heart of the Cowichan Valley over the Malahat.' },
  { name: 'Ladysmith', km: 88, region: 'Cowichan Valley', fact: 'Historic seaside town on the 49th parallel, between Duncan and Nanaimo on Hwy 1.' },
  { name: 'Nanaimo', km: 111, region: 'Central Island', fact: 'The "Harbour City", where Hwy 1 meets Hwy 19 — and home of the Duke Point ferry terminal, our link to the mainland.' },
  { name: 'Parksville', km: 150, region: 'Oceanside', fact: 'Oceanside community where Hwy 4 branches west across the Island toward Port Alberni.' },
  { name: 'Port Alberni', km: 195, region: 'Alberni Valley', fact: 'At the head of the Alberni Inlet, reached from Parksville on Hwy 4.' },
  { name: 'Courtenay', km: 220, region: 'Comox Valley', fact: 'The largest city in the Comox Valley, on the Inland Island Highway.' },
  { name: 'Campbell River', km: 265, region: 'North Island', fact: 'Known as the "Salmon Capital of the World" — the northern end of our Island network.' },
]

export const about = {
  title: 'Island based, on the road every day',
  paragraphs: [
    'EagleWing Express Ltd. is a freight and delivery company based on Vancouver Island, British Columbia. We run daily between Victoria, Campbell River and Port Alberni, and every day across to the Lower Mainland via Duke Point – Tsawwassen.',
    'Our fleet of seven 3 ton and 5 ton trucks carries tailgate lifts, so we can deliver to homes, job sites and shops that have no loading dock or forklift — tailgate delivery is our specialty.',
    'Our phones are answered Monday to Friday, 8 am to 8 pm, and deliveries can be booked any day of the week. When you call, you speak with the team that is actually handling your shipment.',
  ],
  highways: [
    { code: '1', name: 'Trans-Canada Highway', span: 'Victoria → Duncan → Ladysmith → Nanaimo' },
    { code: '19', name: 'Inland Island Highway', span: 'Nanaimo → Parksville → Courtenay → Campbell River' },
    { code: '4', name: 'Pacific Rim Highway', span: 'Parksville → Port Alberni' },
    { code: 'ferry', name: 'Duke Point – Tsawwassen', span: 'Nanaimo ⇄ Lower Mainland, daily' },
  ],
  facts: [
    { value: '7', label: 'Trucks on the Island' },
    { value: 'Daily', label: 'Island & mainland runs' },
    { value: '~265 km', label: 'Victoria to Campbell River' },
  ],
}

/** Practical, general shipping-prep advice. */
export const prepTips = [
  { icon: PackageOpen, title: 'Pack it securely', text: 'Use sturdy boxes, fill empty space and tape every seam. Heavier items go at the bottom.' },
  { icon: Layers, title: 'Build stable pallets', text: 'Stack evenly with no overhang, stretch-wrap the load to the pallet and keep the top flat.' },
  { icon: Tag, title: 'Label every piece', text: 'Mark each box or pallet with the delivery name, address and a contact phone number.' },
  { icon: TriangleAlert, title: 'Flag anything special', text: 'Tell us in advance about fragile, oversized or high-value items so we can plan the handling.' },
  { icon: DoorOpen, title: 'Share site access', text: 'Let us know about loading docks, stairs, narrow driveways, or if you need tailgate lowering.' },
  { icon: AlarmClock, title: 'Be ready on time', text: 'Have your shipment packed and accessible at the agreed pickup time so the run stays on schedule.' },
]

/** What dispatch needs for a fast, accurate quote. */
export const quoteChecklist = [
  'Pickup and delivery towns (and addresses if you have them)',
  'What you are shipping and how many pieces',
  'Approximate weight and size of each piece',
  'Your preferred pickup date — weekdays or weekends',
  'Whether you need tailgate lowering (no dock or forklift)',
]

// "Healthcare" removed per review until the client confirms they carry medical supplies.
export const industries = [
  { icon: Store, label: 'Retail & Wholesale' },
  { icon: HardHat, label: 'Construction' },
  { icon: Factory, label: 'Manufacturing' },
  { icon: ShoppingBag, label: 'E-commerce' },
  { icon: Wheat, label: 'Agriculture' },
]

export const faqs = [
  {
    q: 'Which areas does EagleWing Express serve?',
    a: 'We run daily between Victoria and Campbell River, with stops in Duncan, Ladysmith, Nanaimo, Parksville and Courtenay, service to Port Alberni, and a daily run to the Lower Mainland via Duke Point – Tsawwassen. Not on the list? Call us — we may still be able to help.',
  },
  {
    q: 'Do you offer tailgate delivery?',
    a: 'Yes. Our 3 and 5 ton trucks have tailgate lifts, so we can lower pallets and heavy items to ground level where there is no loading dock or forklift. Just tell us when you book.',
  },
  {
    q: 'Do you deliver to the mainland?',
    a: 'Yes. We run between Vancouver Island and the Lower Mainland every day via the Duke Point – Tsawwassen ferry. Ask dispatch which mainland cities we can reach for your shipment.',
  },
  {
    q: 'What are your hours?',
    a: `Our phones are answered ${company.phoneHours}. Deliveries are available 7 days a week when booked in advance.`,
  },
  {
    q: 'Do you deliver on weekends?',
    a: 'Yes. Our phones are answered Monday to Friday, and weekend deliveries can be booked in advance — call us or send a quote request during the week.',
  },
  {
    q: 'What size of shipment can you take?',
    a: 'Anything from a single parcel or box to pallets and full loads, on our 3 and 5 ton trucks.',
  },
  {
    q: 'How do I book a delivery?',
    a: `Call us at ${company.phone}, email ${company.email}, or fill in the quote form on our Contact page. We confirm your pickup time and price before anything moves.`,
  },
  {
    q: 'How are rates calculated?',
    a: 'Rates depend on distance, the size and weight of your shipment, and any special handling such as tailgate lowering. You always get an upfront quote first.',
  },
  {
    q: 'Is my freight insured?',
    a: 'Please ask dispatch about cargo coverage before you book, and tell us about any high-value items so we can discuss declared value and handling options.',
  },
  {
    q: 'How do I report loss or damage?',
    a: 'Let us know as soon as possible — ideally at the time of delivery — and note any visible damage on the delivery paperwork. Then call dispatch or email us with photos and your shipment details.',
  },
  {
    q: 'Do you offer regular pickups for businesses?',
    a: 'Yes — if you ship regularly, ask us about setting up recurring pickups on the days that suit you.',
  },
  {
    q: 'Where is EagleWing Express based?',
    a: `We are a local company based on ${company.region}, serving communities from Victoria to Campbell River and the Lower Mainland.`,
  },
  {
    q: 'What information do you need to give me a quote?',
    a: 'The pickup and delivery towns, what you are shipping, the number of pieces with approximate weight and size, your preferred date, and whether you need tailgate lowering.',
  },
  {
    q: 'How should I prepare my shipment?',
    a: 'Pack items in sturdy boxes, wrap pallets securely with no overhang, label each piece with delivery details and a phone number, and tell us in advance about anything fragile or oversized.',
  },
  {
    q: 'Can I request a quote outside phone hours?',
    a: `Yes. Send the quote form or an email any time, and our team will reply when phones are open (${company.phoneHoursShort}).`,
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
  timing: ['As soon as possible', 'Today', 'Tomorrow', 'This week', 'Weekend (by booking)', 'Regular / recurring'],
  service: ['Tailgate delivery', 'Mainland run (via Tsawwassen)', 'Daily Island run', 'Express delivery', 'Pallet / LTL', 'Full load', 'Residential delivery', 'Not sure'],
}

/* ───────────── Business details & policies ───────────── */

/** Phone hours. Deliveries run 7 days a week by booking. */
export const weeklyHours = [
  { day: 'Monday', time: '8:00 am – 8:00 pm' },
  { day: 'Tuesday', time: '8:00 am – 8:00 pm' },
  { day: 'Wednesday', time: '8:00 am – 8:00 pm' },
  { day: 'Thursday', time: '8:00 am – 8:00 pm' },
  { day: 'Friday', time: '8:00 am – 8:00 pm' },
  { day: 'Saturday', time: 'Deliveries by booking', closed: true },
  { day: 'Sunday', time: 'Deliveries by booking', closed: true },
]

/** What EagleWing Express carries. */
export const weDeliver = [
  'Parcels and boxed goods',
  'Documents and envelopes',
  'Single and multiple pallets (LTL)',
  'Full loads',
  'Tailgate deliveries to homes, job sites and shops',
  'Freight to and from the Lower Mainland',
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
