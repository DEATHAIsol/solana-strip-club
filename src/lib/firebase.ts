import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
let app;
let database;

try {
  app = initializeApp(firebaseConfig);
  database = getDatabase(app);
} catch (error) {
  console.error('Firebase initialization error:', error);
  // In development, we can continue without Firebase
  if (process.env.NODE_ENV === 'development') {
    console.warn('Firebase initialization failed, but continuing in development mode');
  } else {
    throw error;
  }
}

export { database }; 