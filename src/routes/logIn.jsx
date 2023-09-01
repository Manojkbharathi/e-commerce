import React, { useState, useContext } from 'react';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth, provider, db } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { collection, where, query, getDocs } from 'firebase/firestore';
const LogIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const onLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Fetch user data from Firestore based on email
      const userQuery = query(
        collection(db, 'users'),
        where('email', '==', email)
      );
      const querySnapshot = await getDocs(userQuery);

      if (querySnapshot.size === 1) {
        const userData = querySnapshot.docs[0].data();
        console.log(userData);
        navigate('/user', { state: { userData } });
      } else {
        console.error('Multiple users found with the same email.');
      }
    } catch (error) {
      alert('Please enter valid details or check your connection');
      console.error('Error:', error);
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const user = result.user;

      dispatch({
        type: actionType.SET_USER,
        user: {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
        },
      });
      stateDispatch({ type: 'SET_USER_DATA', userData });
      navigate('/products');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className='log-in'>
      <h1>Welcome to e shop, please log in </h1>
      <form className='sing-in-form' onSubmit={onLogin}>
        <div className='content'>
          <input
            type='email'
            placeholder='Your mail id'
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='content'>
          <input
            type='password'
            placeholder='Your password'
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type='submit' className='button'>
          Sign in
        </button>
      </form>
      <button className='button' onClick={handleGoogleSignIn}>
        SignIn with Google
      </button>
      <div>
        <button className='button' onClick={() => setIsOpen(!isOpen)}>
          Test credential
        </button>
        {isOpen && (
          <div className='credential'>
            <p>
              <span>Email: </span>manojbharathi@gmail.com
            </p>
            <p>
              {' '}
              <span>Password: </span>123456
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogIn;
