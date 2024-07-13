import { useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import addProductIcon from '../assets/add-product-icon.png'
import logoutIcon from '../assets/logout.png'
import myBids from '../assets/my-bids-icon.png'
import productsIcon from '../assets/products-icon.png'
import { AccountContext } from "../contexts/AccountContext"
import { LogoutNavLinkProps, NavBarLinkProps } from "../utils/interfaces"

const NavBar = () => {
  const { account, logoutAccount } = useContext(AccountContext);

  useEffect(() => {

  }, [account]);

  return (
    <div className="flex flex-col gap-3 w-[320px] h-screen border-r border-stone-300 py-8 px-5">
      <NavBarLink
        to="products"
        title="Products"
        icon={productsIcon}
      />
      <NavBarLink
        to="my-products"
        title="My Products"
        icon={productsIcon}
      />
      <NavBarLink
        to="add-product"
        title="Add Product"
        icon={addProductIcon}
      />
      <NavBarLink
        to="my-bids"
        title="My Bids"
        icon={myBids}
      />

      {account && <LogoutNavBarLink logout={logoutAccount} />}
    </div>
  )
}

const LogoutNavBarLink = ({ logout }: LogoutNavLinkProps) => {
  const navigate = useNavigate();

  return <button
    onClick={() => {
      logout();
      navigate('/signup');
    }}
    style={{ transition: '.3s all' }}
    className="rounded py-2 px-4 hover:bg-stone-100"
  >
    <div className="flex gap-2 items-center">
      <img
        className="w-[23px] h-[23px]"
        src={logoutIcon}
        alt="link icon"
      />
      <span>Logout</span>
    </div>
  </button>
}

const NavBarLink = ({ to, title, icon }: NavBarLinkProps) => {
  return <Link
    style={{ transition: '.3s all' }}
    className="rounded py-2 px-4 hover:bg-stone-100"
    to={to}
  >
    <div className="flex gap-2 items-center">
      <img
        className="w-[23px] h-[23px]"
        src={icon}
        alt="link icon"
      />
      <span>{title}</span>
    </div>
  </Link>
}

export default NavBar