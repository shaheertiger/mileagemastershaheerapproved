/**
 * The seven Mileage Master viscosity grades.
 *
 * `service` is the licence string shown in the grade panel and the finder fact
 * strip; `blurbShort` is the catalogue copy, `blurbLong` the homepage copy.
 */

export const GRADE_NAMES = [
  '0W-8',
  '0W-16',
  '0W-20',
  '0W-30',
  '5W-20',
  '5W-30',
  '5W-40',
] as const

export type GradeName = (typeof GRADE_NAMES)[number]

export interface Grade {
  name: GradeName
  /** Industry licences carried by this grade. */
  service: string
  /** Manufacturer drain interval guidance. */
  drain: string
  /** Homepage grade-panel copy. */
  blurbLong: string
  /** Catalogue product-card copy. */
  blurbShort: string
}

export const GRADES: readonly Grade[] = [
  {
    name: '0W-8',
    service: 'API SP · ILSAC GF-6A',
    drain: 'Up to 10,000 km',
    blurbLong:
      'Ultra-low viscosity for the newest hybrid and Atkinson-cycle gasoline engines that specify a 0W-8 fill. Maximum fuel economy with a stable film at operating temperature.',
    blurbShort:
      'Ultra-low viscosity for the newest hybrid and Atkinson-cycle engines. Maximum fuel economy with a stable film at operating temperature.',
  },
  {
    name: '0W-16',
    service: 'API SP · ILSAC GF-6B',
    drain: 'Up to 10,000 km',
    blurbLong:
      'Built for late-model Japanese hybrids calling for 0W-16. Protects at start-up in Canadian winters and holds pressure once the engine is hot.',
    blurbShort:
      'Built for late-model hybrids calling for 0W-16. Protects at start-up through Canadian winters and holds pressure once hot.',
  },
  {
    name: '0W-20',
    service: 'API SP · SN PLUS · ILSAC GF-6A',
    drain: 'Up to 12,000 km',
    blurbLong:
      'The workhorse grade. Meets Chrysler MS-6395, Ford WSS-M2C947-A and GM 6094M, with LSPI protection and sludge control for turbo direct-injection engines.',
    blurbShort:
      'The workhorse grade. LSPI protection and sludge control for turbocharged direct-injection engines.',
  },
  {
    name: '0W-30',
    service: 'API SP · ACEA A5/B5',
    drain: 'Up to 15,000 km',
    blurbLong:
      'European-spec light viscosity for extended drain intervals on gasoline engines running long service schedules.',
    blurbShort:
      'European-spec light viscosity for extended drain intervals on gasoline engines running long service schedules.',
  },
  {
    name: '5W-20',
    service: 'API SP · ILSAC GF-6A',
    drain: 'Up to 12,000 km',
    blurbLong:
      'Domestic-fleet standard fill. Stable oil film between sliding surfaces and rust protection on short-trip duty cycles.',
    blurbShort:
      'Domestic-fleet standard fill. Stable oil film between sliding surfaces and rust protection on short-trip duty cycles.',
  },
  {
    name: '5W-30',
    service: 'API SP · SN PLUS · ILSAC GF-6A',
    drain: 'Up to 12,000 km',
    blurbLong:
      'The most requested grade in the bay. Broad OEM coverage across domestic, Asian and European gasoline engines.',
    blurbShort:
      'The most requested grade in the bay. Broad OEM coverage across domestic, Asian and European gasoline engines.',
  },
  {
    name: '5W-40',
    service: 'API SP · ACEA A3/B4',
    drain: 'Up to 15,000 km',
    blurbLong:
      'High-temperature protection for performance and heavily loaded engines, including turbocharged applications running hot.',
    blurbShort:
      'High-temperature protection for performance and heavily loaded engines, including turbos running hot.',
  },
]

const GRADE_INDEX = new Map(GRADES.map((g) => [g.name, g]))

export function getGrade(name: string): Grade {
  return GRADE_INDEX.get(name as GradeName) ?? GRADES[2]!
}

export function isGradeName(value: string): value is GradeName {
  return GRADE_INDEX.has(value as GradeName)
}

/** Licences and OEM specifications shown in the Approvals section. */
export const INDUSTRY_LICENCES = ['API SP · SN PLUS', 'ILSAC GF-6A', 'ACEA A1/B1 · A5/B5']

export const OEM_SPECIFICATIONS = [
  'Chrysler MS-6395',
  'Ford WSS-M2C947-A',
  'GM 6094M',
]

/**
 * The "Recommended for use with" block as it is printed on the pack.
 *
 * Set as real text rather than left to be read off the product photo: it stays
 * legible at any size, gets indexed, and is read out by screen readers.
 */
export const LABEL_APPROVALS = [...INDUSTRY_LICENCES, ...OEM_SPECIFICATIONS]
