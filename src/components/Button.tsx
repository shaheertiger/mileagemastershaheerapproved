import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

export type ButtonVariant =
  | 'red'
  | 'redInvert'
  | 'redInk'
  | 'ink'
  | 'outline'
  | 'outlineGold'
  | 'onInk'
  | 'bone'

export type ButtonSize = 'xl' | 'lg' | 'md' | 'sm'

interface CommonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  block?: boolean
  className?: string
  children: ReactNode
}

type ActionProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }
type LinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

function classesFor(
  variant: ButtonVariant,
  size: ButtonSize,
  block: boolean,
  className?: string,
): string {
  return [styles.button, styles[variant], styles[size], block ? styles.block : '', className]
    .filter(Boolean)
    .join(' ')
}

/** Renders an `<a>` when given an href and a `<button>` otherwise. */
export function Button(props: ActionProps | LinkProps) {
  const { variant = 'red', size = 'md', block = false, className, children } = props

  if (props.href !== undefined) {
    const { variant: _v, size: _s, block: _b, className: _c, children: _ch, ...rest } = props
    return (
      <a {...rest} className={classesFor(variant, size, block, className)}>
        {children}
      </a>
    )
  }

  const { variant: _v, size: _s, block: _b, className: _c, children: _ch, href: _h, ...rest } = props
  return (
    <button {...rest} type={rest.type ?? 'button'} className={classesFor(variant, size, block, className)}>
      {children}
    </button>
  )
}
