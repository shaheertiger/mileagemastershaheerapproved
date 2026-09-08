import { useCallback, useEffect, useState } from 'react'
import { DEFAULT_SELECTION, type Selection } from './lookup'
import { useVehicleSelect, type VehicleSelect } from './useVehicleSelect'

/**
 * Catalogue finder state: a vehicle selection plus the high-mileage toggle and
 * the submitted flag, mirrored into the query string.
 *
 * Keeping the selection in the URL makes a result set linkable — a service
 * advisor can send a customer the exact recommendation they were just quoted.
 */
export interface FinderApi extends VehicleSelect {
  highMileage: boolean
  submitted: boolean
  toggleHighMileage: () => void
  submit: () => void
  reset: () => void
}

interface UrlState {
  selection: Partial<Selection>
  highMileage: boolean
  submitted: boolean
}

function readUrl(): UrlState {
  const query = new URLSearchParams(window.location.search)
  const selection: Partial<Selection> = {}
  const year = query.get('year')
  const make = query.get('make')
  const model = query.get('model')
  const engine = query.get('engine')
  if (year) selection.year = year
  if (make) selection.make = make
  if (model) selection.model = model
  if (engine) selection.engine = engine

  // A URL carrying a vehicle is a shared result, so show the results straight
  // away. A bare /oil-finder/ opens on the form.
  const submitted = query.has('submitted')
    ? query.get('submitted') === '1'
    : Boolean(year ?? make ?? model ?? engine)

  return {
    selection: Object.keys(selection).length > 0 ? selection : DEFAULT_SELECTION,
    highMileage: query.get('hm') === '1',
    submitted,
  }
}

function writeUrl(selection: Selection, highMileage: boolean, submitted: boolean): void {
  const query = new URLSearchParams({
    year: selection.year,
    make: selection.make,
    model: selection.model,
    engine: selection.engine,
    hm: highMileage ? '1' : '0',
  })
  if (!submitted) query.set('submitted', '0')
  window.history.replaceState(
    null,
    '',
    `${window.location.pathname}?${query.toString()}${window.location.hash}`,
  )
}

export function useFinderState(): FinderApi {
  const [initial] = useState(readUrl)
  const vehicle = useVehicleSelect(initial.selection)
  const [highMileage, setHighMileage] = useState(initial.highMileage)
  const [submitted, setSubmitted] = useState(initial.submitted)

  useEffect(() => {
    writeUrl(vehicle.selection, highMileage, submitted)
  }, [vehicle.selection, highMileage, submitted])

  const toggleHighMileage = useCallback(() => setHighMileage((previous) => !previous), [])

  return {
    ...vehicle,
    highMileage,
    submitted,
    toggleHighMileage,
    submit: () => setSubmitted(true),
    reset: () => setSubmitted(false),
  }
}
