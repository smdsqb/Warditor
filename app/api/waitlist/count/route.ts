import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase-admin'

export async function GET() {
  const snapshot = await db.collection('waitlist').count().get()
  return NextResponse.json({ count: snapshot.data().count })
}
