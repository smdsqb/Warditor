'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import RevealWrapper from '../../components/RevealWrapper'

// ─── Firestore integration ───────────────────────────────────────────────────
// Install: npm install firebase
// In your firebase.ts config file, import and use like:
//
// import { db } from '@/lib/firebase'
// import { collection, addDoc, getCountFromServer, serverTimestamp } from 'firebase/firestore'
//
// Collection: "waitlist"
// Document shape: { email: string, createdAt: Timestamp, source: string }
// ─────────────────────────────────────────────────────────────────────────────

const PARTICLE_COUNT = 28

function useCountUp(target: number, duration = 1400) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (target === 0) return
    let start = 0
    const startTime = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      const val = Math.floor(eased * target)
      setCount(val)
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target, duration])
  return count
}

export default function PreRegister() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [waitlistCount, setWaitlistCount] = useState(0)
  const [particles, setParticles] = useState<{ x: number; y: number; size: number; delay: number; duration: number; opacity: number }[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const displayCount = useCountUp(waitlistCount, 1200)

  // Generate particles client-side only (avoids hydration mismatch)
  useEffect(() => {
    setParticles(
      Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 6,
        duration: Math.random() * 8 + 6,
        opacity: Math.random() * 0.4 + 0.1,
      }))
    )
  }, [])

  // Fetch real count from Firestore via API route
  useEffect(() => {
    fetch('/api/waitlist/count')
      .then(r => r.json())
      .then(d => setWaitlistCount(d.count ?? 0))
      .catch(() => setWaitlistCount(0))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/waitlist/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      setStatus('success')
      setWaitlistCount(prev => prev + 1)
    } catch (err: unknown) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Try again.')
    }
  }

  const buttonLabel = status === 'loading'
    ? 'Joining...'
    : status === 'success'
    ? '✓ You\'re on the list'
    : `Join ${displayCount > 0 ? displayCount + ' others' : 'the waitlist'} →`

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0a0a0a] flex flex-col">

      <style>{`
        /* ── Animations ── */
        @keyframes gridPulse {
          0%,100% { opacity: 0.04; }
          50%      { opacity: 0.07; }
        }
        @keyframes particleFloat {
          0%   { transform: translateY(0px) translateX(0px); opacity: var(--op); }
          33%  { transform: translateY(-30px) translateX(10px); opacity: calc(var(--op) * 1.5); }
          66%  { transform: translateY(-15px) translateX(-8px); opacity: calc(var(--op) * 0.7); }
          100% { transform: translateY(0px) translateX(0px); opacity: var(--op); }
        }
        @keyframes scanDown {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes glowPulse {
          0%,100% { box-shadow: 0 0 40px rgba(230,56,41,0.2); }
          50%      { box-shadow: 0 0 80px rgba(230,56,41,0.4), 0 0 120px rgba(230,56,41,0.1); }
        }
        @keyframes borderSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes successPop {
          0%   { transform: scale(0.8); opacity: 0; }
          60%  { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes badgePulse {
          0%,100% { transform: scale(1); }
          50%      { transform: scale(1.04); }
        }
        @keyframes typeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes countBounce {
          0%   { transform: translateY(0); }
          30%  { transform: translateY(-4px); }
          100% { transform: translateY(0); }
        }

        /* ── Glitch effect for red text (from main page) ── */
        .glitch-wrap {
          position: relative;
          display: inline-block;
        }
        .glitch-wrap::before,
        .glitch-wrap::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #0a0a0a;
          overflow: hidden;
        }
        .glitch-wrap::before {
          left: 2px;
          opacity: 0.7;
          animation: glitch1 0.4s steps(1) infinite;
          color: #ff6f61;
        }
        .glitch-wrap::after {
          left: -2px;
          opacity: 0.5;
          animation: glitch2 0.4s steps(1) infinite;
          color: #ff3022;
        }
        @keyframes glitch1 {
          0%, 100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); transform: translate(0); }
          20% { clip-path: polygon(0 20%, 100% 20%, 100% 30%, 0 30%); transform: translate(-1px, 0); }
          40% { clip-path: polygon(0 60%, 100% 60%, 100% 70%, 0 70%); transform: translate(1px, 0); }
          60% { clip-path: polygon(0 80%, 100% 80%, 100% 90%, 0 90%); transform: translate(-1px, 0); }
          80% { clip-path: polygon(0 40%, 100% 40%, 100% 50%, 0 50%); transform: translate(1px, 0); }
        }
        @keyframes glitch2 {
          0%, 100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); transform: translate(0); }
          20% { clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%); transform: translate(1px, 0); }
          40% { clip-path: polygon(0 30%, 100% 30%, 100% 40%, 0 40%); transform: translate(-1px, 0); }
          60% { clip-path: polygon(0 90%, 100% 90%, 100% 100%, 0 100%); transform: translate(1px, 0); }
          80% { clip-path: polygon(0 50%, 100% 50%, 100% 60%, 0 60%); transform: translate(-1px, 0); }
        }

        /* ── Grid bg ── */
        .grid-bg {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: gridPulse 6s ease-in-out infinite;
        }

        /* ── Scan line ── */
        .scan-line {
          position: absolute; left: 0; right: 0; height: 2px;
          background: linear-gradient(to right, transparent, rgba(230,56,41,0.4), transparent);
          animation: scanDown 8s ease-in-out infinite;
          pointer-events: none;
        }

        /* ── Particles ── */
        .particle {
          position: absolute; border-radius: 50%;
          background: #e63829;
          animation: particleFloat var(--dur) ease-in-out infinite;
          animation-delay: var(--delay);
        }

        /* ── Glow orbs ── */
        .glow-orb {
          position: absolute; border-radius: 50%;
          filter: blur(80px); pointer-events: none;
        }

        /* ── Form card ── */
        .form-card {
          position: relative;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px;
          backdrop-filter: blur(20px);
        }
        .form-card::before {
          content: '';
          position: absolute; inset: -1px;
          border-radius: 25px;
          background: linear-gradient(135deg, rgba(230,56,41,0.3), transparent 40%, transparent 60%, rgba(230,56,41,0.1));
          pointer-events: none;
          z-index: -1;
        }

        /* ── Input ── */
        .waitlist-input {
          width: 100%; background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px; outline: none;
          color: #fff; font-size: 15px; font-family: inherit;
          padding: 16px 20px;
          transition: border-color .2s, background .2s, box-shadow .2s;
        }
        .waitlist-input::placeholder { color: rgba(255,255,255,0.25); }
        .waitlist-input:focus {
          border-color: rgba(230,56,41,0.6);
          background: rgba(255,255,255,0.09);
          box-shadow: 0 0 0 3px rgba(230,56,41,0.1);
        }

        /* ── Submit button ── */
        .submit-btn {
          width: 100%; padding: 17px 24px;
          background: #e63829; color: #fff;
          border: none; border-radius: 12px;
          font-size: 14px; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; cursor: pointer;
          transition: background .2s, transform .15s, box-shadow .2s;
          font-family: var(--font-mono);
          animation: glowPulse 3s ease-in-out infinite;
          position: relative; overflow: hidden;
        }
        .submit-btn::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%);
          pointer-events: none;
        }
        .submit-btn:hover:not(:disabled) {
          background: #c8301f;
          transform: translateY(-1px);
          box-shadow: 0 8px 32px rgba(230,56,41,0.5);
          animation: none;
        }
        .submit-btn:active:not(:disabled) { transform: translateY(0); }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; animation: none; }
        .submit-btn.success {
          background: #16a34a; animation: successPop .5s ease forwards, none;
          box-shadow: 0 8px 32px rgba(22,163,74,0.4);
        }

        /* ── Status badge ── */
        .status-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 14px; border-radius: 100px;
          font-size: 11px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; font-family: var(--font-mono);
          animation: badgePulse 2s ease-in-out infinite;
        }

        /* ── Count display ── */
        .count-display {
          font-family: var(--font-bebas);
          font-size: clamp(64px, 12vw, 120px);
          letter-spacing: 4px; line-height: 1;
          background: linear-gradient(135deg, #fff 30%, rgba(230,56,41,0.8));
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }

        /* ── Changelog pill ── */
        .changelog-pill {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 10px 20px; border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(10px);
          text-decoration: none;
          transition: border-color .2s, background .2s, transform .2s;
          font-family: var(--font-mono); font-size: 11px;
          letter-spacing: 2px; text-transform: uppercase;
          color: rgba(255,255,255,0.5);
        }
        .changelog-pill:hover {
          border-color: rgba(230,56,41,0.5);
          background: rgba(230,56,41,0.08);
          color: #fff;
          transform: translateY(-2px);
        }
        .changelog-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #e63829;
          box-shadow: 0 0 8px rgba(230,56,41,0.8);
          animation: badgePulse 1.5s ease-in-out infinite;
        }

        /* ── Feature chips ── */
        .feature-chip {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 16px; border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          font-size: 12px; color: rgba(255,255,255,0.5);
          font-family: var(--font-mono); letter-spacing: 1px;
          white-space: nowrap;
        }

        /* ── Typewriter line ── */
        .typewriter-line {
          animation: typeIn .5s ease forwards;
        }

        /* ── Mobile resp ── */
        @media (max-width: 640px) {
          .form-card { border-radius: 20px; }
        }
      `}</style>

      {/* ── Background layers ── */}
      <div className="grid-bg" />
      <div className="scan-line" />

      {/* Glow orbs */}
      <div className="glow-orb" style={{ width: '600px', height: '600px', top: '-200px', left: '-200px', background: 'rgba(230,56,41,0.08)' }} />
      <div className="glow-orb" style={{ width: '400px', height: '400px', bottom: '-100px', right: '-100px', background: 'rgba(230,56,41,0.06)' }} />
      <div className="glow-orb" style={{ width: '300px', height: '300px', top: '40%', left: '60%', background: 'rgba(230,56,41,0.04)' }} />

      {/* Particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            '--op': p.opacity,
            '--dur': `${p.duration}s`,
            '--delay': `${p.delay}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* ── Page content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-24">

        {/* Changelog pill link */}
        <RevealWrapper>
          <div className="flex justify-center mb-10">
            <Link href="/changelog" className="changelog-pill">
              <div className="changelog-dot" />
              V0.3 live · V1 testing now
              <span style={{ color: '#e63829' }}>→ Changelog</span>
            </Link>
          </div>
        </RevealWrapper>

        {/* Headline */}
        <RevealWrapper>
          <div className="text-center mb-4 max-w-4xl">
            <h1
              style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '4px', lineHeight: '0.88' }}
              className="text-white"
            >
              <span className="block" style={{ fontSize: 'clamp(52px, 11vw, 140px)' }}>THE APP THAT</span>
              <span className="block glitch-wrap" data-text="AUDITS YOU." style={{ fontSize: 'clamp(52px, 11vw, 140px)', color: '#e63829' }}>AUDITS YOU.</span>
            </h1>
          </div>
        </RevealWrapper>

        {/* Sub-headline */}
        <RevealWrapper>
          <p className="text-center text-base md:text-lg font-light leading-relaxed mb-4 max-w-lg" style={{ color: 'rgba(255,255,255,0.45)' }}>
            No blockers. No streaks. No gamification. Just{' '}
            <span style={{ color: 'rgba(255,255,255,0.8)' }}>a story about what you actually did</span>{' '}
            — and the exam you said you&apos;d study for.
          </p>
        </RevealWrapper>

        {/* ── MAIN FORM CARD ── */}
        <RevealWrapper>
          <div className="w-full max-w-md">
            <div className="form-card p-8 md:p-10">

              {status !== 'success' ? (
                <>
                  {/* Live count */}
                  <div className="text-center mb-8">
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '3px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Already waiting
                    </p>
                    <div className="count-display">{displayCount}</div>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '2px', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', marginTop: '4px' }}>
                      people registered
                    </p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '12px' }}>
                      <input
                        ref={inputRef}
                        type="email"
                        className="waitlist-input"
                        placeholder="your@email.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        disabled={status === 'loading'}
                        autoComplete="email"
                      />
                    </div>

                    {status === 'error' && (
                      <p style={{ color: '#e63829', fontSize: '12px', fontFamily: 'var(--font-mono)', marginBottom: '10px', letterSpacing: '0.5px' }}>
                        ⚠ {errorMsg}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="submit-btn"
                      disabled={status === 'loading'}
                    >
                      {buttonLabel}
                    </button>
                  </form>

                  <p style={{ textAlign: 'center', marginTop: '14px', fontSize: '11px', fontFamily: 'var(--font-mono)', letterSpacing: '1px', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>
                    No spam. Just a heads-up when V1 drops.
                  </p>
                </>
              ) : (
                /* ── Success state ── */
                <div className="text-center" style={{ animation: 'successPop .5s ease forwards', padding: '16px 0' }}>
                  <div style={{ fontSize: '56px', marginBottom: '20px' }}>🎯</div>
                  <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '40px', letterSpacing: '3px', color: '#fff', marginBottom: '12px' }}>
                    YOU&apos;RE IN.
                  </h2>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: '1.6', marginBottom: '24px', fontFamily: 'var(--font-dm)' }}>
                    We&apos;ll hit you up when V1 drops in June 2026.{' '}
                    Start thinking about yesterday. It&apos;s already too late to change it.
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="count-display" style={{ fontSize: '56px', marginBottom: '4px' }}>{displayCount}</div>
                  </div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '2px', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>
                    and counting
                  </p>
                </div>
              )}
            </div>
          </div>
        </RevealWrapper>

        {/* Release date callout */}
        <RevealWrapper>
          <div className="mt-10 text-center">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '12px 24px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '2px', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>Target launch</span>
              <span style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.1)' }} />
              <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '18px', letterSpacing: '2px', color: '#e63829' }}>June 2026</span>
              <span style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.1)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '2px', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>Android first</span>
            </div>
          </div>
        </RevealWrapper>

        {/* Back to home */}
        <RevealWrapper>
          <div className="mt-8">
            <Link href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '2px', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', textDecoration: 'none', transition: 'color .2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.2)' }}
            >
              ← Back to Warditor
            </Link>
          </div>
        </RevealWrapper>
 
      </div>
    </div>
  )
}