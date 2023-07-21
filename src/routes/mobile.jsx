import Navbar from '../components/nav-bar/Navbar';
import { washingMachineProducts } from '../components/data';
const Mobile = () => {
  return (
    <div>
      <Navbar />

      <div className='watch-container'>
        {washingMachineProducts.map(({ image, text, details, price, id }) => {
          return (
            <div className='individual-item' key={id}>
              <img src={image} alt='' className='product-icon' />
              <h2>{price}</h2>

              <p className='text'>{text}</p>
              <p>{details}</p>
              <button className='cart-btn'>Add to cart</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Mobile;
