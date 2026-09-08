import { useState } from 'react'
import { Button } from '../../../components/Button'
import { Icon } from '../../../components/Icon'
import { VehicleSelects } from '../../../components/VehicleSelects'
import { PRODUCT_LINES } from '../../../data/products'
import { DEFAULT_SELECTION } from '../../../lib/lookup'
import { finderUrl } from '../../../lib/routes'
import { useVehicleSelect } from '../../../lib/useVehicleSelect'
import styles from './FinderStrip.module.css'

/**
 * Homepage oil finder.
 *
 * The design brief had these selects as decoration with the real logic on the
 * catalogue page. They run against the same database here, so the answer shown
 * is the answer the catalogue would give, and "see full results" carries the
 * selection across in the query string.
 */
export function FinderStrip() {
  const vehicle = useVehicleSelect(DEFAULT_SELECTION)
  const [submitted, setSubmitted] = useState(false)
  const result = vehicle.result
  const premium = PRODUCT_LINES[0]!

  return (
    <section id="finder" className={`mm-anchor ${styles.section}`}>
      <div className={`mm-container ${styles.inner}`}>
        <div className={styles.head}>
          <h2 className={`mm-h2 ${styles.heading}`}>Find the right oil</h2>
          <p className={styles.lead}>
            Pick the vehicle. We'll return the grade, the spec sheet and the case price.
          </p>
        </div>

        <VehicleSelects
          vehicle={vehicle}
          theme="ink"
          idPrefix="home-finder"
          trailing={
            <div className={styles.submitCell}>
              <Button variant="redInvert" size="lg" block onClick={() => setSubmitted(true)}>
                SHOW MY OIL
              </Button>
            </div>
          }
        />

        <div aria-live="polite">
          {submitted &&
            (result ? (
              <div className={styles.panel}>
                <span className={styles.panelLabel}>RECOMMENDED</span>
                <span className={styles.panelGrade}>{result.grade}</span>
                <span className={styles.panelDetail}>
                  {premium.nameSuffix} · {result.spec} · {premium.packSize} jug,{' '}
                  {premium.perCase} per case
                </span>
                <span className={styles.panelActions}>
                  <a
                    className={styles.panelSecondary}
                    href={finderUrl({
                      year: result.year,
                      make: result.make,
                      model: result.model,
                      engine: result.engine,
                    })}
                  >
                    SEE FULL RESULTS
                  </a>
                  <a className={styles.panelLink} href="#quote">
                    GET CASE PRICE
                    <Icon name="arrow-right" size={14} />
                  </a>
                </span>
              </div>
            ) : (
              <p className={styles.empty}>
                We don't have that combination on file yet. Call the orders desk and we'll confirm
                the right grade for it.
              </p>
            ))}
        </div>
      </div>
    </section>
  )
}
