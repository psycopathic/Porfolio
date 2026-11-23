import Experience from '@/components/sections/experience'
import Skills from '@/components/sections/skills'
import Rough from '@/components/rough'
import { EdgeStepper } from '@/components/rareui/edge-stepper'
import SKILLS from '@/data/skills'
import PAST_ROLES from '@/data/experience'
import { slugify } from '@/lib/utils'

export default function About() {
  return (
    <div className="font-base">
      <EdgeStepper
        items={[
          { id: 'about', label: 'About', depth: 0 },
          { id: 'skills', label: 'Skills', depth: 0 },
          ...SKILLS.map((s) => ({
            id: `skills-${slugify(s.field)}`,
            label: s.field,
            depth: 1,
          })),
          { id: 'experience', label: 'Experience', depth: 0 },
          ...PAST_ROLES.map((r) => ({
            id: `role-${slugify(r.company)}`,
            label: r.company,
            depth: 1,
          })),
        ]}
      />
      <div id="about" className="mb-10 scroll-mt-32">
        <h1 className="font-heading text-5xl sm:text-6xl">
          <span className="relative isolate inline-block px-1">
            <Rough
              shape="underline"
              stroke="var(--main)"
              strokeWidth={3}
              bowing={4}
              inset={-4}
            />
            About
          </span>
        </h1>
        <p className="mt-3 text-base opacity-80 sm:text-lg">
          A little more about who I am and what I do.
        </p>
      </div>

      <section className="mb-16">
        <p className="text-base leading-relaxed sm:text-lg">
          Full Stack Developer building scalable web applications with a strong
          focus on performance, scalability, and user-friendly experiences.
          Experienced in shipping production-ready web applications using the
          MERN stack and Next.js, along with Node.js, React, and PostgreSQL.
        </p>
      </section>

      <Skills />

      <Experience />
    </div>
  )
}
