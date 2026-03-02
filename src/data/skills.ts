import {
  type IconType,
  SiAstro,
  SiBootstrap,
  SiCplusplus,
  SiCss3,
  SiDocker,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiRubyonrails,
  SiSass,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from '@icons-pack/react-simple-icons'

const SKILLS: { field: string; skills: { skill: string; icon: IconType }[] }[] =
  [
    {
      field: 'Languages',
      skills: [
        { skill: 'c++', icon: SiCplusplus },
        { skill: 'javascript', icon: SiJavascript },
        { skill: 'typescript', icon: SiTypescript },
      ],
    },
    {
      field: 'Frontend',
      skills: [
        { skill: 'react', icon: SiReact },
        { skill: 'nextjs', icon: SiNextdotjs },
        { skill: 'tailwind', icon: SiTailwindcss },
        { skill: 'html', icon: SiHtml5 },
        { skill: 'css', icon: SiCss3 },
      ],
    },
    {
      field: 'Backend',
      skills: [
        {
          skill: 'nodejs',
          icon: SiNodedotjs,
        },
        {
          skill: 'express',
          icon: SiNodedotjs,
        },
        {
          skill: 'postgresql',
          icon: SiPostgresql,
        },
        {
          skill: 'mongodb',
          icon: SiMongodb,
        },
      ],
    },
    {
      field: 'DevOps & Tools',
      skills: [
        { skill: 'docker', icon: SiDocker },
        { skill: 'github actions', icon: SiGithub },
        { skill: 'git', icon: SiGit },
        { skill: 'vercel', icon: SiVercel },
      ],
    },
  ]

export default SKILLS
