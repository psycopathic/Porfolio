import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import { ViewTransitions } from 'next-view-transitions'
import { ThemeProvider } from '@/components/theme-provider'

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
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
        className={`${montserrat.variable} scroll-smooth antialiased`}
      >
        <body className={montserrat.className}>
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
