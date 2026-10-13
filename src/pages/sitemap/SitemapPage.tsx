import { Breadcrumb } from '../../components/Breadcrumb'
import { ContactBar } from '../../components/ContactBar'
import { QuoteBlock } from '../../components/QuoteBlock'
import { SiteFooter } from '../../components/SiteFooter'
import { SiteHeader } from '../../components/SiteHeader'
import { UtilityBar } from '../../components/UtilityBar'
import { site, sitemapGroups } from '../../data/site'
import { QuotePrefillProvider } from '../../lib/quote'
import { resolveHref, routes } from '../../lib/routes'
import styles from './SitemapPage.module.css'

/** Human-readable sitemap. Search engines read the generated sitemap.xml. */
export function SitemapPage() {
  return (
    <QuotePrefillProvider>
      <UtilityBar />
      <SiteHeader page="sitemap" />
      <Breadcrumb items={[{ label: 'Home', href: routes.home }, { label: 'Sitemap' }]} />
      <main>
        <section className={styles.section}>
          <div className="mm-container">
            <h1 className={styles.title}>Sitemap</h1>
            <p className={styles.lead}>
              Every page and section on the site. Looking for the right oil for a vehicle? Start
              with the <a href={routes.finder}>oil finder</a>.
            </p>

            <div className={styles.groups}>
              {sitemapGroups.map((group) => (
                <nav key={group.heading} className={styles.group} aria-label={group.heading}>
                  <h2 className={styles.heading}>{group.heading}</h2>
                  <ul className={styles.links}>
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <a href={resolveHref('sitemap', link)}>{link.label}</a>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}

              <div className={styles.group}>
                <h2 className={styles.heading}>Contact</h2>
                <ul className={styles.links}>
                  <li>
                    <a href={site.phoneHref}>{site.phone}</a>
                  </li>
                  <li>
                    <a href={site.emailHref}>{site.email}</a>
                  </li>
                  <li>
                    <span>{site.hoursLong}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <QuoteBlock
          sectionId="pricing"
          heading={['Priced by the case,', 'not by the litre']}
          lead="Send the grade and your monthly volume. Quotes go out the same business day."
          compact
        />
        <ContactBar headline="Order today" />
      </main>
      <SiteFooter page="sitemap" />
    </QuotePrefillProvider>
  )
}
