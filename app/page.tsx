import ShameCard from '../components/ShameCard'
import Ticker from '../components/Ticker'
import RevealWrapper from '../components/RevealWrapper'
import Link from 'next/link'

const steps = [
  {
    num: '01',
    title: 'Download & Connect',
    desc: 'Install Warditor on Android. Grant usage access in one tap. Optionally connect YouTube, Reddit, and Instagram for deeper, more painful data.',
  },
  {
    num: '02',
    title: 'Live your life',
    desc: 'Warditor runs silently in the background. No popups. No blockers. No judgment — yet. Just watching. Taking notes. Building your case.',
  },
  {
    num: '03',
    title: 'Face the audit',
    desc: 'Every morning, your AI warden delivers a personalised shame report. Not numbers. A story. About you. About yesterday. About the exam you said you\'d study for.',
  },
]

const features = [
  { icon: '🧠', title: 'AI Shame Reports', desc: 'Not a dashboard. Not a bar chart. A narrative that tells you exactly what you chose to do instead — in plain, uncomfortable English.' },
  { icon: '🔗', title: 'Deep Platform Data', desc: 'Connect YouTube, Reddit, Instagram and Google Activity. Know which videos, which subreddits, which rabbit holes swallowed your evening.' },
  { icon: '📉', title: 'Consequence Correlation', desc: 'Warditor links your distractions to your real outcomes over time. 4 hours of Shorts → 34% on your exam. The data doesn\'t forgive. Neither will you.' },
  { icon: '👥', title: 'Accountability Partner', desc: 'Share your audit with a trusted friend. Nothing changes behaviour faster than someone else seeing your screen time. Premium feature.' },
]

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center px-12 pt-32 pb-20 relative overflow-hidden bg-white">
        {/* Subtle grid bg */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(#0a0a0a 1px, transparent 1px), linear-gradient(90deg, #0a0a0a 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }} />

        {/* Floating ghost words */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
          {[
            { text: 'INSTAGRAM', cls: 'ghost-a', style: { top: '12%', left: '4%', fontSize: 'clamp(32px,5vw,64px)' } },
            { text: 'YOUTUBE', cls: 'ghost-b', style: { top: '22%', right: '6%', fontSize: 'clamp(28px,4vw,56px)' } },
            { text: 'REDDIT', cls: 'ghost-c', style: { bottom: '32%', left: '2%', fontSize: 'clamp(24px,3.5vw,48px)' } },
            { text: 'SHORTS', cls: 'ghost-d', style: { bottom: '18%', right: '4%', fontSize: 'clamp(20px,3vw,44px)' } },
            { text: 'TIKTOK', cls: 'ghost-e', style: { top: '52%', left: '8%', fontSize: 'clamp(18px,2.5vw,36px)' } },
          ].map((g) => (
            <span
              key={g.text}
              className={`absolute font-black text-black ${g.cls}`}
              style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '4px', ...g.style }}
            >
              {g.text}
            </span>
          ))}
        </div>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '3px' }} className="text-accent uppercase mb-6 fade-up-1">
          Your AI productivity warden
        </p>

        <h1 style={{ fontFamily: 'var(--font-bebas)', lineHeight: '0.9', letterSpacing: '4px' }}
          className="text-black text-center fade-up-2"
        >
          <span className="block" style={{ fontSize: 'clamp(72px, 12vw, 155px)' }}>FACE WHAT</span>
          <span className="block" style={{ fontSize: 'clamp(72px, 12vw, 155px)' }}>
            YOU <span className="text-accent">DID.</span>
          </span>
        </h1>

        <p className="text-lg font-light text-muted text-center max-w-md leading-relaxed mt-8 fade-up-3">
          Warditor shows you{' '}
          <strong className="text-black font-medium">exactly what you did instead of studying</strong>
          {' '}— and makes you feel every wasted minute. No blocking. No babysitting.
          Just the truth.
        </p>

        {/* Etymology pill */}
        <div className="mt-6 fade-up-3 flex items-center gap-2 bg-off border border-border rounded-full px-4 py-2">
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }} className="text-muted">
            <span className="text-black font-medium">Warden</span> + <span className="text-black font-medium">Auditor</span>
            {' '}= <span className="text-accent font-medium">Warditor</span>
          </span>
        </div>

        <div className="flex gap-4 mt-10 fade-up-4">
          <a href="#download" className="bg-black text-white text-sm font-semibold px-8 py-3.5 rounded-lg hover:bg-accent transition-colors tracking-wide flex items-center gap-2">
            ↓ Download on Android
          </a>
          <Link href="/features" className="border border-border text-black text-sm font-medium px-8 py-3.5 rounded-lg hover:border-black transition-colors tracking-wide">
            See features
          </Link>
        </div>

        <div className="mt-16 w-full max-w-lg">
          <ShameCard />
        </div>
      </section>

      {/* TICKER */}
      <Ticker />

      {/* HOW IT WORKS */}
      <section className="py-28 px-12 max-w-6xl mx-auto">
        <RevealWrapper>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '3px' }} className="text-accent uppercase mb-4">
            The process
          </p>
        </RevealWrapper>
        <RevealWrapper>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(40px, 6vw, 80px)', letterSpacing: '2px', lineHeight: 1 }} className="text-black mb-16">
            HOW IT<br />WORKS
          </h2>
        </RevealWrapper>

        <div className="grid grid-cols-3 gap-12">
          {steps.map((s) => (
            <RevealWrapper key={s.num}>
              <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '88px', letterSpacing: '2px', lineHeight: 1, color: '#e8e6e1' }}>
                {s.num}
              </p>
              <p className="text-lg font-semibold text-black mt-[-10px] mb-3">{s.title}</p>
              <p className="text-sm font-light text-muted leading-relaxed">{s.desc}</p>
            </RevealWrapper>
          ))}
        </div>
      </section>

      <div className="border-t border-border" />

      {/* FEATURES */}
      <section className="py-28 px-12 max-w-6xl mx-auto">
        <RevealWrapper>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '3px' }} className="text-accent uppercase mb-4">
            What makes it different
          </p>
        </RevealWrapper>
        <RevealWrapper>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(40px, 6vw, 80px)', letterSpacing: '2px', lineHeight: 1 }} className="text-black mb-16">
            BUILT TO<br />CONFRONT
          </h2>
        </RevealWrapper>

        <div className="grid grid-cols-2 gap-6">
          {features.map((f) => (
            <RevealWrapper key={f.title}>
              <div className="bg-off border border-border rounded-2xl p-8 hover:border-black hover:-translate-y-1 transition-all duration-200">
                <div className="w-11 h-11 bg-black rounded-xl flex items-center justify-center text-xl mb-5">
                  {f.icon}
                </div>
                <p className="text-base font-semibold text-black mb-3">{f.title}</p>
                <p className="text-sm font-light text-muted leading-relaxed">{f.desc}</p>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </section>

      <div className="border-t border-border" />

      {/* EMOTIONAL SECTION */}
      <section className="py-28 px-12 bg-off">
        <div className="max-w-3xl mx-auto text-center">
          <RevealWrapper>
            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(40px, 6vw, 80px)', letterSpacing: '2px', lineHeight: 1 }} className="text-black mb-8">
              YOU ALREADY KNOW<br />
              YOU&apos;RE <span className="text-accent">WASTING TIME.</span><br />
              NOW FEEL IT.
            </h2>
          </RevealWrapper>
          <RevealWrapper>
            <p className="text-base font-light text-muted leading-relaxed mb-6">
              Every other app tries to block you, bribe you with streaks, or gamify your focus.
              Warditor does none of that. It just holds up a mirror — and makes you sit with what you see.
            </p>
            <p className="text-base font-light text-muted leading-relaxed">
              Because you don&apos;t need another blocker. You need to feel the weight of the hours you&apos;re trading away.
              The exam you didn&apos;t prepare for. The version of yourself you keep postponing.
            </p>
          </RevealWrapper>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* PRICING */}
      <section id="pricing" className="py-28 px-12 max-w-6xl mx-auto">
        <RevealWrapper>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '3px' }} className="text-accent uppercase mb-4">
            Simple pricing
          </p>
        </RevealWrapper>
        <RevealWrapper>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(40px, 6vw, 80px)', letterSpacing: '2px', lineHeight: 1 }} className="text-black mb-16">
            NO EXCUSES<br />TO NOT START
          </h2>
        </RevealWrapper>

        <div className="grid grid-cols-2 gap-6 max-w-2xl">
          {/* Free */}
          <RevealWrapper>
            <div className="border-2 border-border rounded-2xl p-9">
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '2px' }} className="text-muted uppercase mb-3">Free</p>
              <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '64px', letterSpacing: '2px', lineHeight: 1 }} className="text-black mb-1">$0</p>
              <p className="text-sm text-muted mb-7">forever</p>
              <ul className="space-y-2.5 mb-7">
                {['7 days audit history', 'Basic shame reports', 'App usage tracking', 'Daily AI summary'].map(f => (
                  <li key={f} className="text-sm text-muted flex items-center gap-2 border-b border-border pb-2.5">
                    <span className="text-accent font-bold text-xs">✓</span> {f}
                  </li>
                ))}
              </ul>
              <a href="#download" className="block text-center border-2 border-border text-black text-sm font-semibold py-3 rounded-lg hover:border-black transition-colors">
                Download free
              </a>
            </div>
          </RevealWrapper>

          {/* Premium */}
          <RevealWrapper>
            <div className="relative border-2 border-black rounded-2xl p-9 bg-black text-white">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] font-bold tracking-widest uppercase px-4 py-1 rounded-full" style={{ fontFamily: 'var(--font-mono)' }}>
                Most popular
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '2px' }} className="text-white/40 uppercase mb-3">Premium</p>
              <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '64px', letterSpacing: '2px', lineHeight: 1 }} className="text-white mb-1">$4.99</p>
              <p className="text-sm text-white/40 mb-7">per month</p>
              <ul className="space-y-2.5 mb-7">
                {['Full audit history', 'Deep platform data', 'Consequence correlation', 'Accountability partner'].map(f => (
                  <li key={f} className="text-sm text-white/50 flex items-center gap-2 border-b border-white/10 pb-2.5">
                    <span className="text-accent font-bold text-xs">✓</span> {f}
                  </li>
                ))}
              </ul>
              <a href="#download" className="block text-center bg-accent text-white text-sm font-semibold py-3 rounded-lg hover:bg-red-600 transition-colors">
                Get Premium →
              </a>
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* DOWNLOAD CTA */}
      <section id="download" className="py-28 px-12 bg-black text-white text-center">
        <RevealWrapper>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(48px, 8vw, 100px)', letterSpacing: '4px', lineHeight: 0.95 }} className="mb-8">
            STOP LYING<br />TO <span className="text-accent">YOURSELF.</span>
          </h2>
          <p className="text-base font-light text-white/50 max-w-md mx-auto mb-10 leading-relaxed">
            Download Warditor. Let it watch. And tomorrow morning, read the report you deserve.
          </p>
          <a href="#" className="inline-flex items-center gap-3 bg-white text-black text-sm font-bold px-10 py-4 rounded-lg hover:bg-accent hover:text-white transition-colors tracking-wide">
            ↓ Download on Android — Free
          </a>
        </RevealWrapper>
      </section>
    </>
  )
}
