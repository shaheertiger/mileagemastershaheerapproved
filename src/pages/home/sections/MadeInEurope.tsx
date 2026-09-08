import { LABEL_APPROVALS } from '../../../data/grades'
import { JUG_BACK } from '../../../data/images'
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
              src={JUG_BACK.src}
              srcSet={JUG_BACK.srcSet}
              sizes="(max-width: 720px) 88vw, 374px"
              alt="Mileage Master 0W-20 back label showing features, benefits and approvals"
              width={JUG_BACK.width}
              height={JUG_BACK.height}
              loading="lazy"
              decoding="async"
            />
            <figcaption className={styles.caption}>
              <span className={styles.captionLabel}>Printed on every label</span>
              {/* The approvals are set as text rather than left to be read off
                  the photo, which is far too small to resolve them. */}
              <ul className={styles.approvals}>
                {LABEL_APPROVALS.map((approval) => (
                  <li key={approval}>{approval}</li>
                ))}
              </ul>
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  )
}
