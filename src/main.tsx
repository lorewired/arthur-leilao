import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Products from './pages/Products.tsx'
import MyProducts from './pages/MyProducts.tsx'
import Settings from './pages/Settings.tsx'
import AddProduct from './pages/AddProduct.tsx'
import { AccountProvider } from './contexts/AccountContext.tsx'
import Signup from './pages/Signup.tsx'
import Login from './pages/Login.tsx'
import BidMenu from './pages/Bid.tsx'
import { BidProvider } from './contexts/BidContext.tsx'
import MyBids from './pages/MyBids.tsx'

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
