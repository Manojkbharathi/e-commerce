import Navbar from '../components/nav-bar/Navbar';
import { useCartGLobalContext } from '../context/context';

const Cart = () => {
  const { cart } = useCartGLobalContext();

  return (
    <div>
      <Navbar />
      <div className='cart-items'>
        <div className='cart-header'>
          {cart.map((item) => (
            <div key={item.id}>
              <img src={item.image} alt='' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
