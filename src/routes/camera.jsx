import React from 'react';
import Navbar from '../components/nav-bar/Navbar';

import { cameraProducts } from '../components/data';
const Tv = () => {
  return (
    <div>
      {' '}
      <Navbar />
      <div>
        <div className='watch-container'>
          {cameraProducts.map(({ image, text, details, price, id }) => {
            return (
              <div className='individual-item' key={id}>
                <img src={image} alt='' className='product-icon' />
                <div className='details'>
                  <h2 className='name'>{text}</h2>
                  <h4>{price}</h4>
                  <p>{details}</p>
                  <button className='cart-btn'>Add to cart</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Tv;
