import { Copy } from 'lucide-react'
import Rough from '@/components/rough'
import { ActionButton } from '@/components/rareui/action-button'
import SOCIALS, { EMAIL } from '@/data/socials'
import { sketchButton } from '@/lib/sketch'

export default function Links() {
  return (
    <div className="mt-16 flex flex-wrap items-center gap-4 sm:gap-6">
      {SOCIALS.map((link) => {
        const Icon = link.icon
        return (
          <a
            key={link.label}
            className={`${sketchButton} group hover:text-main-foreground focus-visible:text-main-foreground px-5`}
            href={link.href}
            target={link.href.startsWith('mailto') ? undefined : '_blank'}
            rel={link.href.startsWith('mailto') ? undefined : 'noreferrer'}
          >
            <Rough
              fill="var(--secondary-background)"
              fillStyle="solid"
              hoverFill="var(--main)"
              wiggle
            />
            <Icon
              className="size-5 transition-transform group-hover:scale-110"
              title=""
            />
            <span>{link.label}</span>
          </a>
        )
      })}
      <ActionButton
        label="Copy email address"
        copyText={EMAIL}
        icon={<Copy className="size-5" />}
        className="size-12"
      />
    </div>
  )
}
