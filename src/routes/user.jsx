import React, { useEffect, useState } from 'react';
import Navbar from '../components/nav-bar/Navbar';
import '../components/user.css';
import { signOut } from 'firebase/auth';
import { auth, db } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useStoreConsumer } from '../context/storeProvider';
import { updateDoc, doc, getDoc, collection } from 'firebase/firestore';

const User = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const navigate = useNavigate();

  const { user, userEmailData } = useStoreConsumer();

  const findUser =
    user &&
    user.find(
      (item) => item.email === userEmailData.email && userEmailData.email
    );
  console.log(findUser);
  const userId = findUser.uid;

  const handleEdit = () => {
    setIsEditing(true);
    setDisplayName(findUser.displayName);
    setPhoneNumber(findUser.phoneNumber);
    setPhotoURL(findUser.photoURL);
  };

  const handleSave = async () => {
    if (displayName && phoneNumber) {
      console.log(displayName);
      try {
        const itemToEdit = doc(db, 'users', userId);
        console.log(itemToEdit);
        await updateDoc(itemToEdit, {
          displayName,
          phoneNumber,
          photoURL,
        });
        console.log(displayName);
        setIsEditing(false);
        window.location.reload(navigate('/products'));
      } catch (error) {
        console.log('Error in updating:', error);
      }
    } else {
      console.log('Name is empty');
    }
  };
  useEffect(() => {
    if (findUser) {
      setDisplayName(findUser.displayName || '');
      setPhoneNumber(findUser.phoneNumber || '');
      setPhotoURL(findUser.photoURL || '');
    }
  }, [findUser]);
  const logout = async () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((err) => console.log('Error:', err));
  };

  return (
    <div className='user-profile'>
      <Navbar />
      <div className='user-container'>
        <div className='user-details'>
          <h2>User Profile</h2>
          <img className='user-img' src={photoURL} alt='' />
          <div>
            <div className='input-section'>
              <input
                type='text'
                name='displayName'
                placeholder='Name'
                value={displayName}
                isEditing
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>

            <div className='input-section'>
              {' '}
              <input
                type='text'
                name='email'
                placeholder='Email'
                value={findUser.email}
                readOnly
              />
            </div>
            <div className='input-section'>
              {' '}
              <input
                type='text'
                name='phoneNumber'
                placeholder='Ph number'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>

          <div>
            {!isEditing ? (
              <button className='button' onClick={handleEdit}>
                Edit profile
              </button>
            ) : (
              <>
                <button className='button' onClick={handleSave}>
                  Save Changes
                </button>
              </>
            )}
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
