import Experience from '@/components/sections/experience'
import Skills from '@/components/sections/skills'

export default function About() {
  return (
    <div className="font-base">
      <h1 className="mb-8 text-2xl font-heading sm:text-4xl">About</h1>

      <div className="mb-10 text-base sm:text-lg">
        <p>
          Results-driven Full Stack Software Engineer with hands-on experience designing and shipping scalable web applications using Node.js, React, Next.js, and PostgreSQL. Experienced in integrating AI/ML APIs (OpenAI, Gemini, Vosk STT) and deploying containerized microservices via Docker and CI/CD pipelines.
        </p>

        <br />

        <p>
          Published researcher in AI-driven systems with strong foundations in DSA, OOP, and system design. Solved 250+ LeetCode problems and adept at using modern tooling to accelerate development cycles and deliver production-ready features. I&apos;m passionate about building scalable, user-centric solutions and staying updated with the latest industry trends.
        </p>
      </div>

      <Skills />

      <Experience />
    </div>
  )
}
