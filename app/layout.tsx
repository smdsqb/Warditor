import type { Metadata } from 'next'
import './globals.css'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import CookieBanner from '../components/CookieBanner'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  title: 'Warditor',
  description: 'An AI that shows you exactly what you did instead of studying — and makes you feel every wasted minute.',
  keywords: ['productivity', 'screen time', 'study', 'focus', 'AI', 'shame', 'accountability'],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Warditor — Face What You Did',
    description: 'An AI that shows you exactly what you did instead of studying — and makes you feel every wasted minute. No blocking. No babysitting. Just the truth.',
    url: 'https://warditor.vercel.app',
    siteName: 'Warditor',
    images: [
      {
        url: 'https://warditor.vercel.app/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Warditor — Face What You Did',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Warditor — Face What You Did',
    description: 'An AI that shows you exactly what you did instead of studying — and makes you feel every wasted minute.',
    images: ['https://warditor.vercel.app/og-image.svg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const hideNavbar = pathname === '/preregister'
  return (
    <html lang="en">
      <body className="grain">
        <Nav />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <CookieBanner />
      </body>
    </html>
  )
}
