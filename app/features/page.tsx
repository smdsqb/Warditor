import RevealWrapper from '../../components/RevealWrapper'

export const metadata = {
  title: 'Features — Warditor',
  description: 'Everything Warditor does to make you confront your wasted time.',
}

const features = [
  { icon: '🧠', title: 'AI Shame Reports', desc: 'Every morning you get a personalised narrative — not a dashboard, not a pie chart, not a score. A story. Written in plain English. About you. About what you chose to do instead of what you promised yourself.', detail: "Powered by Gemini Flash 2.5, the shame report reads your usage data and writes a human-readable account of your day. It remembers what you said you'd do. It knows what you actually did. It puts them next to each other." },
  { icon: '📱', title: 'Native Android Tracking', desc: "Warditor uses Android's built-in UsageStats API — no shady permissions, no VPN required. It tracks which apps were open, for how long, and how many times you opened them.", detail: 'You grant usage access once in Android settings. After that, Warditor runs silently in the background. No battery drain, no popups. Just watching.' },
  { icon: '🔗', title: 'Deep Platform Integration', desc: 'Connect your Reddit, Discord, Github, GitLab, Spotify, Twitch & Zoom for a level of detail that will genuinely make you wonder.', detail: 'Instead of just "YouTube — 3.2 hours", Warditor can tell you which videos you watched, which subreddits you browsed, and which corners of the internet swallowed your evening - all optional and as per your choice.' },
  { icon: '📉', title: 'Consequence Correlation', desc: 'The feature that makes Warditor unlike anything else. Over time, it links your distraction patterns to your real outcomes.', detail: '"Every time you spend 3+ hours on Shorts before an exam, you score below 50%." That sentence, written by an AI, based on your own data, is more motivating than any streak or badge ever built.' },
  { icon: '👥', title: 'Accountability Partner', desc: 'Share your daily audit with a trusted friend. Not your highlights. Your actual report. The one with the numbers.', detail: "Nothing changes behaviour faster than another person seeing your screen time. Premium feature. For when you're ready to be serious." },
  { icon: '🔒', title: 'Privacy First', desc: "Your data belongs to you. We store only what's necessary, never sell it, and let you delete everything at any time.", detail: 'Raw usage data is processed and converted to insights. Sensitive browsing data never leaves your device unless you explicitly connect a platform. Full transparency in our privacy policy.' },
]

export default function Features() {
  return (
    <div className="pt-28 md:pt-32 pb-16 md:pb-28 px-6 md:px-12 max-w-5xl mx-auto">
      <RevealWrapper>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '3px' }} className="text-accent uppercase mb-4">What it does</p>
      </RevealWrapper>
      <RevealWrapper>
        <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(44px, 8vw, 96px)', letterSpacing: '3px', lineHeight: 1 }} className="text-black mb-4">
          BUILT TO<br /><span className="text-accent">CONFRONT.</span>
        </h1>
      </RevealWrapper>
      <RevealWrapper>
        <p className="text-base font-light text-muted max-w-xl leading-relaxed mb-12 md:mb-20">
          Every feature in Warditor exists for one reason — to make the cost of wasted time impossible to ignore.
        </p>
      </RevealWrapper>

      <div className="flex flex-col gap-4 md:gap-6">
        {features.map((f, i) => (
          <RevealWrapper key={f.title}>
            <div className="border border-border rounded-2xl p-6 md:p-10 hover:border-black transition-all duration-200 group">
              <div className="flex items-start gap-5 md:gap-8">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-black rounded-xl flex items-center justify-center text-xl md:text-2xl flex-shrink-0 group-hover:bg-accent transition-colors">{f.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 md:gap-4 mb-3 flex-wrap">
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '2px' }} className="text-muted uppercase">0{i + 1}</p>
                    <p className="text-base md:text-lg font-semibold text-black">{f.title}</p>
                  </div>
                  <p className="text-sm font-light text-muted leading-relaxed mb-3">{f.desc}</p>
                  <p className="text-sm font-light text-black/60 leading-relaxed border-l-2 border-accent pl-4">{f.detail}</p>
                </div>
              </div>
            </div>
          </RevealWrapper>
        ))}
      </div>
    </div>
  )
}
