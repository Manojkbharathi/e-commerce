import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';
import {} from 'react-router-dom';
import '../index.css';
import { NavLink, useNavigate } from 'react-router-dom';
const LogIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onLogin = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.userCredential;
        setEmail('');
        setPassword('');
        navigate('/products');
      })
      .catch((err) => {
        console.log('an error', err.message);
      });
  };
  return (
    <div className='log-in'>
      <h1>Welcome to e shop, please log in </h1>
      <form className='sing-in-form' onSubmit={onLogin}>
        <div className='content'>
          <input
            type='email'
            placeholder='Your mail id'
            value={email}
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
    </div>
  );
};

export default LogIn;
