import React, { useEffect, useState } from 'react';
import { useStateValue } from '../context/stateProvider';
import Navbar from '../components/nav-bar/Navbar';
import { doc, getDoc, setDoc } from 'firebase/firestore';
<<<<<<< HEAD
import { db, storage } from '../utils/firebase';
import '../index.css';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import Firebase Storage
import { getApp, getApps } from 'firebase/app';
import { initializeApp } from 'firebase/app';
=======
import { db } from '../utils/firebase';
import '../index.css';
>>>>>>> ce6afbeb4e8b03672904866e313bcb9d6cb33c19

const User = () => {
  const [{ user }] = useStateValue();
  const [userData, setUserData] = useState(null);
  const [userImageData, setUserImageData] = useState(null);
<<<<<<< HEAD
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserData, setEditedUserData] = useState({
    displayName: '',
    email: '',
    phoneNumber: '',
    photoURL: '',
  });
  const [newProfilePicture, setNewProfilePicture] = useState(null);
=======
>>>>>>> ce6afbeb4e8b03672904866e313bcb9d6cb33c19

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

<<<<<<< HEAD
  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUserData({ ...editedUserData, [name]: value });
  };

  const handleSaveChanges = async () => {
    try {
      console.log('Updating user data in Firestore...');
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, editedUserData, { merge: true });

      console.log('Uploading profile picture to Storage...');
      if (newProfilePicture) {
        const storageRef = ref(storage, `profilePictures/${user.uid}`);
        await uploadBytes(storageRef, newProfilePicture);

        const photoURL = await getDownloadURL(storageRef);
        console.log('Profile picture uploaded:', photoURL);
        setEditedUserData({ ...editedUserData, photoURL });
      }

      setIsEditing(false);
      console.log('User data updated successfully in Firestore.');
    } catch (error) {
      console.error('Error updating user data in Firestore:', error);
    }
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewProfilePicture(file);
    }
  };
=======
  useEffect(() => {
    // Check if user is authenticated and userData is available
    if (user && userData) {
      // Store or update user data in Firestore
      const userDocRef = doc(db, 'users', user.uid);

      setDoc(userDocRef, userData)
        .then(() => {
          console.log('User data stored in Firestore.');
        })
        .catch((error) => {
          console.error('Error storing user data in Firestore:', error);
        });
    }
  }, [user, userData]);
>>>>>>> ce6afbeb4e8b03672904866e313bcb9d6cb33c19

  return (
    <div className='user-profile'>
      <Navbar />
      <div className='user-details'>
        <h2>User Profile</h2>
        {user ? (
          isEditing ? (
            // Edit form
            <div className='user-details'>
<<<<<<< HEAD
              <input
                type='text'
                name='displayName'
                value={editedUserData.displayName}
                onChange={handleInputChange}
              />
              <input
                type='text'
                name='email'
                value={editedUserData.email}
                onChange={handleInputChange}
              />
              <input
                type='text'
                name='phoneNumber'
                value={editedUserData.phoneNumber}
                onChange={handleInputChange}
              />
              <input
                type='file'
                accept='image/*'
                onChange={handleProfilePictureChange}
              />
              <button onClick={handleSaveChanges}>Save Changes</button>
=======
              <img src={user.photoURL} alt='' />
              <p>Name: {user.displayName}</p>
              <p>Email: {user.email}</p>
              <p>Phone number: {user.phoneNumber || `null`}</p>
>>>>>>> ce6afbeb4e8b03672904866e313bcb9d6cb33c19
            </div>
          ) : (
            // Display user data
            <div className='user-details'>
              <img src={editedUserData.photoURL || user.photoURL} alt='' />
              <p>Name: {editedUserData.displayName || user.displayName}</p>
              <p>Email: {editedUserData.email || user.email}</p>
              <p>
                Phone number:{' '}
                {editedUserData.phoneNumber || user.phoneNumber || 'null'}
              </p>
              <button onClick={() => setIsEditing(true)}>Edit Profile</button>
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
