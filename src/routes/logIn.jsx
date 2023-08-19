import React, { useState, useEffect } from 'react';
import { auth, provider } from '../utils/firebase';
import { useStateValue } from '../context/stateProvider';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

import '../index.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { actionType } from '../utils/reducers/userReducer';
const LogIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [value, setValue] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [number, setNumber] = useState('');
  const onLogin = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        const loginDetails = {
          loginMethod: 'emailAndPassword',
          displayName: userName,
          phoneNumber: number,
        };

        dispatch({
          type: actionType.SET_USER,
          user: { ...user, ...loginDetails }, // Merge user and loginDetails
        });

        setEmail('');
        setPassword('');
        setUserName('');
        navigate('/products');
      })
      .catch((err) => {
        alert('please enter valid details or check your connection');
      });
  };
  const [{ user }, dispatch] = useStateValue();
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
        <div className='content'>
          <input
            type='text'
            placeholder='Your name'
            value={userName}
            required
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className='content'>
          <input
            type='number'
            placeholder=' number'
            value={number}
            required
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <button type='submit' className='button'>
          Sign in
        </button>
      </form>
      <button className='button' onClick={handleCLick}>
        SignIn with Google
      </button>
    </div>
  );
};

export default LogIn;
