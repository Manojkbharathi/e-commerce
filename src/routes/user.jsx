import React, { useEffect, useState } from 'react';
import Navbar from '../components/nav-bar/Navbar';
import '../components/user.css';
import { signOut } from 'firebase/auth';
import { auth, db } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useStoreConsumer } from '../context/storeProvider';
import { updateDoc } from 'firebase/firestore';
const User = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const navigate = useNavigate();
  const handleEdit = () => {
    setIsEditing(true);
  };
  const logout = async () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((err) => console.log('error'));
  };

  const { user, userEmailData } = useStoreConsumer();
  const userId = userEmailData.uid;
  console.log(userId);
  console.log(userEmailData);
  const findUser =
    user &&
    user.find(
      (item) => item.email === userEmailData.email && userEmailData.email
    );
  console.log(findUser);
  const handleSave = async () => {
    try {
      await updateDoc(findUser, {
        displayName: newName,
      });
      setIsEditing(!isEditing);
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className='user-profile'>
      <Navbar />
      <div className='user-container'>
        <div className='user-details'>
          <h2>User Profile</h2>
          <div>
            {isEditing ? (
              <div className='input-section'>
                <input
                  type='text'
                  name='displayName'
                  placeholder='Name'
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
            ) : (
              <div className='input-section'>
                <img className='user-img' src={findUser.photoURL} />
                <input
                  type='text'
                  name='displayName'
                  placeholder='Name'
                  value={findUser?.displayName}
                />
              </div>
            )}

            <input
              type='text'
              name='email'
              placeholder='Email'
              value={findUser.email}
              readOnly
            />
            <input
              type='text'
              name='phoneNumber'
              placeholder='Ph number'
              value={findUser.phoneNumber}
            />
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
                <button className='button' onClick={handleEdit}>
                  Cancel
                </button>
              </>
            )}
            <button onClick={logout}></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
