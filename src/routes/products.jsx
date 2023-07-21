import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../components/footer.css';
import {
  AiFillInstagram,
  AiOutlineFacebook,
  AiOutlineTwitter,
} from 'react-icons/ai';
import {
  separateItems,
  advertiseItem,
  mobile,
  washingMachine,
  audio,
  tv,
  camera,
  laptop,
  ac,
} from '../components/data';
import '../components/productStyle.css';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <div className='home'>
      <div className='navbar'>
        <div className='search-bar'>
          <input
            type='text'
            placeholder='Search'
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <Link to='/'>Home</Link>
        <Link to='/signIn'>SignIn</Link>
        <Link to='/cart'>
          🛒 <span>0</span>
        </Link>
      </div>
      <div className='slider'>
        <Slider {...settings}>
          {advertiseItem.map(({ id, img }) => {
            return (
              <div key={id}>
                <ul>
                  <li>
                    <img src={img} alt='' className='ad-img' />
                  </li>
                </ul>
              </div>
            );
          })}
        </Slider>
      </div>
      <div className='all-products'>
        <div>
          {separateItems
            .filter((item) =>
              item.productImg.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map(({ id, productImg }) => {
              return (
                <div className='single-product' key={id}>
                  <Link to='productWatches'>
                    <img src={productImg} className='product-icon' />
                  </Link>
                </div>
              );
            })}
        </div>
        <div>
          {mobile
            .filter((item) =>
              item.productImg.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map(({ id, productImg }) => {
              return (
                <div className='single-product' key={id}>
                  <Link to='mobile'>
                    <img src={productImg} alt='' className='product-icon' />
                  </Link>
                </div>
              );
            })}
        </div>
        <div className='wash'>
          {washingMachine
            .filter((item) =>
              item.productImg.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map(({ id, productImg }) => {
              return (
                <div className='single-product' key={id}>
                  <Link to='washingMachine'>
                    <img src={productImg} alt='' className='product-icon' />
                  </Link>
                </div>
              );
            })}
        </div>
        <div className='audio'>
          {audio
            .filter((item) =>
              item.productImg.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map(({ id, productImg }) => {
              return (
                <div className='single-product' key={id}>
                  <Link to='audio'>
                    <img src={productImg} alt='' className='product-icon' />
                  </Link>
                </div>
              );
            })}
        </div>
        <div className='tv'>
          {tv
            .filter((item) =>
              item.productImg.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map(({ id, productImg }) => {
              return (
                <div className='single-product' key={id}>
                  <Link to='tv'>
                    <img src={productImg} alt='' className='product-icon' />
                  </Link>
                </div>
              );
            })}
        </div>
        <div className='camera'>
          {camera
            .filter((item) =>
              item.productImg.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map(({ id, productImg }) => {
              return (
                <div className='single-product' key={id}>
                  <Link to='camera'>
                    <img src={productImg} alt='' className='product-icon' />
                    <h4>camera</h4>
                  </Link>
                </div>
              );
            })}
        </div>
        <div className='laptop'>
          {laptop
            .filter((item) =>
              item.productImg.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map(({ id, productImg }) => {
              return (
                <div className='single-product' key={id}>
                  <Link to='laptop'>
                    <img src={productImg} alt='' className='product-icon' />
                  </Link>
                </div>
              );
            })}
        </div>
        <div className=''>
          {ac
            .filter((item) =>
              item.productImg.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map(({ id, productImg }) => {
              return (
                <div className='single-product' key={id}>
                  <Link to='ac'>
                    <img src={productImg} alt='' className='product-icon' />
                  </Link>
                </div>
              );
            })}
        </div>
      </div>

      <footer className='footer'>
        <h3>Contact us</h3>
        <input type='text' placeholder='enter your mail' />
        <h4>Social</h4>
        <div className='social-icons'>
          <AiFillInstagram />
          <AiOutlineFacebook />
          <AiOutlineTwitter />
        </div>
      </footer>
    </div>
  );
};

export default Products;
