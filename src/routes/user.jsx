import React, { useEffect, useState } from 'react';
import { useStateValue } from '../context/stateProvider';
import Navbar from '../components/nav-bar/Navbar';
import { collection, where, query, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';
import '../index.css';
const User = () => {
  const [{ user }] = useStateValue();
  const [userData, setUserData] = useState(null);
  const [userImageData, setUserImageData] = useState(null); // Store the image data

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          // Query Firestore for user data by email
          const userQuery = query(
            collection(db, 'users'),
            where('email', '==', user.email)
          );
          const querySnapshot = await getDocs(userQuery);

          if (querySnapshot.size === 1) {
            const userData = querySnapshot.docs[0].data();
            setUserData(userData);

            // Set the user image data if available
            if (userData.photoData) {
              setUserImageData(userData.photoData);
            }
          } else {
            console.error('User data not found in Firestore');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, [user]);

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
              <p>Phone number: {user.phoneNumber||`null`}</p>
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
