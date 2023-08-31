import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { actionType } from '../utils/reducers/userReducer';
import { collection, where, query, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';
const LogIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const onLogin = async (e) => {
    e.preventDefault();

    try {
      // Sign in with email and password
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
        // Get the user's data
        const userData = querySnapshot.docs[0].data();
        console.log(userData);
        // Dispatch the user data to the context
        navigate('/user', { state: { userData } });
        // Redirect to the products page or any other route you prefer
      } else {
        console.error('Multiple users found with the same email.');
      }
    } catch (error) {
      alert('Please enter valid details or check your connection');
      console.error('Error:', error);
    }
  };
  const handleCLick = async () => {
    const {
      user: { refreshToken, providerData },
    } = await signInWithPopup(auth, provider);
    dispatch({
      type: actionType.SET_USER,
      user: providerData[0],
    });
    navigate('/products');
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
      <button className='button' onClick={handleCLick}>
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
