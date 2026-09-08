import type { ReactNode } from 'react'
import jugFront from '../../../assets/jug-front.png'
import { Icon } from '../../../components/Icon'
import { Logo } from '../../../components/Logo'
import { site } from '../../../data/site'
import { cx } from '../../../lib/cx'
import styles from './MobileShowcase.module.css'

/**
 * Static phone mockups showing the site's three key screens.
 *
 * These are presentation artwork, not a live preview — the frames are fixed at
 * 340px by design. Delete this section and its stylesheet if the client would
 * rather not show mockups on the live site.
 */

function Phone({
  caption,
  statusTone,
  children,
}: {
  caption: string
  statusTone: string | undefined
  children: ReactNode
}) {
  return (
    <div className={styles.slot}>
      <div className={styles.frame}>
        <div className={styles.screen}>
          <div className={cx(styles.statusBar, statusTone)} aria-hidden="true">
            <span>9:41</span>
            <span className={styles.statusGlyph}>▮▮▮ ⌁</span>
          </div>
          {children}
        </div>
      </div>
      <div className={styles.caption}>{caption}</div>
    </div>
  )
}

function HomeScreen() {
  return (
    <>
      <div className={styles.appBar}>
        <Logo size="xs" showRegistered={false} />
        <div className={styles.appBarActions}>
          <Icon name="phone" size={16} />
          <span className={styles.burger} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </div>
      </div>

      <div className={styles.homeBody}>
        <div className={styles.homeCopy}>
          <div className={styles.homeChip}>
            <span className={styles.homeDot} />
            FULL SYNTHETIC ENGINE OIL
          </div>
          <div className={styles.homeTitle}>
            Quality
            <br />
            <span className={styles.accent}>priced right</span>
          </div>
          <div className={styles.homeRule} />
          <p className={styles.homeLead}>
            0W-8 to 5W-40. API SP licensed, warranty approved, priced by the case.
          </p>
          <div className={styles.stack}>
            <div className={styles.fakeButton}>FIND MY OIL</div>
            <div className={styles.fakeButtonOutline}>GET WHOLESALE PRICING</div>
          </div>
        </div>
        <div className={styles.homeArt}>
          <img className={styles.homeJug} src={jugFront} alt="" />
        </div>
      </div>

      <div className={styles.callBar}>
        <span className={styles.callBadge}>
          <Icon name="phone" size={11} />
        </span>
        {site.phone}
      </div>
    </>
  )
}

function FinderScreen() {
  return (
    <>
      <div className={styles.finderHead}>
        <div className={styles.finderTitle}>Find the right oil</div>
        <div className={styles.finderLead}>Pick the vehicle. Get the grade and the case price.</div>
      </div>

      <div className={styles.finderFields}>
        {['2024', 'Toyota', 'RAV4', '2.5L I4'].map((value) => (
          <div key={value} className={styles.fakeSelect}>
            <span>{value}</span>
            <span className={styles.caret}>
              <Icon name="chevron" size={12} />
            </span>
          </div>
        ))}
        <div className={styles.fakeButton}>SHOW MY OIL</div>
      </div>

      <div className={styles.finderResult}>
        <div className={styles.resultPanel}>
          <div className={styles.resultLabel}>RECOMMENDED</div>
          <div className={styles.resultGrade}>0W-20</div>
          <div className={styles.resultDetail}>
            Premium Full Synthetic · API SP · ILSAC GF-6A · 5L jug, 4 per case
          </div>
        </div>
        <div className={styles.stack}>
          <div className={styles.fakeButton}>GET CASE PRICE</div>
          <div className={styles.fakeButtonOutline}>SPEC SHEET</div>
        </div>
        <div className={styles.resultTrust}>
          <span>
            <span className={styles.miniBadge}>
              <Icon name="check" size={9} />
            </span>
            API SP
          </span>
          <span>
            <span className={styles.miniBadge}>
              <Icon name="check" size={9} />
            </span>
            WARRANTY OK
          </span>
        </div>
      </div>
    </>
  )
}

function ProductScreen() {
  const grades = ['0W-8', '0W-16', '0W-20', '0W-30', '5W-20', '5W-30', '5W-40']
  return (
    <>
      <div className={styles.productHead}>
        <div className={styles.productTitle}>Available grades</div>
        <div className={styles.productKicker}>7 VISCOSITIES · 5L &amp; 4L JUGS</div>
      </div>

      <div className={styles.chips}>
        {grades.map((grade) => (
          <span
            key={grade}
            className={cx(styles.chip, grade === '0W-20' && styles.chipActive)}
          >
            {grade}
          </span>
        ))}
      </div>

      <div className={styles.productCard}>
        <div className={styles.productPlate}>
          <img src={jugFront} alt="" />
        </div>
        <div className={styles.productDetail}>
          <div className={styles.productDetailKicker}>GASOLINE ENGINE OIL</div>
          <div className={styles.productGrade}>0W-20</div>
          <div className={styles.productLine}>PREMIUM FULL SYNTHETIC</div>
          <p className={styles.productBlurb}>
            Meets Chrysler MS-6395, Ford WSS-M2C947-A and GM 6094M, with LSPI protection for turbo
            direct-injection engines.
          </p>
          <div className={styles.fakeButton}>REQUEST CASE PRICE</div>
        </div>
      </div>
    </>
  )
}

export function MobileShowcase() {
  return (
    <section id="mobile" className={`mm-anchor ${styles.section}`}>
      <div className={`mm-container ${styles.inner}`}>
        <div className={styles.head}>
          <h2 className="mm-h2">Mobile</h2>
          <span className={styles.kicker}>HALF OF SHOP ORDERS COME FROM A PHONE IN THE BAY</span>
        </div>
        <div className={styles.rule} />

        <div className={styles.rack}>
          <Phone caption="HOME" statusTone={styles.statusRed}>
            <HomeScreen />
          </Phone>
          <Phone caption="OIL FINDER" statusTone={styles.statusInk}>
            <FinderScreen />
          </Phone>
          <Phone caption="PRODUCT" statusTone={styles.statusLight}>
            <ProductScreen />
          </Phone>
        </div>
      </div>
    </section>
  )
}
