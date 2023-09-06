import React, { useEffect, useState } from 'react';
import Navbar from '../components/nav-bar/Navbar';
import '../components/user.css';
import { signOut } from 'firebase/auth';
import { auth, db, storage } from '../utils/firebase';
import { useStoreConsumer } from '../context/storeProvider';
import { updateDoc, doc, getDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { PacmanLoader } from 'react-spinners';
const User = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isEditingPhoto, setIsEditingPhoto] = useState('');
  const [gender, setGender] = useState('');
  const [userImage, setUserImage] = useState(null);
  const { user, userEmailData } = useStoreConsumer();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const findUser =
    user &&
    user.find(
      (item) => item.email === userEmailData.email && userEmailData.email
    );
  const userId = findUser.uid;

  console.log(findUser);
  // const userId = findUser.uid;
  const handleImageUpload = async (userId) => {
    try {
      if (userImage) {
        if (!userImage.type.startsWith('image/')) {
          return null;
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
    if (displayName && phoneNumber) {
      try {
        setLoading(true);
        let updatedData = {
          displayName,
          phoneNumber,
          gender,
        };

        if (isEditingPhoto && userImage) {
          if (!userImage.type || !userImage.type.startsWith('image/')) {
            console.error('Selected file is not an image.');
            return null;
          }
          if (userImage.size > 5 * 1024 * 1024) {
            console.error(
              'Selected image is too large. Please select a smaller image.'
            );
            return null;
          }
          const photoURL = await handleImageUpload(userId); // Upload the image
          console.log('Image URL:', photoURL);
          if (photoURL) {
            updatedData.photoURL = photoURL;
          } else {
            // Handle the case where image upload fails
            console.error('Image upload failed.');
            return;
          }
        } else {
          // If no new image selected, retain the existing image URL
          updatedData.photoURL = null;
        }

        const itemToEdit = doc(db, 'users', userId);
        await updateDoc(itemToEdit, updatedData);

        setIsEditing(false);
        navigate('/products');
        window.location.reload('/products');
      } catch (error) {
        console.error('Error in updating:', error);
      } finally {
        setLoading(false);
      }
    } else {
      console.log('Name or phone number is empty');
    }
  };

  useEffect(() => {
    if (findUser) {
      setDisplayName(findUser.displayName || '');
      setPhoneNumber(findUser.phoneNumber || '');
      setUserImage(findUser.photoURL || '');
      setGender(findUser.gender);
    }
  }, [findUser]);
  findUser.photoURL;
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
  };
  const editPhoto = () => {
    setIsEditingPhoto(true);
  };
  return (
    <div className='user-profile'>
      <Navbar />
      <div className='user-container'>
        <div className='user-details'>
          <h2>User Profile</h2>
          <img
            className='user-img'
            src={userImage || findUser.photoURL}
            alt=''
          />

          <div className={`user-data ${loading ? 'blur' : ''}`}>
            <div className='img-section'>
              <input
                type='file'
                accept='image/*'
                onChange={(e) => setUserImage(e.target.files[0])}
                disabled={!isEditingPhoto}
              />
              <button className='button' onClick={editPhoto}>
                Edit PHoto
              </button>
            </div>

            <div className='input-container'>
              <div className='input-section'>
                <input
                  type='text'
                  name='displayName'
                  placeholder='Name'
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  disabled={!isEditing}
                />
              </div>

              <div className='input-section'>
                <input
                  type='text'
                  name='email'
                  placeholder='Email'
                  value={findUser.email}
                  readOnly
                />
              </div>
              <div className='input-section'>
                <input
                  type='text'
                  name='phoneNumber'
                  placeholder='Ph number'
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className='input-section'>
                <div className='profile-gender'>
                  <label>Gender : </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    id='gender'
                    placeholder='gender'
                    required
                    disabled={!isEditingPhoto}
                  >
                    <option defaultChecked>Gender</option>
                    <option value='Male'>Male</option>
                    <option value='Women'>Women</option>
                    <option value='Other'>Other</option>
                  </select>
                </div>
              </div>
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
                {loading && (
                  <div className='loader-container'>
                    <PacmanLoader
                      color='#e62323'
                      margin={-1}
                      loading={loading}
                      size={100}
                    />
                  </div>
                )}
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
