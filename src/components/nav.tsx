'use client'

import { Link } from 'next-view-transitions'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Rough from './rough'
import { ThemeSwitcher } from './theme-switcher'
import { SiteCommandPalette } from './site-command-palette'
import { AppearanceMenu } from './appearance'

const links = [
  { path: '/', text: 'Home' },
  { path: '/about', text: 'About' },
  { path: '/work', text: 'Work' },
]

export default function Nav() {
  const path = usePathname()

  return (
    <div className="fixed top-4 left-0 z-50 w-full px-4 sm:top-6">
      <nav className="font-hand text-foreground relative isolate mx-auto flex w-max max-w-full items-center gap-1 px-3 py-2 sm:gap-3 sm:px-4">
        <Rough
          fill="var(--secondary-background)"
          fillStyle="solid"
          roughness={1.5}
          seed={7}
        />
        {links.map((link) => {
          const active = path === link.path
          return (
            <Link
              key={link.path}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'group relative isolate px-2 py-1 text-xl transition-transform sm:px-4 sm:text-2xl',
                active ? 'font-bold' : 'motion-safe:hover:-rotate-2',
              )}
              href={link.path}
            >
              {active ? (
                <Rough
                  shape="ellipse"
                  stroke="var(--main)"
                  strokeWidth={2.2}
                  roughness={1.8}
                  inset={-3}
                />
              ) : (
                <Rough
                  shape="underline"
                  stroke="var(--main)"
                  inset={8}
                  wiggle
                  className="opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                />
              )}
              {link.text}
            </Link>
          )
        })}
        <span className="relative isolate mx-0.5 h-8 w-2 sm:mx-2">
          <Rough shape="vline" roughness={1} />
        </span>
        <SiteCommandPalette className="text-foreground relative isolate flex h-9 cursor-pointer items-center justify-center gap-2 px-2.5 font-sans transition-transform motion-safe:hover:-rotate-3 sm:h-10 sm:px-3" />
        <AppearanceMenu className="text-foreground flex size-9 cursor-pointer items-center justify-center transition-transform motion-safe:hover:rotate-12 sm:size-10" />
        <ThemeSwitcher />
      </nav>
    </div>
  )
}
