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
const Navbar = ({ updateSearchQuery }) => {
  const { totalQuantity } = useCartGLobalContext();
  const { user } = useStateValue();
  console.log(user);
  const navigate = useNavigate();
  const handleSearchChange = (e) => {
    updateSearchQuery(e.target.value);
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
          <Link to='/user'>
            <IoMdContact />
          </Link>
          <Link to='/cart'>
            🛒 <span className='cart-count'>{totalQuantity}</span>
          </Link>
          <button className='btn' onClick={logout}>
            <IoMdLogOut />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
