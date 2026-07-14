import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative bg-black text-white overflow-hidden">

      <style>{`
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        .footer-scanline {
          position: absolute; left: 0; right: 0;
          height: 120px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.015), transparent);
          animation: scanline 8s linear infinite;
          pointer-events: none; z-index: 0;
        }
        .footer-wordmark {
          position: absolute; bottom: -20px; left: 50%;
          transform: translateX(-50%);
          font-family: var(--font-bebas);
          font-size: clamp(80px, 18vw, 220px);
          letter-spacing: 12px;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.04);
          white-space: nowrap;
          pointer-events: none; user-select: none;
          z-index: 0; line-height: 1;
        }
        .social-icon {
          width: 38px; height: 38px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.35);
          transition: color .2s, border-color .2s, box-shadow .2s, transform .2s;
        }
        .social-icon:hover {
          color: #fff;
          border-color: rgba(230,56,41,0.6);
          box-shadow: 0 0 14px rgba(230,56,41,0.3);
          transform: translateY(-2px);
        }
        @keyframes dotPulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.4; transform: scale(0.7); }
        }
        .pulse-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #e63829;
          animation: dotPulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        .footer-link {
          position: relative; display: inline-block;
          color: rgba(255,255,255,0.4);
          font-size: 13px; font-weight: 300;
          transition: color .2s;
        }
        .footer-link::after {
          content: ''; position: absolute;
          bottom: -1px; left: 0;
          width: 0; height: 1px;
          background: #e63829;
          transition: width .25s ease;
        }
        .footer-link:hover { color: #fff; }
        .footer-link:hover::after { width: 100%; }
        .footer-col-head {
          font-family: var(--font-mono);
          font-size: 10px; letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          margin-bottom: 14px;
        }
      `}</style>

      <div className="footer-scanline" />
      <div className="footer-wordmark" aria-hidden="true">WARDITOR</div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">

        {/* TOP: large logo */}
        <div className="pt-16 pb-10 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="flex items-baseline">
            <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(44px, 8vw, 72px)', letterSpacing: '4px' }} className="text-white">WARD</span>
            <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(44px, 8vw, 72px)', letterSpacing: '4px', color: '#e63829' }}>I</span>
            <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(44px, 8vw, 72px)', letterSpacing: '4px' }} className="text-white">TOR</span>
          </div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '2px' }} className="text-white/20 uppercase mt-1">
            Warden + Auditor
          </p>
        </div>

        {/* MIDDLE GRID */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>

          {/* Tagline + socials */}
          <div className="md:col-span-1 flex flex-col gap-5">
            <p className="text-white/40 text-sm font-light leading-relaxed max-w-xs">
              The only productivity app that makes you feel your wasted time.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://github.com/smdsqb/Warditor" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </a>
              <a href="#" className="https://www.instagram.com/warditor/" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>
              <a href="mailto:sqbsmd2010@gmail.com" className="social-icon" aria-label="Email">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Product links */}
          <div>
            <p className="footer-col-head">Product</p>
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
              <li><Link href="/features" className="footer-link">Features</Link></li>
              <li><Link href="/#pricing" className="footer-link">Pricing</Link></li>
              <li><a href="/preregister" className="footer-link">Pre-register</a></li>
            </ul>
          </div>

          {/* Company links — Terms added */}
          <div>
            <p className="footer-col-head">Company</p>
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
              <li><Link href="/about" className="footer-link">About</Link></li>
              <li><Link href="/privacy" className="footer-link">Privacy Policy</Link></li>
              <li><Link href="/terms" className="footer-link">Terms &amp; Conditions</Link></li>
              <li><Link href="/changelog" className="footer-link">Changelog</Link></li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="py-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="pulse-dot" />
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }} className="text-white/20">
              © 2026 Warditor. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }} className="text-white/20 hover:text-white/40 transition-colors">
              Privacy
            </Link>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }} className="text-white/10">·</span>
            <Link href="/terms" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }} className="text-white/20 hover:text-white/40 transition-colors">
              Terms
            </Link>
          </div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }} className="text-white/20">
            Built by two teenagers who were tired of lying to themselves.
          </p>
        </div>

      </div>
    </footer>
  )
}
