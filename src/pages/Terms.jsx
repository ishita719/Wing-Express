import { Scale } from 'lucide-react'
import LegalPage from '../components/layout/LegalPage'
import { company, notAccepted } from '../data/site'

/*
 * General terms of service. Deliberately avoids specific amounts, fees or
 * time limits the client has not confirmed — those are "as stated in your quote".
 * CLIENT REVIEW REQUIRED before launch.
 */
const sections = [
  {
    id: 'about',
    title: 'About these terms',
    body: [
      `These terms describe how ${company.legalName} ("EagleWing Express", "we", "us") provides freight and delivery services on Vancouver Island, British Columbia, Canada. By booking a pickup or delivery with us, you agree to these terms together with the details in your quote.`,
    ],
  },
  {
    id: 'quotes',
    title: 'Quotes and bookings',
    body: [
      'Every price is quoted before your shipment moves. Quotes are based on the information you provide — pickup and delivery locations, what is being shipped, the number of pieces, approximate weight and size, and any access notes.',
      'If the shipment turns out to be materially different from what was described (for example heavier, larger, or needing extra handling), the price may change. We will tell you before going ahead.',
      'A booking is confirmed once our dispatch team has confirmed the pickup time and price with you.',
    ],
  },
  {
    id: 'responsibilities',
    title: 'Your responsibilities',
    body: [
      'When you book with us, you agree to:',
      [
        'describe your shipment accurately and completely;',
        'pack and label your freight securely so it can travel safely;',
        'have the shipment ready and accessible at the agreed pickup time;',
        'tell us in advance about fragile, oversized or high-value items and any site-access limits;',
        'make sure someone is available to receive the delivery, or give clear delivery instructions.',
      ],
    ],
  },
  {
    id: 'prohibited',
    title: 'Items we do not accept',
    body: ['For safety and legal reasons we do not carry:', notAccepted, 'If you are unsure whether an item is acceptable, please ask dispatch before booking.'],
  },
  {
    id: 'pickup',
    title: 'Pickup and delivery times',
    body: [
      'We work hard to keep every run on schedule. Pickup and delivery times are estimates and can be affected by weather, road conditions, highway closures, traffic and other events outside our control. We will keep you informed of any significant delay.',
    ],
  },
  {
    id: 'cancellations',
    title: 'Changes and cancellations',
    body: [
      'If you need to change or cancel a booking, please contact dispatch as early as possible. Any charge for a late cancellation or a missed pickup will be stated in your quote or confirmed with you at the time of booking.',
    ],
  },
  {
    id: 'liability',
    title: 'Loss or damage',
    body: [
      'We handle every shipment with care. If something is lost or damaged while in our care, please let us know as soon as possible — ideally at the time of delivery — and note any visible damage on the delivery paperwork.',
      'Our liability for loss or damage is limited to the extent permitted by law and as set out in your quote or shipping documents. If your shipment is high-value, tell us before booking so we can discuss the options available.',
      'We are not responsible for loss or damage caused by inadequate packaging, inaccurate shipment descriptions, inherent defects in the goods, or events outside our reasonable control.',
    ],
  },
  {
    id: 'payment',
    title: 'Payment',
    body: ['Accepted payment methods and payment terms are confirmed with your quote. Please contact dispatch if you have any questions about an invoice.'],
  },
  {
    id: 'law',
    title: 'Governing law',
    body: ['These terms are governed by the laws of the Province of British Columbia and the federal laws of Canada that apply there.'],
  },
  {
    id: 'contact',
    title: 'Contact us',
    body: [`Questions about these terms? Call ${company.phone} or email ${company.email}, ${company.hoursShort}.`],
  },
]

export default function Terms() {
  return (
    <LegalPage
      eyebrow="Terms of service"
      icon={Scale}
      title="Terms of service"
      intro="The plain-language terms that apply when you ship with EagleWing Express."
      sections={sections}
    />
  )
}
