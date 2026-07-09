export default function Footer() {
  return (
    <footer className="text-foreground mx-auto w-full max-w-3xl px-5 py-8 text-center text-sm">
      <p>
        Built with{' '}
        <a
          className="font-heading underline underline-offset-4 transition-colors hover:text-main"
          href="https://nextjs.org"
          target="_blank"
          rel="noreferrer"
        >
          Next.js
        </a>{' '}
        &{' '}
        <a
          className="font-heading underline underline-offset-4 transition-colors hover:text-main"
          href="https://tailwindcss.com"
          target="_blank"
          rel="noreferrer"
        >
          Tailwind CSS
        </a>
      </p>
      <p className="mt-2 opacity-70">
        &copy; {new Date().getFullYear()} Harsh Shrivastava. All rights
        reserved.
      </p>
    </footer>
  )
}
