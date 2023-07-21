import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  Root,
  ErrorPage,
  Watch,
  Mobile,
  WashingMachines,
  Products,
  Audio,
  SignIn,
  Cart,
  Tv,
  Camera,
  Laptop,
  Ac,
} from './routes';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: '/',
        element: <Products />,
      },
      {
        path: 'productWatches',
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
        path: 'signIn',
        element: <SignIn />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
