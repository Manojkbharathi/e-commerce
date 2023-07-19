import { Outlet, Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  separateItems,
  advertiseItem,
  mobile,
  washingMachine,
} from '../components/data';
import '../components/productStyle.css';
import WashingMachines from './washingMachines';
const Products = () => {
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
    <div>
      <div>
        {' '}
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
          {separateItems.map(({ id, productImg }) => {
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
          {mobile.map(({ id, productImg }) => {
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
          {washingMachine.map(({ id, productImg }) => {
            return (
              <div className='single-product' key={id}>
                <Link to='washingMachine'>
                  <img src={productImg} alt='' className='product-icon' />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Products;
