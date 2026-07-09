import SKILLS from '@/data/skills'

export default function Skills() {
  return (
    <section className="mb-16">
      <h2 className="font-heading mb-8 text-2xl sm:text-3xl">Skills</h2>

      <div className="flex flex-col gap-10">
        {SKILLS.map((item) => {
          return (
            <div key={item.field}>
              <h3 className="mb-4 text-lg font-bold sm:text-xl">
                {item.field}
              </h3>

              <div className="flex flex-wrap gap-3">
                {item.skills.map((skill) => {
                  const Icon = skill.icon
                  return (
                    <div
                      key={skill.skill}
                      className="border-border bg-secondary-background shadow-shadow-sm rounded-base flex items-center gap-2 border-2 px-3 py-2 transition-transform hover:-translate-y-0.5"
                    >
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
