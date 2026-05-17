'use client'
import { useRef, MouseEvent } from 'react'

export default function ShameCard() {
  const cardRef = useRef<HTMLDivElement>(null)

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotateX = ((y - cy) / cy) * -10
    const rotateY = ((x - cx) / cx) * 10
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`
  }

  function handleMouseLeave() {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
  }

  return (
    <div className="w-full max-w-lg mx-auto fade-up-5" style={{ perspective: '1000px' }}>
      <div className="relative">
        {/* Stacked depth cards */}
        <div className="absolute inset-0 bg-off border border-border rounded-2xl"
          style={{ transform: 'translateY(8px) translateX(6px) scale(0.97)', zIndex: 0, opacity: 0.6 }} />
        <div className="absolute inset-0 bg-off border border-border rounded-2xl"
          style={{ transform: 'translateY(16px) translateX(12px) scale(0.94)', zIndex: 0, opacity: 0.3 }} />

        {/* Main 3D card */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative z-10 bg-off border border-border rounded-2xl p-7 overflow-hidden cursor-default"
          style={{ transition: 'transform 0.15s ease', transformStyle: 'preserve-3d' }}
        >
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-accent rounded-t-2xl" />

          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
              style={{ fontFamily: 'var(--font-mono)' }}>W</div>
            <div>
              <p className="text-sm font-semibold text-black">Your Daily Audit — Yesterday</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }} className="text-muted">
                Monday, 12 May · Chemistry exam was Tuesday
              </p>
            </div>
          </div>

          <p className="text-sm font-light text-black leading-relaxed mb-5">
            You opened{' '}
            <span className="bg-red-50 text-accent font-medium px-1 rounded">Instagram 14 times</span>
            {' '}for a combined{' '}
            <span className="bg-red-50 text-accent font-medium px-1 rounded">2.4 hours</span>.
            You spent another{' '}
            <span className="bg-red-50 text-accent font-medium px-1 rounded">1.8 hrs on YouTube Shorts</span>.
            {' '}You told yourself you&apos;d revise at 7pm. You didn&apos;t. You had a Chemistry exam the next morning.
            You scored{' '}
            <span className="bg-red-50 text-accent font-medium px-1 rounded">34%.</span>
          </p>

          <div className="grid grid-cols-3 gap-3">
            {[
              { val: '4.2', label: 'hrs wasted' },
              { val: '14×', label: 'insta opens' },
              { val: '34%', label: 'exam score' },
            ].map((s) => (
              <div key={s.label} className="bg-white border border-border rounded-xl p-3 text-center">
                <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '30px', letterSpacing: '1px' }}
                  className="text-accent leading-none">{s.val}</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.5px' }}
                  className="text-muted mt-1 uppercase">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
