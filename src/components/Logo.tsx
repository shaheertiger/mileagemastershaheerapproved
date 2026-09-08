import styles from './Logo.module.css'

interface LogoProps {
  size?: 'lg' | 'md' | 'sm'
  /** The header lockup sits on a drop shadow; the footer ones do not. */
  elevated?: boolean
}

/** The Mileage Master wordmark lockup, reused at three sizes across the site. */
export function Logo({ size = 'lg', elevated = false }: LogoProps) {
  const className = [styles.logo, styles[size], elevated ? styles.elevated : '']
    .filter(Boolean)
    .join(' ')

  return (
    <span className={className}>
      {/* The wordmark is decorative markup; the accessible name is the text below,
          so heavy letter-spacing is never spelled out by a screen reader. */}
      <span className={styles.top} aria-hidden="true">
        MILEAGE
      </span>
      <span className={styles.bottom} aria-hidden="true">
        MASTER
        <span className={styles.registered}>®</span>
      </span>
      <span className="mm-visually-hidden">Mileage Master</span>
    </span>
  )
}
