import {
  type IconType,
  SiCplusplus,
  SiDocker,
  SiGit,
  SiGithub,
  SiGooglegemini,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiWebassembly,
} from '@icons-pack/react-simple-icons'

const SKILLS: { field: string; skills: { skill: string; icon: IconType }[] }[] =
  [
    {
      field: 'Languages',
      skills: [
        { skill: 'C++', icon: SiCplusplus },
        { skill: 'JavaScript', icon: SiJavascript },
        { skill: 'TypeScript', icon: SiTypescript },
        { skill: 'SQL', icon: SiPostgresql },
      ],
    },
    {
      field: 'Frontend',
      skills: [
        { skill: 'React.js', icon: SiReact },
        { skill: 'Next.js', icon: SiNextdotjs },
        { skill: 'Tailwind CSS', icon: SiTailwindcss },
      ],
    },
    {
      field: 'Backend',
      skills: [
        { skill: 'Node.js', icon: SiNodedotjs },
        { skill: 'Express.js', icon: SiNodedotjs },
        { skill: 'Prisma', icon: SiPrisma },
      ],
    },
    {
      field: 'AI / Voice',
      skills: [
        { skill: 'OpenAI API', icon: SiOpenai },
        { skill: 'Gemini API', icon: SiGooglegemini },
        { skill: 'Vosk STT', icon: SiWebassembly },
      ],
    },
    {
      field: 'Databases',
      skills: [
        { skill: 'MongoDB', icon: SiMongodb },
        { skill: 'PostgreSQL', icon: SiPostgresql },
        { skill: 'Supabase', icon: SiSupabase },
      ],
    },
    {
      field: 'DevOps & Tools',
      skills: [
        { skill: 'Git', icon: SiGit },
        { skill: 'Docker', icon: SiDocker },
        { skill: 'GitHub Actions', icon: SiGithub },
        { skill: 'Vercel', icon: SiVercel },
      ],
    },
  ]

export default SKILLS
