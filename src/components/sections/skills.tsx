import SKILLS from '@/data/skills'
import Rough from '@/components/rough'
import { slugify } from '@/lib/utils'

export default function Skills() {
  return (
    <section id="skills" className="mb-16 scroll-mt-32">
      <h2 className="font-heading mb-8 text-4xl sm:text-5xl">
        <span className="relative isolate inline-block px-1">
          <Rough
            shape="underline"
            stroke="var(--main)"
            strokeWidth={2.5}
            bowing={3}
            inset={-2}
          />
          Skills
        </span>
      </h2>

      <div className="flex flex-col gap-10">
        {SKILLS.map((item) => {
          return (
            <div
              key={item.field}
              id={`skills-${slugify(item.field)}`}
              className="scroll-mt-32"
            >
              <h3 className="mb-4 text-2xl font-bold sm:text-3xl">
                {item.field}
              </h3>

              <div className="flex flex-wrap gap-3">
                {item.skills.map((skill) => {
                  const Icon = skill.icon
                  return (
                    <div
                      key={skill.skill}
                      className="relative isolate flex items-center gap-2 px-3.5 py-2 transition-transform motion-safe:hover:-rotate-2"
                    >
                      <Rough
                        fill="var(--secondary-background)"
                        fillStyle="solid"
                        hoverFill="var(--main)"
                        roughness={0.9}
                        strokeWidth={1.4}
                        wiggle
                      />
                      <Icon className="size-5" title="" />
                      <span className="text-sm font-medium sm:text-base">
                        {skill.skill}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
