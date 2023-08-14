import React, { useState, useEffect } from 'react';
import { useCartGLobalContext } from '../context/context';
import { onAuthStateChanged } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../components/footer.css';
import { SiShopify } from 'react-icons/si';
import Navbar from '../components/nav-bar/Navbar';
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
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  const [users, setUsers] = useState({ name: '', email: '', message: '' });

  const { name, email, message } = users;
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setId(uid);
      } else {
        navigate('/logIn');
      }
    });
  }, [navigate]);
  function handleOnchange(event) {
    const value = event.target.value;
    const key = event.target.name;
    setUsers({ ...users, [key]: value });
  }
  function submitHandler() {
    setUsers({ name: '', email: '', message: '' });
  }

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
  const { totalQuantity } = useCartGLobalContext();
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <div className='home'>
      <Navbar updateSearchQuery={setSearchQuery} />
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
              item.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map(({ id, productImg, name }) => {
              return (
                <div className='single-product' key={id}>
                  <Link to='/productWatches'>
                    <img src={productImg} className='product' />
                    <p className='product-name'>{name}</p>
                  </Link>
                </div>
              );
            })}
        </div>

        <div>
          {mobile
            .filter((item) =>
              item.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map(({ id, productImg, name }) => {
              return (
                <div className='single-product' key={id}>
                  <Link to='/mobile'>
                    <img src={productImg} alt='' className='product' />
                    <p className='product-name'>{name}</p>
                  </Link>
                </div>
              );
            })}
        </div>
        <div className='wash'>
          {washingMachine
            .filter((item) =>
              item.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map(({ id, productImg, name }) => {
              return (
                <div className='single-product' key={id}>
                  <Link to='/washingMachine'>
                    <img src={productImg} alt='' className='product' />
                    <p className='product-name'>{name}</p>
                  </Link>
                </div>
              );
            })}
        </div>
        <div className='audio'>
          {audio
            .filter((item) =>
              item.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map(({ id, productImg, name }) => {
              return (
                <div className='single-product' key={id}>
                  <Link to='/audio'>
                    <img src={productImg} alt='' className='product' />
                    <p className='product-name'>{name}</p>
                  </Link>
                </div>
              );
            })}
        </div>
        <div className='tv'>
          {tv
            .filter((item) =>
              item.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map(({ id, productImg, name }) => {
              return (
                <div className='single-product' key={id}>
                  <Link to='/tv'>
                    <img src={productImg} alt='' className='product' />
                    <p className='product-name'>{name}</p>
                  </Link>
                </div>
              );
            })}
        </div>
        <div className='camera'>
          {camera
            .filter((item) =>
              item.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map(({ id, productImg, name }) => {
              return (
                <div className='single-product' key={id}>
                  <Link to='/camera'>
                    <img src={productImg} alt='' className='product' />
                    <h4>camera</h4>
                    <p className='product-name'>{name}</p>
                  </Link>
                </div>
              );
            })}
        </div>
        <div className='laptop'>
          {laptop
            .filter((item) =>
              item.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map(({ id, productImg, name }) => {
              return (
                <div className='single-product' key={id}>
                  <Link to='/laptop'>
                    <img src={productImg} alt='' className='product' />
                    <p className='product-name'>{name}</p>
                  </Link>
                </div>
              );
            })}
        </div>
        <div className=''>
          {ac
            .filter((item) =>
              item.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map(({ id, productImg, name }) => {
              return (
                <div className='single-product' key={id}>
                  <Link to='/ac'>
                    <img src={productImg} alt='' className='product' />

                    <p className='product-name'>{name}</p>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>

      <footer className='footer'>
        <form
          className='form'
          action='https://formsubmit.co/manojbharathi00@gmail.com'
          method='POST'
          onChange={(event) => handleOnchange(event)}
        >
          <div>
            <input
              type='text'
              placeholder='Your Name'
              name='name'
              onChange={(event) => handleOnchange(event)}
              value={name}
              required
            />
          </div>
          <div>
            <input
              type='email'
              name='email'
              value={email}
              placeholder='Your mail id'
              onChange={(event) => handleOnchange(event)}
              required
            />
          </div>

          <div>
            <button className='btn-submit' type='submit'>
              submit
            </button>
          </div>
        </form>
        <div className='social-icons'>
          <a
            className='s-icons'
            href='https://silver-platypus-c72db6.netlify.app'
          >
            <AiFillInstagram />
          </a>
          <a
            className='s-icons'
            href='https://silver-platypus-c72db6.netlify.app'
          >
            <AiOutlineFacebook />
          </a>
          <a
            className='s-icons'
            href='https://silver-platypus-c72db6.netlify.app'
          >
            <AiOutlineTwitter />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Products;
