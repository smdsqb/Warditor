export const metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and conditions for using Warditor.',
}

const sections = [
  {
    title: 'Acceptance of terms',
    content: [
      'By downloading, installing or using Warditor, you agree to be bound by these Terms and Conditions.',
      'If you do not agree to these terms, do not use the app or website.',
      'We may update these terms from time to time. Continued use of the app after changes means you accept the new terms.',
    ],
  },
  {
    title: 'What Warditor is',
    content: [
      'Warditor is a personal productivity and screen time awareness app for Android.',
      'It tracks your app usage, generates AI-powered daily reports, and optionally connects to third-party platforms to provide deeper insights.',
      'Warditor is a tool for self-awareness — it does not block apps, restrict your device, or make decisions on your behalf.',
    ],
  },
  {
    title: 'Your account',
    content: [
      'You must sign in with a Google account to use Warditor.',
      'You are responsible for maintaining the security of your account.',
      'You must be at least 10 years old to use Warditor. If you are under 18, you confirm you have parental consent.',
      'One account per person. You may not share your account with others.',
    ],
  },
  {
    title: 'Acceptable use',
    content: [
      'You agree not to reverse engineer, decompile or attempt to extract the source code of the app.',
      'You agree not to use Warditor for any unlawful purpose.',
      'You agree not to attempt to gain unauthorised access to any part of our systems or infrastructure.',
      'You agree not to misuse the accountability partner feature to harass or monitor another person without their consent.',
    ],
  },
  {
    title: 'Subscriptions and payments',
    content: [
      'Warditor offers a free tier and a Premium subscription at $4.99/month.',
      'Payments are processed securely via Razorpay. We do not store your card details.',
      'Subscriptions renew automatically unless cancelled before the renewal date.',
      'Refunds are handled on a case-by-case basis. Contact us within 7 days of a charge if you believe an error occurred.',
      'We reserve the right to change pricing with 30 days notice to existing subscribers.',
    ],
  },
  {
    title: 'Third-party platform connections',
    content: [
      'Warditor can optionally connect to Reddit, Discord, Github, GitLab, Spotify, Twitch & Zoom via OAuth.',
      'These connections are entirely opt-in and can be revoked at any time from app settings.',
      'We are not responsible for any changes to third-party APIs that may affect functionality.',
      'Your use of connected platforms remains subject to those platforms\' own terms of service.',
    ],
  },
  {
    title: 'Intellectual property',
    content: [
      'All content, design, code and branding associated with Warditor is owned by Warditor and protected by copyright.',
      'You may not reproduce, distribute or create derivative works from our content without written permission.',
      'The name "Warditor", our logo and brand identity are our intellectual property.',
    ],
  },
  {
    title: 'Disclaimer and limitation of liability',
    content: [
      'Warditor is provided "as is" without warranties of any kind, express or implied.',
      'We do not guarantee that the app will be error-free, uninterrupted, or that data will never be lost.',
      'We are not responsible for any decisions you make based on your shame reports or usage data.',
      'To the maximum extent permitted by law, our total liability to you shall not exceed the amount you paid us in the 12 months preceding the claim.',
    ],
  },
  {
    title: 'Termination',
    content: [
      'You can delete your account at any time from within the app.',
      'We reserve the right to suspend or terminate accounts that violate these terms.',
      'Upon termination, your data will be deleted within 30 days as described in our Privacy Policy.',
    ],
  },
  {
    title: 'Governing law',
    content: [
      'These terms are governed by applicable law in the jurisdiction where Warditor is registered.',
      'Any disputes will be resolved through good-faith negotiation before any formal legal proceedings.',
    ],
  },
  {
    title: 'Contact',
    content: [
      'For any questions about these terms, contact us at: changethislater@xyz.com',
      'We aim to respond to all enquiries within 72 hours.',
    ],
  },
]

export default function Terms() {
  return (
    <div className="pt-32 pb-28 px-12 max-w-3xl mx-auto">
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '3px' }} className="text-accent uppercase mb-4">
        Legal
      </p>
      <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(48px, 6vw, 80px)', letterSpacing: '3px', lineHeight: 1 }} className="text-black mb-4">
        TERMS &amp;<br />CONDITIONS
      </h1>
      <p className="text-sm font-light text-muted mb-2">Last updated: 17th July 2026</p>
      <p className="text-base font-light text-muted leading-relaxed mb-16 max-w-xl">
        Plain English. No legal jargon. These are the rules for using Warditor — please read them before you do.
      </p>

      <div className="flex flex-col gap-12">
        {sections.map((s, i) => (
          <div key={s.title} className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '2px' }} className="text-accent uppercase">
                {String(i + 1).padStart(2, '0')}
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
