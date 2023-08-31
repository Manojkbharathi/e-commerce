import React, { useEffect, useState } from 'react';
import Navbar from '../components/nav-bar/Navbar';
import { useLocation } from 'react-router-dom';
import '../components/user.css';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
const User = () => {
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [userData, setUserData] = useState(null); // Initialize userData as null

  // Fetch user data when the component mounts
  useEffect(() => {
    // Check if userData is already available in location state
    if (location.state && location.state.userData) {
      setUserData(location.state.userData);
    } else {
      // If not available, you can fetch it here from your database or source
      // Example: Fetch userData from your database using an API call
      // Replace this with your actual fetching logic
      fetchUserDataFromDatabase()
        .then((userData) => {
          setUserData(userData);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [location.state]);
  const logout = async () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((err) => console.log('error'));
  };
  return (
    <div className='user-profile'>
      <Navbar />
      <div className='user-container'>
        <div className='user-details'>
          <h2>User Profile</h2>
          {/*to Check if userData is available before rendering */}
          {userData && (
            <>
              <div className='flex'>
                <div className='input-section'>
                  <img className='user-img' src={userData.photoURL} />
                  <input
                    type='text'
                    name='displayName'
                    placeholder='Name'
                    value={userData?.displayName}
                  />
                  <input
                    type='text'
                    name='email'
                    placeholder='Email'
                    value={userData.email}
                    readOnly
                  />
                  <input
                    type='text'
                    name='phoneNumber'
                    placeholder='Ph number'
                    value={userData.phoneNumber}
                  />

                  <label htmlFor='city'>Select City</label>
                  <select readOnly>
                    <option readOnly>select place</option>
                    <option value='chennai'>chennai</option>
                    <option value='coimbatore'>coimbatore</option>
                    <option value='trichy'>trichy</option>
                    <option value='karur'>karur</option>
                    <option value='salem'>salem</option>
                    <option value='madurai'>madurai</option>
                    <option value='pollachi'>pollachi</option>
                    <option value='tiruppur'>tiruppur</option>
                    <option value='eorde'>eorde</option>
                    <option value='kadalur'>kadalur</option>
                    <option value='ooty'>ooty</option>
                  </select>
                </div>

                <div className='gender-section'>
                  <h2>Gender</h2>
                  <div>
                    <input
                      type='radio'
                      value='Male'
                      id='1'
                      name='gender'
                      readOnly
                    />
                    <label htmlFor='Male'>Male</label>
                  </div>
                  <div>
                    <input
                      type='radio'
                      value='Female'
                      id='2'
                      name='gender'
                      readOnly
                    />
                    <label htmlFor='Female'>Female</label>
                  </div>

                  <div>
                    <input
                      type='radio'
                      value='Other'
                      id='3'
                      name='gender'
                      readOnly
                    />
                    <label htmlFor='Other'>Other</label>
                  </div>
                  <input type='file' accept='image/*' />
                </div>
              </div>
              <div>
                <button className='button'>Edit profile</button>
                <button className='button'>Save Changes</button>
                <button className='button' onClick={logout()}>
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
