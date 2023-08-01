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
      <div className=' product-description'>
        <img
          className='head-img'
          src='https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1684242615/Croma%20Assets/CMS/CAtegory/Mobile%20phone%20-%20C10/16-05-23/Desktop/Main%20Banner/D_main-banner_hat0zq.png?tr=w-2048'
          alt=''
        />
        <h3 className='img-desc'>
          Experience the world at your fingertips! Work, socialise, book a ride,
          play games, listen to music, watch your favourite shows, take a photo,
          or simply make a call! Buy a Mobile Phone from Croma that does it all
          and then some.
        </h3>
      </div>
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
