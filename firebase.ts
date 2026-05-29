import { db } from '@/lib/firebase'
import { collection, addDoc, getCountFromServer, serverTimestamp } from 'firebase/firestore'

Collection: "waitlist"
Document shape: { email: string, createdAt: Timestamp, source: string }
