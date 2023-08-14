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
  const handleSearchChange = (e) => {
    updateSearchQuery(e.target.value);
  };
  const handleLogout = async () => {
    signOut(auth)
      .then(() => {
        navigate('/');
        localStorage.clear();
        window.location.reload();
      })
      .catch((err) => console.log(err.message));
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
          <Link to='/'>SignUp</Link>
          <Link to='/logIn'>Log In</Link>
          <Link to='/cart'>
            🛒 <span className='cart-count'>{totalQuantity}</span>
          </Link>
          <button className='btn' onClick={handleLogout}>
            <IoMdLogOut />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
