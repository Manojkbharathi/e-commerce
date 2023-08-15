import { AuthErrorCodes } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useContext, useEffect } from 'react';
import {
  auth,
  db,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '../utils/firebase';

const AuthCOntext = React.createContext();
export const useAuth = () => {
  return useContext(AuthCOntext);
};

const userContext = () => {
  return <div>userContext</div>;
};

export default userContext;
