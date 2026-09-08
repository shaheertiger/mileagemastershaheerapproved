import { useEffect, useState } from 'react'
import { mainNav } from '../data/site'
import { resolveHref, routes, type PageId } from '../lib/routes'
import { Button } from './Button'
import { Icon } from './Icon'
import { Logo } from './Logo'
import styles from './SiteHeader.module.css'

interface SiteHeaderProps {
  page: PageId
}

/**
 * Sticky site header. Above 860px the nav sits inline and wraps; below it
 * collapses behind a menu button, which the handoff flags as a real-build
 * requirement.
 */
export function SiteHeader({ page }: SiteHeaderProps) {
  const [open, setOpen] = useState(false)

  // Reset the menu when the viewport grows back past the breakpoint, so the
  // desktop nav is never left in a collapsed state.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 861px)')
    const onChange = () => {
      if (query.matches) setOpen(false)
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return (
    <header className={styles.header}>
      <div className={`mm-container ${styles.inner}`}>
        <a className={styles.brand} href={routes.home} aria-label="Mileage Master — home">
          <Logo size="lg" elevated />
        </a>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((previous) => !previous)}
        >
          <Icon name={open ? 'close' : 'menu'} size={16} />
          {open ? 'CLOSE' : 'MENU'}
        </button>

        <nav
          id="site-nav"
          className={`${styles.nav} ${open ? styles.navOpen : ''}`}
          aria-label="Main"
        >
          {mainNav.map((item) => {
            const isCurrent = item.page === page && !item.href.startsWith('#')
            return (
              <a
                key={item.label}
                href={resolveHref(page, item)}
                className={`${styles.link} ${isCurrent ? styles.current : ''}`}
                aria-current={isCurrent ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        <Button
          href="#quote"
          variant="redInvert"
          size="md"
          className={`${styles.cta} ${open ? styles.ctaOpen : ''}`}
          onClick={() => setOpen(false)}
        >
          REQUEST PRICING
        </Button>
      </div>
    </header>
  )
}
