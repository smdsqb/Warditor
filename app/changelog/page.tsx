import RevealWrapper from '../../components/RevealWrapper'

export const metadata = {
  title: 'Changelog — Warditor',
  description: "Everything we've built, week by week. No fluff.",
}

const entries = [
  { version: 'v0.3', date: 'May 2026', tag: 'Latest', tagColor: 'bg-accent text-white', title: 'Social proof, FAQ and depth effects', items: ['Added testimonials section to homepage', 'Built FAQ accordion with native HTML details element — no JS bloat', 'Added 3D perspective tilt to shame card on mousemove', 'Stacked ghost cards behind main card for depth', 'Floating ghost words in hero — INSTAGRAM, YOUTUBE, REDDIT and more', 'CSS grain texture overlay across entire site', 'Mobile responsive across all pages'] },
  { version: 'v0.2', date: 'May 2026', tag: 'Design', tagColor: 'bg-black text-white', title: 'Full site with all pages', items: ['Launched About page with Warden + Auditor etymology breakdown', 'Built Features page with detailed breakdown of all 6 features', 'Privacy policy in plain English — no legal jargon', 'Scroll-triggered reveal animations throughout', 'Scrolling shame ticker banner', 'Pricing section with free and premium tiers', 'SVG favicon — W wordmark with red accent bars'] },
  { version: 'v0.1', date: 'May 2026', tag: 'Launch', tagColor: 'bg-black text-white', title: 'Landing page live', items: ['Built initial Next.js 14 project with TypeScript and Tailwind', 'Hero section with FACE WHAT YOU DID headline', 'Mock shame card showing sample AI audit report', 'How it works section — 3 step flow', 'Features grid — 4 core features', 'Emotional copy section', 'Deployed to Vercel'] },
  { version: 'v0.0', date: 'May 2026', tag: 'Idea', tagColor: 'bg-border text-muted', title: 'The idea', items: ['Identified the gap — no productivity app makes you feel your wasted time', 'Settled on the shame mechanic as the core differentiator', 'Chose Android native tracking via UsageStatsManager over Chrome extension', 'Decided against blocking — watch only, report daily', 'Named it Warditor — Warden + Auditor', 'Registered warditor.com'] },
]

const upcoming = [
  { label: 'Android app beta', status: 'In progress' },
  { label: 'Firebase backend integration', status: 'In progress' },
  { label: 'Groq AI shame report generation', status: 'Planned' },
  { label: 'UsageStatsManager API integration', status: 'Planned' },
  { label: 'YouTube + Reddit + Instagram API connections', status: 'Planned' },
  { label: 'Google Activity API integration', status: 'Planned' },
  { label: 'Razorpay payment integration', status: 'Planned' },
  { label: 'Accountability partner feature', status: 'Planned' },
  { label: 'Consequence correlation engine', status: 'Planned' },
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
          Everything we&apos;ve shipped, week by week. Built in public because we have nothing to hide — except maybe our own screen time reports.
        </p>
      </RevealWrapper>

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
