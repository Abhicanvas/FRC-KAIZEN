import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { PageTransition } from '@/components/page-transition'
import { RedCursorDot } from '@/components/red-cursor-dot'
import './globals.css'

export const metadata: Metadata = {
  title: 'FRC KAIZEN | Formula Student Kerala',
  description: 'FRC KAIZEN is a student-led Formula Student team from Kerala building performance through constant refinement.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-[var(--color-bg)]">
      <body className="font-sans antialiased" suppressHydrationWarning>
        <RedCursorDot />
        <PageTransition>{children}</PageTransition>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
