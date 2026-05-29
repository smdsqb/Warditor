import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase-admin'

export async function GET() {
  try {
    const snapshot = await db.collection('waitlist').get()
    const count = snapshot.size
    
    return new NextResponse(
      JSON.stringify({ count }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'CDN-Cache-Control': 'no-cache',
          'Vercel-CDN-Cache-Control': 'no-cache',
        }
      }
    )
  } catch (err) {
    console.error('[COUNT] Error:', err)
    return NextResponse.json({ count: 0 }, { status: 500 })
  }
}
