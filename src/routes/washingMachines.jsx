import React from 'react';
import { washingMachineProducts } from '../components/data';
import Navbar from '../components/nav-bar/Navbar';
const WashingMachines = () => {
  return (
    <div>
      <Navbar />
      <div>
        <div className='watch-container'>
          {washingMachineProducts.map(({ image, text, details, price, id }) => {
            return (
              <div className='individual-item' key={id}>
                <img src={image} alt='' className='product-icon' />
                <h2 className='name'>{text}</h2>

                <h4>{price}</h4>

                <p>{details}</p>
                <button className='cart-btn'>Add to cart</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WashingMachines;
