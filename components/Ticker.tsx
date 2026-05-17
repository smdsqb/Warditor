const items = [
  'You opened Reddit 47 times yesterday',
  '3.2 hours on YouTube Shorts',
  'Exam was this morning',
  'Instagram opened 14× before 10am',
  'You said you\'d study at 7pm',
  'You watched 6 episodes instead',
  'You scored 34% on that exam',
  'You knew this would happen',
]

export default function Ticker() {
  const doubled = [...items, ...items]

  return (
    <div className="bg-black py-3.5 overflow-hidden whitespace-nowrap">
      <div className="inline-flex ticker-animate">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6">
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '1px' }} className="text-white/50 px-8">
              {item.includes('47') || item.includes('3.2') || item.includes('14×') || item.includes('34%') || item.includes('6 episodes')
                ? item.split(/(\d[\d.]*×?%?)/g).map((part, j) =>
                    /\d/.test(part) ? <span key={j} className="text-accent">{part}</span> : part
                  )
                : item}
            </span>
            <span className="text-white/20">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
