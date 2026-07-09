import { Link } from 'next-view-transitions'
import Links from '@/components/links'

export default function Home() {
  return (
    <div className="font-base">
      <div className="animate-fade-in-up">
        <p className="text-main mb-3 text-sm font-bold uppercase tracking-widest sm:text-base">
          Full Stack Developer
        </p>
        <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl">
          Harsh Shrivastava
        </h1>
      </div>

      <div className="animate-fade-in-up delay-100 mt-8 text-base leading-relaxed sm:text-lg">
        <p>
          I build scalable web applications with a strong focus on performance,
          scalability, and user-friendly experiences. Experienced in shipping
          production-ready applications using the MERN stack and Next.js, along
          with Node.js, React, and PostgreSQL.
        </p>

        <p className="mt-4">
          This portfolio showcases my work, experience, and the projects
          I&apos;ve built. Feel free to explore my projects, check out my
          GitHub, or get in touch if you&apos;d like to collaborate on
          something interesting.
        </p>
      </div>

      <div className="animate-fade-in-up delay-200 mt-10 flex flex-wrap items-center gap-4">
        <Link
          className="border-border bg-main text-main-foreground shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY rounded-base border-2 px-6 py-3 text-center text-sm font-medium transition-all hover:shadow-none sm:text-base"
          href="/work"
        >
          View My Work
        </Link>
        <Link
          className="border-border bg-secondary-background text-foreground shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY rounded-base border-2 px-6 py-3 text-center text-sm font-medium transition-all hover:shadow-none sm:text-base"
          href="/about"
        >
          More About Me
        </Link>
      </div>

      <div className="animate-fade-in-up delay-300">
        <Links />
      </div>
    </div>
  )
}
