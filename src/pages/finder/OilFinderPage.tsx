import { Breadcrumb } from '../../components/Breadcrumb'
import { ContactBar } from '../../components/ContactBar'
import { QuoteBlock } from '../../components/QuoteBlock'
import { SiteFooter } from '../../components/SiteFooter'
import { SiteHeader } from '../../components/SiteHeader'
import { UtilityBar } from '../../components/UtilityBar'
import { QuotePrefillProvider } from '../../lib/quote'
import { routes } from '../../lib/routes'
import { useFinderState } from '../../lib/useFinderState'
import { FinderPanel } from './sections/FinderPanel'
import { Results } from './sections/Results'

export interface OilFinderPageProps {
  /** Includes the value-line Synthetic Blend in every result set. */
  showBudgetLine?: boolean
}

export function OilFinderPage({ showBudgetLine = true }: OilFinderPageProps) {
  const finder = useFinderState()

  const onSubmit = () => {
    finder.submit()
    // Results render below the fold; take the visitor to them.
    window.requestAnimationFrame(() => {
      document.getElementById('results')?.scrollIntoView({ block: 'start' })
    })
  }

  const onSearchAgain = () => {
    finder.reset()
    document.getElementById('finder')?.scrollIntoView({ block: 'start' })
  }

  return (
    <QuotePrefillProvider>
      <UtilityBar />
      <SiteHeader page="finder" />
      <Breadcrumb
        items={[
          { label: 'Home', href: routes.home },
          // The last crumb only appears once a search has actually been run.
          finder.submitted
            ? { label: 'Find the right motor oil', href: '#finder' }
            : { label: 'Find the right motor oil' },
          ...(finder.submitted ? [{ label: 'Product recommendations' }] : []),
        ]}
      />
      <main>
        <FinderPanel finder={finder} onSubmit={onSubmit} />
        {finder.submitted && (
          <Results
            result={finder.result}
            highMileage={finder.highMileage}
            showBudgetLine={showBudgetLine}
            onSearchAgain={onSearchAgain}
          />
        )}
        <QuoteBlock
          sectionId="pricing"
          heading={['Priced by the case,', 'not by the litre']}
          lead="Send the grade and your monthly volume. Quotes go out the same business day."
          compact
        />
        <ContactBar id="help" headline="Vehicle not listed?" />
      </main>
      <SiteFooter page="finder" variant="compact" />
    </QuotePrefillProvider>
  )
}
