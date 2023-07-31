import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../nav-bar/navbarStyle.css';
import { IoMdContact } from 'react-icons/io';
import { useCartGLobalContext } from '../../context/context';
const Navbar = () => {
  const { totalQuantity } = useCartGLobalContext();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <div className='navbar'>
        <div className='profile'></div>
        <div className='nav-content'>
          <div className='search-bar'>
            <input
              type='text'
              placeholder='Search'
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
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
