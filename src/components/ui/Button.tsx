import { cn } from '@/lib/utils'
import Link from 'next/link'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
  'aria-label'?: string
}

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  disabled,
  className,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const base = 'inline-flex items-center font-mono-arch text-[0.65rem] tracking-[0.1em] uppercase transition-all duration-200 px-5 py-3 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-[#C4673A] text-[#F8F7F4] hover:bg-[#B35A30]',
    secondary: 'border border-[#C4673A] text-[#C4673A] hover:bg-[#C4673A] hover:text-[#F8F7F4]',
    ghost: 'text-[#8A8880] hover:text-[#111111]',
  }

  if (href) {
    return (
      <Link href={href} className={cn(base, variants[variant], className)} aria-label={ariaLabel}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(base, variants[variant], className)}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
