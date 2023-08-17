// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getApp, getApps } from 'firebase/app';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyBYk0mH9wyGwywPT4DnJU8IgO5fJw2bZ2s',
  authDomain: 'e-commerce-e2035.firebaseapp.com',
  projectId: 'e-commerce-e2035',
  storageBucket: 'e-commerce-e2035.appspot.com',
  messagingSenderId: '1048302608852',
  appId: '1:1048302608852:web:68a9346fc137b8e82af641',
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);
export { provider, db, app };
export const auth = getAuth(app);
