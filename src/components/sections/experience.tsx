import PAST_ROLES from '@/data/experience'

export default function Experience() {
  return (
    <section className="mb-16">
      <h2 className="font-heading mb-8 text-2xl sm:text-3xl">Experience</h2>

      <div className="border-border relative ml-1 border-l-2 pl-8 sm:ml-2 sm:pl-10">
        {PAST_ROLES.map((role) => {
          return (
            <div className="relative mb-10 last:mb-0" key={role.company}>
              <span className="border-border bg-main absolute -left-[39px] top-1.5 size-5 rounded-full border-2 sm:-left-[49px] sm:size-6" />

              <div className="border-border bg-secondary-background shadow-shadow-sm rounded-base border-2 p-5 sm:p-6">
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                  <h3 className="text-lg font-bold sm:text-xl">
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
