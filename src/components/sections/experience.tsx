import PAST_ROLES from '@/data/experience'
import Rough from '@/components/rough'
import { slugify } from '@/lib/utils'

export default function Experience() {
  return (
    <section id="experience" className="mb-16 scroll-mt-32">
      <h2 className="font-heading mb-8 text-4xl sm:text-5xl">
        <span className="relative isolate inline-block px-1">
          <Rough
            shape="underline"
            stroke="var(--main)"
            strokeWidth={2.5}
            bowing={3}
            inset={-2}
          />
          Experience
        </span>
      </h2>

      <div className="relative ml-1 pl-8 sm:ml-2 sm:pl-10">
        <span className="absolute inset-y-0 left-0 isolate w-1">
          <Rough shape="vline" roughness={1.5} bowing={2} strokeWidth={2} />
        </span>
        {PAST_ROLES.map((role) => {
          return (
            <div
              className="relative mb-10 scroll-mt-32 last:mb-0"
              id={`role-${slugify(role.company)}`}
              key={role.company}
            >
              <span className="absolute top-1.5 -left-[42px] isolate size-6 sm:-left-[52px] sm:size-7">
                <Rough
                  shape="ellipse"
                  fill="var(--main)"
                  fillStyle="solid"
                  roughness={1}
                />
              </span>

              <div className="relative isolate p-5 sm:p-6">
                <Rough
                  fill="var(--secondary-background)"
                  fillStyle="solid"
                  roughness={1.4}
                />
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                  <h3 className="text-2xl font-bold sm:text-3xl">
                    {role.role} @ {role.company}
                  </h3>
                  <p className="text-sm opacity-70">
                    {role.startDate} - {role.endDate}
                  </p>
                </div>

                <p className="mt-4 leading-relaxed">{role.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
