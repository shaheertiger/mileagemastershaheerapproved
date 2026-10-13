import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { PAGES } from './src/data/pages'

// Deploying under a sub-path (GitHub Pages project sites, for example) only needs
// VITE_BASE set at build time: `VITE_BASE=/mileage-master/ npm run build`.
const base = process.env.VITE_BASE ?? '/'

// The public origin the sitemap and robots.txt point search engines at.
const siteUrl = (process.env.SITE_URL ?? 'https://mileagemaster.ca').replace(/\/+$/, '')

/** Writes sitemap.xml and robots.txt from the page list, dated to the build. */
function seoFiles(): Plugin {
  return {
    name: 'mm-seo-files',
    apply: 'build',
    generateBundle() {
      const lastmod = new Date().toISOString().slice(0, 10)
      const urls = PAGES.map(
        (page) => `  <url>
    <loc>${siteUrl}${base}${page.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority.toFixed(1)}</priority>
  </url>`,
      ).join('\n')

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}${base}sitemap.xml\n`,
      })
    },
  }
}

export default defineConfig({
  base,
  plugins: [react(), seoFiles()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(PAGES.map((page) => [page.id, resolve(__dirname, page.entry)])),
    },
  },
})
