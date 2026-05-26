'use client'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

const NAV_LINKS = [
  { href: '/about',    label: 'About'    },
  { href: '/features', label: 'Features' },
  { href: '/privacy',  label: 'Privacy'  },
]

export default function Nav() {
  const [open,        setOpen]        = useState(false)
  const [scrolled,    setScrolled]    = useState(false)
  const [mounted,     setMounted]     = useState(false)
  const [settled,     setSettled]     = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const pillRef       = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t1 = setTimeout(() => setMounted(true), 60)
    const t2 = setTimeout(() => setSettled(true), 860)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Close on outside click/tap — must NOT fire when tapping inside the mobile menu */
  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node
      if (pillRef.current?.contains(target)) return
      if (mobileMenuRef.current?.contains(target)) return
      setOpen(false)
    }
    document.addEventListener('mousedown', close)
    document.addEventListener('touchstart', close, { passive: true })
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('touchstart', close)
    }
  }, [open])

  const logoSize  = scrolled ? '22px'     : '28px'
  const logoKern  = scrolled ? '2px'      : '3.5px'
  const pillPadH  = scrolled ? '16px'     : '22px'
  const pillPadV  = scrolled ? '9px'      : '13px'
  const pillGap   = scrolled ? '18px'     : '28px'
  const dividerH  = scrolled ? '16px'     : '22px'
  const ctaPad    = scrolled ? '7px 16px' : '10px 22px'

  const pillClass = [
    'island-pill',
    mounted  ? 'mounted'  : '',
    settled  ? 'settled'  : '',
    scrolled ? 'scrolled' : '',
  ].filter(Boolean).join(' ')

  return (
    <>
      <style>{`
        @keyframes islandIn {
          0%   { opacity:0; transform:translateX(-50%) scaleX(0.12) scaleY(0.4); }
          65%  { opacity:1; transform:translateX(-50%) scaleX(1.03) scaleY(1.02); }
          82%  {            transform:translateX(-50%) scaleX(0.985) scaleY(0.99); }
          100% { opacity:1; transform:translateX(-50%) scaleX(1) scaleY(1); }
        }
        @keyframes menuDrop {
          0%   { opacity:0; transform:translateX(-50%) translateY(-10px) scaleY(0.9); }
          100% { opacity:1; transform:translateX(-50%) translateY(0) scaleY(1); }
        }
        @keyframes ctaGlow {
          0%,100% { box-shadow:0 0 0 0 rgba(230,56,41,0); }
          50%     { box-shadow:0 0 18px 4px rgba(230,56,41,0.35); }
        }

        .island-pill {
          position:fixed; top:20px; left:50%;
          transform:translateX(-50%) scaleX(0.12) scaleY(0.4);
          opacity:0; z-index:9000;
          background:#0a0a0a;
          border-radius:100px;
          border:1px solid rgba(255,255,255,0.12);
          display:flex; align-items:center;
          box-shadow:0 8px 36px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.07) inset;
          transition: padding .4s cubic-bezier(.34,1.4,.64,1),
                      gap .4s cubic-bezier(.34,1.4,.64,1),
                      box-shadow .3s ease, top .3s ease;
        }
        .island-pill.mounted {
          animation: islandIn 0.72s cubic-bezier(.34,1.56,.64,1) forwards;
        }
        .island-pill.settled {
          transform:translateX(-50%) scaleX(1) scaleY(1) !important;
          opacity:1 !important;
          animation:none !important;
        }
        .island-pill.settled.scrolled {
          top:13px;
          box-shadow:0 4px 24px rgba(0,0,0,0.65), 0 1px 0 rgba(255,255,255,0.07) inset;
        }
        .island-pill.settled:hover {
          box-shadow:0 10px 44px rgba(0,0,0,0.55), 0 0 0 3px rgba(230,56,41,0.14),
                     0 1px 0 rgba(255,255,255,0.07) inset;
        }
        .island-notch {
          width:7px; height:7px; border-radius:50%;
          background:#e63829; box-shadow:0 0 6px 2px rgba(230,56,41,0.55);
          flex-shrink:0;
          transition:width .3s ease, height .3s ease, box-shadow .3s ease;
        }
        .island-notch.large { width:9px; height:9px; box-shadow:0 0 12px 4px rgba(230,56,41,0.7); }
        .island-logo-span {
          font-family:var(--font-bebas);
          transition:font-size .4s cubic-bezier(.34,1.4,.64,1), letter-spacing .4s ease;
          line-height:1;
        }
        .island-divider { width:1px; background:rgba(255,255,255,0.1); flex-shrink:0; transition:height .4s ease; }
        .nav-link-wrap { position:relative; display:flex; align-items:center; }
        .nav-link-indicator {
          position:absolute; bottom:-1px; left:50%;
          transform:translateX(-50%) scaleX(0);
          width:18px; height:2px; background:#e63829; border-radius:2px;
          transition:transform .22s cubic-bezier(.34,1.56,.64,1);
        }
        .nav-link-wrap:hover .nav-link-indicator { transform:translateX(-50%) scaleX(1); }
        .cta-btn-pill {
          animation:ctaGlow 3.5s ease-in-out infinite;
          transition:background .2s, padding .4s cubic-bezier(.34,1.4,.64,1);
        }
        .cta-btn-pill:hover { animation:none; box-shadow:none; }

        /* Mobile menu */
        .mobile-island {
          position:fixed; top:78px; left:50%;
          transform:translateX(-50%) translateY(-10px) scaleY(0.9);
          opacity:0; z-index:8999;
          background:#0d0d0d;
          border-radius:26px;
          border:1px solid rgba(255,255,255,0.1);
          box-shadow:0 20px 56px rgba(0,0,0,0.65);
          animation:menuDrop .28s cubic-bezier(.34,1.2,.64,1) forwards;
          /* NO overflow:hidden — it clips touch targets */
          transform-origin:top center;
        }
        .mobile-menu-link {
          display:flex;
          align-items:center;
          justify-content:space-between;
          padding:15px 18px;
          border-radius:18px;
          font-family:var(--font-bebas);
          font-size:24px;
          letter-spacing:3px;
          color:rgba(255,255,255,0.75);
          text-decoration:none;
          -webkit-tap-highlight-color:transparent;
          /* Large touch target */
          min-height:54px;
          cursor:pointer;
        }
        .mobile-menu-link:active { background:rgba(255,255,255,0.08) !important; color:#fff !important; }

        @media (hover:none) {
          .cursor-dot, .cursor-ring { display:none !important; }
        }
      `}</style>

      {/* ── MAIN PILL ── */}
      <div
        ref={pillRef}
        className={pillClass}
        style={{ paddingLeft:pillPadH, paddingRight:pillPadH, paddingTop:pillPadV, paddingBottom:pillPadV, gap:pillGap }}
      >
        <div className={`island-notch${!scrolled ? ' large' : ''}`} />

        <Link href="/" className="flex items-baseline gap-0 flex-shrink-0" onClick={() => setOpen(false)}>
          <span className="island-logo-span text-white"  style={{ fontSize:logoSize, letterSpacing:logoKern }}>WARD</span>
          <span className="island-logo-span"             style={{ fontSize:logoSize, letterSpacing:logoKern, color:'#e63829' }}>I</span>
          <span className="island-logo-span text-white"  style={{ fontSize:logoSize, letterSpacing:logoKern }}>TOR</span>
        </Link>

        <div className="island-divider" style={{ height:dividerH }} />

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-0 list-none m-0 p-0">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <div className="nav-link-wrap" onMouseEnter={() => setHoveredLink(l.href)} onMouseLeave={() => setHoveredLink(null)}>
                <Link href={l.href} style={{ fontFamily:'var(--font-mono)', fontSize:'11.5px', letterSpacing:'2.5px', textTransform:'uppercase', color: hoveredLink === l.href ? '#fff' : 'rgba(255,255,255,0.48)', transition:'color 0.2s', padding:'5px 13px', display:'block' }}>
                  {l.label}
                </Link>
                <div className="nav-link-indicator" />
              </div>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a href="#download" className="cta-btn-pill hidden md:flex items-center gap-1.5 flex-shrink-0"
          style={{ background:'#e63829', color:'#fff', fontFamily:'var(--font-mono)', fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', padding:ctaPad, borderRadius:'100px', fontWeight:700, whiteSpace:'nowrap' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#c8301f' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#e63829' }}
        >
          ↓ Download
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center"
          style={{ width:'34px', height:'34px', padding:'5px', flexShrink:0, gap:'5px', background:'transparent', border:'none', cursor:'pointer' }}
          onClick={() => setOpen(prev => !prev)}
          aria-label="Toggle menu"
          type="button"
        >
          <span style={{ display:'block', width:'19px', height:'1.5px', background:'white', borderRadius:'2px', transition:'all 0.25s', transform: open ? 'rotate(45deg) translate(2px, 3.5px)' : 'none' }} />
          <span style={{ display:'block', width:'19px', height:'1.5px', background:'white', borderRadius:'2px', transition:'opacity 0.25s', opacity: open ? 0 : 1 }} />
          <span style={{ display:'block', width:'19px', height:'1.5px', background:'white', borderRadius:'2px', transition:'all 0.25s', transform: open ? 'rotate(-45deg) translate(2px, -3.5px)' : 'none' }} />
        </button>
      </div>

      {/* ── MOBILE MENU ISLAND ── */}
      {open && (
        <div ref={mobileMenuRef} className="mobile-island md:hidden" style={{ width:'calc(100vw - 48px)', maxWidth:'400px' }}>
          <div style={{ padding:'10px' }}>
            {NAV_LINKS.map((l, i) => (
              /* Plain <a> — avoids Next.js Link touch interception issues */
              <a
                key={l.href}
                href={l.href}
                className="mobile-menu-link"
                style={{ borderBottom: i < NAV_LINKS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
                onClick={() => setOpen(false)}
              >
                {l.label.toUpperCase()}
                <span style={{ color:'#e63829', fontSize:'16px', flexShrink:0 }}>→</span>
              </a>
            ))}

            <div style={{ padding:'8px', paddingTop:'6px' }}>
              <a
                href="#download"
                onClick={() => setOpen(false)}
                style={{ display:'block', textAlign:'center', background:'#e63829', color:'#fff', fontFamily:'var(--font-mono)', fontSize:'11px', letterSpacing:'2px', textTransform:'uppercase', fontWeight:700, padding:'15px', borderRadius:'16px', WebkitTapHighlightColor:'transparent', textDecoration:'none' }}
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
