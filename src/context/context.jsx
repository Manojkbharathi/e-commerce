import { useState, useContext, createContext } from 'react';

import '../components/data';

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };
  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// consumer function
const useCartGLobalContext = () => {
  return useContext(CartContext);
};

export { CartProvider, CartContext, useCartGLobalContext };
