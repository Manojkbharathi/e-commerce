import { useState, useEffect } from 'react';
import '../form/formStyle.css';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/firebase';
import { NavLink, useNavigate } from 'react-router-dom';
const Form = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [value, setValue] = useState('');
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
  const onSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setEmail('');
        setPassword('');
        setError(false);
        navigate('/logIn');
      })
      .catch((err) => {
        alert('an error', err.message);
      });
  };

  return (
    <div className='input-container'>
      <form className='sing-in-form' onSubmit={onSubmit}>
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
        <button
          type='submit'
          className='submit'
          onClick={() => navigate('/logIn')}
        >
          SignUp
        </button>
        <button className='btn' onClick={handleCLick}>
          SignIn with Google
        </button>
        <button className='btn' onClick={() => navigate('/logIn')}>
          Already have Account Log in
        </button>
      </form>
    </div>
  );
};

export default Form;
