'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className="border-border bg-secondary-background text-foreground shadow-shadow-sm rounded-base flex size-8 items-center justify-center border-2 sm:size-10"
        aria-label="Toggle theme"
      >
        <span className="size-4 sm:size-5" />
      </button>
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      className="border-border bg-secondary-background text-foreground shadow-shadow-sm rounded-base hover:translate-x-boxShadowX hover:translate-y-boxShadowY flex size-8 cursor-pointer items-center justify-center border-2 transition-all hover:shadow-none sm:size-10"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <Sun className="hidden size-4 sm:size-5 dark:block" />
      <Moon className="block size-4 sm:size-5 dark:hidden" />
    </button>
  )
}
