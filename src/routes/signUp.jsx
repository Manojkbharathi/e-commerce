import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../utils/firebase';

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [number, setNumber] = useState('');
  const [userImage, setUserImage] = useState(null);

  const handleImageUpload = async (userUid) => {
    try {
      if (userImage) {
        if (!userImage.type.startsWith('image/')) {
          console.error('Selected file is not an image.');
          return;
        }

        if (userImage.size > 5 * 1024 * 1024) {
          console.error(
            'Selected image is too large. Please select a smaller image.'
          );
          return;
        }

        const storageRef = ref(storage, `profileImages/${userUid}`);
        await uploadBytes(storageRef, userImage);

        const url = await getDownloadURL(storageRef);
        return url;
      }

      return null;
    } catch (error) {
      console.error('Error uploading image:', error);

      return null;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const photoURL = await handleImageUpload(user.uid);

      const loginDetails = {
        SignUpMethod: 'emailAndPassword',
        displayName: userName,
        phoneNumber: number,
        photoURL: photoURL,
      };
      const userDoc = collection(db, 'users');
      await addDoc(userDoc, {
        uid: user.uid,
        email: user.email,
        ...loginDetails,
      });

      setEmail('');
      setPassword('');
      setError(false);
      navigate('/logIn');
    } catch (error) {
      setError(true);
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className='sign-up-container'>
      <div className='sign-up'>
        <form onSubmit={handleLogin}>
          <input
            type='file'
            accept='image/*'
            onChange={(e) => setUserImage(e.target.files[0])}
          />
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
              placeholder='number'
              value={number}
              required
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <button type='submit' className='button'>
            SignUp
          </button>

          {error && <span>Wrong email or password</span>}
        </form>
      </div>

      <button className='button' onClick={() => navigate('/logIn')}>
        Already have an Account? Log in
      </button>
    </div>
  );
};

export default SignUp;
