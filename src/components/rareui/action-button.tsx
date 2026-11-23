'use client'

/**
 * ActionButton — adapted from RareUI (src/components/ui/ActionButton.tsx).
 * Shows a check for 1.5s after a successful copy.
 */

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ActionButton({
  label,
  icon,
  copyText,
  onClick,
  className,
}: {
  label: string
  icon: ReactNode
  /** When set, clicking copies this text to the clipboard. */
  copyText?: string
  onClick?: () => void
  className?: string
}) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const handleClick = useCallback(async () => {
    onClick?.()
    if (copyText === undefined) return
    try {
      await navigator.clipboard.writeText(copyText)
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard blocked (insecure context or denied): leave state unchanged.
    }
  }, [copyText, onClick])

  return (
    <button
      type="button"
      aria-label={copied ? 'Copied!' : label}
      title={copied ? 'Copied!' : label}
      onClick={handleClick}
      className={cn(
        'rounded-control bg-surface shadow-btn flex size-9 cursor-pointer items-center justify-center transition-colors duration-100',
        copied ? 'text-main' : 'text-ink-2 hover:bg-hover hover:text-ink',
        className,
      )}
    >
      {copied ? <Check className="size-4" /> : icon}
      <span className="sr-only" aria-live="polite">
        {copied ? 'Copied to clipboard' : ''}
      </span>
    </button>
  )
}
