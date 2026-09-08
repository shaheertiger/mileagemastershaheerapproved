import { Icon } from '../../../components/Icon'
import { INDUSTRY_LICENCES, OEM_SPECIFICATIONS } from '../../../data/grades'
import styles from './Approvals.module.css'

const CARDS = [
  { heading: 'INDUSTRY LICENCES', rows: INDUSTRY_LICENCES },
  { heading: 'OEM SPECIFICATIONS', rows: OEM_SPECIFICATIONS },
]

export function Approvals() {
  return (
    <section id="specs" className={`mm-anchor ${styles.section}`}>
      <div className={`mm-container ${styles.inner}`}>
        <h2 className="mm-h2">Approvals &amp; specifications</h2>
        <p className={styles.lead}>
          0W-20 Premium Full Synthetic shown. Every grade carries its own licence set — spec
          sheets on request.
        </p>

        <div className={styles.cards}>
          {CARDS.map((card) => (
            <div key={card.heading} className={styles.card}>
              <div className={styles.cardHead}>{card.heading}</div>
              <ul className={styles.rows}>
                {card.rows.map((row) => (
                  <li key={row} className={styles.row}>
                    {row}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className={styles.warranty}>
            <span className={styles.shield} aria-hidden="true">
              <Icon name="check" size={24} />
            </span>
            <div className={styles.warrantyTitle}>
              Warranty
              <br />
              approved
            </div>
            <p className={styles.warrantyBody}>
              Using a licensed oil that meets the OEM specification keeps the factory powertrain
              warranty intact. Keep the invoice, keep the coverage.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
