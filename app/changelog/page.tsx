import RevealWrapper from '../../components/RevealWrapper'

export const metadata = {
  title: 'Changelog — Warditor',
  description: "Everything we've shipped. No fluff.",
}

const entries = [
  {
    version: 'v0.1',
    date: 'May 2026',
    tag: 'Latest',
    tagColor: 'bg-accent text-white',
    title: 'Website live',
    items: [
      'Landing page, About, Features, Privacy, Changelog pages shipped',
      'AI-powered shame card with 3D tilt and depth effects',
      'Mobile responsive across all pages',
      'Google Search Console verified, sitemap submitted',
      'Open Graph meta tags for social sharing',
    ],
  },
  {
    version: 'v0.0',
    date: 'May 2026',
    tag: 'Foundation',
    tagColor: 'bg-black text-white',
    title: 'Project started',
    items: [
      'Identified the core problem — no productivity app makes you feel your wasted time',
      'Android-first, no blocking, AI narrative as the differentiator',
      'Tech stack decided — Next.js, Flutter/Stitch, Firebase, Gemini AI',
    ],
  },
]

const upcoming = [
  { label: 'Android app beta', status: 'In progress' },
  { label: 'Firebase + Gemini AI integration', status: 'In progress' },
  { label: 'UsageStatsManager API', status: 'Planned' },
  { label: 'YouTube, Reddit, Instagram API connections', status: 'Planned' },
  { label: 'Google Activity API', status: 'Planned' },
  { label: 'Razorpay payment integration', status: 'Planned' },
  { label: 'Consequence correlation engine', status: 'Planned' },
  { label: 'Accountability partner feature', status: 'Planned' },
  { label: 'iOS app', status: 'Post-launch' },
]

export default function Changelog() {
  return (
    <div className="pt-28 md:pt-32 pb-16 md:pb-28 px-6 md:px-12 max-w-3xl mx-auto">
      <RevealWrapper>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '3px' }} className="text-accent uppercase mb-4">Build log</p>
      </RevealWrapper>
      <RevealWrapper>
        <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(44px, 8vw, 96px)', letterSpacing: '3px', lineHeight: 1 }} className="text-black mb-4">CHANGELOG</h1>
      </RevealWrapper>
      <RevealWrapper>
        <p className="text-base font-light text-muted leading-relaxed mb-12 md:mb-20 max-w-xl">
          Built in public. Updated as we ship.
        </p>
      </RevealWrapper>

      {/* Upcoming */}
      <RevealWrapper>
        <div className="bg-off border border-border rounded-2xl p-6 md:p-8 mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '2px' }} className="text-black uppercase font-medium">What&apos;s coming</p>
          </div>
          <div className="flex flex-col gap-3">
            {upcoming.map((u) => (
              <div key={u.label} className="flex items-center justify-between py-2.5 border-b border-border last:border-0 gap-4">
                <p className="text-sm font-light text-black">{u.label}</p>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '1px' }} className="uppercase px-3 py-1 rounded-full border border-border text-muted flex-shrink-0">{u.status}</span>
              </div>
            ))}
          </div>
        </div>
      </RevealWrapper>

      {/* Entries */}
      <div className="relative flex flex-col gap-0">
        <div className="absolute left-[19px] top-3 bottom-3 w-[1px] bg-border" />
        {entries.map((e, i) => (
          <RevealWrapper key={e.version}>
            <div className="flex gap-5 md:gap-8 pb-12 md:pb-14">
              <div className="relative flex-shrink-0 mt-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 relative ${i === 0 ? 'bg-accent' : 'bg-black'}`}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.5px' }} className="text-white font-medium">{e.version}</p>
                </div>
              </div>
              <div className="flex-1 pt-1 min-w-0">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '1.5px' }} className={`uppercase px-3 py-1 rounded-full text-[10px] font-medium ${e.tagColor}`}>{e.tag}</span>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }} className="text-muted">{e.date}</p>
                </div>
                <p className="text-base md:text-lg font-semibold text-black mb-4">{e.title}</p>
                <ul className="flex flex-col gap-2">
                  {e.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm font-light text-muted leading-relaxed">
                      <span className="text-accent font-bold text-xs mt-1 flex-shrink-0">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </RevealWrapper>
        ))}
      </div>
    </div>
  )
}
