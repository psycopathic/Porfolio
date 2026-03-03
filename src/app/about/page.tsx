import Experience from '@/components/sections/experience'
import Skills from '@/components/sections/skills'

export default function About() {
  return (
    <div className="font-base">
      <h1 className="mb-8 text-2xl font-heading sm:text-4xl">About</h1>

      <div className="mb-10 text-base sm:text-lg">
        <p>
          Full Stack Developer building scalable web applications with a strong focus on performance, scalability, and user-friendly experiences. Experienced in shipping production-ready web applications using the MERN stack and Next.js, along with Node.js, React, and PostgreSQL.
        </p>
      </div>

      <Skills />

      <Experience />
    </div>
  )
}
