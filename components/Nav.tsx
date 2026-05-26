'use client'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const pillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Trigger mount animation
    const t = setTimeout(() => setMounted(true), 60)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change / outside click
  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (pillRef.current && !pillRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  const links = [
    { href: '/about',    label: 'About'    },
    { href: '/features', label: 'Features' },
    { href: '/privacy',  label: 'Privacy'  },
  ]

  return (
    <>
      <style>{`
        /* Island entrance */
        @keyframes islandIn {
          0%   { opacity: 0; transform: translateX(-50%) scaleX(0.15) scaleY(0.5); }
          60%  { transform: translateX(-50%) scaleX(1.04) scaleY(1.02); }
          80%  { transform: translateX(-50%) scaleX(0.98) scaleY(0.99); }
          100% { opacity: 1; transform: translateX(-50%) scaleX(1) scaleY(1); }
        }

        /* Hover breath */
        @keyframes islandBreathe {
          0%,100% { box-shadow: 0 8px 32px rgba(0,0,0,0.45), 0 0 0 0 rgba(230,56,41,0); }
          50%      { box-shadow: 0 12px 40px rgba(0,0,0,0.55), 0 0 0 4px rgba(230,56,41,0.12); }
        }

        /* Mobile menu drop */
        @keyframes menuDrop {
          0%   { opacity: 0; transform: translateY(-8px) scaleY(0.85); }
          100% { opacity: 1; transform: translateY(0)   scaleY(1); }
        }

        .island-pill {
          position: fixed;
          top: 18px;
          left: 50%;
          transform: translateX(-50%) scaleX(0.15) scaleY(0.5);
          opacity: 0;
          z-index: 9000;
          background: #0a0a0a;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          gap: 0;
          transition:
            width       0.45s cubic-bezier(.34,1.56,.64,1),
            padding     0.45s cubic-bezier(.34,1.56,.64,1),
            box-shadow  0.3s ease,
            top         0.3s ease;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.06) inset;
          will-change: transform, width;
          transform-origin: center center;
          overflow: hidden;
        }

        .island-pill.mounted {
          animation: islandIn 0.7s cubic-bezier(.34,1.56,.64,1) forwards;
        }

        .island-pill.scrolled {
          top: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.06) inset;
        }

        .island-pill:hover {
          animation: islandBreathe 2s ease-in-out infinite;
        }

        /* Indicator dot that pulses under active link */
        .nav-link-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .nav-link-indicator {
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 16px;
          height: 2px;
          background: #e63829;
          border-radius: 2px;
          transition: transform 0.25s cubic-bezier(.34,1.56,.64,1);
        }
        .nav-link-wrap:hover .nav-link-indicator {
          transform: translateX(-50%) scaleX(1);
        }

        /* CTA button micro-pulse */
        @keyframes ctaGlow {
          0%,100% { box-shadow: 0 0 0 0 rgba(230,56,41,0); }
          50%      { box-shadow: 0 0 14px 3px rgba(230,56,41,0.3); }
        }
        .cta-btn { animation: ctaGlow 3s ease-in-out infinite; }
        .cta-btn:hover { animation: none; }

        /* Mobile menu island */
        .mobile-island {
          position: fixed;
          top: 74px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 8999;
          background: #0d0d0d;
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 16px 48px rgba(0,0,0,0.6);
          animation: menuDrop 0.28s cubic-bezier(.34,1.2,.64,1) forwards;
          overflow: hidden;
          transform-origin: top center;
        }

        /* Notch accent in pill */
        .island-notch {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #e63829;
          box-shadow: 0 0 6px 2px rgba(230,56,41,0.5);
          flex-shrink: 0;
          transition: all 0.3s ease;
        }
        .island-notch.active {
          width: 8px;
          height: 8px;
          box-shadow: 0 0 10px 3px rgba(230,56,41,0.7);
        }

        /* Logo text transition */
        .island-logo-text {
          transition: letter-spacing 0.4s ease, font-size 0.4s ease;
        }
      `}</style>

      {/* ── MAIN PILL ── */}
      <div
        ref={pillRef}
        className={`island-pill ${mounted ? 'mounted' : ''} ${scrolled ? 'scrolled' : ''}`}
        style={{
          paddingLeft:  scrolled ? '14px' : '18px',
          paddingRight: scrolled ? '14px' : '18px',
          paddingTop:   scrolled ? '8px'  : '10px',
          paddingBottom: scrolled ? '8px' : '10px',
          gap: scrolled ? '16px' : '24px',
        }}
      >
        {/* Live dot */}
        <div className={`island-notch ${!scrolled ? 'active' : ''}`} />

        {/* Logo */}
        <Link
          href="/"
          className="flex items-baseline gap-0 flex-shrink-0"
          onClick={() => setOpen(false)}
        >
          <span
            className="island-logo-text text-white"
            style={{
              fontFamily: 'var(--font-bebas)',
              letterSpacing: scrolled ? '2px' : '3px',
              fontSize: scrolled ? '20px' : '24px',
            }}
          >WARD</span>
          <span
            className="island-logo-text"
            style={{
              fontFamily: 'var(--font-bebas)',
              letterSpacing: scrolled ? '2px' : '3px',
              fontSize: scrolled ? '20px' : '24px',
              color: '#e63829',
            }}
          >I</span>
          <span
            className="island-logo-text text-white"
            style={{
              fontFamily: 'var(--font-bebas)',
              letterSpacing: scrolled ? '2px' : '3px',
              fontSize: scrolled ? '20px' : '24px',
            }}
          >TOR</span>
        </Link>

        {/* Divider */}
        <div style={{ width: '1px', height: '18px', background: 'rgba(255,255,255,0.1)', flexShrink: 0 }} />

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
          {links.map((l) => (
            <li key={l.href}>
              <div
                className="nav-link-wrap"
                onMouseEnter={() => setHoveredLink(l.href)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <Link
                  href={l.href}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: hoveredLink === l.href ? '#ffffff' : 'rgba(255,255,255,0.5)',
                    transition: 'color 0.2s',
                    padding: '4px 10px',
                    display: 'block',
                  }}
                >
                  {l.label}
                </Link>
                <div className="nav-link-indicator" />
              </div>
            </li>
          ))}
        </ul>

        {/* CTA — desktop */}
        <a
          href="#download"
          className="cta-btn hidden md:flex items-center gap-1.5 flex-shrink-0"
          style={{
            background: '#e63829',
            color: '#fff',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            padding: scrolled ? '6px 14px' : '8px 16px',
            borderRadius: '100px',
            fontWeight: 700,
            transition: 'background 0.2s, padding 0.4s ease, box-shadow 0.2s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#c8301f' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#e63829' }}
        >
          ↓ Download
        </a>

        {/* Hamburger — mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.5"
          style={{ width: '32px', height: '32px', padding: '4px', flexShrink: 0 }}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span style={{ display: 'block', width: '18px', height: '1.5px', background: 'white', borderRadius: '2px', transition: 'all 0.25s', transform: open ? 'rotate(45deg) translate(2px, 2px)' : 'none', transformOrigin: 'center' }} />
          <span style={{ display: 'block', width: '18px', height: '1.5px', background: 'white', borderRadius: '2px', transition: 'opacity 0.25s', opacity: open ? 0 : 1 }} />
          <span style={{ display: 'block', width: '18px', height: '1.5px', background: 'white', borderRadius: '2px', transition: 'all 0.25s', transform: open ? 'rotate(-45deg) translate(2px, -2px)' : 'none', transformOrigin: 'center' }} />
        </button>
      </div>

      {/* ── MOBILE MENU ISLAND ── */}
      {open && (
        <div className="mobile-island md:hidden" style={{ width: 'calc(100vw - 40px)', maxWidth: '380px' }}>
          <div style={{ padding: '8px' }}>
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  borderRadius: '16px',
                  fontFamily: 'var(--font-bebas)',
                  fontSize: '22px',
                  letterSpacing: '3px',
                  color: 'rgba(255,255,255,0.8)',
                  transition: 'background 0.15s, color 0.15s',
                  borderBottom: i < links.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.05)'; el.style.color = '#fff' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = 'rgba(255,255,255,0.8)' }}
              >
                {l.label.toUpperCase()}
                <span style={{ color: '#e63829', fontSize: '16px' }}>→</span>
              </Link>
            ))}
            <div style={{ padding: '8px', paddingTop: '6px' }}>
              <a
                href="#download"
                onClick={() => setOpen(false)}
                style={{
                  display: 'block',
                  textAlign: 'center',
                  background: '#e63829',
                  color: '#fff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  padding: '14px',
                  borderRadius: '14px',
                }}
              >
                ↓ Download on Android
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
