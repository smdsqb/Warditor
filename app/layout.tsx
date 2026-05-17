import type { Metadata } from 'next'
import './globals.css'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  title: 'Warditor — Face What You Did',
  description: 'An AI that shows you exactly what you did instead of studying — and makes you feel every wasted minute.',
  keywords: ['productivity', 'screen time', 'study', 'focus', 'AI'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="grain">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
