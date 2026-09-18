import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { UserProfile, PlacedBet, Transaction, MatchEvent } from '../types';

/**
 * Safe Firestore helper service with graceful fallback
 */

export async function syncUserProfileToFirestore(user: UserProfile): Promise<void> {
  try {
    if (!db) return;
    const userRef = doc(db, 'users', user.id);
    await setDoc(
      userRef,
      {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone || '',
        role: user.role,
        balance: user.balance,
        bonusBalance: user.bonusBalance,
        currency: user.currency,
        dailyDepositLimit: user.dailyDepositLimit || 500000,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (err) {
    console.warn('Firestore syncUserProfile notice (safe offline mode):', err);
  }
}

export async function getUserProfileFromFirestore(userId: string): Promise<UserProfile | null> {
  try {
    if (!db) return null;
    const userRef = doc(db, 'users', userId);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
  } catch (err) {
    console.warn('Firestore getUserProfile notice (safe offline mode):', err);
  }
  return null;
}

export async function saveBetToFirestore(bet: PlacedBet): Promise<void> {
  try {
    if (!db) return;
    const betRef = doc(db, 'placed_bets', bet.id);
    await setDoc(betRef, {
      ...bet,
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.warn('Firestore saveBet notice (safe offline mode):', err);
  }
}

export async function updateBetInFirestore(
  betId: string,
  status: 'won' | 'lost' | 'cashed_out' | 'pending'
): Promise<void> {
  try {
    if (!db) return;
    const betRef = doc(db, 'placed_bets', betId);
    await updateDoc(betRef, {
      status,
      settledAt: Date.now(),
    });
  } catch (err) {
    console.warn('Firestore updateBet notice (safe offline mode):', err);
  }
}

export async function saveTransactionToFirestore(tx: Transaction): Promise<void> {
  try {
    if (!db) return;
    const txRef = doc(db, 'transactions', tx.id);
    await setDoc(txRef, {
      ...tx,
      createdAt: new Date().toISOString(),
    });
  } catch (err) {
    console.warn('Firestore saveTransaction notice (safe offline mode):', err);
  }
}

export async function getBetsFromFirestore(userId: string): Promise<PlacedBet[]> {
  try {
    if (!db) return [];
    const q = query(
      collection(db, 'placed_bets'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    const bets: PlacedBet[] = [];
    snapshot.forEach((d) => bets.push(d.data() as PlacedBet));
    return bets;
  } catch (err) {
    console.warn('Firestore getBets notice (safe offline mode):', err);
    return [];
  }
}
