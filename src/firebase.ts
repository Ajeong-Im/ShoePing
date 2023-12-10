import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDeC2g8BjgUbAL3mCHkKiTbGrtz4xm4hiI',
  authDomain: 'shoeping-79ca9.firebaseapp.com',
  projectId: 'shoeping-79ca9',
  storageBucket: 'shoeping-79ca9.appspot.com',
  messagingSenderId: '912782373369',
  appId: '1:912782373369:web:9d1972ef8cc2554d168d28',
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export const db = getFirestore(app);
