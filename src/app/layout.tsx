import type { Metadata } from 'next'
import { Caveat, Inter, Montserrat } from 'next/font/google'
import './globals.css'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import { ViewTransitions } from 'next-view-transitions'
import { ThemeProvider } from '@/components/theme-provider'
import { appearanceScript, DEFAULTS } from '@/lib/appearance'

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const caveat = Caveat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-caveat',
})

export const metadata: Metadata = {
  title: {
    default: 'Harsh Shrivastava',
    template: '%s | Harsh Shrivastava',
  },
  description:
    'Full Stack Developer building scalable web applications with Next.js, React, Node.js, and PostgreSQL.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ViewTransitions>
      <html
        suppressHydrationWarning
        lang="en"
        data-style={DEFAULTS.style}
        data-accent={DEFAULTS.accent}
        className={`${montserrat.variable} ${caveat.variable} ${inter.variable} scroll-smooth antialiased`}
      >
        <head>
          <script dangerouslySetInnerHTML={{ __html: appearanceScript }} />
        </head>
        <body className="font-base">
          <ThemeProvider attribute="class" disableTransitionOnChange>
            <div className="flex min-h-screen flex-col">
              <Nav />
              <main className="text-foreground mx-auto w-full max-w-3xl flex-1 px-5 pt-28 pb-16 sm:pt-32">
                {children}
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  )
}
