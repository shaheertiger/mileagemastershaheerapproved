import { useState } from 'react'
import jugFront from '../../../assets/jug-front.png'
import { Button } from '../../../components/Button'
import { SpecSheet } from '../../../components/SpecSheet'
import { GRADES, type GradeName } from '../../../data/grades'
import { PRODUCT_LINES } from '../../../data/products'
import { useQuotePrefill } from '../../../lib/quote'
import styles from './GradeSelector.module.css'

interface GradeSelectorProps {
  /** Grade shown on first paint. */
  defaultGrade?: GradeName
}

/** Grade picker with the detail panel for the selected viscosity. */
export function GradeSelector({ defaultGrade = '0W-20' }: GradeSelectorProps) {
  const [selected, setSelected] = useState<GradeName>(defaultGrade)
  const [specSheetOpen, setSpecSheetOpen] = useState(false)
  const { requestQuote } = useQuotePrefill()

  const grade = GRADES.find((entry) => entry.name === selected) ?? GRADES[2]!
  const premium = PRODUCT_LINES[0]!
  const productName = `${grade.name} ${premium.nameSuffix}`

  return (
    <section id="grades" className={`mm-anchor ${styles.section}`}>
      <div className={`mm-container ${styles.inner}`}>
        <div className={styles.head}>
          <h2 className="mm-h2">Available grades</h2>
          <span className={styles.kicker}>7 VISCOSITIES · 5L &amp; 4L JUGS · CASE QUANTITIES</span>
        </div>
        <div className={styles.rule} />

        <div className={styles.tabs} role="tablist" aria-label="Viscosity grade">
          {GRADES.map((entry) => {
            const isActive = entry.name === selected
            return (
              <button
                key={entry.name}
                type="button"
                role="tab"
                id={`grade-tab-${entry.name}`}
                aria-selected={isActive}
                aria-controls="grade-panel"
                className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
                onClick={() => setSelected(entry.name)}
              >
                {entry.name}
              </button>
            )
          })}
        </div>

        <div
          className={styles.panel}
          id="grade-panel"
          role="tabpanel"
          aria-labelledby={`grade-tab-${grade.name}`}
        >
          <div className={styles.plate}>
            <img
              className={styles.jug}
              src={jugFront}
              alt={`Mileage Master ${productName} ${premium.packSize} jug`}
              width={1023}
              height={1600}
            />
          </div>

          <div className={styles.detail}>
            <div className={styles.detailKicker}>GASOLINE ENGINE OIL</div>
            <div className={styles.grade}>{grade.name}</div>
            <div className={styles.line}>PREMIUM FULL SYNTHETIC</div>
            <p className={styles.blurb}>{grade.blurbLong}</p>

            <div className={styles.specs}>
              <div className={styles.spec}>
                <div className={styles.specLabel}>SERVICE</div>
                <div className={styles.specValue}>{grade.service}</div>
              </div>
              <div className={styles.spec}>
                <div className={styles.specLabel}>PACK</div>
                <div className={styles.specValue}>
                  {premium.packSize} × {premium.perCase} / case
                </div>
              </div>
              <div className={styles.spec}>
                <div className={styles.specLabel}>DRAIN</div>
                <div className={styles.specValue}>{grade.drain}</div>
              </div>
            </div>

            <div className={styles.actions}>
              <Button variant="redInvert" size="md" onClick={() => requestQuote(productName)}>
                REQUEST CASE PRICE
              </Button>
              <Button variant="onInk" size="md" onClick={() => setSpecSheetOpen(true)}>
                SPEC SHEET
              </Button>
            </div>
          </div>
        </div>
      </div>

      {specSheetOpen && (
        <SpecSheet grade={grade.name} onClose={() => setSpecSheetOpen(false)} />
      )}
    </section>
  )
}
