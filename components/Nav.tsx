'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-white/90 backdrop-blur-md border-b border-border">
        {/* Logo */}
        <Link href="/" className="flex items-baseline gap-0" onClick={() => setOpen(false)}>
          <span style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '3px', fontSize: '26px' }} className="text-black">WARD</span>
          <span style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '3px', fontSize: '26px' }} className="text-accent">I</span>
          <span style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '3px', fontSize: '26px' }} className="text-black">TOR</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          <li><Link href="/about" className="text-sm text-muted hover:text-black transition-colors font-medium tracking-wide">About</Link></li>
          <li><Link href="/features" className="text-sm text-muted hover:text-black transition-colors font-medium tracking-wide">Features</Link></li>
          <li><Link href="/privacy" className="text-sm text-muted hover:text-black transition-colors font-medium tracking-wide">Privacy</Link></li>
          <li>
            <a href="#download" className="bg-black text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-accent transition-colors tracking-wide">
              Download →
            </a>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-black transition-all duration-200 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-black transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-black transition-all duration-200 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-40 bg-white pt-20 px-6 flex flex-col gap-6 md:hidden">
          <Link href="/about" onClick={() => setOpen(false)} className="text-2xl font-medium text-black border-b border-border pb-4" style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '2px' }}>ABOUT</Link>
          <Link href="/features" onClick={() => setOpen(false)} className="text-2xl font-medium text-black border-b border-border pb-4" style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '2px' }}>FEATURES</Link>
          <Link href="/privacy" onClick={() => setOpen(false)} className="text-2xl font-medium text-black border-b border-border pb-4" style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '2px' }}>PRIVACY</Link>
          <Link href="/changelog" onClick={() => setOpen(false)} className="text-2xl font-medium text-black border-b border-border pb-4" style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '2px' }}>CHANGELOG</Link>
          <a href="#download" onClick={() => setOpen(false)} className="mt-4 bg-black text-white text-sm font-semibold px-5 py-4 rounded-lg text-center hover:bg-accent transition-colors tracking-wide">
            ↓ Download on Android
          </a>
        </div>
      )}
    </>
  )
}
