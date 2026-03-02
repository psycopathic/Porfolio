import Links from '@/components/links'

export default function Home() {
  return (
    <div className="font-base">
      <h1 className="font-heading text-2xl sm:text-4xl">Harsh Shrivastava</h1>
      <p className="mt-2 text-lg sm:text-xl">Full Stack Software Engineer</p>
      <div className="mt-8 text-base sm:text-lg">
        <p>
          Results-driven Full Stack Software Engineer with hands-on experience designing and shipping scalable web applications using Node.js, React, Next.js, and PostgreSQL. Experienced in integrating AI/ML APIs (OpenAI, Gemini, Vosk STT) and deploying containerized microservices via Docker and CI/CD pipelines.
        </p>

        <br />

        <p>
          Published researcher in AI-driven systems with strong foundations in DSA, OOP, and system design. Solved 250+ LeetCode problems and adept at using modern tooling to accelerate development cycles and deliver production-ready features.
        </p>

        <br />

        <p>
          I specialize in building modern web applications with cutting-edge technologies, creating seamless user experiences, and solving complex technical challenges. My focus is on writing clean, scalable code and staying updated with the latest industry trends.
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
