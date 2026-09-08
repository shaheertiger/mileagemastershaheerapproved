/**
 * Generates the responsive WebP derivatives the site actually ships.
 *
 * Sources live in `assets-source/` at full resolution and are never served.
 * Outputs land in `public/img/` under stable names so the hero image can be
 * preloaded from the HTML — see `public/_headers` for their cache policy.
 *
 * Run with `npm run images` after adding or replacing product photography.
 */
import { mkdir, readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

const OUT = 'public/img'

const JOBS = [
  // Rendered at 430px (hero), 260px (grade panel) and 170px (product card),
  // so these widths cover every use at 2x.
  { source: 'assets-source/jug-front.png', name: 'jug-front', widths: [340, 520, 860] },
  // Rendered at roughly 374px inside the Made in Europe card.
  { source: 'assets-source/jug-back.jpg', name: 'jug-back', widths: [400, 750] },
]

await mkdir(OUT, { recursive: true })

for (const job of JOBS) {
  const image = sharp(job.source)
  const { width, height } = await image.metadata()
  console.log(`${job.source} — ${width}×${height}`)

  for (const w of job.widths) {
    const file = join(OUT, `${job.name}-${w}.webp`)
    await sharp(job.source)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(file)
    const { size } = await stat(file)
    console.log(`  → ${file}  ${(size / 1024).toFixed(1)} kB`)
  }
}

const files = await readdir(OUT)
let total = 0
for (const f of files) total += (await stat(join(OUT, f))).size
console.log(`\n${files.length} files, ${(total / 1024).toFixed(1)} kB total`)
