import React, { useEffect, useState } from 'react';
import { useStateValue } from '../context/stateProvider';
import Navbar from '../components/nav-bar/Navbar';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import '../index.css';

const User = () => {
  const [{ user }] = useStateValue();
  const [userData, setUserData] = useState(null);
  const [userImageData, setUserImageData] = useState(null);

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

  return (
    <div className='user-profile'>
      <Navbar />
      <div className='user-details'>
        <h2>User Profile</h2>
        <div>
          {user ? (
            <div className='user-details'>
              <img src={user.photoURL} alt='' />
              <p>Name: {user.displayName}</p>
              <p>Email: {user.email}</p>
              <p>Phone number: {user.phoneNumber || `null`}</p>
            </div>
          ) : (
            <div>Loading user data...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
