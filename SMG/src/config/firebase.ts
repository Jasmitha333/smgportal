import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration - Use environment variables or fallback to project credentials
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCyU0y2YYVhOkGdAuoXBMtTClnq0h_Fz1k",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "smg-employee-portal.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "smg-employee-portal",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "smg-employee-portal.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "717700936442",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:717700936442:web:dd89c46bb3cff64516cf43",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-3J4Q7WZEES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app;
