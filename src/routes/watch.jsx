import { useState } from 'react';
import { watchProducts } from '../components/data';
import Navbar from '../components/nav-bar/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { useCartGLobalContext } from '../context/context';

const Watch = () => {
  const { addToCart } = useCartGLobalContext();

  const handleClick = (item) => {
    const newItem = { ...item };
    addToCart(newItem); // Add the clicked item to the cart using the context function
  };

  return (
    <div>
      <Navbar />

      <div className='watch-container'>
        {watchProducts.map(({ image, text, details, price, id, quantity }) => {
          return (
            <div className='individual-item' key={id}>
              <img src={image} alt='' className='product-icon' />
              <h2 className='name'>{text}</h2>
              <h4>
                ₹<span>{price}</span>
              </h4>
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
          );
        })}
      </div>
    </div>
  );
};

export default Watch;
