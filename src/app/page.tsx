import { Link } from 'next-view-transitions'
import Links from '@/components/links'
import Rough from '@/components/rough'
import { sketchButton } from '@/lib/sketch'
import { ShimmerText } from '@/components/rareui/shimmer-text'

export default function Home() {
  return (
    <div className="font-base">
      <div className="animate-fade-in-up">
        <p className="font-hand mb-2 -rotate-2 text-2xl font-bold sm:text-3xl">
          <ShimmerText>Full Stack Developer</ShimmerText>
        </p>
        <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl">
          <span className="relative isolate inline-block px-1">
            <Rough
              shape="highlight"
              fill="var(--main)"
              fillStyle="zigzag"
              hachureGap={5}
              roughness={1.5}
              inset={-4}
              seed={3}
            />
            Harsh Shrivastava
          </span>
        </h1>
      </div>

      <div className="animate-fade-in-up mt-8 text-base leading-relaxed delay-100 sm:text-lg">
        <p>
          I build scalable web applications with a strong focus on performance,
          scalability, and user-friendly experiences. Experienced in shipping
          production-ready applications using the MERN stack and Next.js, along
          with Node.js, React, and PostgreSQL.
        </p>

        <p className="mt-4">
          This portfolio showcases my work, experience, and the projects
          I&apos;ve built. Feel free to explore my projects, check out my
          GitHub, or get in touch if you&apos;d like to collaborate on something
          interesting.
        </p>
      </div>

      <div className="animate-fade-in-up mt-10 flex flex-wrap items-center gap-4 delay-200">
        <Link className={sketchButton} href="/work">
          <Rough fill="var(--main)" strokeWidth={2} wiggle />
          View My Work
        </Link>
        <Link
          className={`${sketchButton} hover:text-main-foreground focus-visible:text-main-foreground`}
          href="/about"
        >
          <Rough
            fill="var(--secondary-background)"
            fillStyle="solid"
            hoverFill="var(--main)"
            wiggle
          />
          More About Me
        </Link>
      </div>

      <div className="animate-fade-in-up delay-300">
        <Links />
      </div>
    </div>
  )
}
