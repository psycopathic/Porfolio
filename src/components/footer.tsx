import Rough from './rough'

export default function Footer() {
  return (
    <footer className="text-foreground mx-auto w-full max-w-3xl px-5 py-8 text-center text-sm">
      <div className="relative isolate mb-6 h-4">
        <Rough shape="hline" roughness={2} bowing={3} strokeWidth={1.5} />
      </div>
      <p className="font-hand text-xl">
        Built with{' '}
        <a
          className="decoration-main hover:text-main font-bold underline decoration-wavy underline-offset-4 transition-colors"
          href="https://nextjs.org"
          target="_blank"
          rel="noreferrer"
        >
          Next.js
        </a>{' '}
        &{' '}
        <a
          className="decoration-main hover:text-main font-bold underline decoration-wavy underline-offset-4 transition-colors"
          href="https://tailwindcss.com"
          target="_blank"
          rel="noreferrer"
        >
          Tailwind CSS
        </a>
      </p>
      <p className="text-ink-3 mt-3 hidden font-mono text-xs sm:block">
        Press{' '}
        <kbd className="border-line bg-surface shadow-btn rounded-[4px] border px-1.5 py-0.5">
          Ctrl / ⌘ K
        </kbd>{' '}
        to jump anywhere
      </p>
      <p className="mt-2 opacity-70">
        &copy; {new Date().getFullYear()} Harsh Shrivastava. All rights
        reserved.
      </p>
    </footer>
  )
}
