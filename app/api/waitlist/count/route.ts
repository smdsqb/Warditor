import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase-admin'

export async function GET() {
  try {
    const snapshot = await db.collection('waitlist').get()
    const count = snapshot.size
    console.log(`[COUNT] Total documents: ${count}`)
    return NextResponse.json({ count })
  } catch (error) {
    console.error('[COUNT] Error:', error)
    return NextResponse.json({ count: 0 }, { status: 500 })
  }
}
