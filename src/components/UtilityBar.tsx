import { site } from '../data/site'
import { Icon } from './Icon'
import styles from './UtilityBar.module.css'

/** Red contact strip above the header. */
export function UtilityBar() {
  return (
    <div className={styles.bar}>
      <span className={styles.order}>ORDER TODAY</span>
      <a className={styles.contact} href={site.phoneHref}>
        <span className={styles.badge}>
          <Icon name="phone" size={10} />
        </span>
        {site.phone}
      </a>
      <span className={styles.divider} aria-hidden="true">
        |
      </span>
      <a className={styles.contact} href={site.emailHref}>
        <span className={styles.badge}>
          <Icon name="mail" size={9} />
        </span>
        {site.email}
      </a>
      <span className={styles.divider} aria-hidden="true">
        |
      </span>
      <span className={styles.origin}>{site.origin}</span>
    </div>
  )
}
