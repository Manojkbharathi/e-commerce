import Navbar from '../components/nav-bar/Navbar';
import { useCartGLobalContext } from '../context/context';
import '../components/cart.css';
const Cart = () => {
  const {
    cart,
    clearCart,
    removeItem,
    increaseItem,
    decreaseItem,
    totalPrice,
  } = useCartGLobalContext();

  return (
    <div className='cart'>
      <Navbar />
      <div className='cart-content'>
        <div className='cart-header'>
          {cart.map((item) => (
            <div className='cart-items' key={item.id}>
              <img src={item.image} alt='' className='cart-icon' />
              <section className='details'>
                <h2 className='name'>{item.text}</h2>
                <h4> ₹{item.price}</h4>
                <p className='desc'>{item.details}</p>
              </section>

              <div className='button-section'>
                <button className='remove-btn' onClick={() => removeItem(item)}>
                  Remove
                </button>
                <button className='add-btn' onClick={() => increaseItem(item)}>
                  +
                </button>
                <button
                  className='decrease-btn'
                  onClick={() => decreaseItem(item)}
                >
                  -
                </button>
                <h2 className='quantity'>
                  Quantity:
                  <span>{item.quantity}</span>
                </h2>
              </div>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <section className='cart-footer'>
            <button className='clear-btn' onClick={() => clearCart()}>
              Clear cart
            </button>
            <h1 className='total'>
              Total:<span> ₹{`${totalPrice.toFixed(2)}`}</span>
            </h1>
          </section>
        )}
      </div>
    </div>
  );
};

export default Cart;
