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
    const t = setTimeout(() => setMounted(true), 60)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
        @keyframes islandIn {
          0%   { opacity: 0; transform: translateX(-50%) scaleX(0.12) scaleY(0.4); }
          65%  { opacity: 1; transform: translateX(-50%) scaleX(1.03) scaleY(1.02); }
          82%  { transform: translateX(-50%) scaleX(0.985) scaleY(0.99); }
          100% { opacity: 1; transform: translateX(-50%) scaleX(1) scaleY(1); }
        }

        @keyframes menuDrop {
          0%   { opacity: 0; transform: translateX(-50%) translateY(-10px) scaleY(0.88); }
          100% { opacity: 1; transform: translateX(-50%) translateY(0)      scaleY(1); }
        }

        @keyframes ctaGlow {
          0%,100% { box-shadow: 0 0 0 0 rgba(230,56,41,0); }
          50%      { box-shadow: 0 0 18px 4px rgba(230,56,41,0.35); }
        }

        /* Base pill — hidden until mounted */
        .island-pill {
          position: fixed;
          top: 20px;
          left: 50%;
          /* default (pre-mount) state */
          transform: translateX(-50%) scaleX(0.12) scaleY(0.4);
          opacity: 0;
          z-index: 9000;
          background: #0a0a0a;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.12);
          display: flex;
          align-items: center;
          /* NO animation here — only on .mounted */
          box-shadow: 0 8px 36px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.07) inset;
          will-change: box-shadow, top, padding;
          /* Transitions for AFTER the entrance — padding, shadow, top only. NOT transform. */
          transition:
            padding      0.4s cubic-bezier(.34,1.4,.64,1),
            gap          0.4s cubic-bezier(.34,1.4,.64,1),
            box-shadow   0.3s ease,
            top          0.3s ease;
        }

        /* Run the entrance animation once */
        .island-pill.mounted {
          animation: islandIn 0.72s cubic-bezier(.34,1.56,.64,1) forwards;
        }

        /* After animation settles, lock final transform so hover can't disrupt it */
        .island-pill.settled {
          transform: translateX(-50%) scaleX(1) scaleY(1) !important;
          opacity: 1 !important;
          animation: none !important;
        }

        .island-pill.settled.scrolled {
          top: 13px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.65), 0 1px 0 rgba(255,255,255,0.07) inset;
        }

        /* Hover: only box-shadow — no transform, no animation conflict */
        .island-pill.settled:hover {
          box-shadow: 0 10px 44px rgba(0,0,0,0.55), 0 0 0 3px rgba(230,56,41,0.14), 0 1px 0 rgba(255,255,255,0.07) inset;
        }

        /* Link underline indicator */
        .nav-link-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .nav-link-indicator {
          position: absolute;
          bottom: -1px;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 18px;
          height: 2px;
          background: #e63829;
          border-radius: 2px;
          transition: transform 0.22s cubic-bezier(.34,1.56,.64,1);
        }
        .nav-link-wrap:hover .nav-link-indicator {
          transform: translateX(-50%) scaleX(1);
        }

        /* CTA pulse — only when settled */
        .cta-btn-pill {
          animation: ctaGlow 3.5s ease-in-out infinite;
          transition: background 0.2s, padding 0.4s cubic-bezier(.34,1.4,.64,1);
        }
        .cta-btn-pill:hover {
          animation: none;
          box-shadow: none;
        }

        /* Notch dot */
        .island-notch {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #e63829;
          box-shadow: 0 0 6px 2px rgba(230,56,41,0.55);
          flex-shrink: 0;
          transition: width .3s ease, height .3s ease, box-shadow .3s ease;
        }
        .island-notch.large {
          width: 9px;
          height: 9px;
          box-shadow: 0 0 12px 4px rgba(230,56,41,0.7);
        }

        /* Logo spans */
        .island-logo-span {
          font-family: var(--font-bebas);
          transition: font-size 0.4s cubic-bezier(.34,1.4,.64,1), letter-spacing 0.4s ease;
          line-height: 1;
        }

        /* Divider */
        .island-divider {
          width: 1px;
          background: rgba(255,255,255,0.1);
          flex-shrink: 0;
          transition: height 0.4s ease;
        }

        /* Mobile menu */
        .mobile-island {
          position: fixed;
          top: 78px;
          left: 50%;
          transform: translateX(-50%) translateY(-10px) scaleY(0.88);
          opacity: 0;
          z-index: 8999;
          background: #0d0d0d;
          border-radius: 26px;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 20px 56px rgba(0,0,0,0.65);
          animation: menuDrop 0.3s cubic-bezier(.34,1.2,.64,1) forwards;
          overflow: hidden;
          transform-origin: top center;
        }
      `}</style>

      <IslandPill
        pillRef={pillRef}
        mounted={mounted}
        scrolled={scrolled}
        hoveredLink={hoveredLink}
        setHoveredLink={setHoveredLink}
        open={open}
        setOpen={setOpen}
        links={links}
      />

      {open && (
        <div className="mobile-island md:hidden" style={{ width: 'calc(100vw - 48px)', maxWidth: '400px' }}>
          <div style={{ padding: '10px' }}>
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '15px 18px',
                  borderRadius: '18px',
                  fontFamily: 'var(--font-bebas)',
                  fontSize: '24px',
                  letterSpacing: '3px',
                  color: 'rgba(255,255,255,0.75)',
                  transition: 'background 0.15s, color 0.15s',
                  borderBottom: i < links.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.05)'; el.style.color = '#fff' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = 'rgba(255,255,255,0.75)' }}
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
                  padding: '15px',
                  borderRadius: '16px',
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

/* Separated so we can use a local settled state cleanly */
function IslandPill({
  pillRef, mounted, scrolled, hoveredLink, setHoveredLink, open, setOpen, links
}: {
  pillRef: React.RefObject<HTMLDivElement>
  mounted: boolean
  scrolled: boolean
  hoveredLink: string | null
  setHoveredLink: (v: string | null) => void
  open: boolean
  setOpen: (v: boolean) => void
  links: { href: string; label: string }[]
}) {
  const [settled, setSettled] = useState(false)

  useEffect(() => {
    if (!mounted) return
    // Lock final state after animation completes (720ms + small buffer)
    const t = setTimeout(() => setSettled(true), 800)
    return () => clearTimeout(t)
  }, [mounted])

  const logoSize   = scrolled ? '22px' : '28px'
  const logoSpacing = scrolled ? '2px'  : '3.5px'
  const pillPadH   = scrolled ? '16px' : '22px'
  const pillPadV   = scrolled ? '9px'  : '13px'
  const pillGap    = scrolled ? '18px' : '28px'
  const dividerH   = scrolled ? '16px' : '22px'
  const ctaPad     = scrolled ? '7px 16px' : '10px 22px'

  return (
    <div
      ref={pillRef}
      className={[
        'island-pill',
        mounted  ? 'mounted'  : '',
        settled  ? 'settled'  : '',
        scrolled ? 'scrolled' : '',
      ].join(' ')}
      style={{
        paddingLeft:   pillPadH,
        paddingRight:  pillPadH,
        paddingTop:    pillPadV,
        paddingBottom: pillPadV,
        gap: pillGap,
      }}
    >
      {/* Live dot */}
      <div className={`island-notch ${!scrolled ? 'large' : ''}`} />

      {/* Logo */}
      <Link href="/" className="flex items-baseline gap-0 flex-shrink-0" onClick={() => setOpen(false)}>
        <span className="island-logo-span text-white" style={{ fontSize: logoSize, letterSpacing: logoSpacing }}>WARD</span>
        <span className="island-logo-span" style={{ fontSize: logoSize, letterSpacing: logoSpacing, color: '#e63829' }}>I</span>
        <span className="island-logo-span text-white" style={{ fontSize: logoSize, letterSpacing: logoSpacing }}>TOR</span>
      </Link>

      {/* Divider */}
      <div className="island-divider" style={{ height: dividerH }} />

      {/* Desktop links */}
      <ul className="hidden md:flex items-center gap-0 list-none m-0 p-0">
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
                  fontSize: '11.5px',
                  letterSpacing: '2.5px',
                  textTransform: 'uppercase',
                  color: hoveredLink === l.href ? '#ffffff' : 'rgba(255,255,255,0.48)',
                  transition: 'color 0.2s',
                  padding: '5px 13px',
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

      {/* CTA */}
      <a
        href="#download"
        className="cta-btn-pill hidden md:flex items-center gap-1.5 flex-shrink-0"
        style={{
          background: '#e63829',
          color: '#fff',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          padding: ctaPad,
          borderRadius: '100px',
          fontWeight: 700,
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#c8301f' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#e63829' }}
      >
        ↓ Download
      </a>

      {/* Hamburger */}
      <button
        className="md:hidden flex flex-col justify-center items-center"
        style={{ width: '34px', height: '34px', padding: '5px', flexShrink: 0, gap: '5px' }}
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <span style={{ display: 'block', width: '19px', height: '1.5px', background: 'white', borderRadius: '2px', transition: 'all 0.25s', transform: open ? 'rotate(45deg) translate(2px, 3.5px)' : 'none' }} />
        <span style={{ display: 'block', width: '19px', height: '1.5px', background: 'white', borderRadius: '2px', transition: 'opacity 0.25s', opacity: open ? 0 : 1 }} />
        <span style={{ display: 'block', width: '19px', height: '1.5px', background: 'white', borderRadius: '2px', transition: 'all 0.25s', transform: open ? 'rotate(-45deg) translate(2px, -3.5px)' : 'none' }} />
      </button>
    </div>
  )
}
