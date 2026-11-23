/**
 * ShimmerText — adapted from RareUI (src/components/edge-stepper/ShimmerText.tsx).
 * Colours come from props so it can shimmer between any two theme tokens.
 */

import { cn } from '@/lib/utils'

export function ShimmerText({
  children,
  className,
  base = 'var(--main)',
  highlight = 'var(--foreground)',
}: {
  children: string
  className?: string
  base?: string
  highlight?: string
}) {
  return (
    <span
      className={cn('rare-shimmer bg-clip-text text-transparent', className)}
      style={{
        backgroundImage: `linear-gradient(90deg, ${base} 35%, ${highlight} 50%, ${base} 65%)`,
      }}
    >
      {children}
    </span>
  )
}
