import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root, ErrorPage, SingleProduct, Products, SignIn } from './routes';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'products/:productId',
        element: <SingleProduct />,
      },

      {
        path: 'signIn',
        element: <SignIn />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
