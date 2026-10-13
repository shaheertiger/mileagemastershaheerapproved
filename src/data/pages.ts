/**
 * Every real page on the site.
 *
 * This one list drives the Vite build entries, the generated `sitemap.xml` and
 * `robots.txt`, and the human-readable sitemap page — add a page here and all
 * three pick it up. It is imported by `vite.config.ts`, so it must stay plain
 * data with no `import.meta.env` or browser APIs.
 */

export type PageId = 'home' | 'finder' | 'sitemap'

export interface PageEntry {
  id: PageId
  /** Path relative to the site base, with a trailing slash ('' is the root). */
  path: string
  /** HTML entry file, relative to the project root. */
  entry: string
  title: string
  description: string
  changefreq: 'weekly' | 'monthly' | 'yearly'
  priority: number
}

export const PAGES: readonly PageEntry[] = [
  {
    id: 'home',
    path: '',
    entry: 'index.html',
    title: 'Home',
    description:
      'Mileage Master full synthetic engine oil — grades, approvals, Made in Europe and wholesale pricing.',
    changefreq: 'monthly',
    priority: 1.0,
  },
  {
    id: 'finder',
    path: 'oil-finder/',
    entry: 'oil-finder/index.html',
    title: 'Oil finder',
    description:
      'Year, make, model and engine lookup returning the grade, oil capacity, specification and matching products.',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    id: 'sitemap',
    path: 'sitemap/',
    entry: 'sitemap/index.html',
    title: 'Sitemap',
    description: 'Every page and section on the site.',
    changefreq: 'yearly',
    priority: 0.3,
  },
]
