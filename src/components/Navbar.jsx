import { Outlet, Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <div>
      <div className='navbar'>
        <div className='cart-icon'>🛒</div>
        <div>
          <Link to='/products'>Products</Link>
          <Link to='/signIn'>SignIn</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
