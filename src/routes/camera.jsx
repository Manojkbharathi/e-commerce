import React from 'react';
import Navbar from '../components/nav-bar/Navbar';

import { cameraProducts } from '../components/data';
import { useCartGLobalContext } from '../context/context';
const Tv = () => {
  const { addToCart } = useCartGLobalContext();
  const handleClick = (item) => {
    const newItem = { ...item };
    addToCart(newItem);
  };
  return (
    <div>
      {' '}
      <Navbar />
      <div className=' product-description'>
        <img
          className='head-img'
          src='https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1684506681/Croma%20Assets/CMS/PCP/Camara%20PCP%20desktop/PCP_Imaging_16may2023_zkxkhz.png?tr=w-2048'
          alt=''
        />
        <h3 className='img-desc'>
          Whether you’re on an exotic wildlife safari, skydiving from a plane,
          filming your friend’s wedding, or just vlogging about your travels,
          your smartphone will never hold a candle to the right camera. No
          matter what you want to shoot, there’ always a camera for you at
          Croma.
        </h3>
      </div>
      <div>
        <div className='watch-container'>
          {cameraProducts.map(
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

export default Tv;
