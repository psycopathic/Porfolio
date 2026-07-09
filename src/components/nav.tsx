'use client'

import { Link } from 'next-view-transitions'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ThemeSwitcher } from './theme-switcher'

const links = [
  { path: '/', text: 'Home' },
  { path: '/about', text: 'About' },
  { path: '/work', text: 'Work' },
]

export default function Nav() {
  const path = usePathname()

  return (
    <div className="fixed top-4 left-0 z-50 w-full px-4 sm:top-6">
      <nav className="text-main-foreground border-border shadow-shadow rounded-base bg-main font-base mx-auto flex w-max max-w-full items-center gap-1 border-2 p-1.5 sm:gap-2 sm:p-2">
        {links.map((link) => (
          <Link
            key={link.path}
            className={cn(
              'rounded-base border-2 px-3 py-1.5 text-sm font-medium transition-all sm:px-4 sm:text-base',
              path === link.path
                ? 'border-border bg-secondary-background text-foreground shadow-shadow-sm'
                : 'border-transparent hover:border-border hover:bg-secondary-background/20',
            )}
            href={link.path}
          >
            {link.text}
          </Link>
        ))}
        <div className="border-border ml-1 border-l pl-1 sm:ml-2 sm:pl-2">
          <ThemeSwitcher />
        </div>
      </nav>
    </div>
  )
}
