import styles from './Breadcrumb.module.css'

export interface Crumb {
  label: string
  href?: string
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className={styles.bar} aria-label="Breadcrumb">
      <ol className={`mm-container ${styles.list}`}>
        {items.map((item, index) => (
          <li key={item.label} className={styles.crumb}>
            {item.href ? (
              <a className={styles.link} href={item.href}>
                {item.label}
              </a>
            ) : (
              <span className={styles.current} aria-current="page">
                {item.label}
              </span>
            )}
            {index < items.length - 1 && <span aria-hidden="true">›</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
