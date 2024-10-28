import { initializeApp } from "firebase/app";
import { useDeviceLanguage as deviceLanguage, getAuth } from "firebase/auth";

export const FirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
export const FirebaseApp = initializeApp(FirebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);

// Linter mistake this function for a React hook, thus the little hack.
deviceLanguage(FirebaseAuth);
