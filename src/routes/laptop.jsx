import React from 'react';
import Navbar from '../components/nav-bar/Navbar';
import { laptopProducts } from '../components/data';
import { useCartGLobalContext } from '../context/context';
const Laptop = () => {
  const { addToCart } = useCartGLobalContext();
  const handleClick = (item) => {
    const newItem = { ...item };
    addToCart(newItem);
  };
  return (
    <div>
      <div>
        <Navbar />
        <div className=' product-description'>
          <img
            className='head-img'
            src='https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1688127795/Croma%20Assets/CMS/PCP/June%20-2023/30-06-2023/Laptop%20PCP/Desktop/Main%20Banner/PCP_LP_NC_16May2023_wc0ksd.png?tr=w-2048'
            alt=''
          />
          <h3 className='img-desc'>
            While tablets and smartphones are still popular, most people agree
            that everything, from doing research for an assignment to playing
            hardcore games, works better on a laptop. It doesn't matter what
            your lifestyle is, there is always one for you at Croma.
          </h3>
        </div>
        <div className='watch-container'>
          {laptopProducts.map(
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

export default Laptop;
