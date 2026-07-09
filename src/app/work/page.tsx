import PROJECTS from '@/data/projects'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ExternalLink, Github } from 'lucide-react'

export default function Work() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="font-heading text-3xl sm:text-4xl">Work</h1>
        <p className="mt-3 text-base opacity-80 sm:text-lg">
          A selection of projects I&apos;ve built, from real-time chat apps to
          voice-controlled experiences.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {PROJECTS.map((project) => {
          return (
            <article
              className="border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY rounded-base bg-secondary-background group overflow-hidden border-2 transition-all hover:shadow-none"
              key={project.name}
            >
              <AspectRatio
                className="border-border border-b-2"
                ratio={16 / 9}
              >
                <img
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={project.previewImage}
                  alt={project.name}
                />
              </AspectRatio>

              <div className="p-5 sm:p-6">
                <h2 className="font-heading text-xl sm:text-2xl">
                  {project.name}
                </h2>

                <p className="mt-3 text-base leading-relaxed">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-main text-main-foreground rounded-base px-2.5 py-1 text-xs font-medium sm:text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <a
                    className="border-border bg-background text-foreground shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY rounded-base font-base flex items-center justify-center gap-2 border-2 px-4 py-2.5 text-center text-sm font-medium transition-all hover:shadow-none sm:text-base"
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLink className="size-4" />
                    Visit
                  </a>
                  <a
                    className="border-border bg-background text-foreground shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY rounded-base font-base flex items-center justify-center gap-2 border-2 px-4 py-2.5 text-center text-sm font-medium transition-all hover:shadow-none sm:text-base"
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
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
