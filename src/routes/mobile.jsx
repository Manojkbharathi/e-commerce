import Navbar from '../components/nav-bar/Navbar';
import { mobileProducts } from '../components/data';
import { useCartGLobalContext } from '../context/context';
const Mobile = () => {
  const { addToCart } = useCartGLobalContext();

  const handleClick = (item) => {
    const newItem = { ...item };
    addToCart(newItem); // Add the clicked item to the cart using the context function
  };

  return (
    <div>
      <Navbar />

      <div className='watch-container'>
        {mobileProducts.map(({ image, text, details, price, id, quantity }) => {
          return (
            <div className='individual-item' key={id}>
              <img src={image} alt='' className='product-icon' />
              <div className='details'>
                <h2 className='name'>{text}</h2>
                <h4>{price}</h4>
                <p>{details}</p>
                <button
                  className='cart-btn'
                  onClick={() =>
                    handleClick({ image, text, details, price, id, quantity })
                  }
                >
                  Add to cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Mobile;
