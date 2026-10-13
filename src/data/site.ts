/** Company, contact and navigation constants for the Mileage Master site. */

export const site = {
  brand: 'Mileage Master',
  legalName: 'Mileage Master Inc.',
  distributor: 'OEM Fleets',
  tagline: 'Advanced full synthetic engine oil',
  phone: '905.602.6897',
  phoneHref: 'tel:+19056026897',
  email: 'orders@oemfleets.ca',
  emailHref: 'mailto:orders@oemfleets.ca',
  hours: 'MON–FRI 8–5 · MISSISSAUGA, ON',
  hoursLong: 'Mon–Fri 8:00–5:00 EST',
  origin: 'MADE IN EUROPE · SHIPPED FROM MISSISSAUGA, ON',
  address:
    'Mileage Master Inc. · Mississauga, ON, Canada. Distributed by OEM Fleets, authorized distributor.',
  copyright: '© 2026 Mileage Master Inc.',
} as const

/** Header navigation. Homepage sections are reached as in-page anchors. */
export const mainNav = [
  { label: 'OIL FINDER', href: '/oil-finder/', page: 'finder' as const },
  { label: 'PRODUCTS', href: '#grades', page: 'home' as const },
  { label: 'MADE IN EUROPE', href: '#europe', page: 'home' as const },
  { label: 'APPROVALS', href: '#specs', page: 'home' as const },
  { label: 'BECOME A DEALER', href: '#dealers', page: 'home' as const },
]

export const footerColumns = [
  {
    heading: 'PRODUCTS',
    links: [
      { label: 'Gasoline engine oil', href: '#grades', page: 'home' as const },
      { label: '0W-8 – 5W-40', href: '#grades', page: 'home' as const },
      { label: 'Spec sheets', href: '#specs', page: 'home' as const },
      { label: 'Safety data sheets', href: '#specs', page: 'home' as const },
    ],
  },
  {
    heading: 'FOR SHOPS',
    links: [
      { label: 'Wholesale pricing', href: '#quote', page: 'home' as const },
      { label: 'Become a dealer', href: '#dealers', page: 'home' as const },
      { label: 'Oil finder', href: '/oil-finder/', page: 'finder' as const },
      { label: 'Warranty information', href: '#specs', page: 'home' as const },
    ],
  },
]

export const legalStrip = [site.copyright, 'Made in Europe', 'API SP licensed']

/** Groups on the human-readable sitemap page, in reading order. */
export const sitemapGroups = [
  {
    heading: 'Homepage',
    links: [
      { label: 'Home', href: '/', page: 'home' as const },
      { label: 'Find the right oil', href: '#finder', page: 'home' as const },
      { label: 'Available grades, 0W-8 to 5W-40', href: '#grades', page: 'home' as const },
      { label: 'Made in Europe', href: '#europe', page: 'home' as const },
      { label: 'Approvals & specifications', href: '#specs', page: 'home' as const },
      { label: 'Become a dealer', href: '#dealers', page: 'home' as const },
    ],
  },
  {
    heading: 'Oil finder',
    links: [
      { label: 'Find the right motor oil', href: '/oil-finder/', page: 'finder' as const },
      { label: 'Search by year, make, model and engine', href: '#finder', page: 'finder' as const },
      { label: 'Case pricing', href: '#pricing', page: 'finder' as const },
      { label: 'Vehicle not listed?', href: '#help', page: 'finder' as const },
    ],
  },
  {
    heading: 'For shops',
    links: [
      { label: 'Request wholesale pricing', href: '#quote', page: 'home' as const },
      { label: 'Become a dealer', href: '#dealers', page: 'home' as const },
      { label: 'Spec sheets', href: '#specs', page: 'home' as const },
      { label: 'Warranty information', href: '#specs', page: 'home' as const },
    ],
  },
]
