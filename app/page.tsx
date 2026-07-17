'use client'

import ShameCard from '../components/ShameCard'
import Ticker from '../components/Ticker'
import RevealWrapper from '../components/RevealWrapper'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

/* ─── DATA ─────────────────────────────────────────────────────────────────── */

const steps = [
  { num: '01', title: 'Download & Connect', desc: 'Install Warditor on Android. Grant usage access in one tap. Optionally connect Reddit, Discord, Github, GitLab, Spotify, Twitch & Zoom for deeper, more accurate data.' },
  { num: '02', title: 'Live your life', desc: 'Warditor runs silently in the background. No popups. No blockers. No judgment — yet. Just watching. Taking notes. Building your case.' },
  { num: '03', title: 'Face the audit', desc: "Every morning, your AI warden delivers a personalised shame report. Not numbers. A story. About you. About yesterday. About the exam you said you'd study for, but didn't." },
]

const features = [
  { icon: '🧠', title: 'AI Shame Reports', desc: 'Not a dashboard. Not a bar chart. A narrative that tells you exactly what you chose to do instead — in plain, uncomfortable English.' },
  { icon: '🔗', title: 'Deep Platform Data', desc: 'Connect Reddit, Discord, Github, GitLab, Spotify, Twitch & Zoom. Know which videos, which subreddits, which rabbit holes swallowed your evening.' },
  { icon: '📉', title: 'Consequence Correlation', desc: "Warditor links your distractions to your real outcomes over time. 4 hours of Shorts → 34% on your exam. The data doesn't forgive. Neither will you." },
  { icon: '👥', title: 'Accountability Partner', desc: "Share your audit with a trusted friend. Nothing changes behaviour faster than someone else seeing your screen time. Premium feature, but highly effective." },
]

const testimonials = [
  { quote: "I genuinely did not expect to feel bad reading an app notification. Then Warditor told me I opened Instagram 22 times the night before my finals. I put my phone in another room after that.", name: "Aryan M.", tag: "Engineering student, Gujrat" },
  { quote: "Every other app I've tried either blocks everything or just shows me a pie chart I ignore. This one actually made me sit there for a minute. That's new.", name: "Priya S.", tag: "A-Level student, Singapore" },
  { quote: "The accountability partner feature is brutal in the best way. My friend can see my report. I haven't opened YouTube after 10pm since.", name: "Keanu R.", tag: "CS undergraduate, Auckland" },
  { quote: "I thought I was being productive. Warditor told me I had Reddit open for 3.5 hours between 8pm and midnight. I thought it was maybe 30 minutes.", name: "Fatima A.", tag: "Medical student, Manchester" },
  { quote: "The shame report connecting my phone time to my actual grades is the most uncomfortable thing I've read in a while. Also the most useful.", name: "Dev K.", tag: "High school student, California" },
  { quote: "It doesn't try to fix you. It just shows you what you did. Which is somehow so much more effective than everything that does try.", name: "Lena W.", tag: "UX Designer, Berlin" },
]

const faqs = [
  { q: "Does Warditor block apps?", a: "No. Deliberately. Blockers get turned off the moment willpower runs out. Warditor doesn't restrict you at all — it just makes sure you read exactly what you did the next morning. The choice is always yours. The consequences are always visible." },
  { q: "Is my data safe?", a: "Yes. Raw usage data is processed locally on your device where possible. Only aggregated insights sync to our secure servers. We never sell your data to anyone, ever. You can delete everything permanently at any time from app settings." },
  { q: "Which platforms does it support?", a: "Core tracking works on all Android apps via the UsageStatsManager API — no setup needed beyond granting access once. For deeper data, you can optionally connect Reddit, Discord, Github, GitLab, Spotify, Twitch & Zoom account. Each connection is fully opt-in." },
  { q: "Does it work on iPhone?", a: "Not yet. iOS severely restricts the kind of background monitoring Warditor needs. We're Android first. iPhone support depends on what Apple allows in future updates — we're watching closely." },
  { q: "How does the AI generate the shame report?", a: "Your usage data gets sent to our secure storage. AI then reads it and writes a human-readable narrative about your day. It's not a template. It's a story, written fresh each morning, specific to what you actually did." },
  { q: "Is there a free version?", a: "Yes. The free tier gives you 7 days of audit history, basic daily shame reports and full app usage tracking — no credit card needed. Premium unlocks full history, deep platform data, consequence correlation and the accountability partner feature for $4.99/month." },
]

const ghostWords = [
  { text: 'INSTAGRAM', cls: 'ghost-a', style: { top: '12%', left: '4%', fontSize: 'clamp(24px,5vw,64px)' }, depth: 0.04 },
  { text: 'YOUTUBE',   cls: 'ghost-b', style: { top: '22%', right: '6%', fontSize: 'clamp(20px,4vw,56px)' }, depth: 0.07 },
  { text: 'REDDIT',    cls: 'ghost-c', style: { bottom: '32%', left: '2%', fontSize: 'clamp(18px,3.5vw,48px)' }, depth: 0.03 },
  { text: 'SHORTS',    cls: 'ghost-d', style: { bottom: '18%', right: '4%', fontSize: 'clamp(16px,3vw,44px)' }, depth: 0.06 },
  { text: 'TIKTOK',    cls: 'ghost-e', style: { top: '52%', left: '8%', fontSize: 'clamp(14px,2.5vw,36px)' }, depth: 0.09 },
  { text: 'NETFLIX',   cls: 'ghost-f', style: { top: '38%', right: '2%', fontSize: 'clamp(14px,2.5vw,40px)' }, depth: 0.05 },
  { text: 'DISCORD',   cls: 'ghost-g', style: { bottom: '44%', right: '9%', fontSize: 'clamp(12px,2vw,34px)' }, depth: 0.08 },
  { text: 'TWITTER',   cls: 'ghost-h', style: { top: '68%', right: '14%', fontSize: 'clamp(12px,2vw,32px)' }, depth: 0.02 },
  { text: 'SNAPCHAT',  cls: 'ghost-i', style: { bottom: '8%', left: '16%', fontSize: 'clamp(12px,2vw,30px)' }, depth: 0.07 },
  { text: 'WHATSAPP',  cls: 'ghost-j', style: { top: '78%', left: '3%', fontSize: 'clamp(12px,2vw,30px)' }, depth: 0.04 },
]

/* ─── HOOKS ─────────────────────────────────────────────────────────────────── */

function useTilt(strength = 12) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width  - 0.5
      const y = (e.clientY - rect.top)  / rect.height - 0.5
      el.style.transform = `perspective(600px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg) translateZ(8px)`
    }
    const onLeave = () => { el.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) translateZ(0px)' }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) }
  }, [strength])

  return ref
}

/* ─── COMPONENTS ─────────────────────────────────────────────────────────────── */

function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useTilt(10)
  return (
    <div ref={ref} className={className} style={{ transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d', willChange: 'transform' }}>
      {children}
    </div>
  )
}

function MagneticButton({ children, className = '', href = '#' }: { children: React.ReactNode; className?: string; href?: string }) {
  const ref = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) * 0.3
      const y = (e.clientY - rect.top - rect.height / 2) * 0.3
      el.style.transform = `translate(${x}px, ${y}px)`
    }
    const onLeave = () => { el.style.transform = 'translate(0,0)' }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) }
  }, [])

  return (
    <a ref={ref} href={href} className={className} style={{ transition: 'transform 0.2s cubic-bezier(.23,1,.32,1)' }}>
      {children}
    </a>
  )
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', zIndex: 9999, background: 'transparent', pointerEvents: 'none' }}>
      <div style={{ height: '100%', width: `${progress * 100}%`, background: 'var(--accent, #e63829)', transition: 'width 0.1s linear', boxShadow: '0 0 8px var(--accent, #e63829)' }} />
    </div>
  )
}

function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf: number
    let rx = 0, ry = 0
    let mx = 0, my = 0

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    const onEnter = () => { dotRef.current?.classList.add('cursor-hover'); ringRef.current?.classList.add('cursor-hover') }
    const onLeave = () => { dotRef.current?.classList.remove('cursor-hover'); ringRef.current?.classList.remove('cursor-hover') }

    const loop = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      if (dotRef.current) { dotRef.current.style.left = mx + 'px'; dotRef.current.style.top = my + 'px' }
      if (ringRef.current) { ringRef.current.style.left = rx + 'px'; ringRef.current.style.top = ry + 'px' }
      raf = requestAnimationFrame(loop)
    }

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a,button,[data-hover]').forEach(el => { el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave) })
    raf = requestAnimationFrame(loop)
    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      <div ref={dotRef} style={{ position: 'fixed', width: '6px', height: '6px', borderRadius: '50%', background: '#e63829', pointerEvents: 'none', zIndex: 99999, transform: 'translate(-50%,-50%)', transition: 'width .2s,height .2s,background .2s' }} className="cursor-dot" />
      <div ref={ringRef} style={{ position: 'fixed', width: '28px', height: '28px', borderRadius: '50%', border: '1.5px solid rgba(230,56,41,0.5)', pointerEvents: 'none', zIndex: 99998, transform: 'translate(-50%,-50%)' }} className="cursor-ring" />
    </>
  )
}

function ParallaxGhosts({ scrollY }: { scrollY: number }) {
  return (
    <div className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      {ghostWords.map((g) => (
        <span
          key={g.text}
          className={`absolute font-black text-black ${g.cls}`}
          style={{
            fontFamily: 'var(--font-bebas)',
            letterSpacing: '4px',
            ...g.style,
            transform: `translateY(${scrollY * g.depth}px)`,
            willChange: 'transform',
          }}
        >
          {g.text}
        </span>
      ))}
    </div>
  )
}

function CountUp({ target }: { target: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [displayed, setDisplayed] = useState('00')
  const num = parseInt(target, 10)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      obs.disconnect()
      let start = 0
      const duration = 1200
      const startTime = performance.now()
      const tick = (now: number) => {
        const t = Math.min((now - startTime) / duration, 1)
        const eased = 1 - Math.pow(1 - t, 3)
        const val = Math.floor(eased * num)
        setDisplayed(String(val).padStart(2, '0'))
        if (t < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [num])

  return <span ref={ref}>{displayed}</span>
}

function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0, zIndex: 9990, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        opacity: 0.025,
        mixBlendMode: 'overlay',
      }}
    />
  )
}

/* ─── PAGE ──────────────────────────────────────────────────────────────────── */

export default function Home() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ── Global cursor, progress, grain ── */}
      <ScrollProgress />
      <CustomCursor />
      <GrainOverlay />

      {/* ── Global animation styles ── */}
      <style>{`
        /* Cursor states */
        .cursor-dot.cursor-hover  { width:14px!important; height:14px!important; background:#e63829!important; }
        .cursor-ring.cursor-hover { width:44px!important; height:44px!important; opacity:.6; }

        /* Floating ShameCard */
        @keyframes float {
          0%,100% { transform: translateY(0px) rotate(-1deg); }
          50%      { transform: translateY(-14px) rotate(0.5deg); }
        }
        .shame-float { animation: float 4.5s ease-in-out infinite; }

        /* Glitch on accent text */
        @keyframes glitch1 {
          0%,100% { clip-path: inset(40% 0 61% 0); transform: translate(-2px,0); }
          20%      { clip-path: inset(92% 0 1% 0);  transform: translate(1px,0);  }
          40%      { clip-path: inset(43% 0 1% 0);  transform: translate(-1px,0); }
          60%      { clip-path: inset(25% 0 58% 0); transform: translate(2px,0);  }
          80%      { clip-path: inset(54% 0 7% 0);  transform: translate(-2px,0); }
        }
        @keyframes glitch2 {
          0%,100% { clip-path: inset(50% 0 30% 0); transform: translate(2px,0);  }
          20%      { clip-path: inset(13% 0 72% 0); transform: translate(-1px,0); }
          40%      { clip-path: inset(80% 0 5% 0);  transform: translate(1px,0);  }
          60%      { clip-path: inset(37% 0 45% 0); transform: translate(-2px,0); }
          80%      { clip-path: inset(60% 0 20% 0); transform: translate(2px,0);  }
        }
        .glitch-wrap { position: relative; display: inline-block; }
        .glitch-wrap::before,
        .glitch-wrap::after {
          content: attr(data-text);
          position: absolute; inset: 0;
          color: #e63829;
          opacity: 0;
          transition: opacity .1s;
        }
        .glitch-wrap::before { opacity:.7; animation: glitch1 .4s steps(1) infinite; color:#ff6f61; }
        .glitch-wrap::after  { opacity:.5; animation: glitch2 .4s steps(1) infinite; color:#ff3022; }

        /* 3D section reveal */
        .reveal-3d {
          opacity: 0;
          transform: perspective(800px) translateZ(-40px) translateY(30px);
          transition: opacity .7s ease, transform .7s ease;
        }
        .reveal-3d.in-view {
          opacity: 1;
          transform: perspective(800px) translateZ(0) translateY(0);
        }

        /* Pulsing glow on step numbers */
        @keyframes numPulse {
          0%,100% { text-shadow: none; }
          50%      { text-shadow: 0 0 40px rgba(230,56,41,0.15); }
        }
        .step-num { animation: numPulse 3s ease-in-out infinite; }

        /* Tilt card shadow deepens on hover */
        .tilt-card { transition: box-shadow .2s ease, transform .15s ease-out; }
        .tilt-card:hover { box-shadow: 0 24px 60px rgba(0,0,0,0.12); }

        /* Magnetic button glow */
        .mag-btn { transition: transform .2s cubic-bezier(.23,1,.32,1), box-shadow .2s; }
        .mag-btn:hover { box-shadow: 0 0 30px rgba(230,56,41,0.35); }

        /* Ghost word drift */
        .ghost-a { opacity:.04; } .ghost-b { opacity:.035; } .ghost-c { opacity:.03; }
        .ghost-d { opacity:.025; } .ghost-e { opacity:.02; } .ghost-f { opacity:.03; }
        .ghost-g { opacity:.025; } .ghost-h { opacity:.02; } .ghost-i { opacity:.018; }
        .ghost-j { opacity:.015; }

        /* Hero h1 hover 3d */
        .hero-h1 { transform-style: preserve-3d; }
        .hero-h1:hover { transform: perspective(600px) rotateX(2deg) rotateY(-1deg); transition: transform .4s ease; }

        /* Animated border on pricing premium card */
        @keyframes borderGlow {
          0%,100% { box-shadow: 0 0 0 0 rgba(230,56,41,0); }
          50%      { box-shadow: 0 0 20px 4px rgba(230,56,41,0.2); }
        }
        .premium-card { animation: borderGlow 3s ease-in-out infinite; }

        /* FAQ open animation */
        details[open] summary { background: #f5f4f1; }
        details summary { user-select: none; }

        /* Scroll-triggered counter */
        .count-num {
          font-family: var(--font-bebas);
          font-size: 88px;
          letter-spacing: 2px;
          line-height: 1;
          color: #e8e6e1;
        }

        /* Fade-up stagger for hero (keep existing) */
        .fade-up-1,.fade-up-2,.fade-up-3,.fade-up-4 { opacity:0; transform:translateY(24px); animation: fadeUp .8s forwards; }
        .fade-up-1 { animation-delay:.1s; }
        .fade-up-2 { animation-delay:.25s; }
        .fade-up-3 { animation-delay:.4s; }
        .fade-up-4 { animation-delay:.55s; }
        @keyframes fadeUp { to { opacity:1; transform:translateY(0); } }
      `}</style>

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 pt-28 pb-16 relative overflow-hidden bg-white">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#0a0a0a 1px, transparent 1px), linear-gradient(90deg, #0a0a0a 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

        {/* Parallax ghost words */}
        <ParallaxGhosts scrollY={scrollY} />

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '3px' }} className="text-accent uppercase mb-6 fade-up-1 text-center">
          Your AI productivity warden
        </p>

        <h1
          className="hero-h1 text-black text-center fade-up-2"
          style={{ fontFamily: 'var(--font-bebas)', lineHeight: '0.9', letterSpacing: '4px' }}
        >
          <span className="block" style={{ fontSize: 'clamp(56px, 12vw, 155px)' }}>FACE WHAT</span>
          <span className="block" style={{ fontSize: 'clamp(56px, 12vw, 155px)' }}>
            YOU{' '}
            <span className="text-accent glitch-wrap" data-text="DID.">DID.</span>
          </span>
        </h1>

        <p className="text-base md:text-lg font-light text-muted text-center max-w-md leading-relaxed mt-6 md:mt-8 fade-up-3 px-2">
          Warditor shows you <strong className="text-black font-medium">exactly what you did instead of studying</strong> — and makes you feel every wasted minute. No blocking. No babysitting. Just the truth.
        </p>

        <div className="mt-5 fade-up-3 flex items-center gap-2 bg-off border border-border rounded-full px-4 py-2">
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }} className="text-muted">
            <span className="text-black font-medium">Warden</span> + <span className="text-black font-medium">Auditor</span> = <span className="text-accent font-medium">Warditor</span>
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-8 fade-up-4 w-full sm:w-auto px-4 sm:px-0">
          <MagneticButton
            href="#download"
            className="mag-btn bg-black text-white text-sm font-semibold px-8 py-3.5 rounded-lg hover:bg-accent transition-colors tracking-wide text-center"
          >
            ↓ Download on Android
          </MagneticButton>
          <Link href="/features" className="mag-btn border border-border text-black text-sm font-medium px-8 py-3.5 rounded-lg hover:border-black transition-colors tracking-wide text-center">
            See features
          </Link>
        </div>

        {/* Floating 3D ShameCard */}
        <div className="mt-12 w-full max-w-lg px-4 sm:px-0 shame-float" style={{ filter: 'drop-shadow(0 32px 48px rgba(0,0,0,0.14))' }}>
          <ShameCard />
        </div>
      </section>

      {/* TICKER */}
      <Ticker />

      {/* HOW IT WORKS */}
      <section className="py-16 md:py-28 px-6 md:px-12 max-w-6xl mx-auto">
        <RevealWrapper>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '3px' }} className="text-accent uppercase mb-4">The process</p>
        </RevealWrapper>
        <RevealWrapper>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(40px, 6vw, 80px)', letterSpacing: '2px', lineHeight: 1 }} className="text-black mb-10 md:mb-16">HOW IT<br />WORKS</h2>
        </RevealWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((s) => (
            <RevealWrapper key={s.num}>
              <TiltCard className="tilt-card p-2">
                <p className="step-num count-num">
                  <CountUp target={s.num} />
                </p>
                <p className="text-lg font-semibold text-black mt-[-10px] mb-3">{s.title}</p>
                <p className="text-sm font-light text-muted leading-relaxed">{s.desc}</p>
              </TiltCard>
            </RevealWrapper>
          ))}
        </div>
      </section>

      <div className="border-t border-border" />

      {/* FEATURES */}
      <section className="py-16 md:py-28 px-6 md:px-12 max-w-6xl mx-auto">
        <RevealWrapper>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '3px' }} className="text-accent uppercase mb-4">What makes it different</p>
        </RevealWrapper>
        <RevealWrapper>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(40px, 6vw, 80px)', letterSpacing: '2px', lineHeight: 1 }} className="text-black mb-10 md:mb-16">BUILT TO<br />CONFRONT</h2>
        </RevealWrapper>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f) => (
            <RevealWrapper key={f.title}>
              <TiltCard className="tilt-card bg-off border border-border rounded-2xl p-6 md:p-8 hover:border-black transition-all duration-200">
                <div className="w-11 h-11 bg-black rounded-xl flex items-center justify-center text-xl mb-5">{f.icon}</div>
                <p className="text-base font-semibold text-black mb-3">{f.title}</p>
                <p className="text-sm font-light text-muted leading-relaxed">{f.desc}</p>
              </TiltCard>
            </RevealWrapper>
          ))}
        </div>
      </section>

      <div className="border-t border-border" />

      {/* EMOTIONAL */}
      <section className="py-16 md:py-28 px-6 md:px-12 bg-off">
        <div className="max-w-3xl mx-auto text-center">
          <RevealWrapper>
            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(36px, 6vw, 80px)', letterSpacing: '2px', lineHeight: 1 }} className="text-black mb-8">
              YOU ALREADY KNOW<br />
              YOU&apos;RE{' '}
              <span className="text-accent glitch-wrap" data-text="WASTING TIME.">WASTING TIME.</span>
              <br />NOW FEEL IT.
            </h2>
          </RevealWrapper>
          <RevealWrapper>
            <p className="text-base font-light text-muted leading-relaxed mb-6">Every other app tries to block you, bribe you with streaks, or gamify your focus. Warditor does none of that. It just holds up a mirror — and makes you sit with what you see.</p>
            <p className="text-base font-light text-muted leading-relaxed">Because you don&apos;t need another blocker. You need to feel the weight of the hours you&apos;re trading away. The exam you didn&apos;t prepare for. The version of yourself you keep postponing.</p>
          </RevealWrapper>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* PRICING */}
      <section id="pricing" className="py-16 md:py-28 px-6 md:px-12 max-w-6xl mx-auto">
        <RevealWrapper>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '3px' }} className="text-accent uppercase mb-4">Simple pricing</p>
        </RevealWrapper>
        <RevealWrapper>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(40px, 6vw, 80px)', letterSpacing: '2px', lineHeight: 1 }} className="text-black mb-10 md:mb-16">NO EXCUSES<br />TO NOT START</h2>
        </RevealWrapper>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
          <RevealWrapper>
            <TiltCard className="tilt-card border-2 border-border rounded-2xl p-7 md:p-9 h-full">
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
              <MagneticButton href="#download" className="mag-btn block text-center border-2 border-border text-black text-sm font-semibold py-3 rounded-lg hover:border-black transition-colors">
                Download free
              </MagneticButton>
            </TiltCard>
          </RevealWrapper>
          <RevealWrapper>
            <TiltCard className="tilt-card premium-card relative border-2 border-black rounded-2xl p-7 md:p-9 bg-black text-white h-full">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] font-bold tracking-widest uppercase px-4 py-1 rounded-full" style={{ fontFamily: 'var(--font-mono)' }}>Most popular</div>
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
              <MagneticButton href="#download" className="mag-btn block text-center bg-accent text-white text-sm font-semibold py-3 rounded-lg hover:bg-red-600 transition-colors">
                Get Premium →
              </MagneticButton>
            </TiltCard>
          </RevealWrapper>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-16 md:py-28 px-6 md:px-12 max-w-6xl mx-auto">
        <RevealWrapper>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '3px' }} className="text-accent uppercase mb-4">What people are saying</p>
        </RevealWrapper>
        <RevealWrapper>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(40px, 6vw, 80px)', letterSpacing: '2px', lineHeight: 1 }} className="text-black mb-10 md:mb-16">THEY FELT IT<br />TOO.</h2>
        </RevealWrapper>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <RevealWrapper key={t.name}>
              <TiltCard className="tilt-card bg-off border border-border rounded-2xl p-6 md:p-7 flex flex-col gap-5 h-full hover:border-black transition-all duration-200">
                <p className="text-sm font-light text-black leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ fontFamily: 'var(--font-mono)' }}>{t.name[0]}</div>
                  <div>
                    <p className="text-sm font-semibold text-black">{t.name}</p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px' }} className="text-muted">{t.tag}</p>
                  </div>
                </div>
              </TiltCard>
            </RevealWrapper>
          ))}
        </div>
      </section>

      <div className="border-t border-border" />

      {/* FAQ */}
      <section className="py-16 md:py-28 px-6 md:px-12 max-w-4xl mx-auto">
        <RevealWrapper>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '3px' }} className="text-accent uppercase mb-4">Common questions</p>
        </RevealWrapper>
        <RevealWrapper>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(40px, 6vw, 80px)', letterSpacing: '2px', lineHeight: 1 }} className="text-black mb-10 md:mb-16">YOU PROBABLY<br />WANT TO KNOW.</h2>
        </RevealWrapper>
        <div className="flex flex-col gap-4">
          {faqs.map((item, i) => (
            <RevealWrapper key={i}>
              <details className="group border border-border rounded-2xl overflow-hidden" style={{ transition: 'box-shadow .2s' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.07)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '')}
              >
                <summary className="flex items-center justify-between px-5 md:px-8 py-5 md:py-6 cursor-pointer list-none hover:bg-off transition-colors">
                  <p className="text-sm md:text-base font-semibold text-black pr-6">{item.q}</p>
                  <span className="text-muted text-xl flex-shrink-0 group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <div className="px-5 md:px-8 pb-5 md:pb-6 border-t border-border">
                  <p className="text-sm font-light text-muted leading-relaxed pt-4 md:pt-5">{item.a}</p>
                </div>
              </details>
            </RevealWrapper>
          ))}
        </div>
      </section>

      <div className="border-t border-border" />

      {/* DOWNLOAD CTA */}
      <section id="download" className="py-16 md:py-28 px-6 md:px-12 bg-black text-white text-center relative overflow-hidden">
        {/* Radial glow behind headline */}
        <div aria-hidden="true" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(230,56,41,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <RevealWrapper>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(44px, 8vw, 100px)', letterSpacing: '4px', lineHeight: 0.95 }} className="mb-8 relative z-10">
            STOP LYING<br />TO{' '}
            <span className="text-accent glitch-wrap" data-text="YOURSELF.">YOURSELF.</span>
          </h2>
          <p className="text-base font-light text-white/50 max-w-md mx-auto mb-10 leading-relaxed relative z-10">
            Download Warditor. Let it watch. And tomorrow morning, read the report you deserve.
          </p>
          <MagneticButton
            href="/preregister"
            className="mag-btn relative z-10 inline-flex items-center gap-3 bg-white text-black text-sm font-bold px-8 md:px-10 py-4 rounded-lg hover:bg-accent hover:text-white transition-colors tracking-wide"
          >
            ↓ Download Warditor on Android
          </MagneticButton>
        </RevealWrapper>
      </section>
    </>
  )
}
