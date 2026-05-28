import type { Metadata } from 'next'
import './globals.css'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { Analytics } from '@vercel/analytics/next'
import CookieConsent from 'react-cookie-consent'

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
  return (
    <html lang="en">
      <body className="grain">
        <Nav />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <CookieConsent
          location="bottom"
          buttonText="Accept"
          declineButtonText="Decline"
          enableDeclineButton
          flipButtons
          style={{
            background: '#0a0a0a',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            fontFamily: 'system-ui, sans-serif',
            fontSize: '13px',
            alignItems: 'center',
            padding: '16px 24px',
          }}
          contentStyle={{
            margin: '0',
            flex: '1',
            color: 'rgba(255,255,255,0.6)',
            lineHeight: '1.5',
          }}
          buttonStyle={{
            background: '#e63829',
            color: '#fff',
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            borderRadius: '100px',
            padding: '8px 20px',
            margin: '0 0 0 8px',
            border: 'none',
            cursor: 'pointer',
          }}
          declineButtonStyle={{
            background: 'transparent',
            color: 'rgba(255,255,255,0.35)',
            fontSize: '11px',
            fontWeight: '600',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            borderRadius: '100px',
            padding: '8px 20px',
            margin: '0',
            border: '1px solid rgba(255,255,255,0.1)',
            cursor: 'pointer',
          }}
          expires={365}
        >
          We use cookies and collect usage data to improve your experience.{' '}
          <a href="/privacy" style={{ color: '#e63829', textDecoration: 'underline' }}>
            Privacy Policy
          </a>
          {' · '}
          <a href="/terms" style={{ color: '#e63829', textDecoration: 'underline' }}>
            Terms
          </a>
        </CookieConsent>
      </body>
    </html>
  )
}
