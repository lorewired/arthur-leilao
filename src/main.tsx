import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { AccountProvider } from './contexts/AccountContext.tsx'
import { BidProvider } from './contexts/BidContext.tsx'
import './index.css'
import AddProduct from './pages/AddProduct.tsx'
import BidMenu from './pages/Bid.tsx'
import Home from './pages/Home.tsx'
import Login from './pages/Login.tsx'
import MyBids from './pages/MyBids.tsx'
import MyProducts from './pages/MyProducts.tsx'
import Products from './pages/Products.tsx'
import Signup from './pages/Signup.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {path: "/", index: true, element: <Home />},
      {path: "/products", element: <Products />},
      {path: "/add-product", element: <AddProduct />},
      {path: "/my-products", element: <MyProducts />},
      {path: "/signup", element: <Signup />},
      {path: "/login", element: <Login />},
      {path: "/bid", element: <BidMenu />},
      {path: "/my-bids", element: <MyBids />}
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AccountProvider>
      <BidProvider>
        <RouterProvider router={router} />
      </BidProvider>
    </AccountProvider>
  </React.StrictMode>
)
