import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { site } from '../data/site'

/**
 * Wholesale pricing request: validation, submission and cross-page prefill.
 *
 * Submission target is configured with `VITE_QUOTE_ENDPOINT` (any URL that
 * accepts a JSON POST — a form service, a Lambda, the CRM's webhook). With no
 * endpoint configured the form falls back to opening a pre-filled email to the
 * orders desk, so the request is never silently dropped.
 */

const ENDPOINT = import.meta.env.VITE_QUOTE_ENDPOINT as string | undefined

export interface QuoteFields {
  businessName: string
  phone: string
  email: string
  details: string
}

export type QuoteErrors = Partial<Record<keyof QuoteFields | 'contact', string>>

export type QuoteStatus = 'idle' | 'submitting' | 'sent' | 'handoff' | 'error'

const EMPTY: QuoteFields = { businessName: '', phone: '', email: '', details: '' }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validate(fields: QuoteFields): QuoteErrors {
  const errors: QuoteErrors = {}

  if (!fields.businessName.trim()) {
    errors.businessName = 'Tell us the business name so we can price the account.'
  }

  const hasPhone = fields.phone.trim().length > 0
  const hasEmail = fields.email.trim().length > 0

  if (!hasPhone && !hasEmail) {
    errors.contact = 'Add a phone number or an email address so we can send the quote.'
  }

  if (hasEmail && !EMAIL_PATTERN.test(fields.email.trim())) {
    errors.email = 'That email address does not look right.'
  }

  if (hasPhone && fields.phone.replace(/\D/g, '').length < 10) {
    errors.phone = 'Enter a 10-digit phone number.'
  }

  return errors
}

function mailtoUrl(fields: QuoteFields): string {
  const body = [
    `Business name: ${fields.businessName}`,
    `Phone: ${fields.phone || '—'}`,
    `Email: ${fields.email || '—'}`,
    '',
    'Grades and monthly volume:',
    fields.details || '—',
  ].join('\n')

  const query = new URLSearchParams({
    subject: `Wholesale pricing request — ${fields.businessName}`,
    body,
  })
  return `mailto:${site.email}?${query.toString()}`
}

export interface QuoteForm {
  fields: QuoteFields
  errors: QuoteErrors
  status: QuoteStatus
  /** True once a submit has been attempted, which is when errors become visible. */
  showErrors: boolean
  setField: (name: keyof QuoteFields, value: string) => void
  submit: () => Promise<void>
  reset: () => void
  /** The mailto fallback, offered whenever a network submission fails. */
  fallbackHref: string
}

export function useQuoteForm(initialDetails = ''): QuoteForm {
  const [fields, setFields] = useState<QuoteFields>({ ...EMPTY, details: initialDetails })
  const [status, setStatus] = useState<QuoteStatus>('idle')
  const [showErrors, setShowErrors] = useState(false)

  const errors = useMemo(() => validate(fields), [fields])

  const setField = useCallback((name: keyof QuoteFields, value: string) => {
    setFields((previous) => ({ ...previous, [name]: value }))
    setStatus((previous) => (previous === 'error' ? 'idle' : previous))
  }, [])

  const submit = useCallback(async () => {
    setShowErrors(true)
    if (Object.keys(validate(fields)).length > 0) return

    if (!ENDPOINT) {
      // No endpoint wired up yet — hand the request to the user's mail client
      // rather than pretending it was delivered.
      window.location.href = mailtoUrl(fields)
      setStatus('handoff')
      return
    }

    setStatus('submitting')
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, source: 'mileagemaster.ca' }),
      })
      setStatus(response.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }, [fields])

  const reset = useCallback(() => {
    setFields({ ...EMPTY })
    setStatus('idle')
    setShowErrors(false)
  }, [])

  return {
    fields,
    errors,
    status,
    showErrors,
    setField,
    submit,
    reset,
    fallbackHref: mailtoUrl(fields),
  }
}

/* -------------------------------------------------------------------------- */
/* Prefill: product cards seed the form and scroll to it.                      */
/* -------------------------------------------------------------------------- */

interface QuotePrefillValue {
  details: string
  requestQuote: (subject: string) => void
}

const QuotePrefillContext = createContext<QuotePrefillValue>({
  details: '',
  requestQuote: () => {},
})

export function QuotePrefillProvider({ children }: { children: ReactNode }) {
  const [details, setDetails] = useState('')

  const requestQuote = useCallback((subject: string) => {
    setDetails(subject)
    document.getElementById('quote')?.scrollIntoView({ block: 'center' })
    // Focus the first field so keyboard and screen-reader users land in the form.
    window.setTimeout(() => document.getElementById('quote-business')?.focus(), 0)
  }, [])

  const value = useMemo(() => ({ details, requestQuote }), [details, requestQuote])

  return <QuotePrefillContext.Provider value={value}>{children}</QuotePrefillContext.Provider>
}

export function useQuotePrefill(): QuotePrefillValue {
  return useContext(QuotePrefillContext)
}
