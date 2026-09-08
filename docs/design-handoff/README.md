# Handoff: Mileage Master marketing site

## Overview
A two-page marketing/catalogue site for **Mileage Master** advanced full synthetic engine oil, distributed in Canada by OEM Fleets (Mississauga, ON). The audience is independent repair shops/installers and retail DIY customers. Primary conversions: request wholesale/case pricing, call or email to order, find the correct oil for a vehicle, and apply to become a dealer.

Two pages:
1. **Homepage** — hero, oil finder teaser, grade selector, Made in Europe story, approvals & specs, testimonials, dealer/quote form, order bar, mobile mockup section.
2. **Oil Finder (catalogue)** — Year/Make/Model/Engine lookup returning grade recommendations, modelled on the flow of a mainstream oil-finder tool.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing intended look and behaviour, not production code to copy directly. The task is to **recreate these designs in the target codebase's existing environment** (React, Vue, Next.js, Astro, whatever the project uses), following its established component patterns, routing, and styling conventions. If no environment exists yet, pick the most appropriate framework and implement there. Do not ship the HTML as-is.

Note on the runtime: the prototypes are authored as "Design Components" — a single HTML file containing a markup template plus a small logic class. Ignore that wrapper. What matters is the markup structure, the inline styles (exact values), and the logic class, which documents the real state model and data.

## Fidelity
**High fidelity.** Final colours, typography, spacing, borders and copy. Recreate pixel-accurately using the codebase's libraries. All copy in the files is intended production copy for the mockup stage and should be carried over verbatim unless the client revises it.

Two caveats:
- Product photography is a single supplied jug image (0W-20 5L) reused across grades. Production needs per-grade shots.
- Vehicle data in the oil finder is a representative sample (7 makes), not a real application database.

---

## Screens / Views

### 1. Homepage (`Mileage Master Homepage.dc.html`)

Max content width **1240px**, centred, horizontal padding **24px**. Sections stack full-bleed with their own background colours.

**1.1 Utility bar**
- Background #E31B23, white text, padding 9px 20px, flex centred, wrap, gap 8px/28px.
- "ORDER TODAY" in Anton 14px, letter-spacing .06em.
- Phone 905.602.6897 and orders@oemfleets.ca, each preceded by an 18px white circle badge containing a red glyph (✆ 10px / ✉ 9px).
- Pipe separators at 50% opacity.
- Right item: "MADE IN EUROPE · SHIPPED FROM MISSISSAUGA, ON", Archivo 700 11px, letter-spacing .12em.
- Body text: Archivo 600 13px, letter-spacing .04em.

**1.2 Header (sticky, z-index 20)**
- Background #111, bottom border 3px solid #E31B23. Padding 14px 24px.
- **Logo lockup** (reused everywhere): white box, 3px solid #111 border, padding 7px 16px 6px, column flex, line-height .86, box-shadow 0 2px 0 rgba(0,0,0,.35). Line 1 "MILEAGE" Anton 26px #C4171E. Line 2 "MASTER®" Barlow Condensed 700 15px #111, letter-spacing .34em with matching left padding to re-centre; ® at 8px superscript, letter-spacing 0.
- **Nav** pushed right (`margin-left:auto`): OIL FINDER / PRODUCTS / MADE IN EUROPE / APPROVALS / BECOME A DEALER. Archivo 600 13px, letter-spacing .08em, white; hover #E31B23. Current page marked #F5B60D.
- **CTA** "REQUEST PRICING": #E31B23 fill, 2px solid #E31B23, white, Archivo 700 13px/.08em, padding 13px 20px. Hover inverts to white bg / red text.

**1.3 Hero**
- Background #F2F1EF, bottom border 1px rgba(0,0,0,.09). Grid `minmax(0,1.05fr) minmax(0,.95fr)`, gap 24px, align-items end, padding 56px 24px 0.
- Eyebrow chip: #111 bg, white, padding 7px 12px, Archivo 700 11px/.16em, preceded by a 7px #F5B60D dot.
- H1: Anton, `clamp(44px,6.4vw,92px)`, line-height .88, letter-spacing -.01em, uppercase. "Quality" #111 / "priced right" #E31B23.
- Rule: 212×7px #F5B60D, margin 26px 0 22px.
- Body: Archivo 400 18px/1.55, #3A3A3A, max-width 480px, `text-wrap:pretty`.
- Buttons: primary #E31B23 white Archivo 700 14px/.09em padding 17px 26px (hover #B0141A); secondary transparent, 2px solid #111, padding 15px 24px (hover inverts to #111/white).
- Trust row: three items, Archivo 700 12px/.1em. Circular 22px badges — two #F5B60D with #111 ✓ (API APPROVED, WARRANTY APPROVED), one #0B3B8C with white ★ (MADE IN EUROPE).
- Product image right, max-width 430px, `mix-blend-mode:multiply`, sitting on a radial red glow `radial-gradient(circle at 50% 60%, rgba(227,27,35,.14), transparent 68%)`.

**1.4 Oil finder strip (#finder)**
- Background #111, white. Padding 52px 24px 56px.
- H2 Anton `clamp(28px,3.4vw,42px)` uppercase + supporting line Archivo 400 15px rgba(255,255,255,.66).
- Four selects in `repeat(auto-fit,minmax(150px,1fr))` grid, gap 12px: Year / Make / Model / Engine. Select style: bg #1D1D1D, 2px solid #333, white, padding 14px, Archivo 600 15px, `appearance:none`. Labels Archivo 700 11px/.14em rgba(255,255,255,.6), 7px gap above control.
- Submit "SHOW MY OIL": #E31B23, 2px solid #E31B23, padding 15px 20px; hover white bg / red text.
- **Result panel** (renders after submit): bg #1A1A1A, left border 6px #F5B60D, padding 20px 22px, flex wrap gap 14px/26px. "RECOMMENDED" label #F5B60D Archivo 700 11px/.16em; grade Anton 30px; detail line Archivo 400 14px rgba(255,255,255,.72); right-aligned link "GET CASE PRICE →" with 2px #E31B23 bottom border.

**1.5 Grade selector (#grades)**
- White. Padding 64px 24px. H2 Anton `clamp(28px,3.4vw,42px)` uppercase, plus red Archivo 700 12px/.14em kicker "7 VISCOSITIES · 5L & 4L JUGS · CASE QUANTITIES". 4px #111 rule below.
- Seven grade buttons: 2px solid #111, white bg, Anton 19px, padding 12px 20px, hover bg #F5B60D. Grades: 0W-8, 0W-16, 0W-20, 0W-30, 5W-20, 5W-30, 5W-40.
- Detail panel: 3px solid #111, grid `minmax(0,.85fr) minmax(0,1.15fr)`. Left cell #F2F1EF with jug image (max-width 260px, multiply). Right cell #111 white, padding 34px 34px 30px:
  - Kicker "GASOLINE ENGINE OIL" #F5B60D Archivo 700 11px/.16em.
  - Grade name Anton `clamp(42px,5.6vw,64px)`.
  - "PREMIUM FULL SYNTHETIC" #F5B60D Archivo 700 17px.
  - Blurb Archivo 400 15px/1.6 rgba(255,255,255,.74), max-width 480px.
  - Three-up spec strip (SERVICE / PACK / DRAIN) as a 1px-gap grid over rgba(255,255,255,.14) to fake hairlines; labels Archivo 700 10px/.14em rgba(255,255,255,.5), values Archivo 700 15px.
  - Buttons: REQUEST CASE PRICE (#E31B23) and SPEC SHEET (PDF) (2px rgba(255,255,255,.35) outline).

**1.6 Made in Europe (#europe)**
- #F2F1EF, 1px hairlines top and bottom. Grid `repeat(auto-fit,minmax(300px,1fr))`, gap 44px, padding 64px 24px.
- H2 Anton `clamp(34px,4.6vw,60px)` line-height .9: "Made in" / "Europe" in #E31B23.
- Flag device: 6px bar #0B3B8C (max-width 180px, flex:1), "★★★★" #F5B60D 15px letter-spacing .3em, 6px bar #F5B60D.
- Body copy Archivo 400 17px/1.6 #3A3A3A max-width 520px.
- Numbered list 01/02/03: Anton 22px #E31B23 in a 38px-min column, copy Archivo 400 15px/1.5 #222; rows separated by 1px rgba(0,0,0,.12) via grid gap technique.
- Right: back-label photo in a white card, 3px solid #111, padding 22px, with caption "FULL APPROVALS PRINTED ON EVERY LABEL" Archivo 700 11px/.14em #666 centred.

**1.7 Approvals & specifications (#specs)**
- White, padding 64px 24px. H2 Anton `clamp(28px,3.4vw,42px)`; intro Archivo 400 16px #555 max-width 620px.
- Three cards in `repeat(auto-fit,minmax(260px,1fr))`, gap 24px.
  - Card 1 & 2: 3px solid #111. Header bar #111 white Archivo 700 12px/.14em padding 12px 18px ("INDUSTRY LICENCES", "OEM SPECIFICATIONS"). Rows Archivo 600 15px padding 13px 18px separated by 1px hairlines. Content: API SP · SN PLUS / ILSAC GF-6A / ACEA A1/B1 · A5/B5; Chrysler MS-6395 / Ford WSS-M2C947-A / GM 6094M.
  - Card 3: #111 bg, 3px solid #F5B60D, padding 26px 22px. Shield mark: 46×52px #F5B60D, `clip-path:polygon(0 0,100% 0,100% 66%,50% 100%,0 66%)`, #111 ✓ 24px. Title "Warranty approved" Anton 26px uppercase. Body Archivo 400 14px/1.55 rgba(255,255,255,.72).

**1.8 Testimonials** (toggleable)
- #111 white, padding 60px 24px. H2 Anton `clamp(26px,3.2vw,38px)` + #F5B60D kicker "THE SMART CHOICE".
- Three cards `repeat(auto-fit,minmax(260px,1fr))` gap 22px: bg #1A1A1A, padding 26px 24px, 5px top border — #E31B23, #F5B60D, #fff in order. Quote Archivo 400 16px/1.6 white; attribution Archivo 700 12px/.1em rgba(255,255,255,.55), two lines (name · role / city).

**1.9 Dealer + quote (#dealers, form anchor #quote)**
- Background #E31B23, white. Grid `repeat(auto-fit,minmax(280px,1fr))` gap 34px, padding 56px 24px.
- Left: H2 Anton `clamp(30px,4vw,50px)` uppercase, two lines; body Archivo 400 17px/1.55 rgba(255,255,255,.92) max-width 460px.
- Right form card: white, 3px solid #111, padding 26px 24px. Label "REQUEST WHOLESALE PRICING" #E31B23 Archivo 700 12px/.14em. Inputs: 2px solid #111, padding 13px 14px, Archivo 400 15px; first row is a two-up `minmax(140px,1fr)` grid (Business name, Phone), then Email, then "Grades and monthly volume". Submit: full-width #111, white, padding 16px, Archivo 700 14px/.09em, hover #E31B23. Footnote Archivo 400 12px #666.

**1.10 Order bar** (toggleable)
- #111 white, padding 26px 24px, flex wrap gap 18px/30px. "Order today" Anton 26px uppercase; phone in Anton 26px and email in Archivo 600 18px, each with a 38px #E31B23 circle badge; right-aligned hours line Archivo 700 12px/.12em rgba(255,255,255,.6).

**1.11 Mobile mockup section (#mobile)**
- #F2F1EF, padding 64px 24px. H2 "Mobile" + red kicker, 4px #111 rule.
- Three 340px phone frames, centred flex, gap 40px. Frame: #111, border-radius 44px, padding 12px, shadow `0 24px 48px rgba(0,0,0,.22)`. Screen: white, border-radius 33px, height 700px, overflow hidden, column flex. 34px status bar (bg varies per screen), then the screen content at reduced type sizes (hero title Anton 44px, body 13px, buttons Archivo 700 12px padding 15px).
- Screens, captioned below in Archivo 700 11px/.14em #666: **HOME**, **OIL FINDER**, **PRODUCT**.

**1.12 Footer**
- #F2F1EF, 4px top border #E31B23. Four columns `repeat(auto-fit,minmax(190px,1fr))`, gap 32px, padding 44px 24px 26px. Column 1 is the logo lockup (smaller: Anton 22px / Barlow 13px) plus an address paragraph. Columns 2–4: heading Archivo 700 11px/.14em #111 and 9px-gap link stacks Archivo 400 14px #444.
- Legal strip: 1px top hairline, Archivo 400 12px #777, flex wrap gap 10px/24px, last item right-aligned.

---

### 2. Oil Finder / catalogue (`Mileage Master Oil Finder.dc.html`)

Reuses the utility bar, header, quote block and a condensed footer.

**2.1 Breadcrumb**
- #F2F1EF, 1px bottom hairline, padding 12px 24px. Archivo 600 12px/.06em #777 with "›" separators; current crumb #111 700.

**2.2 Finder panel (#finder)**
- Section #111 white, padding 56px 24px 60px.
- Chip "CATALOGUE · OIL FINDER": #E31B23 bg, white, 7px 12px, Archivo 700 11px/.16em, with #F5B60D dot.
- H1 Anton `clamp(38px,5.6vw,76px)` line-height .9: "Find the right" / "motor oil" (#E31B23).
- Intro Archivo 400 18px/1.55 rgba(255,255,255,.7) max-width 640px.
- **Form card**: #F2F1EF, 3px solid #F5B60D, padding 26px 24px. Four selects `repeat(auto-fit,minmax(170px,1fr))` gap 14px — white bg, 2px solid #111, padding 14px, Archivo 600 15px; labels Archivo 700 11px/.14em #111.
- Checkbox row: custom 26px box, 2px solid #111, fill #E31B23 with white ✓ when on, label "Over 120,000 kilometres?" Archivo 700 13px/.06em.
- CTA "GET RECOMMENDATIONS": #E31B23, padding 16px 28px, Archivo 700 14px/.09em; hover #111.
- Helper text with link "Tell us what you're missing."
- Disclaimer under the card, Archivo 400 13px rgba(255,255,255,.5) max-width 720px.

**2.3 Results (#results)**
- White, padding 56px 24px 64px. Only rendered once submitted.
- Kicker "RECOMMENDED FOR YOUR" #E31B23 Archivo 700 12px/.16em.
- Vehicle line H2 Anton `clamp(26px,3.6vw,46px)` uppercase: `{year} {make} {model} · {engine}`.
- Fact strip: 4px #111 top border, 1px bottom hairline, three cells with 1px right hairlines. Labels Archivo 700 10px/.14em #888; capacity value Anton 26px #E31B23; spec and drain Archivo 700 18px.
- Tab group: inline flex, 2px solid #111. Active "MOTOR OIL" #111/white; disabled "FILTERS — COMING SOON" #888.
- **Product cards**, 22px gap, each 3px solid #111, grid `minmax(0,240px) minmax(0,1fr)`:
  - Left: #F2F1EF, 3px right border, jug image max-width 170px, multiply blend.
  - Right: padding 28px 28px 26px, 14px column gap. Tag chip (Archivo 700 10px/.14em, 7px 10px) — RECOMMENDED #E31B23/white, OVER 120,000 KM #F5B60D/#111, BUDGET LINE #111/white. Pack line Archivo 700 11px/.12em #888. Name Anton `clamp(24px,2.6vw,34px)` uppercase. Blurb Archivo 400 15px/1.6 #444 max-width 640px. Three buttons: VIEW PRODUCT (#111, hover #E31B23), REQUEST CASE PRICE (#E31B23, hover #B0141A), SPEC SHEET (2px #111 outline, hover #F5B60D fill).
- "SEARCH AGAIN": #F2F1EF, 2px solid #111, padding 14px 22px, hover #F5B60D. Followed by a disclaimer line Archivo 400 13px #777.

**2.4 Quote block (#quote)** — same construction as homepage 1.9, headline "Priced by the case, not by the litre".

**2.5 Help bar (#help)** — same construction as the homepage order bar, headline "Vehicle not listed?".

---

## Interactions & Behavior

**Homepage**
- Grade buttons set the selected grade; the detail panel re-renders name, blurb, service licences and drain interval from a fixed 7-entry table. No transition — instant swap. The active grade is not currently highlighted in the button row; adding an active state (#F5B60D fill) is recommended in implementation.
- "SHOW MY OIL" sets a submitted flag and reveals the recommendation panel, forcing the grade to 0W-20. The finder selects on the homepage are presentational; the real logic lives on the catalogue page.
- Nav and CTA links are in-page anchors. No smooth-scroll is applied.
- All hovers are instant (no transition declared). If the codebase has a standard easing, apply ~150ms ease on background/color.

**Oil Finder**
- Cascading dependency: changing **Make** resets Model to that make's first model and Engine to that model's first engine. Changing **Model** resets Engine. Changing Year or Engine changes nothing else.
- "Over 120,000 kilometres?" is a toggle. When on, a High Mileage product is inserted as the second card, and its blurb interpolates the licence portion of the current spec (text before the first " · ").
- "GET RECOMMENDATIONS" sets submitted = true; "SEARCH AGAIN" sets it false, hiding the results section. Default state ships submitted = true so the results are visible on load for review.
- Product list is always: Premium Full Synthetic (current grade) → High Mileage (only when the toggle is on) → Synthetic Blend (only when the `showBudgetLine` flag is on).
- Forms are non-functional mockups: no validation, no submit handler. Production needs required-field validation on business name + one of phone/email, and a success state.

**Responsive**
- All layouts use `auto-fit`/`minmax` grids and flex wrap, so they collapse to single column without media queries. Type uses `clamp()`. Only the phone-frame mockups are fixed width (340px) and are meant to be.
- The header nav wraps rather than collapsing to a hamburger. A real build should add a mobile menu below ~820px.

## State Management

**Homepage**
- `grade: number` — index into the 7-entry GRADES table. Default 2 (0W-20), overridable by a `defaultGrade` prop.
- `finderDone: boolean` — whether the hero finder recommendation is shown. Default false.
- Flags: `showTestimonials`, `showOrderBar` (both default true).

**Oil Finder**
- `year: string` (default "2025"), `make: string` ("Kia"), `model: string` ("K4"), `engine: string` ("1.6L L4 (C) Turbocharged GAS FI").
- `highMileage: boolean` (default true), `submitted: boolean` (default true).
- Flag: `showBudgetLine` (default true).

**Data**
- `YEARS`: 2026 down to 2005 (22 entries).
- `DATA`: nested make → model → array of `{engine, grade, capacity, spec, drain}`. Sample set covers Toyota, Honda, Kia, Ford, Chevrolet, Volkswagen, BMW. **Replace with a real application database** — this is the main data dependency of the page. Expect a lookup endpoint keyed on year/make/model/engine returning grade, capacity, spec list and drain interval.
- `BLURB`: grade → marketing description, 7 entries.
- Derived: `vehicleLine`, `capacity`, `spec`, `drain`, `products[]`.

## Design Tokens

**Colour**
| Token | Hex | Use |
|---|---|---|
| Red (primary) | `#E31B23` | CTAs, accents, headline emphasis, utility bar |
| Red hover/dark | `#B0141A` | Primary button hover |
| Red (logo) | `#C4171E` | "MILEAGE" wordmark only |
| Ink | `#111111` | Dark sections, borders, secondary buttons, body headings |
| Ink raised | `#1A1A1A` | Cards on ink backgrounds |
| Ink field | `#1D1D1D` | Selects on ink backgrounds |
| Ink hairline | `#333333` | Field borders on ink |
| Gold | `#F5B60D` | Accent rules, badges, highlight borders, hover fills |
| Blue | `#0B3B8C` | Europe/quality accent only |
| Bone | `#F2F1EF` | Light section background, image plates |
| White | `#FFFFFF` | Page background, cards |
| Body grey | `#3A3A3A` | Hero/large body copy |
| Copy grey | `#444444` / `#555555` | Card and section body |
| Muted grey | `#666666` / `#777777` / `#888888` | Captions, disclaimers, disabled |

On-ink text opacities: .74 / .72 / .70 / .66 / .60 / .55 / .50 white.

**Type**
- Display: **Anton** 400 only, uppercase, tight line-heights (.86–1.02). Never used below 14px.
- UI/body: **Archivo** 400/600/700. Uppercase labels always 700 with letter-spacing .06–.16em.
- Wordmark second line: **Barlow Condensed** 700, letter-spacing .34em.
- Scale in use: 11, 12, 13, 14, 15, 16, 17, 18 (body/UI); headings via clamp — H1 44→92, section H2 28→42, large feature H2 34→60.

**Spacing**
- Section padding: 56–64px vertical, 24px horizontal. Content max-width 1240px.
- Grid gaps: 10, 12, 14, 22, 24, 32, 34, 44px.
- Button padding: 13–17px vertical, 18–28px horizontal (outline variants sit 2px smaller to compensate for the border).

**Borders & radius**
- Border widths: 1px hairlines rgba(0,0,0,.09–.14), 2px controls, 3px cards/panels, 4–5px emphasis rules, 6px left accent.
- **Radius is 0 everywhere** except the phone mockups (44/33px) and circular badges (50%). This is deliberate — do not introduce rounded corners.
- Shadows: only two — `0 2px 0 rgba(0,0,0,.35)` on the logo lockup, `0 24px 48px rgba(0,0,0,.22)` on phone frames.

## Assets
Located in `assets/` in this bundle. All supplied by the client; none are generated.
- `jug-front.png` — Mileage Master 0W-20 Premium Full Synthetic 5L jug, front, transparent background. Used in the hero, grade panel, product cards and phone mockups. Always rendered with `mix-blend-mode:multiply` over #F2F1EF. Production needs a per-grade shot set.
- `jug-back.jpg` — back label showing features, benefits and approvals. Used in the Made in Europe section.
- `flyer.jpg` — the original client flyer the visual language was derived from. Reference only, not placed in either page.

No icon library is used. Glyphs (✆ ✉ ✓ ★ ▾) are Unicode characters — **replace these with the codebase's icon set**. The warranty shield is a CSS `clip-path` polygon, not an SVG.

Fonts load from Google Fonts: `Anton`, `Archivo` (400;500;600;700;800;900), `Barlow Condensed` (500;600;700). Self-host in production.

## Files
- `Mileage Master Homepage.dc.html` — homepage prototype (template + logic class).
- `Mileage Master Oil Finder.dc.html` — catalogue/oil finder prototype, including the vehicle data table.
- `assets/` — product photography and the source flyer.
- `support.js` — prototype runtime only. **Not part of the deliverable**; ignore it entirely.
