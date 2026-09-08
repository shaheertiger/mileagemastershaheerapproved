import { useEffect, useId, type FormEvent } from 'react'
import { site } from '../data/site'
import { useQuoteForm, useQuotePrefill, type QuoteFields } from '../lib/quote'
import { Button } from './Button'
import styles from './QuoteBlock.module.css'

interface QuoteBlockProps {
  /** Anchor for the surrounding section; the form card is always `#quote`. */
  sectionId: string
  heading: string[]
  lead: string
  /** The catalogue runs a slightly tighter version of the same block. */
  compact?: boolean
}

/**
 * "Request wholesale pricing" block: marketing column plus the working form.
 *
 * Used by both pages with different headline copy. Product cards can seed the
 * volume field through the prefill context and scroll the visitor here.
 */
export function QuoteBlock({ sectionId, heading, lead, compact = false }: QuoteBlockProps) {
  const form = useQuoteForm()
  const { details } = useQuotePrefill()
  const errorId = useId()

  // A product card can hand this form a product name after it has mounted.
  const setField = form.setField
  useEffect(() => {
    if (details) setField('details', details)
  }, [details, setField])

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    void form.submit()
  }

  const show = (field: keyof QuoteFields | 'contact') =>
    form.showErrors ? form.errors[field] : undefined

  return (
    <section
      id={sectionId}
      className={`mm-anchor ${styles.section} ${compact ? styles.compact : ''}`}
    >
      <div className={`mm-container ${styles.inner}`}>
        <div>
          <h2 className={styles.heading}>
            {heading.map((line, index) => (
              <span key={line}>
                {line}
                {index < heading.length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p className={styles.lead}>{lead}</p>
        </div>

        <div id="quote" className={styles.card}>
          <div className={styles.cardLabel}>REQUEST WHOLESALE PRICING</div>

          {form.status === 'sent' || form.status === 'handoff' ? (
            <div className={`${styles.status} ${styles.statusOk}`} role="status">
              <div className={styles.statusTitle}>
                {form.status === 'sent' ? 'Request received' : 'Ready to send'}
              </div>
              <p className={styles.statusBody}>
                {form.status === 'sent' ? (
                  <>
                    Thanks — we have your details. Quotes go out the same business day. Need it
                    sooner, call <a href={site.phoneHref}>{site.phone}</a>.
                  </>
                ) : (
                  <>
                    Your email app should have opened with the request filled in — send it to
                    finish. If nothing opened, email{' '}
                    <a href={form.fallbackHref}>{site.email}</a> or call{' '}
                    <a href={site.phoneHref}>{site.phone}</a>.
                  </>
                )}
              </p>
              <Button variant="ink" size="sm" onClick={form.reset}>
                SEND ANOTHER REQUEST
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <div className={styles.row}>
                <div>
                  <label className="mm-visually-hidden" htmlFor="quote-business">
                    Business name
                  </label>
                  <input
                    id="quote-business"
                    name="businessName"
                    className={`${styles.input} ${show('businessName') ? styles.inputError : ''}`}
                    placeholder="Business name"
                    autoComplete="organization"
                    value={form.fields.businessName}
                    onChange={(event) => form.setField('businessName', event.target.value)}
                    aria-invalid={show('businessName') ? true : undefined}
                    aria-describedby={show('businessName') ? `${errorId}-business` : undefined}
                  />
                  {show('businessName') && (
                    <p className={styles.error} id={`${errorId}-business`}>
                      {form.errors.businessName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mm-visually-hidden" htmlFor="quote-phone">
                    Phone
                  </label>
                  <input
                    id="quote-phone"
                    name="phone"
                    type="tel"
                    className={`${styles.input} ${show('phone') ? styles.inputError : ''}`}
                    placeholder="Phone"
                    autoComplete="tel"
                    value={form.fields.phone}
                    onChange={(event) => form.setField('phone', event.target.value)}
                    aria-invalid={show('phone') ? true : undefined}
                    aria-describedby={show('phone') ? `${errorId}-phone` : undefined}
                  />
                  {show('phone') && (
                    <p className={styles.error} id={`${errorId}-phone`}>
                      {form.errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className={styles.field}>
                <label className="mm-visually-hidden" htmlFor="quote-email">
                  Email
                </label>
                <input
                  id="quote-email"
                  name="email"
                  type="email"
                  className={`${styles.input} ${show('email') ? styles.inputError : ''}`}
                  placeholder="Email"
                  autoComplete="email"
                  value={form.fields.email}
                  onChange={(event) => form.setField('email', event.target.value)}
                  aria-invalid={show('email') ? true : undefined}
                  aria-describedby={show('email') ? `${errorId}-email` : undefined}
                />
                {show('email') && (
                  <p className={styles.error} id={`${errorId}-email`}>
                    {form.errors.email}
                  </p>
                )}
              </div>

              <div className={styles.field}>
                <label className="mm-visually-hidden" htmlFor="quote-details">
                  Grades and monthly volume
                </label>
                <input
                  id="quote-details"
                  name="details"
                  className={styles.input}
                  placeholder="Grades and monthly volume"
                  value={form.fields.details}
                  onChange={(event) => form.setField('details', event.target.value)}
                />
              </div>

              {show('contact') && (
                <p className={styles.error} role="alert">
                  {form.errors.contact}
                </p>
              )}

              <Button
                type="submit"
                variant="ink"
                size="lg"
                block
                disabled={form.status === 'submitting'}
              >
                {form.status === 'submitting' ? 'SENDING…' : 'SEND MY REQUEST'}
              </Button>

              {form.status === 'error' && (
                <p className={styles.error} role="alert">
                  That did not go through. Try again, or{' '}
                  <a href={form.fallbackHref}>email the request</a> to {site.email}.
                </p>
              )}

              <div className={styles.footnote}>
                Or call <a href={site.phoneHref}>{site.phone}</a> — quotes same business day.
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
