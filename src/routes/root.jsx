import { Outlet } from 'react-router-dom';
import '../../src/index.css';
import Navbar from '../components/nav-bar/Navbar';
const Root = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Root;
