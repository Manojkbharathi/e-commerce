import { auth, provider } from '../utils/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useStateValue } from '../context/stateProvider';
import { actionType } from '../utils/reducers/userReducer';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../utils/firebase';
import '../index.css';
const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [value, setValue] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [number, setNumber] = useState('');
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    setValue(localStorage.getItem('email'));
  }, []);
  const handleLogin = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        const loginDetails = {
          SignUpMethod: 'emailAndPassword',
          displayName: userName,
          phoneNumber: number,
        };
        //  adding user details to fire store
        const userDoc = collection(db, 'users');
        addDoc(userDoc, {
          uid: user.uid,
          email: user.email,
          ...loginDetails,
        })
          .then(() => {
            alert('successfully logged in');
          })
          .catch((error) => {
            console.log('Error');
          });
        dispatch({
          type: actionType.SET_USER,
          user: { ...user, ...loginDetails },
        });
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='password'
            onChange={(e) => setPassword(e.target.value)}
          />
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
