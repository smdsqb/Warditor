export default function ShameCard() {
  return (
    <div className="w-full max-w-lg mx-auto fade-up-5">
      <div className="relative bg-off border border-border rounded-2xl p-7 shame-accent overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ fontFamily: 'var(--font-mono)' }}>
            W
          </div>
          <div>
            <p className="text-sm font-semibold text-black">Your Daily Audit — Yesterday</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }} className="text-muted">Monday, 12 May · Chemistry exam was Tuesday</p>
          </div>
        </div>

        {/* Shame text */}
        <p className="text-sm font-light text-black leading-relaxed mb-5">
          You opened{' '}
          <span className="bg-red-50 text-accent font-medium px-1 rounded">Instagram 14 times</span>
          {' '}for a combined{' '}
          <span className="bg-red-50 text-accent font-medium px-1 rounded">2.4 hours</span>.
          You spent another{' '}
          <span className="bg-red-50 text-accent font-medium px-1 rounded">1.8 hrs on YouTube Shorts</span>.
          {' '}You told yourself you&apos;d revise at 7pm. You didn&apos;t. You had a Chemistry exam the next morning.
          {' '}You scored{' '}
          <span className="bg-red-50 text-accent font-medium px-1 rounded">34%.</span>
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { val: '4.2', label: 'hrs wasted' },
            { val: '14×', label: 'insta opens' },
            { val: '34%', label: 'exam score' },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-border rounded-xl p-3 text-center">
              <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '30px', letterSpacing: '1px' }} className="text-accent leading-none">
                {s.val}
              </p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.5px' }} className="text-muted mt-1 uppercase">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
