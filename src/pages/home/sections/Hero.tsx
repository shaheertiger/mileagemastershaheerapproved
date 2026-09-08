import { Button } from '../../../components/Button'
import { Icon } from '../../../components/Icon'
import { JUG_FRONT } from '../../../data/images'
import styles from './Hero.module.css'

const TRUST = [
  { label: 'API APPROVED', icon: 'check' as const, tone: styles.badgeGold },
  { label: 'WARRANTY APPROVED', icon: 'check' as const, tone: styles.badgeGold },
  { label: 'MADE IN EUROPE', icon: 'star' as const, tone: styles.badgeBlue },
]

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`mm-container ${styles.inner}`}>
        <div className={styles.copy}>
          <div className={styles.chip}>
            <span className={styles.dot} />
            ADVANCED FULL SYNTHETIC ENGINE OIL
          </div>

          <h1 className={styles.title}>
            Quality
            <br />
            <span className={styles.titleAccent}>priced right</span>
          </h1>

          <div className={styles.rule} />

          <p className={styles.lead}>
            European-blended full synthetic oil in every grade your bays run through — 0W-8 to
            5W-40. API SP licensed, warranty approved, and priced for shops that buy by the case.
          </p>

          <div className={styles.actions}>
            <Button href="#finder" variant="red" size="lg">
              FIND MY OIL
            </Button>
            <Button href="#quote" variant="outline" size="lg">
              GET WHOLESALE PRICING
            </Button>
          </div>

          <ul className={styles.trust}>
            {TRUST.map((item) => (
              <li key={item.label} className={styles.trustItem}>
                <span className={`${styles.trustBadge} ${item.tone}`}>
                  <Icon name={item.icon} size={12} />
                </span>
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.art}>
          <div className={styles.glow} aria-hidden="true" />
          <img
            className={styles.jug}
            src={JUG_FRONT.src}
            srcSet={JUG_FRONT.srcSet}
            sizes="(max-width: 860px) 92vw, 430px"
            alt="Mileage Master 0W-20 Premium Full Synthetic 5 L jug"
            width={JUG_FRONT.width}
            height={JUG_FRONT.height}
            // The hero jug is the page's LCP element; it is preloaded in the HTML.
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </div>
    </section>
  )
}
