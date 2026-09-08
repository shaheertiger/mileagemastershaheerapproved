/**
 * Validates the vehicle application database.
 *
 * Run with `npm run check:data` after editing `src/data/vehicles.ts` — it
 * catches the mistakes that silently break the finder: a grade we don't sell,
 * a reversed year range, or two identical engine labels overlapping in years
 * (which would put duplicate, unselectable options in the ENGINE list).
 */
import { GRADE_NAMES } from '../src/data/grades'
import { VEHICLES, YEAR_RANGE } from '../src/data/vehicles'

const problems: string[] = []
const grades = new Set<string>(GRADE_NAMES)

let applications = 0
let models = 0

for (const make of VEHICLES) {
  if (make.models.length === 0) problems.push(`${make.name}: no models`)

  const modelNames = new Set<string>()
  for (const model of make.models) {
    models += 1
    const where = `${make.name} ${model.name}`

    if (modelNames.has(model.name)) problems.push(`${where}: duplicate model entry`)
    modelNames.add(model.name)

    if (model.applications.length === 0) problems.push(`${where}: no applications`)

    for (const app of model.applications) {
      applications += 1
      const label = `${where} — ${app.engine} (${app.from}–${app.to})`

      if (!grades.has(app.grade)) problems.push(`${label}: grade ${app.grade} is not a grade we sell`)
      if (app.from > app.to) problems.push(`${label}: year range runs backwards`)
      if (app.from < YEAR_RANGE.first) problems.push(`${label}: starts before ${YEAR_RANGE.first}`)
      if (app.to > YEAR_RANGE.last) problems.push(`${label}: ends after ${YEAR_RANGE.last}`)
      if (app.capacityL <= 0 || app.capacityL > 12) problems.push(`${label}: implausible capacity`)
      if (!app.spec.trim()) problems.push(`${label}: empty specification`)
    }

    // Two applications with the same engine label and overlapping years would
    // render as indistinguishable options in the ENGINE select.
    for (let i = 0; i < model.applications.length; i += 1) {
      for (let j = i + 1; j < model.applications.length; j += 1) {
        const a = model.applications[i]!
        const b = model.applications[j]!
        if (a.engine === b.engine && a.from <= b.to && b.from <= a.to) {
          problems.push(`${where}: "${a.engine}" appears twice over overlapping years`)
        }
      }
    }
  }
}

console.log(
  `Checked ${VEHICLES.length} makes, ${models} models, ${applications} engine applications.`,
)

if (problems.length > 0) {
  console.error(`\n${problems.length} problem(s):`)
  for (const problem of problems) console.error(`  - ${problem}`)
  process.exit(1)
}

console.log('No problems found.')
