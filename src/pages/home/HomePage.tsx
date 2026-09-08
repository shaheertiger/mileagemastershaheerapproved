import { ContactBar } from '../../components/ContactBar'
import { QuoteBlock } from '../../components/QuoteBlock'
import { SiteFooter } from '../../components/SiteFooter'
import { SiteHeader } from '../../components/SiteHeader'
import { UtilityBar } from '../../components/UtilityBar'
import { QuotePrefillProvider } from '../../lib/quote'
import { Approvals } from './sections/Approvals'
import { FinderStrip } from './sections/FinderStrip'
import { GradeSelector } from './sections/GradeSelector'
import { Hero } from './sections/Hero'
import { MadeInEurope } from './sections/MadeInEurope'
import { MobileShowcase } from './sections/MobileShowcase'
import { Testimonials } from './sections/Testimonials'

export interface HomePageProps {
  /** Section toggles carried over from the design's component props. */
  showTestimonials?: boolean
  showOrderBar?: boolean
  showMobileShowcase?: boolean
}

export function HomePage({
  showTestimonials = true,
  showOrderBar = true,
  showMobileShowcase = true,
}: HomePageProps) {
  return (
    <QuotePrefillProvider>
      <UtilityBar />
      <SiteHeader page="home" />
      <main>
        <Hero />
        <FinderStrip />
        <GradeSelector />
        <MadeInEurope />
        <Approvals />
        {showTestimonials && <Testimonials />}
        <QuoteBlock
          sectionId="dealers"
          heading={['Become a', 'Mileage Master dealer']}
          lead="Territory pricing, pallet programs and counter display kits for shops, jobbers and installers across Ontario."
        />
        {showOrderBar && <ContactBar headline="Order today" />}
        {showMobileShowcase && <MobileShowcase />}
      </main>
      <SiteFooter page="home" />
    </QuotePrefillProvider>
  )
}
