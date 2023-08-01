import React, { useState, useEffect } from 'react';
import { useCartGLobalContext } from '../context/context';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../components/footer.css';
import { IoMdLogOut, IoMdContact } from 'react-icons/io';
import { SiShopify } from 'react-icons/si';
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
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserName(uid);
      } else {
        console.log('user is logged out');
      }
    });
  }, []);

  const handleLogout = async () => {
    signOut(auth)
      .then(() => {
        setUserName('Signed out successfully');
        navigate('/logIn');
      })
      .catch((err) => console.log(err.message));
  };
  const [users, setUsers] = useState({ name: '', email: '', message: '' });

  const { name, email, message } = users;

  function handleOnchange(event) {
    const value = event.target.value;
    const key = event.target.name;
    setUsers({ ...users, [key]: value });
  }
  function submitHandler() {
    setUsers({ name: '', email: '', message: '' });
  }

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
  const { totalQuantity } = useCartGLobalContext();

  return (
    <div className='home'>
      <div className='navbar'>
        <div className='profile'>
          <p>e-shop</p>
          <span className='logo'>{<SiShopify />}</span>
        </div>
        <div className='nav-content'>
          <div className='search-bar'>
            <input
              type='text'
              placeholder='Search'
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <Link to='/'>Home</Link>
          <Link to='/signUp'>SignUp</Link>
          <Link to='/cart'>
            🛒 <span className='cart-count'>{totalQuantity}</span>
          </Link>
          <button className='btn' onClick={handleLogout}>
            <IoMdLogOut />
          </button>
          <h3>
            user-Id: <span>{userName}</span>
          </h3>
        </div>
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
              item.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map(({ id, productImg, name }) => {
              return (
                <div className='single-product' key={id}>
                  <Link to='productWatches'>
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
                  <Link to='mobile'>
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
                  <Link to='washingMachine'>
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
                  <Link to='audio'>
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
                  <Link to='tv'>
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
                  <Link to='camera'>
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
                  <Link to='laptop'>
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
                  <Link to='ac'>
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
          <AiFillInstagram />
          <AiOutlineFacebook />
          <AiOutlineTwitter />
        </div>
      </footer>
    </div>
  );
};

export default Products;
