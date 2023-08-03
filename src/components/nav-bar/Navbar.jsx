import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../nav-bar/navbarStyle.css';
import { IoMdContact } from 'react-icons/io';
import { useCartGLobalContext } from '../../context/context';
import { SiShopify } from 'react-icons/si';

const Navbar = () => {
  const { totalQuantity } = useCartGLobalContext();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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
        <div className='profile'></div>
        <div className='nav-content'>
          <Link to='/'>Home</Link>
          <Link to='/signUp'>SignUp</Link>
          <Link to='/logIn'>Log In</Link>
          <Link to='/cart'>
            🛒 <span className='cart-count'>{totalQuantity}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
