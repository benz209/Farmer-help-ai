import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, where, getDocs, onSnapshot, doc, setDoc, getDocFromServer } from 'firebase/firestore';

// @ts-ignore
import firebaseConfig from '@/firebase-applet-config.json';

// Initialize Firebase SDK
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// Test connection
getDocFromServer(doc(db, 'test', 'connection')).catch((e) => {
  if (e.message.includes('offline')) {
    console.error("Firebase is offline or misconfigured");
  }
});

export { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged };
export type { User };

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    return await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout failed", error);
    throw error;
  }
};
