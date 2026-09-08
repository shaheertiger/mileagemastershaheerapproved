# Mileage Master — marketing site & oil finder

Two-page site for **Mileage Master** advanced full synthetic engine oil, distributed in Canada by
OEM Fleets (Mississauga, ON):

| Page | Route | What it does |
| --- | --- | --- |
| Homepage | `/` | Hero, working oil finder, grade selector, Made in Europe, approvals, testimonials, dealer/quote form, order bar, mobile mockups |
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
```

## What's where

```
index.html                  homepage entry
oil-finder/index.html       oil finder entry
src/
  data/
    site.ts                 phone, email, address, nav and footer links
    grades.ts               the seven viscosity grades and their licences
    products.ts             the three product lines, SKUs, packs and images
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
docs/design-handoff/        the original design brief and prototypes
scripts/check-data.ts       vehicle data validator
```

### Common edits

- **Phone, email, hours, address** — `src/data/site.ts`.
- **Colours, type, spacing** — `src/styles/tokens.css`. Nothing hard-codes a hex value.
- **A grade's copy or licences** — `src/data/grades.ts`.
- **Product lines, pack sizes, SKUs** — `src/data/products.ts`.
- **Vehicles** — `src/data/vehicles.ts`, then run `npm run check:data`.

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

## Before this goes live

These are real gaps, not polish items:

1. **The vehicle data is a curated reference set, not a licensed application database.** It covers
   177 engine applications across 26 makes for model years 2005–2026 — enough to demo and to serve
   the common jobs, but it is not authoritative and it does not cover every trim. Before customers
   are advised from it, replace `src/data/vehicles.ts` with a licensed feed (Mitchell, ALLDATA,
   MOTOR, or the blender's own application guide). Everything reads the data through
   `src/lib/lookup.ts`, so a lookup endpoint means reimplementing that one module.
2. **One product photo is reused everywhere.** The supplied shot is the 0W-20 Premium Full Synthetic
   5 L jug. Add per-grade, per-line photography to `src/assets` and register it in the
   `PRODUCT_IMAGES` map in `src/data/products.ts`.
3. **Fonts load from Google Fonts.** Self-host Anton, Archivo and Barlow Condensed for privacy and
   for a site that survives a Google outage.
4. **The testimonials are placeholder copy** carried over from the design brief. Swap them for real,
   attributable quotes or delete the section (`showTestimonials={false}` on `HomePage`).
5. **The spec sheet carries no typical-properties data** (viscosity index, flash point, pour point).
   Those come from the blender's certificate of analysis; the sheet currently says they're available
   on request.
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
- The footer's "Mockup — content for layout review" line is gone.
