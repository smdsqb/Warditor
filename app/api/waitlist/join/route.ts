import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase-admin'
import { FieldValue } from 'firebase-admin/firestore'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    console.log(`[JOIN] Attempting to add email: ${email}`)

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const normalised = email.toLowerCase().trim()

    const existing = await db
      .collection('waitlist')
      .where('email', '==', normalised)
      .limit(1)
      .get()

    if (!existing.empty) {
      return NextResponse.json({ error: "You're already on the list!" }, { status: 409 })
    }

    const docRef = await db.collection('waitlist').add({
      email: normalised,
      createdAt: FieldValue.serverTimestamp(),
      source: 'preregister-page',
    })
    console.log(`[JOIN] Added document with ID: ${docRef.id}`)

    await resend.emails.send({
      from: 'Warditor <hello@warditor.com>',
      to: normalised,
      subject: "You're on the Warditor waitlist.",
      html: `
        <div style="background:#0a0a0a;color:#fff;font-family:monospace;padding:40px;max-width:520px;margin:auto;border-radius:12px;">
          <div style="color:#e63829;font-size:28px;font-weight:900;letter-spacing:4px;margin-bottom:24px;">WARDITOR</div>
          <h1 style="font-size:22px;font-weight:700;margin-bottom:16px;">You're in.</h1>
          <p style="color:rgba(255,255,255,0.55);line-height:1.7;margin-bottom:24px;">
            V1 is being tested right now. We're targeting a <strong style="color:#fff;">June 2026</strong> launch, Android first.
            You'll be the first to know when it drops.
          </p>
          <p style="color:rgba(255,255,255,0.55);line-height:1.7;margin-bottom:32px;">
            Start thinking about yesterday. It's already too late to change it.
          </p>
          <a href="https://warditor.vercel.app/changelog" style="display:inline-block;background:#e63829;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:700;">
            Track our progress →
          </a>
          <p style="color:rgba(255,255,255,0.2);font-size:11px;margin-top:32px;letter-spacing:1px;">
            Warden + Auditor = Warditor · Built by two teenagers who stopped lying to themselves.
          </p>
        </div>
      `,
    })
    console.log(`[JOIN] Welcome email sent to: ${normalised}`)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Waitlist join error:', err)
    return NextResponse.json({ error: 'Server error. Try again.' }, { status: 500 })
  }
}
