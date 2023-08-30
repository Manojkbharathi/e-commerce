import React, { useEffect, useState } from 'react';
import { useStateValue } from '../context/stateProvider';
import Navbar from '../components/nav-bar/Navbar';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, storage } from '../utils/firebase';
import '../index.css';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getApp, getApps } from 'firebase/app';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  // Your Firebase configuration here
};

const User = () => {
  const [{ user }] = useStateValue();
  const [userData, setUserData] = useState(null);
  const [userImageData, setUserImageData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState({
    displayName: '',
    email: '',
    phoneNumber: '',
    photoURL: '',
  });
  const [newProfilePicture, setNewProfilePicture] = useState(null);

  // Define a function to update the user data in the Navbar
  const updateUserInNavbar = (newUserData) => {
    // You can pass this function to the Navbar component
    // and call it when user data is updated
    setEditedUserData(newUserData);
  };

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            setUserData(userData);

            if (userData.photoData) {
              setUserImageData(userData.photoData);
            }

            // Update user data in Navbar
            updateUserInNavbar(userData);
          } else {
            console.error('User document not found in Firestore.');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, [user]);

  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUserData({ ...editedUserData, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      console.log('Updating user data in Firestore...');

      // Update editedUserData with the edited values
      const updatedUserData = {
        ...editedUserData,
        displayName: editedUserData.displayName || user.displayName || '',
        email: editedUserData.email || user.email || '',
        phoneNumber: editedUserData.phoneNumber || user.phoneNumber || '',
      };

      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, updatedUserData, { merge: true });

      console.log('Uploading profile picture to Storage...');
      if (newProfilePicture) {
        const storageRef = ref(storage, `profilePictures/${user.uid}`);
        await uploadBytes(storageRef, newProfilePicture);

        const photoURL = await getDownloadURL(storageRef);
        console.log('Profile picture uploaded:', photoURL);

        // Update editedUserData with the new photoURL
        updatedUserData.photoURL = photoURL;

        // Update user data in Navbar after profile picture change
        updateUserInNavbar(updatedUserData);
      }

      setIsEditing(false);
      console.log('User data updated successfully in Firestore.');
    } catch (error) {
      console.error('Error updating user data in Firestore:', error);
    }
  };
  cghjk;
  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewProfilePicture(file);
    }
  };

  return (
    <div className='user-profile'>
      <Navbar user={editedUserData} /> {/* Pass user data to Navbar */}
      <div className='user-details'>
        <h2>User Profile</h2>
        {user ? (
          isEditing ? (
            // Edit form
            <div className='user-details'>
              <input
                type='text'
                name='displayName'
                placeholder='Name'
                value={editedUserData.displayName}
                onChange={handleInputChange}
              />
              <input
                type='text'
                name='email'
                placeholder='Email'
                value={editedUserData.email}
                onChange={handleInputChange}
              />
              <input
                type='text'
                name='phoneNumber'
                placeholder='Phone number'
                value={editedUserData.phoneNumber}
                onChange={handleInputChange}
              />
              <input
                type='file'
                accept='image/*'
                onChange={handleProfilePictureChange}
              />
              <button className='button' onClick={handleSaveChanges}>
                Save Changes
              </button>
            </div>
          ) : (
            // Display user data
            <div className='user-details'>
              <img
                className='user-img'
                src={editedUserData.photoURL || user.photoURL || ''}
                alt=''
              />
              <p>
                Name: {editedUserData.displayName || user.displayName || ''}
              </p>
              <p>Email: {editedUserData.email || user.email || ''}</p>
              <p>
                Phone number:{' '}
                {editedUserData.phoneNumber || user.phoneNumber || 'null'}
              </p>
              <button onClick={() => setIsEditing(true)} className='button'>
                Edit Profile
              </button>
            </div>
          )
        ) : (
          <div>Loading user data...</div>
        )}
      </div>
    </div>
  );
};

export default User;
