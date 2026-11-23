import {
  type IconType,
  SiGithub,
  SiGmail,
  SiLinkedin,
} from '@icons-pack/react-simple-icons'

export const EMAIL = 'harshsrivastava0100@gmail.com'

const SOCIALS: { icon: IconType; label: string; href: string }[] = [
  { icon: SiGmail, label: 'Email', href: `mailto:${EMAIL}` },
  { icon: SiGithub, label: 'GitHub', href: 'https://github.com/psycopathic' },
  {
    icon: SiLinkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/harsh-shrivastava-476211252',
  },
]

export default SOCIALS
