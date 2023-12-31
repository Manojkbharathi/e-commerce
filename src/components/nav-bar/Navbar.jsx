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
import User from '../../routes/user';
import logo from '../../assets/logo.png';
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
    } else {
      User;
    }
  };

  const handleUser = () => {
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
    <div className='nav'>
      <div className='navbar'>
        <Link to='/products'>
          <div className='profile'>
            <img className='logo' src={logo} alt='' />
          </div>
        </Link>
        <div className='search-bar'>
          <input
            className='search-bar'
            type='text'
            placeholder='Search'
            onChange={handleSearchChange}
          />
        </div>
        <div className='profile'></div>
        <div className='nav-content'>
          <Link className='font' to='/products'>
            Home
          </Link>
          <select onChange={handleDropdownChange} value={selectedOption}>
            <option className='font' defaultValue='user' selected>
              user
            </option>
            <option value='user'>Profile </option>

            <option value='logout'>Logout</option>
          </select>
          <Link to='/cart'>
            <div className='add-cart'>
              {' '}
              🛒 <span className='cart-count'>{totalQuantity}</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
