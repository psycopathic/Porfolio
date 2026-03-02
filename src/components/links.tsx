import {
  IconType,
  SiGithub,
  SiGmail,
  SiLinkedin,
  SiMedium,
} from '@icons-pack/react-simple-icons'

export default function Links() {
  const links: { icon: IconType; href: string }[] = [
    {
      icon: SiGmail,
      href: 'harshsrivastava0100@gmail.com',
    },
    {
      icon: SiGithub,
      href: 'https://github.com/psycopathic',
    },
    {
      icon: SiLinkedin,
      href: 'https://www.linkedin.com/in/harsh-shrivastava-476211252',
    },
  ]

  return (
    <div className="mr-auto mt-20 flex w-full flex-wrap items-center gap-10">
      {links.map((link, id) => {
        return (
          <a target="_blank" key={id} href={link.href}>
            <link.icon title="" />
          </a>
        )
      })}
    </div>
  )
}
