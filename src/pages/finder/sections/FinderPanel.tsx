import { Button } from '../../../components/Button'
import { Icon } from '../../../components/Icon'
import { VehicleSelects } from '../../../components/VehicleSelects'
import { APPLICATION_COUNT, MAKE_COUNT } from '../../../lib/lookup'
import type { FinderApi } from '../../../lib/useFinderState'
import styles from './FinderPanel.module.css'

interface FinderPanelProps {
  finder: FinderApi
  onSubmit: () => void
}

/** Year / Make / Model / Engine lookup form. */
export function FinderPanel({ finder, onSubmit }: FinderPanelProps) {
  return (
    <section id="finder" className={`mm-anchor ${styles.section}`}>
      <div className={`mm-container ${styles.inner}`}>
        <div className={styles.chip}>
          <span className={styles.dot} />
          CATALOGUE · OIL FINDER
        </div>

        <h1 className={styles.title}>
          Find the right
          <br />
          <span className={styles.titleAccent}>motor oil</span>
        </h1>

        <p className={styles.lead}>
          Tell us a bit more about your vehicle and we'll tell you how to best protect it — grade,
          capacity, licences and case pricing.
        </p>

        <form
          className={styles.card}
          onSubmit={(event) => {
            event.preventDefault()
            onSubmit()
          }}
        >
          <VehicleSelects vehicle={finder} theme="light" idPrefix="finder" />

          <div className={styles.controls}>
            <button
              type="button"
              className={styles.check}
              role="checkbox"
              aria-checked={finder.highMileage}
              onClick={finder.toggleHighMileage}
            >
              <span className={`${styles.box} ${finder.highMileage ? styles.boxOn : ''}`}>
                {finder.highMileage && <Icon name="check" size={14} />}
              </span>
              Over 120,000 kilometres?
            </button>

            <Button type="submit" variant="redInk" size="xl">
              GET RECOMMENDATIONS
            </Button>

            <span className={styles.help}>
              Can't find your model? <a href="#help">Tell us what you're missing.</a>
            </span>
          </div>
        </form>

        <p className={styles.disclaimer}>
          Please consult your vehicle manufacturer's manual for information specific to your
          vehicle. Engine oil capacity shown is with an oil filter change.
        </p>
        <p className={styles.coverage}>
          Covering {APPLICATION_COUNT} engine applications across {MAKE_COUNT} makes, model years
          2005–2026.
        </p>
      </div>
    </section>
  )
}
