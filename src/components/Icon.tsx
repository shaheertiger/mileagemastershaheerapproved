type IconName =
  | 'phone'
  | 'mail'
  | 'check'
  | 'star'
  | 'chevron'
  | 'menu'
  | 'close'
  | 'arrow-right'

interface IconProps {
  name: IconName
  size?: number
  className?: string
}

/**
 * The design specifies Unicode glyphs (✆ ✉ ✓ ★ ▾); these are the drawn
 * equivalents so weight and alignment stay consistent across platforms.
 */
const PATHS: Record<IconName, JSX.Element> = {
  phone: (
    <path d="M6.6 10.8a11.4 11.4 0 0 0 4.6 4.6l1.5-1.5a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V17a1 1 0 0 1-1 1A14 14 0 0 1 4 4a1 1 0 0 1 1-1h1.8a1 1 0 0 1 1 1c0 1.24.2 2.45.58 3.6a1 1 0 0 1-.25 1z" />
  ),
  mail: (
    <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1m1 2.2V17h16V7.2l-8 5.3z" />
  ),
  check: <path d="M9.2 16.4 4.8 12l1.5-1.5 2.9 2.9 7.5-7.5L18.2 7z" />,
  star: <path d="m12 3.6 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8L3.6 9.7l5.8-.8z" />,
  chevron: <path d="m12 15.4-5.2-5.2 1.4-1.4L12 12.6l3.8-3.8 1.4 1.4z" />,
  menu: <path d="M3 6h18v2.2H3zm0 5h18v2.2H3zm0 5h18v2.2H3z" />,
  close: <path d="M18.3 7.1 13.4 12l4.9 4.9-1.4 1.4-4.9-4.9-4.9 4.9-1.4-1.4 4.9-4.9-4.9-4.9 1.4-1.4 4.9 4.9 4.9-4.9z" />,
  'arrow-right': <path d="M13.2 5.6 19.6 12l-6.4 6.4-1.5-1.5 3.9-3.9H4.4v-2h11.2l-3.9-3.9z" />,
}

export function Icon({ name, size = 16, className }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  )
}
