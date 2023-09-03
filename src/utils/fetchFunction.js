import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { uuidv4 } from '@firebase/util';
import { db } from './firebase';

// const setUserData = async () => {
//   const data = doc(firestore, 'userData', uuidv4());
//   await setDoc(profileRef, data, { merge: true });
// };
// console.log(setUserData());
const getUseData = async () => {
  const userData = await getDocs(collection(db, 'users'));
  return userData.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};
export { getUseData };
