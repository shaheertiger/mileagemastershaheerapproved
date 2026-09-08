import { footerColumns, legalStrip, site } from '../data/site'
import { resolveHref, type PageId } from '../lib/routes'
import { Logo } from './Logo'
import styles from './SiteFooter.module.css'

interface SiteFooterProps {
  page: PageId
  /** The catalogue page runs the single-row condensed footer. */
  variant?: 'full' | 'compact'
}

export function SiteFooter({ page, variant = 'full' }: SiteFooterProps) {
  if (variant === 'compact') {
    return (
      <footer className={styles.footer}>
        <div className={`mm-container ${styles.compact}`}>
          <Logo size="sm" />
          <span>{`${site.copyright} · Mississauga, ON`}</span>
          <span>Made in Europe</span>
          <span>API SP licensed</span>
        </div>
      </footer>
    )
  }

  return (
    <footer className={styles.footer}>
      <div className={`mm-container ${styles.columns}`}>
        <div>
          <Logo size="md" />
          <p className={styles.address}>{site.address}</p>
        </div>

        {footerColumns.map((column) => (
          <div key={column.heading}>
            <div className={styles.heading}>{column.heading}</div>
            <div className={styles.links}>
              {column.links.map((link) => (
                <a key={link.label} href={resolveHref(page, link)}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        ))}

        <div>
          <div className={styles.heading}>CONTACT</div>
          <div className={styles.links}>
            <a href={site.phoneHref}>{site.phone}</a>
            <a href={site.emailHref}>{site.email}</a>
            <span>{site.hoursLong}</span>
          </div>
        </div>
      </div>

      <div className={`mm-container ${styles.legal}`}>
        {legalStrip.map((item) => (
          <span key={item}>{item}</span>
        ))}
        <span className={styles.note}>Mississauga, ON · Canada</span>
      </div>
    </footer>
  )
}
