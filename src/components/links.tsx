import {
  IconType,
  SiGithub,
  SiGmail,
  SiLinkedin,
} from '@icons-pack/react-simple-icons'

interface SocialLink {
  icon: IconType
  label: string
  href: string
}

const links: SocialLink[] = [
  {
    icon: SiGmail,
    label: 'Email',
    href: 'mailto:harshsrivastava0100@gmail.com',
  },
  {
    icon: SiGithub,
    label: 'GitHub',
    href: 'https://github.com/psycopathic',
  },
  {
    icon: SiLinkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/harsh-shrivastava-476211252',
  },
]

export default function Links() {
  return (
    <div className="mt-16 flex flex-wrap items-center gap-4 sm:gap-6">
      {links.map((link) => {
        const Icon = link.icon
        return (
          <a
            key={link.label}
            className="border-border bg-secondary-background text-foreground shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY rounded-base group flex items-center gap-3 border-2 px-4 py-2.5 text-sm font-medium transition-all hover:shadow-none sm:text-base"
            href={link.href}
            target={link.href.startsWith('mailto') ? undefined : '_blank'}
            rel={link.href.startsWith('mailto') ? undefined : 'noreferrer'}
          >
            <Icon
              className="size-5 transition-transform group-hover:scale-110"
              title=""
            />
            <span>{link.label}</span>
          </a>
        )
      })}
    </div>
  )
}
