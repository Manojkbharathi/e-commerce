import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Import Firebase Storage
import { getApp, getApps } from 'firebase/app';
import 'firebase/storage';
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
const commerceGoogleProvider = new GoogleAuthProvider();
const createUserDocumentFromAuth = async (userAuth) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);
  const userSnapShot = await getDoc(userDocRef);
  console.log(userSnapShot);
  console.log(userSnapShot.exists());
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log('Error creating user', error.message);
    }
  }
  return userDocRef;
};
const db = getFirestore(app);
const storage = getStorage(app);
export { commerceGoogleProvider, db, app, storage, createUserDocumentFromAuth };
export const auth = getAuth(app);
