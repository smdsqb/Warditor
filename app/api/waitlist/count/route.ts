import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase-admin'

// This line tells Next.js to never cache this route.
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Fetch all documents and return the array length.
    // getCountFromServer() can also be used here, but this is very reliable.
    const snapshot = await db.collection('waitlist').get()
    const count = snapshot.size
    console.log(`[COUNT] Total documents in waitlist: ${count}`)

    // These headers instruct Vercel's CDN not to cache the response.
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
