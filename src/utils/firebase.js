// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBYk0mH9wyGwywPT4DnJU8IgO5fJw2bZ2s',
  authDomain: 'e-commerce-e2035.firebaseapp.com',
  projectId: 'e-commerce-e2035',
  storageBucket: 'e-commerce-e2035.appspot.com',
  messagingSenderId: '1048302608852',
  appId: '1:1048302608852:web:68a9346fc137b8e82af641',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
export { provider };
export const auth = getAuth(app);
export default app;
