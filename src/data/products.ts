import { getGrade, type GradeName } from './grades'
import { JUG_FRONT, type ResponsiveImage } from './images'

/**
 * The Mileage Master product catalogue.
 *
 * Three lines are offered in every viscosity grade. The finder builds its
 * recommendations from these definitions, so adding a line here adds it
 * everywhere it can legitimately appear.
 */

export type ProductLineId = 'premium' | 'high-mileage' | 'blend'

export interface ProductLine {
  id: ProductLineId
  /** Suffix appended to the grade to form the product name. */
  nameSuffix: string
  /** Short code used to build the SKU. */
  code: string
  pack: string
  packSize: '5 L' | '4 L'
  perCase: number
  tag: string
  tagBackground: string
  tagForeground: string
  /** Card copy. `{licence}` is replaced with the licence part of the vehicle spec. */
  blurb: string
}

export const PRODUCT_LINES: readonly ProductLine[] = [
  {
    id: 'premium',
    nameSuffix: 'Premium Full Synthetic',
    code: 'PFS',
    pack: '5 L JUG · 4 PER CASE',
    packSize: '5 L',
    perCase: 4,
    tag: 'RECOMMENDED',
    tagBackground: 'var(--mm-red)',
    tagForeground: 'var(--mm-white)',
    blurb: '', // Filled from the grade's own catalogue copy.
  },
  {
    id: 'high-mileage',
    nameSuffix: 'High Mileage Full Synthetic',
    code: 'HM',
    pack: '5 L JUG · 4 PER CASE',
    packSize: '5 L',
    perCase: 4,
    tag: 'OVER 120,000 KM',
    tagBackground: 'var(--mm-gold)',
    tagForeground: 'var(--mm-ink)',
    blurb:
      'Seal conditioners and an elevated detergent load to slow leaks and control deposits in higher-kilometre engines, on the same {licence} licence.',
  },
  {
    id: 'blend',
    nameSuffix: 'Synthetic Blend',
    code: 'SB',
    pack: '4 L JUG · 6 PER CASE',
    packSize: '4 L',
    perCase: 6,
    tag: 'BUDGET LINE',
    tagBackground: 'var(--mm-ink)',
    tagForeground: 'var(--mm-white)',
    blurb:
      'Meets the same viscosity requirement at a lower landed cost for shorter drain intervals and value service packages.',
  },
]

export interface Product {
  id: string
  sku: string
  line: ProductLine
  grade: GradeName
  name: string
  blurb: string
  image: ResponsiveImage
  imageAlt: string
}

/**
 * Product photography.
 *
 * Only one jug shot was supplied with the brand assets (0W-20 Premium Full
 * Synthetic, 5 L). Add per-grade, per-line originals to `assets-source`, run
 * `npm run images`, then register the generated set here — everything else
 * picks the new image up automatically.
 */
const PRODUCT_IMAGES: Partial<Record<string, ResponsiveImage>> = {}

function productImage(line: ProductLineId, grade: GradeName): ResponsiveImage {
  return PRODUCT_IMAGES[`${line}:${grade}`] ?? JUG_FRONT
}

/** The licence portion of a specification string, i.e. the part before the first separator. */
export function licencePart(spec: string): string {
  return spec.split(' · ')[0] ?? spec
}

export function buildSku(line: ProductLine, grade: GradeName): string {
  return `MM-${line.code}-${grade.replace('-', '')}-${line.packSize.replace(' ', '')}`
}

export function buildProduct(lineId: ProductLineId, grade: GradeName, spec: string): Product {
  const line = PRODUCT_LINES.find((l) => l.id === lineId) ?? PRODUCT_LINES[0]!
  const name = `${grade} ${line.nameSuffix}`
  const blurb =
    line.id === 'premium'
      ? getGrade(grade).blurbShort
      : line.blurb.replace('{licence}', licencePart(spec))

  return {
    id: `${line.id}-${grade}`,
    sku: buildSku(line, grade),
    line,
    grade,
    name,
    blurb,
    image: productImage(line.id, grade),
    imageAlt: `Mileage Master ${name} ${line.packSize} jug`,
  }
}

export interface RecommendationOptions {
  /** Adds the High Mileage line as the second recommendation. */
  highMileage: boolean
  /** Adds the Synthetic Blend value line as the final recommendation. */
  includeBudgetLine?: boolean
}

/** Ordered product recommendations for a grade: premium, high mileage, then blend. */
export function recommendProducts(
  grade: GradeName,
  spec: string,
  { highMileage, includeBudgetLine = true }: RecommendationOptions,
): Product[] {
  const products = [buildProduct('premium', grade, spec)]
  if (highMileage) products.push(buildProduct('high-mileage', grade, spec))
  if (includeBudgetLine) products.push(buildProduct('blend', grade, spec))
  return products
}
