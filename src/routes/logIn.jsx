import React, { useState } from 'react';
import Navbar from '../components/nav-bar/Navbar';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';
import {} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { SiShopify } from 'react-icons/si';

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
    <div>
      <form className='sing-in-form' onSubmit={onLogin}>
        <div className='content'>
          <label className='email'>e-mail</label>
          <input
            type='email'
            placeholder='Your mail id'
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='content'>
          <label className='password'>Password</label>
          <input
            type='password'
            placeholder='Your password'
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit' className='submit'>
          Sign in
        </button>
      </form>
    </div>
  );
};

export default LogIn;
