import Navbar from '../components/nav-bar/Navbar';
import { useCartGLobalContext } from '../context/context';
import '../components/cart.css';
const Cart = () => {
  const { cart } = useCartGLobalContext();

  return (
    <div className='cart'>
      <Navbar />
      <div className='cart-items'>
        <div className='cart-header'>
          {cart.map((item) => (
            <div className='cart-items'>
              <img src={item.image} alt='' className='cart-icon' />
              <section className='details'>
                <h2 className='name'>{item.text}</h2>
                <h4>{item.price}</h4>
                <p className='desc'>{item.details}</p>
              </section>

              <div className='button-section'>
                <button className='cart-btn'>Remove</button>
                <button className='cart-btn'>+</button>
                <button className='cart-btn'>-</button>
                <h2>
                  subTotal:<span className='sub'>0</span>
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h1>
          Total:<span>0</span>
        </h1>
      </div>
    </div>
  );
};

export default Cart;
