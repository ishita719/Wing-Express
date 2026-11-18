import { ShieldCheck } from 'lucide-react'
import LegalPage from '../components/layout/LegalPage'
import { company, legal } from '../data/site'

/*
 * Privacy policy for a small BC business under the
 * Personal Information Protection Act (PIPA). CLIENT REVIEW REQUIRED.
 */
const sections = [
  {
    id: 'overview',
    title: 'Overview',
    body: [
      `${company.legalName} respects your privacy. This policy explains what personal information we collect, why we collect it and how we protect it, in line with British Columbia's Personal Information Protection Act (PIPA).`,
    ],
  },
  {
    id: 'collect',
    title: 'Information we collect',
    body: [
      'We only collect the information we need to quote, arrange and complete your shipment, such as:',
      [
        'your name, company name, phone number and email address;',
        'pickup and delivery addresses, and recipient names and phone numbers;',
        'details about your shipment and any access or delivery instructions;',
        'records of the services we provide to you.',
      ],
      'Our website does not use advertising or tracking cookies.',
    ],
  },
  {
    id: 'use',
    title: 'How we use it',
    body: [
      'We use your information to:',
      ['respond to quote requests and questions;', 'schedule pickups and deliveries;', 'contact you about your shipment;', 'keep business and accounting records required by law.'],
      'We do not sell, rent or trade your personal information.',
    ],
  },
  {
    id: 'share',
    title: 'When we share it',
    body: [
      'We share personal information only when needed to complete your shipment (for example, giving a recipient name to the driver), with service providers who help us run our business under confidentiality obligations, or when required by law.',
    ],
  },
  {
    id: 'protect',
    title: 'How we protect it',
    body: [
      'We use reasonable safeguards to protect your information against loss, theft and unauthorized access, and we keep it only as long as needed for the purposes above or as required by law.',
    ],
  },
  {
    id: 'rights',
    title: 'Your choices and rights',
    body: [
      'Under PIPA you may ask to see the personal information we hold about you and ask us to correct it. You can also withdraw your consent to certain uses, subject to legal or contractual limits. To make a request, contact us using the details below.',
      'If you are not satisfied with our response, you may contact the Office of the Information and Privacy Commissioner for British Columbia.',
    ],
  },
  {
    id: 'contact',
    title: 'Privacy contact',
    body: [legal.privacyContact, `We aim to respond to privacy requests within the time required by PIPA. Office hours: ${company.hoursShort}.`],
  },
]

export default function Privacy() {
  return (
    <LegalPage
      eyebrow="Privacy policy"
      icon={ShieldCheck}
      title="Privacy policy"
      intro="How EagleWing Express collects, uses and protects your personal information."
      sections={sections}
    />
  )
}
