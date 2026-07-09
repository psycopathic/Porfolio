import Experience from '@/components/sections/experience'
import Skills from '@/components/sections/skills'

export default function About() {
  return (
    <div className="font-base">
      <div className="mb-10">
        <h1 className="font-heading text-3xl sm:text-4xl">About</h1>
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
