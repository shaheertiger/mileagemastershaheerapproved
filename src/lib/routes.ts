/**
 * Page routing.
 *
 * The site is two static pages, so links are plain URLs built from Vite's
 * `BASE_URL`. Deploying under a sub-path only needs `VITE_BASE` at build time.
 */

export type PageId = 'home' | 'finder'

const base = import.meta.env.BASE_URL

export const routes = {
  home: base,
  finder: `${base}oil-finder/`,
} as const

export interface SiteLink {
  label: string
  href: string
  page: PageId
}

/**
 * Resolves a nav or footer link for the page currently being rendered.
 *
 * In-page anchors stay as anchors on their own page and become absolute links
 * back to the homepage anywhere else.
 */
export function resolveHref(currentPage: PageId, link: Pick<SiteLink, 'href' | 'page'>): string {
  if (link.href.startsWith('#')) {
    return link.page === currentPage ? link.href : `${routes.home}${link.href}`
  }
  return link.page === 'finder' ? routes.finder : routes.home
}

/** Link to the oil finder, optionally pre-filled with a vehicle selection. */
export function finderUrl(params?: Record<string, string | undefined>): string {
  if (!params) return routes.finder
  const query = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value) query.set(key, value)
  }
  const search = query.toString()
  return search ? `${routes.finder}?${search}` : routes.finder
}
