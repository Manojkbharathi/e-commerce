import { useState } from 'react';
import '../form/formStyle.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { NavLink, useNavigate } from 'react-router-dom';
const Form = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const onSubmit = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setEmail('');
        setPassword('');
        navigate('/logIn');
      })
      .catch((err) => {
        alert('an error', err.message);
      });
  };

  return (
    <div className='input-container'>
      <form className='sing-in-form'>
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
        <button type='submit' className='submit' onClick={onSubmit}>
          SignUp
        </button>
      </form>
      <h3>
        Already have account<NavLink to='/logIn'> signIn</NavLink>
      </h3>
    </div>
  );
};

export default Form;
