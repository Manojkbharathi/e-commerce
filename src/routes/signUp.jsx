import { auth, provider } from '../utils/firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import '../../src/index.css';
const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [value, setValue] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleCLick = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        setValue(data.user.email);
        localStorage.setItem('email', data.user.email);
        navigate('/products');
      })
      .catch((error) => {
        console.error('Google Sign-In Error:', error);
      });
  };
  useEffect(() => {
    setValue(localStorage.getItem('email'));
  }, []);
  const handleLogin = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setEmail('');
        setPassword('');
        setError(false);
        navigate('/logIn');
      })
      .catch((error) => {
        setError(true);
      });
  };
  return (
    <div className='sign-up-container'>
      <div className='sign-up'>
        <form onSubmit={handleLogin}>
          <input
            type='email'
            placeholder='email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='password'
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type='submit' className='button'>
            signUp
          </button>

          {error && <span>Wrong email or password</span>}
        </form>
      </div>
      <button className='button' onClick={handleCLick}>
        SignIn with Google
      </button>

      <button className='button' onClick={() => navigate('/logIn')}>
        Already have Account log in
      </button>
    </div>
  );
};

export default SignUp;
