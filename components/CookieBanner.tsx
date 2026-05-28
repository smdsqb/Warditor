'use client'
import CookieConsent from 'react-cookie-consent'

export default function CookieBanner() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      enableDeclineButton
      flipButtons
      style={{
        background: '#0a0a0a',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '13px',
        alignItems: 'center',
        padding: '16px 24px',
        zIndex: 99990,
      }}
      contentStyle={{
        margin: '0',
        flex: '1',
        color: 'rgba(255,255,255,0.6)',
        lineHeight: '1.5',
      }}
      buttonStyle={{
        background: '#e63829',
        color: '#fff',
        fontSize: '11px',
        fontWeight: '700',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        borderRadius: '100px',
        padding: '8px 20px',
        margin: '0 0 0 8px',
        border: 'none',
        cursor: 'pointer',
      }}
      declineButtonStyle={{
        background: 'transparent',
        color: 'rgba(255,255,255,0.35)',
        fontSize: '11px',
        fontWeight: '600',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        borderRadius: '100px',
        padding: '8px 20px',
        margin: '0',
        border: '1px solid rgba(255,255,255,0.1)',
        cursor: 'pointer',
      }}
      expires={365}
    >
      We use cookies and collect usage data to improve your experience.{' '}
      <a href="/privacy" style={{ color: '#e63829', textDecoration: 'underline' }}>
        Privacy Policy
      </a>
      {' · '}
      <a href="/terms" style={{ color: '#e63829', textDecoration: 'underline' }}>
        Terms
      </a>
    </CookieConsent>
  )
}
