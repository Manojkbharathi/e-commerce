import React, { useEffect, useState } from 'react';
import { useStateValue } from '../context/stateProvider';
import Navbar from '../components/nav-bar/Navbar';
import { collection, where, query, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';

const User = () => {
  const [{ user }] = useStateValue();
  const [userData, setUserData] = useState(null);

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
            // Get the user's data
            const userData = querySnapshot.docs[0].data();
            setUserData(userData);
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

        {user ? (
          userData ? (
            <div>
              {user.photoURL && <img src={user.photoURL} alt='User Profile' />}
              <p>Name: {userData.displayName || 'N/A'}</p>
              <p>Email: {userData.email || 'N/A'}</p>
              <p>Phone number: {userData.phoneNumber || 'N/A'}</p>
            </div>
          ) : (
            <div>Loading user data...</div>
          )
        ) : (
          <div>User not logged in</div>
        )}
      </div>
    </div>
  );
};

export default User;
