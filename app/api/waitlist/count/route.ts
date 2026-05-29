import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase-admin'

export async function GET() {
  try {
    // DO NOT use count() aggregation – it can be stale.
    // Fetch all documents and return the array length.
    const snapshot = await db.collection('waitlist').get()
    const count = snapshot.size
    console.log(`[COUNT] Total documents in waitlist: ${count}`)
    return NextResponse.json({ count })
  } catch (err) {
    console.error('[COUNT] Error:', err)
    return NextResponse.json({ count: 0 }, { status: 500 })
  }
}
