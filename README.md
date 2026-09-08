# Mileage Master — marketing site & oil finder

Two-page site for **Mileage Master** advanced full synthetic engine oil, distributed in Canada by
OEM Fleets (Mississauga, ON):

| Page | Route | What it does |
| --- | --- | --- |
| Homepage | `/` | Hero, working oil finder, grade selector, Made in Europe, approvals, testimonials, dealer/quote form, order bar |
| Oil finder | `/oil-finder/` | Year → Make → Model → Engine lookup returning grade, oil capacity, specification, drain interval and the matching Mileage Master products |

Built from the design handoff in [`docs/design-handoff/`](docs/design-handoff/), which stays in the
repo as the reference for colours, type and copy.

## Stack

Vite + React + TypeScript, built as a two-entry static site. No router and no server: each page is a
real HTML file, so the build drops onto any static host with no rewrite rules. Styling is CSS
Modules over the design tokens in `src/styles/tokens.css`.

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build into dist/
npm run preview    # serve dist/ locally
npm run check:data # validate the vehicle application database
npm run images     # regenerate responsive WebP from assets-source/
npm run fonts      # re-download the self-hosted webfonts
```

## What's where

```
index.html                  homepage entry (meta, preloads, structured data)
oil-finder/index.html       oil finder entry
assets-source/              full-resolution originals — never served
public/
  img/                      generated WebP the site actually ships
  fonts/                    self-hosted woff2
  favicon.svg  robots.txt  sitemap.xml  _headers
src/
  data/
    site.ts                 phone, email, address, nav and footer links
    grades.ts               the seven viscosity grades and their licences
    products.ts             the three product lines, SKUs, packs and images
    images.ts               responsive image sets (src + srcset)
    vehicles.ts             vehicle application database  ← main data dependency
  lib/
    lookup.ts               query layer over the vehicle database
    useVehicleSelect.ts     cascading Year/Make/Model/Engine state
    useFinderState.ts       catalogue finder state, mirrored into the URL
    quote.tsx               quote form validation, submission and prefill
    routes.ts               page URLs, base-path aware
  components/               chrome shared by both pages
  pages/home/               homepage and its sections
  pages/finder/             oil finder and its sections
  styles/tokens.css         every colour, font and spacing value in the design
  styles/fonts.css          generated @font-face rules — do not edit by hand
docs/design-handoff/        the original design brief and prototypes
scripts/                    data validator, image pipeline, font fetcher
```

### Common edits

- **Phone, email, hours, address** — `src/data/site.ts`.
- **Colours, type, spacing** — `src/styles/tokens.css`. Nothing hard-codes a hex value.
- **A grade's copy or licences** — `src/data/grades.ts`.
- **Product lines, pack sizes, SKUs** — `src/data/products.ts`.
- **Vehicles** — `src/data/vehicles.ts`, then run `npm run check:data`.
- **Product photography** — drop the original in `assets-source/`, add it to the job list in
  `scripts/optimize-images.mjs`, run `npm run images`, then register the set in `src/data/images.ts`
  and `PRODUCT_IMAGES` in `src/data/products.ts`.

### Adding a vehicle

```ts
{
  name: 'Nissan',
  models: [
    {
      name: 'Murano',
      applications: [
        { engine: '3.5L V6 GAS FI', from: 2015, to: 2024, grade: '5W-30', capacityL: 4.9, spec: SPEC.gf6a },
      ],
    },
  ],
}
```

`from`/`to` are inclusive model years — that's what makes the YEAR select filter the makes, models
and engines below it. `drain` is optional and defaults to the grade's own guidance; set it only
when the OEM differs (VW's 15,000 km intervals, for example).

## Performance

The homepage transfers about **220 kB** on a first visit, and roughly 60 kB on a repeat visit once
fonts and photography are cached.

- **Photography ships as responsive WebP.** The hero jug is 43 kB at desktop sizes and 25 kB on a
  phone, down from a 1.2 MB PNG. Originals stay in `assets-source/`; `npm run images` regenerates
  the derivatives.
- **Fonts are self-hosted**, Latin and Latin Extended subsets only. No third-party connection, no
  render-blocking stylesheet. Archivo is a variable font, so one file covers every weight.
- **The hero image and the two critical fonts are preloaded** from the HTML, so they start
  downloading before React renders. Everything below the fold is `loading="lazy"`.
- **Each page ships only its own code** — the finder does not download homepage sections.
- **`public/_headers`** sets a one-year immutable cache on fingerprinted assets and fonts for
  Netlify and Cloudflare Pages. On other hosts, mirror those rules in the server config.

## Making the quote form deliver

With no configuration the "Request wholesale pricing" form validates, then opens the visitor's mail
client with the request pre-filled and addressed to the orders desk. It never claims a request was
delivered when it wasn't.

To have it post somewhere instead, set an endpoint that accepts a JSON `POST`:

```bash
# .env.local (or your host's environment settings)
VITE_QUOTE_ENDPOINT=https://example.com/leads
```

The body is `{ businessName, phone, email, details, source }`.

## Deployment

`npm run build` writes a static `dist/`. Upload it, or point Netlify/Vercel/Cloudflare Pages at the
repo with build command `npm run build` and output directory `dist`.

Serving from a sub-path (GitHub Pages project sites) needs the base at build time:

```bash
VITE_BASE=/mileagemastershaheerapproved/ npm run build
```

**The canonical URLs assume `https://mileagemaster.ca`.** If the site lands on a different domain,
update the `canonical` and `og:url` tags in both HTML files plus `public/robots.txt` and
`public/sitemap.xml` — search engines will otherwise be pointed at the wrong host.

## Before this goes live

These are real gaps, not polish items:

1. **The vehicle data is a curated reference set, not a licensed application database.** It covers
   177 engine applications across 26 makes for model years 2005–2026 — enough to demo and to serve
   the common jobs, but it is not authoritative and it does not cover every trim. Before customers
   are advised from it, replace `src/data/vehicles.ts` with a licensed feed (Mitchell, ALLDATA,
   MOTOR, or the blender's own application guide). Everything reads the data through
   `src/lib/lookup.ts`, so a lookup endpoint means reimplementing that one module.
2. **The product imagery is a synthetic mockup, not photography.** Zoom into the back-label shot and
   the print reads "Made le Europe", "Missiosauga" and "Mileage Masterinc.", and the API donut says
   SAE 0W-30 on a 0W20 pack — the character-level garbling of a generated image. It is fine at the
   size it is displayed, but it will not survive a zoom, a retina display or a print piece. Replace
   it with real photography of the actual product, or with the label print artwork. The same shot is
   also reused for every grade and every product line.
3. **The testimonials are placeholder copy** carried over from the design brief. Swap them for real,
   attributable quotes or delete the section (`showTestimonials={false}` on `HomePage`).
4. **The spec sheet carries no typical-properties data** (viscosity index, flash point, pour point).
   Those come from the blender's certificate of analysis; the sheet currently says they're available
   on request.
5. **Images are WebP with no fallback.** Every browser released since 2020 supports it; visitors on
   something older will see empty image slots.
6. **No analytics or cookie consent** is installed.

## Notes on the build

Deliberate departures from the design prototypes, all of them things the handoff itself flagged:

- The homepage finder selects are **live**, not decorative — they run against the same database as
  the catalogue, and "see full results" carries the selection over in the query string.
- The selected grade in the grade selector is **marked in gold**, as the handoff recommended.
- The header nav **collapses to a menu button below 860px** instead of wrapping.
- The catalogue finder **opens on the form** and shows results once a search runs or when the URL
  carries a vehicle; the prototype shipped with results always visible for review.
- The "over 120,000 kilometres" toggle **defaults to off**. The prototype defaulted it on, which
  would recommend High Mileage oil to everyone.
- The finder's state lives in the **query string**, so a result set can be linked or bookmarked.
- The quote form **validates** (business name, plus a phone or an email) and has success and error
  states.
- "Spec sheet" opens a **printable data sheet** rather than linking to a PDF that doesn't exist yet.
- Unicode glyphs (✆ ✉ ✓ ★ ▾) are replaced with drawn SVG icons in `src/components/Icon.tsx`.
- The **phone mockup section was dropped** — it showed the client what the site would look like on a
  phone, which the live site does not need to explain to its own visitors.
- The Made in Europe card sets the **approvals as real text** instead of leaving them to be read off
  the label photo, which is far too small — and too soft — to resolve them. They are now legible,
  indexable and read out by screen readers.
- The footer's "Mockup — content for layout review" line is gone.
