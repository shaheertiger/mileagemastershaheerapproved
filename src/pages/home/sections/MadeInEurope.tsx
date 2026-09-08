import jugBack from '../../../assets/jug-back.jpg'
import styles from './MadeInEurope.module.css'

const POINTS = [
  'Group III+ and PAO base stocks, fully synthetic — never a synthetic blend sold as full.',
  'Batch-traceable: every lot carries a certificate of analysis on request.',
  'Landed cost that undercuts the majors on the same licence and the same specs.',
]

export function MadeInEurope() {
  return (
    <section id="europe" className={`mm-anchor ${styles.section}`}>
      <div className={`mm-container ${styles.inner}`}>
        <div>
          <h2 className={styles.heading}>
            Made in
            <br />
            <span className={styles.headingAccent}>Europe</span>
          </h2>

          <div className={styles.flag} aria-hidden="true">
            <div className={styles.barBlue} />
            <span className={styles.stars}>★★★★</span>
            <div className={styles.barGold} />
          </div>

          <p className={styles.lead}>
            Every jug is blended and filled in Europe to the same base-oil and additive package
            used by OEM service fills, then shipped to our Mississauga warehouse. No re-blending,
            no relabelling.
          </p>

          <ol className={styles.points}>
            {POINTS.map((text, index) => (
              <li key={text} className={styles.point}>
                <span className={styles.pointNumber}>{String(index + 1).padStart(2, '0')}</span>
                <span className={styles.pointText}>{text}</span>
              </li>
            ))}
          </ol>
        </div>

        <figure className={styles.figure}>
          <div className={styles.card}>
            <img
              src={jugBack}
              alt="Mileage Master 0W-20 back label showing features, benefits and approvals"
              width={1009}
              height={1600}
            />
            <figcaption className={styles.caption}>
              FULL APPROVALS PRINTED ON EVERY LABEL
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  )
}
