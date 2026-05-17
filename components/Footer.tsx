import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black text-white px-12 py-12">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <div className="flex items-start justify-between">
          {/* Logo + tagline */}
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline">
              <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '36px', letterSpacing: '3px' }} className="text-white">WARD</span>
              <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '36px', letterSpacing: '3px' }} className="text-accent">I</span>
              <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '36px', letterSpacing: '3px' }} className="text-white">TOR</span>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '2px' }} className="text-white/30 uppercase">
              Warden + Auditor
            </p>
            <p className="text-white/40 text-sm font-light mt-2 max-w-xs">
              The only productivity app that makes you feel your wasted time.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div className="flex flex-col gap-3">
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '2px' }} className="text-white/30 uppercase mb-1">
                Product
              </p>
              <Link href="/features" className="text-sm text-white/50 hover:text-white transition-colors">Features</Link>
              <Link href="/#pricing" className="text-sm text-white/50 hover:text-white transition-colors">Pricing</Link>
              <a href="#download" className="text-sm text-white/50 hover:text-white transition-colors">Download</a>
            </div>
            <div className="flex flex-col gap-3">
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '2px' }} className="text-white/30 uppercase mb-1">
                Company
              </p>
              <Link href="/about" className="text-sm text-white/50 hover:text-white transition-colors">About</Link>
              <Link href="/privacy" className="text-sm text-white/50 hover:text-white transition-colors">Privacy Policy</Link>
              <a href="mailto:changethislater@xyz.com" className="text-sm text-white/50 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex items-center justify-between">
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }} className="text-white/20">
            © 2026 Warditor. All rights reserved.
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }} className="text-white/20">
            Built by two teenagers who were tired of lying to themselves.
          </p>
        </div>
      </div>
    </footer>
  )
}
