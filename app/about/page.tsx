import RevealWrapper from '../../components/RevealWrapper'

export const metadata = {
  title: 'About — Warditor',
  description: 'Two teenagers who got tired of lying to themselves. So they built something that wouldn\'t let them.',
}

export default function About() {
  return (
    <div className="pt-32 pb-28 px-12 max-w-4xl mx-auto">
      <RevealWrapper>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '3px' }} className="text-accent uppercase mb-4">
          Our story
        </p>
      </RevealWrapper>

      <RevealWrapper>
        <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(48px, 8vw, 96px)', letterSpacing: '3px', lineHeight: 1 }} className="text-black mb-12">
          BUILT BY TWO<br />
          TEENAGERS WHO<br />
          <span className="text-accent">STOPPED LYING.</span>
        </h1>
      </RevealWrapper>

      <div className="grid grid-cols-2 gap-16 mb-20">
        <RevealWrapper>
          <div className="flex flex-col gap-5 text-base font-light text-muted leading-relaxed">
            <p>
              Warditor started with a simple, uncomfortable observation — every productivity app tells you what you <em>should</em> do. None of them make you truly reckon with what you actually did.
            </p>
            <p>
              We were students. We had exams. We had plans. We had timers and blockers and Pomodoro apps. And we still spent three hours on YouTube the night before a paper.
            </p>
            <p>
              The blockers didn&apos;t work because they were easy to turn off. The streaks didn&apos;t work because missing one felt the same as missing ten. The dashboards didn&apos;t work because a bar chart doesn&apos;t make you feel anything.
            </p>
          </div>
        </RevealWrapper>
        <RevealWrapper>
          <div className="flex flex-col gap-5 text-base font-light text-muted leading-relaxed">
            <p>
              What actually changed our behaviour was something much simpler and much harder — seeing the truth written out in plain language. Reading that you opened Instagram fourteen times before 10am. That you watched six episodes the night before your exam. That you scored 34%.
            </p>
            <p>
              That&apos;s what Warditor is. Not a blocker. Not a motivator. A mirror. A warden that audits your day and makes you sit with what you find.
            </p>
            <p>
              We built it because we needed it. And because we were tired of pretending we didn&apos;t.
            </p>
          </div>
        </RevealWrapper>
      </div>

      {/* Etymology */}
      <RevealWrapper>
        <div className="bg-off border border-border rounded-2xl p-10 text-center">
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '3px' }} className="text-muted uppercase mb-6">
            The name
          </p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="text-center">
              <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '48px', letterSpacing: '3px' }} className="text-black">WARDEN</p>
              <p className="text-sm text-muted font-light mt-1">Guards. Watches. Doesn&apos;t let you off easy.</p>
            </div>
            <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '48px' }} className="text-accent">+</p>
            <div className="text-center">
              <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '48px', letterSpacing: '3px' }} className="text-black">AUDITOR</p>
              <p className="text-sm text-muted font-light mt-1">Reviews. Records. Shows you the receipts.</p>
            </div>
            <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '48px' }} className="text-accent">=</p>
            <div className="text-center">
              <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '48px', letterSpacing: '3px' }} className="text-accent">WARDITOR</p>
              <p className="text-sm text-muted font-light mt-1">Your daily reckoning.</p>
            </div>
          </div>
        </div>
      </RevealWrapper>
    </div>
  )
}
