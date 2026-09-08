import type { ReactNode } from 'react'
import type { VehicleSelect } from '../lib/useVehicleSelect'
import styles from './VehicleSelects.module.css'

interface VehicleSelectsProps {
  vehicle: VehicleSelect
  /** `ink` for the homepage strip, `light` for the catalogue form card. */
  theme: 'ink' | 'light'
  /** Prefix keeping input ids unique when both variants are on one page. */
  idPrefix: string
  /** Rendered as a fifth grid cell — the homepage puts its submit button here. */
  trailing?: ReactNode
}

/** The Year / Make / Model / Engine selects, shared by both finders. */
export function VehicleSelects({ vehicle, theme, idPrefix, trailing }: VehicleSelectsProps) {
  const fields = [
    {
      key: 'year',
      label: 'YEAR',
      value: vehicle.selection.year,
      options: vehicle.years,
      onChange: vehicle.setYear,
    },
    {
      key: 'make',
      label: 'MAKE',
      value: vehicle.selection.make,
      options: vehicle.makes,
      onChange: vehicle.setMake,
    },
    {
      key: 'model',
      label: 'MODEL',
      value: vehicle.selection.model,
      options: vehicle.models,
      onChange: vehicle.setModel,
    },
    {
      key: 'engine',
      label: 'ENGINE',
      value: vehicle.selection.engine,
      options: vehicle.engines,
      onChange: vehicle.setEngine,
    },
  ]

  return (
    <div className={`${styles.grid} ${styles[theme]}`}>
      {fields.map((field) => (
        <div key={field.key} className={styles.field}>
          <label htmlFor={`${idPrefix}-${field.key}`}>{field.label}</label>
          <select
            id={`${idPrefix}-${field.key}`}
            className={styles.select}
            value={field.value}
            onChange={(event) => field.onChange(event.target.value)}
          >
            {field.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
      {trailing}
    </div>
  )
}
