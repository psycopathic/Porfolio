'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import Rough from './rough'

export function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className="text-foreground relative isolate flex size-9 items-center justify-center sm:size-10"
        aria-label="Toggle theme"
      >
        <span className="size-4 sm:size-5" />
      </button>
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      className="text-foreground relative isolate flex size-9 cursor-pointer items-center justify-center transition-transform motion-safe:hover:rotate-12 sm:size-10"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <Rough
        shape="ellipse"
        hoverFill="var(--main)"
        fillStyle="hachure"
        hachureGap={4}
        wiggle
      />
      <Sun className="hidden size-4 sm:size-5 dark:block" />
      <Moon className="block size-4 sm:size-5 dark:hidden" />
    </button>
  )
}
