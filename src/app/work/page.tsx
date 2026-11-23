import PROJECTS from '@/data/projects'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ExternalLink, Github } from 'lucide-react'
import Rough from '@/components/rough'
import { sketchButton } from '@/lib/sketch'
import { slugify } from '@/lib/utils'
import { EdgeStepper } from '@/components/rareui/edge-stepper'

export default function Work() {
  return (
    <div>
      <EdgeStepper
        items={[
          { id: 'work', label: 'Work', depth: 0 },
          ...PROJECTS.map((p) => ({
            id: slugify(p.name),
            label: p.name,
            depth: 1,
          })),
        ]}
      />
      <div id="work" className="mb-10 scroll-mt-32">
        <h1 className="font-heading text-5xl sm:text-6xl">
          <span className="relative isolate inline-block px-1">
            <Rough
              shape="underline"
              stroke="var(--main)"
              strokeWidth={3}
              bowing={4}
              inset={-4}
            />
            Work
          </span>
        </h1>
        <p className="mt-3 text-base opacity-80 sm:text-lg">
          A selection of projects I&apos;ve built, from real-time chat apps to
          voice-controlled experiences.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {PROJECTS.map((project) => {
          return (
            <article
              className="group relative isolate scroll-mt-32 p-3 sm:p-4"
              id={slugify(project.name)}
              key={project.name}
            >
              <Rough
                fill="var(--secondary-background)"
                fillStyle="solid"
                roughness={1.6}
                strokeWidth={2}
              />
              <div className="relative isolate p-1.5">
                <Rough roughness={1.2} inset={0} />
                <AspectRatio className="overflow-hidden" ratio={16 / 9}>
                  <img
                    className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                    src={project.previewImage}
                    alt={project.name}
                  />
                </AspectRatio>
              </div>

              <div className="p-2 pt-5 sm:p-3 sm:pt-6">
                <h2 className="font-heading text-3xl sm:text-4xl">
                  {project.name}
                </h2>

                <p className="mt-3 text-base leading-relaxed">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="relative isolate px-3 py-1 text-xs font-medium sm:text-sm"
                    >
                      <Rough
                        fill="var(--main)"
                        fillStyle="cross-hatch"
                        hachureGap={5}
                        fillWeight={0.8}
                        roughness={0.8}
                        strokeWidth={1.2}
                        inset={1}
                      />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <a
                    className={`${sketchButton} px-4`}
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Rough hoverFill="var(--main)" wiggle />
                    <ExternalLink className="size-4" />
                    Visit
                  </a>
                  <a
                    className={`${sketchButton} px-4`}
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Rough hoverFill="var(--main)" wiggle />
                    <Github className="size-4" />
                    GitHub
                  </a>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
