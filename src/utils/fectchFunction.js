import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { uuidv4 } from '@firebase/util';
import { db } from './firebase';

const setUserData = async () => {
  const data = doc(firestore, 'userData', uuidv4());
  await setDoc(profileRef, data, { merge: true });
};
console.log(setUserData());
