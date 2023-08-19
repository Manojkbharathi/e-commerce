import { auth, provider } from '../utils/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import '../index.css';
const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [value, setValue] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

      <button className='button' onClick={() => navigate('/logIn')}>
        Already have Account Log in
      </button>
    </div>
  );
};

export default SignUp;
