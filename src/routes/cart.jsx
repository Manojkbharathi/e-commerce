import Navbar from '../components/nav-bar/Navbar';
import CartContext from '../context/cartCOntext';
const Cart = () => {
  return (
    <div>
      <Navbar />
      <CartContext />
    </div>
  );
};

export default Cart;
