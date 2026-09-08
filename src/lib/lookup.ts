import { getGrade, type GradeName } from '../data/grades'
import {
  VEHICLES,
  YEAR_RANGE,
  type Application,
  type VehicleMake,
  type VehicleModel,
} from '../data/vehicles'

/**
 * Query layer over the vehicle application database.
 *
 * Every component reads vehicle data through this module. Moving to a lookup
 * endpoint means reimplementing these functions against the API and leaving the
 * components untouched.
 */

export interface Selection {
  year: string
  make: string
  model: string
  engine: string
}

export interface Resolved extends Selection {
  application: Application
  grade: GradeName
  /** Sump capacity formatted for display, e.g. "4.6 L". */
  capacity: string
  spec: string
  drain: string
  /** "2025 Kia K4 · 1.6L L4 (C) Turbocharged GAS FI" */
  vehicleLine: string
}

/** Model years offered in the YEAR select, newest first. */
export const YEARS: string[] = Array.from(
  { length: YEAR_RANGE.last - YEAR_RANGE.first + 1 },
  (_, i) => String(YEAR_RANGE.last - i),
)

function coversYear(application: Application, year: number): boolean {
  return year >= application.from && year <= application.to
}

function makeByName(name: string): VehicleMake | undefined {
  return VEHICLES.find((make) => make.name === name)
}

function modelByName(make: VehicleMake | undefined, name: string): VehicleModel | undefined {
  return make?.models.find((model) => model.name === name)
}

/** Makes with at least one application in the given model year. */
export function makesForYear(year: string): string[] {
  const y = Number(year)
  return VEHICLES.filter((make) =>
    make.models.some((model) => model.applications.some((app) => coversYear(app, y))),
  ).map((make) => make.name)
}

/** Models of a make with at least one application in the given model year. */
export function modelsFor(year: string, make: string): string[] {
  const y = Number(year)
  return (makeByName(make)?.models ?? [])
    .filter((model) => model.applications.some((app) => coversYear(app, y)))
    .map((model) => model.name)
}

/** Applications for a model in the given model year. */
export function applicationsFor(year: string, make: string, model: string): Application[] {
  const y = Number(year)
  return (modelByName(makeByName(make), model)?.applications ?? []).filter((app) =>
    coversYear(app, y),
  )
}

/** Engine labels for a model in the given model year. */
export function enginesFor(year: string, make: string, model: string): string[] {
  return applicationsFor(year, make, model).map((app) => app.engine)
}

/** Drain guidance for an application, falling back to the grade's default. */
export function drainFor(application: Application): string {
  return application.drain ?? getGrade(application.grade).drain
}

export function formatCapacity(litres: number): string {
  return `${litres.toFixed(1)} L`
}

/**
 * Coerces a possibly stale or partial selection into a valid one.
 *
 * This is what gives the selects their cascading behaviour: changing the make
 * drops a model that make does not offer, which in turn drops the engine.
 * Returns `null` only when the database is empty.
 */
export function resolveSelection(partial: Partial<Selection>): Resolved | null {
  const year = YEARS.includes(partial.year ?? '') ? partial.year! : (YEARS[0] ?? '')

  const makes = makesForYear(year)
  if (makes.length === 0) return null
  const make = makes.includes(partial.make ?? '') ? partial.make! : makes[0]!

  const models = modelsFor(year, make)
  if (models.length === 0) return null
  const model = models.includes(partial.model ?? '') ? partial.model! : models[0]!

  const applications = applicationsFor(year, make, model)
  const application =
    applications.find((app) => app.engine === partial.engine) ?? applications[0]
  if (!application) return null

  return {
    year,
    make,
    model,
    engine: application.engine,
    application,
    grade: application.grade,
    capacity: formatCapacity(application.capacityL),
    spec: application.spec,
    drain: drainFor(application),
    vehicleLine: `${year} ${make} ${model} · ${application.engine}`,
  }
}

/** The selection the finder opens on when the URL carries no query. */
export const DEFAULT_SELECTION: Partial<Selection> = {
  year: '2025',
  make: 'Kia',
  model: 'K4',
  engine: '1.6L L4 (C) Turbocharged GAS FI',
}

/** Total number of applications in the database, shown as a coverage figure. */
export const APPLICATION_COUNT = VEHICLES.reduce(
  (total, make) =>
    total + make.models.reduce((sub, model) => sub + model.applications.length, 0),
  0,
)

export const MAKE_COUNT = VEHICLES.length
