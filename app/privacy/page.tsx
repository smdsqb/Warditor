export const metadata = {
  title: 'Privacy Policy',
  description: 'How Warditor handles your data. Plainly and honestly.',
}

const sections = [
  {
    title: 'What we collect',
    content: [
      'App usage data — which apps were open, for how long, and how many times (via Android UsageStats API)',
      'Platform data — only if you explicitly connect YouTube, Reddit, Instagram or Google accounts via OAuth',
      'Account information — email address for account creation and authentication',
      'Usage patterns — aggregated insights derived from your raw usage data',
    ],
  },
  {
    title: 'What we do not collect',
    content: [
      'The content of your messages, emails or personal communications',
      'Location data of any kind',
      'Raw browsing history without your explicit platform connection',
      'Any data from apps you have not granted us access to',
      'Biometric or sensitive personal data',
    ],
  },
  {
    title: 'How we use your data',
    content: [
      'To generate your daily AI shame report and productivity insights',
      'To identify patterns between your usage behaviour and outcomes over time',
      'To provide the accountability partner feature if you choose to enable it',
      'We never sell your data to third parties. Ever.',
    ],
  },
  {
    title: 'Data storage and security',
    content: [
      'Your data is stored securely on Firebase (Google Cloud) with encryption at rest',
      'Only aggregated insights are stored server-side — raw sensitive data is processed locally where possible',
      'We retain your data for as long as your account is active, or 30 days after deletion',
      'You can request full data deletion at any time by contacting us',
    ],
  },
  {
    title: 'Your rights',
    content: [
      'Access — you can view all data we hold about you at any time in the app',
      'Deletion — you can delete your account and all associated data permanently',
      'Portability — you can export your data in a readable format on request',
      'Withdrawal — you can revoke any platform connection at any time from app settings',
    ],
  },
  {
    title: 'Third party services',
    content: [
      'Firebase (Google) — authentication and data storage',
      'Gemini — AI processing of usage data to generate reports (data is not retained by Gemini)',
      'YouTube, Reddit, Instagram APIs — only accessed if you explicitly connect your accounts',
      'Razorpay — payment processing for Premium subscriptions (we do not store card details)',
    ],
  },
  {
    title: 'Contact',
    content: [
      'For any privacy questions or data requests, contact us at: changethislater@xyz.com',
      'We aim to respond to all requests within 72 hours',
    ],
  },
]

export default function Privacy() {
  return (
    <div className="pt-32 pb-28 px-12 max-w-3xl mx-auto">
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '3px' }} className="text-accent uppercase mb-4">
        Legal
      </p>
      <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(48px, 6vw, 80px)', letterSpacing: '3px', lineHeight: 1 }} className="text-black mb-4">
        PRIVACY<br />POLICY
      </h1>
      <p className="text-sm font-light text-muted mb-2">Last updated: May 2026</p>
      <p className="text-base font-light text-muted leading-relaxed mb-16 max-w-xl">
        We know you&apos;re trusting us with sensitive data. We take that seriously. This policy is written in plain English — not legal jargon — because you deserve to actually understand it.
      </p>

      <div className="flex flex-col gap-12">
        {sections.map((s, i) => (
          <div key={s.title} className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '2px' }} className="text-accent uppercase">
                0{i + 1}
              </p>
              <h2 className="text-lg font-semibold text-black">{s.title}</h2>
            </div>
            <ul className="flex flex-col gap-2.5 border-l-2 border-border pl-6">
              {s.content.map((c) => (
                <li key={c} className="text-sm font-light text-muted leading-relaxed">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
