import React from 'react';
import { useStateValue } from '../context/stateProvider';
import Navbar from '../components/nav-bar/Navbar';

import '../index.css';
const User = () => {
  const [{ user }] = useStateValue();

  if (!user) {
    <Navbar />;
    // if user data is not available
    return <div>Loading user data...</div>;
  }
  // if avilable
  return (
    <div className='user-profile'>
      <Navbar />
      <div className='user-details'>
        <h2>User Profile</h2>

        {/*  if user have profile then only show it */}
        {user.photoURL && <img src={user.photoURL} alt='User Profile' />}
        <p>Name: {user.displayName || 'N/A'}</p>
        <p>Email: {user.email || 'N/A'}</p>
        <p>Ph number :{user.phoneNumber || 'N/A'}</p>
      </div>
    </div>
  );
};

export default User;
