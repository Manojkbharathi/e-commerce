import { Outlet, Link } from 'react-router-dom';
import '../nav-bar/navbarStyle.css';
import { AiOutlineSearch } from 'react-icons/ai';
const Navbar = () => {
  return (
    <div>
      <div className='navbar'>
        <input type='text' placeholder='search' />
        <Link to='/'>Home</Link>
        <Link to='/signIn'>SignIn</Link>
        <Link to='/cart'>
          🛒 <span>0</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
