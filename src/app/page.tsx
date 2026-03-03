import Links from '@/components/links'

export default function Home() {
  return (
    <div className="font-base">
      <h1 className="font-heading text-2xl sm:text-4xl">Harsh Shrivastava</h1>
      <p className="mt-2 text-lg sm:text-xl">Full Stack Developer</p>
      <div className="mt-8 text-base sm:text-lg">
        <p>
          Full Stack Developer building scalable web applications with a strong focus on performance, scalability, and user-friendly experiences. Experienced in shipping production-ready web applications using the MERN stack and Next.js, along with Node.js, React, and PostgreSQL.
        </p>

        <br />

        <p>
          This portfolio showcases my work, experience, and the projects I&apos;ve built. Feel free to explore my projects, check out my GitHub, or get in touch if you&apos;d like to collaborate on something interesting.
        </p>
      </div>

      <Links />
    </div>
  )
}
