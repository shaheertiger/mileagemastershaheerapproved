import { useCallback, useMemo, useState } from 'react'
import {
  enginesFor,
  makesForYear,
  modelsFor,
  resolveSelection,
  YEARS,
  type Resolved,
  type Selection,
} from './lookup'

/**
 * Cascading Year / Make / Model / Engine selection.
 *
 * Every change re-resolves the whole selection against the database, so a make
 * that does not offer the current model drops it, which in turn drops the
 * engine. That keeps the four selects consistent without per-field reset rules.
 */
export interface VehicleSelect {
  selection: Selection
  years: string[]
  makes: string[]
  models: string[]
  engines: string[]
  /** The matched application, or null when nothing in the database fits. */
  result: Resolved | null
  setYear: (year: string) => void
  setMake: (make: string) => void
  setModel: (model: string) => void
  setEngine: (engine: string) => void
}

const EMPTY: Selection = { year: YEARS[0] ?? '', make: '', model: '', engine: '' }

function normalise(partial: Partial<Selection>): Selection {
  const resolved = resolveSelection(partial)
  if (!resolved) return EMPTY
  const { year, make, model, engine } = resolved
  return { year, make, model, engine }
}

export function useVehicleSelect(initial: Partial<Selection>): VehicleSelect {
  const [selection, setSelection] = useState<Selection>(() => normalise(initial))

  const update = useCallback((patch: Partial<Selection>) => {
    setSelection((previous) => normalise({ ...previous, ...patch }))
  }, [])

  const { year, make, model } = selection
  const makes = useMemo(() => makesForYear(year), [year])
  const models = useMemo(() => modelsFor(year, make), [year, make])
  const engines = useMemo(() => enginesFor(year, make, model), [year, make, model])
  const result = useMemo(() => resolveSelection(selection), [selection])

  return {
    selection,
    years: YEARS,
    makes,
    models,
    engines,
    result,
    setYear: (value) => update({ year: value }),
    // Blanking the downstream fields lets `normalise` pick the first valid one.
    setMake: (value) => update({ make: value, model: '', engine: '' }),
    setModel: (value) => update({ model: value, engine: '' }),
    setEngine: (value) => update({ engine: value }),
  }
}
