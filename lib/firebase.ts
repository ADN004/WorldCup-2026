import { initializeApp, getApps, type FirebaseApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  onSnapshot,
  type Firestore,
} from 'firebase/firestore'
import type { FanPoll } from '@/types'

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

let app: FirebaseApp | null = null
let db: Firestore | null = null

function isConfigured(): boolean {
  return Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.appId
  )
}

function getDb(): Firestore | null {
  if (!isConfigured()) return null
  if (!app) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
  }
  if (!db) {
    db = getFirestore(app)
  }
  return db
}

const POLL_DOC = 'worldcup2026/fanpoll'

export async function getPollData(): Promise<FanPoll | null> {
  const firestore = getDb()
  if (!firestore) return null
  try {
    const ref = doc(firestore, POLL_DOC)
    const snap = await getDoc(ref)
    if (!snap.exists()) return null
    return snap.data() as FanPoll
  } catch {
    return null
  }
}

export async function castVote(teamId: string): Promise<boolean> {
  const firestore = getDb()
  if (!firestore) return false
  try {
    const ref = doc(firestore, POLL_DOC)
    const snap = await getDoc(ref)
    if (!snap.exists()) {
      await setDoc(ref, {
        totalVotes: 1,
        lastUpdated: new Date().toISOString(),
        entries: [{ teamId, votes: 1 }],
      })
    } else {
      const data = snap.data() as FanPoll
      const entries = data.entries ?? []
      const idx = entries.findIndex(e => e.teamId === teamId)
      if (idx >= 0) {
        entries[idx].votes = (entries[idx].votes || 0) + 1
      } else {
        entries.push({ teamId, votes: 1 })
      }
      await updateDoc(ref, {
        totalVotes: increment(1),
        lastUpdated: new Date().toISOString(),
        entries,
      })
    }
    return true
  } catch {
    return false
  }
}

export function subscribeToPoll(callback: (poll: FanPoll) => void): () => void {
  const firestore = getDb()
  if (!firestore) return () => {}
  const ref = doc(firestore, POLL_DOC)
  return onSnapshot(ref, snap => {
    if (snap.exists()) callback(snap.data() as FanPoll)
  })
}

// Local storage fallback when Firebase is not configured
const VOTE_KEY = 'wc26_vote'

export function getLocalVote(): { hasVoted: boolean; teamId: string | null } {
  if (typeof window === 'undefined') return { hasVoted: false, teamId: null }
  try {
    const raw = localStorage.getItem(VOTE_KEY)
    if (!raw) return { hasVoted: false, teamId: null }
    const { teamId } = JSON.parse(raw)
    return { hasVoted: true, teamId }
  } catch {
    return { hasVoted: false, teamId: null }
  }
}

export function setLocalVote(teamId: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(VOTE_KEY, JSON.stringify({ teamId, ts: Date.now() }))
}

export function clearLocalVote(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(VOTE_KEY)
}
