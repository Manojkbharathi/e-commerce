import React from 'react';
import { audioProducts } from '../components/data';
import Navbar from '../components/nav-bar/Navbar';
import { useCartGLobalContext } from '../context/context';
import { v4 as uuidv4 } from 'uuid';
const audio = () => {
  const { addToCart } = useCartGLobalContext();
  const handleClick = (item) => {
    const newItem = { ...item, id: uuidv4 };
    addToCart(newItem);
  };
  return (
    <div>
      <Navbar />
      <div>
        <div className='watch-container'>
          {audioProducts.map(
            ({ image, text, details, price, id, quantity }) => {
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
                        handleClick({
                          image,
                          text,
                          details,
                          price,
                          id,
                          quantity,
                        })
                      }
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default audio;
