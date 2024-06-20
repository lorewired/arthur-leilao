import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Products from './pages/Products.tsx'
import MyBids from './pages/MyBids.tsx'
import Settings from './pages/Settings.tsx'
import AddProduct from './pages/AddProduct.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {path: "/", index: true, element: <Home />},
      {path: "/products", element: <Products />},
      {path: "/add-product", element: <AddProduct />},
      {path: "/my-bids", element: <MyBids />},
      {path: "/settings", element: <Settings />}
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
