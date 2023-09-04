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

const Navbar = ({ updateSearchQuery }) => {
  const { totalQuantity } = useCartGLobalContext();
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

  return (
    <div>
      <div className='navbar'>
        <Link to='/products'>
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
            <option defaultChecked>profile</option>
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
