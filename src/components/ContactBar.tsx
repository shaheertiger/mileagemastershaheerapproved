import { site } from '../data/site'
import { Icon } from './Icon'
import styles from './ContactBar.module.css'

interface ContactBarProps {
  /** "Order today" on the homepage, "Vehicle not listed?" on the catalogue. */
  headline: string
  id?: string
}

/** Ink contact bar: headline, phone, email and opening hours. */
export function ContactBar({ headline, id }: ContactBarProps) {
  return (
    <div id={id} className={`mm-anchor ${styles.bar}`}>
      <div className={`mm-container ${styles.inner}`}>
        <span className={styles.headline}>{headline}</span>
        <a className={styles.phone} href={site.phoneHref}>
          <span className={styles.badge}>
            <Icon name="phone" size={17} />
          </span>
          {site.phone}
        </a>
        <a className={styles.email} href={site.emailHref}>
          <span className={styles.badge}>
            <Icon name="mail" size={15} />
          </span>
          {site.email}
        </a>
        <span className={styles.hours}>{site.hours}</span>
      </div>
    </div>
  )
}
