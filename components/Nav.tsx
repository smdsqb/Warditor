'use client'
import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-5 bg-white/90 backdrop-blur-md border-b border-border">
      {/* Logo */}
      <Link href="/" className="flex items-baseline gap-0 group">
        <span
          style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '3px', fontSize: '26px' }}
          className="text-black"
        >
          WARD
        </span>
        <span
          style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '3px', fontSize: '26px' }}
          className="text-accent"
        >
          I
        </span>
        <span
          style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '3px', fontSize: '26px' }}
          className="text-black"
        >
          TOR
        </span>
      </Link>

      {/* Links */}
      <ul className="flex items-center gap-8 list-none">
        <li>
          <Link href="/about" className="text-sm text-muted hover:text-black transition-colors font-medium tracking-wide">
            About
          </Link>
        </li>
        <li>
          <Link href="/features" className="text-sm text-muted hover:text-black transition-colors font-medium tracking-wide">
            Features
          </Link>
        </li>
        <li>
          <Link href="/privacy" className="text-sm text-muted hover:text-black transition-colors font-medium tracking-wide">
            Privacy
          </Link>
        </li>
        <li>
          <a
            href="#download"
            className="bg-black text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-accent transition-colors tracking-wide"
          >
            Download →
          </a>
        </li>
      </ul>
    </nav>
  )
}
