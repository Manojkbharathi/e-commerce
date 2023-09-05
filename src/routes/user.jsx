import React, { useEffect, useState } from 'react';
import Navbar from '../components/nav-bar/Navbar';
import '../components/user.css';
import { signOut } from 'firebase/auth';
import { auth, db, storage } from '../utils/firebase';
import { useStoreConsumer } from '../context/storeProvider';
import { updateDoc, doc, getDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
const User = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [userImage, setUserImage] = useState(null);
  const { user, userEmailData } = useStoreConsumer();
  const navigate = useNavigate();
  const findUser =
    user &&
    user.find(
      (item) => item.email === userEmailData.email && userEmailData.email
    );
  console.log(findUser);
  const userId = findUser.uid;
  const handleImageUpload = async (userId) => {
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

        const storageRef = ref(
          storage,
          `profileImages/${Date.now()}/${userId}`
        );
        console.log(storageRef);
        const uploadTask = uploadBytes(storageRef, userImage);
        await uploadTask;
        const url = await getDownloadURL(storageRef);
        console.log('Image URL:', url);
        return url;
      }

      return null;
    } catch (error) {
      console.error('Error uploading image:', error);

      return null;
    }
  };

  const handleSave = async () => {
    if (displayName && phoneNumber && userImage) {
      console.log(userImage);
      try {
        if (!userImage) {
          console.error('No image selected.');
          return;
        }

        if (!userImage.type || !userImage.type.startsWith('image/')) {
          console.error('Selected file is not an image.');
          return;
        }

        if (userImage.size > 5 * 1024 * 1024) {
          console.error(
            'Selected image is too large. Please select a smaller image.'
          );
          return;
        }

        const imageURL = await handleImageUpload(userId); // Upload the image
        console.log('Image URL:', imageURL);
        if (imageURL) {
          const itemToEdit = doc(db, 'users', userId);

          await updateDoc(itemToEdit, {
            displayName,
            phoneNumber,
            imageURL: imageURL,
          });
          setIsEditing(false);
          navigate('/products');
          window.location.reload();
        } else {
          console.log('Image URL is empty. Image upload might have failed.');
        }
      } catch (error) {
        console.error('Error in updating:', error);
      }
    } else {
      console.log('Name is empty');
    }
  };

  useEffect(() => {
    if (findUser) {
      setDisplayName(findUser.displayName || '');
      setPhoneNumber(findUser.phoneNumber || '');
      setUserImage(findUser.imageURL || '');
    }
  }, [findUser]);
  const logout = async () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((err) => console.log('Error:', err));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setDisplayName(findUser.displayName);
    setPhoneNumber(findUser.phoneNumber);
    setUserImage(userImage);
  };
  return (
    <div className='user-profile'>
      <Navbar />
      <div className='user-container'>
        <div className='user-details'>
          <h2>User Profile</h2>
          <img className='user-img' src={userImage} alt='' />

          <div>
            <div className='input-section'>
              <input
                type='file'
                accept='image/*'
                onChange={(e) => setUserImage(e.target.files[0])}
                disabled={!isEditing}
              />
            </div>

            <div className='input-section'>
              <input
                type='text'
                name='displayName'
                placeholder='Name'
                value={displayName}
                isEditing
                onChange={(e) => setDisplayName(e.target.value)}
                disabled={!isEditing}
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
                disabled={!isEditing}
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
            <button className='button' onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
