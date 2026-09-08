import { useState } from 'react'
import { Button } from '../../../components/Button'
import { SpecSheet } from '../../../components/SpecSheet'
import type { GradeName } from '../../../data/grades'
import { recommendProducts } from '../../../data/products'
import { site } from '../../../data/site'
import type { Resolved } from '../../../lib/lookup'
import styles from './Results.module.css'
import { ProductCard } from './ProductCard'

interface ResultsProps {
  result: Resolved | null
  highMileage: boolean
  /** Adds the value-line Synthetic Blend to every result set. */
  showBudgetLine?: boolean
  onSearchAgain: () => void
}

/** Recommendation list for the selected vehicle. */
export function Results({
  result,
  highMileage,
  showBudgetLine = true,
  onSearchAgain,
}: ResultsProps) {
  const [specSheetGrade, setSpecSheetGrade] = useState<GradeName | null>(null)

  if (!result) {
    return (
      <section id="results" className={`mm-anchor ${styles.section}`}>
        <div className={`mm-container ${styles.inner}`}>
          <div className={styles.empty}>
            <div className={styles.emptyTitle}>Not in the guide yet</div>
            <p className={styles.emptyBody}>
              We don't have that engine on file. Call the orders desk at {site.phone} or email{' '}
              {site.email} with the year, make, model and engine and we'll confirm the right grade
              the same business day.
            </p>
            <Button variant="bone" size="sm" onClick={onSearchAgain}>
              SEARCH AGAIN
            </Button>
          </div>
        </div>
      </section>
    )
  }

  const products = recommendProducts(result.grade, result.spec, {
    highMileage,
    includeBudgetLine: showBudgetLine,
  })

  return (
    <section id="results" className={`mm-anchor ${styles.section}`}>
      <div className={`mm-container ${styles.inner}`}>
        <div className={styles.kicker}>RECOMMENDED FOR YOUR</div>
        <h2 className={styles.vehicle}>{result.vehicleLine}</h2>
        <p className={styles.lead}>
          Based on what you've told us, these products protect your vehicle to the manufacturer's
          specification.
        </p>

        <div className={styles.facts}>
          <div className={styles.fact}>
            <div className={styles.factLabel}>ENGINE OIL CAPACITY</div>
            <div className={styles.factCapacity}>{result.capacity}</div>
          </div>
          <div className={styles.fact}>
            <div className={styles.factLabel}>SPECIFICATION</div>
            <div className={styles.factValue}>{result.spec}</div>
          </div>
          <div className={styles.fact}>
            <div className={styles.factLabel}>DRAIN INTERVAL</div>
            <div className={styles.factValue}>{result.drain}</div>
          </div>
        </div>

        <div className={styles.tabs}>
          <span className={styles.tab}>MOTOR OIL</span>
          <span className={styles.tabDisabled}>FILTERS — COMING SOON</span>
        </div>

        <div className={styles.cards}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSpecSheet={() => setSpecSheetGrade(product.grade)}
            />
          ))}
        </div>

        <div className={styles.footerRow}>
          <Button variant="bone" size="sm" onClick={onSearchAgain}>
            SEARCH AGAIN
          </Button>
          <span className={styles.footerNote}>
            Recommendations are guidance only. Always confirm against the owner's manual.
          </span>
        </div>
      </div>

      {specSheetGrade && (
        <SpecSheet grade={specSheetGrade} onClose={() => setSpecSheetGrade(null)} />
      )}
    </section>
  )
}
