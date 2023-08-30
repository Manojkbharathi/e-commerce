import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../nav-bar/navbarStyle.css';
import { IoMdContact } from 'react-icons/io';
import { useCartGLobalContext } from '../../context/context';
import { SiShopify } from 'react-icons/si';
import { IoMdLogOut } from 'react-icons/io';
import { signOut } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../../context/stateProvider';

const Navbar = ({ updateSearchQuery, editedUserData }) => {
  const { totalQuantity } = useCartGLobalContext();
  const [{ user }] = useStateValue();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('user'); // Track the selected option

  const handleSearchChange = (e) => {
    updateSearchQuery(e.target.value);
  };

  const handleDropdownChange = (e) => {
    const selectedOption = e.target.value;
    setSelectedOption(selectedOption); // Update the selected option state
    if (selectedOption === 'user') {
      handleUser();
    } else if (selectedOption === 'logout') {
      logout();
    }
  };

  const handleUser = () => {
    console.log('Navigating to user profile...');
    navigate('/user');
  };

  const logout = async () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((err) => console.log('error'));
  };

  // Define a variable for displaying the user's name based on the selected option
  let displayNameToDisplay;
  if (selectedOption === 'user') {
    displayNameToDisplay = editedUserData?.displayName || user?.displayName;
  } else {
    displayNameToDisplay = 'User profile'; // Display this when 'User profile' is selected
  }

  return (
    <div>
      <div className='navbar'>
        <Link to='/'>
          <div className='profile'>
            <p>e-shop</p>
            <span className='logo'>{<SiShopify />}</span>
          </div>
        </Link>
        <div className='search-bar'>
          <input
            type='text'
            placeholder='Search'
            onChange={handleSearchChange}
          />
        </div>
        <div className='profile'></div>
        <div className='nav-content'>
          <Link to='/products'>Home</Link>
          <select onChange={handleDropdownChange} value={selectedOption}>
            <option value='user'>{displayNameToDisplay}</option>
            <option value='user'>User profile</option>
            <option value='logout'>Logout</option>
          </select>
          <Link to='/cart'>
            🛒 <span className='cart-count'>{totalQuantity}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
