import { initializeApp } from 'firebase/app';
import { getDatabase, Database, ref, set } from 'firebase/database';

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
let database: Database | undefined;

try {
  app = initializeApp(firebaseConfig);
  database = getDatabase(app);
  
  // Create a test user to initialize the structure
  if (typeof window !== 'undefined' && database) {
    const testUserRef = ref(database, 'users/test-user');
    set(testUserRef, {
      username: 'test',
      createdAt: Date.now()
    }).then(() => {
      console.log('Test user created to initialize structure');
    }).catch((error) => {
      console.error('Error creating test user:', error);
    });
  }
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