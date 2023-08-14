import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root.jsx';
import { CartProvider } from './context/context';
import {
  ErrorPage,
  Watch,
  Mobile,
  WashingMachines,
  Products,
  Audio,
  SignUp,
  Cart,
  Tv,
  Camera,
  Laptop,
  Ac,
  LogIn,
} from './routes/index.js';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: '/',
        element: <SignUp />,
      },
      {
        path: 'products',
        element: <Products />,
      },

      {
        path: '/productWatches',
        element: <Watch />,
      },
      {
        path: 'mobile',
        element: <Mobile />,
      },
      {
        path: 'washingMachine',
        element: <WashingMachines />,
      },
      {
        path: 'audio',
        element: <Audio />,
      },
      {
        path: 'tv',
        element: <Tv />,
      },
      {
        path: 'camera',
        element: <Camera />,
      },
      {
        path: 'laptop',
        element: <Laptop />,
      },
      {
        path: 'ac',
        element: <Ac />,
      },

      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'logIn',
        element: <LogIn />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
);
