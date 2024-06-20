import { Link } from "react-router-dom"
import { NavBarLinkProps } from "../utils/interfaces"
import productsIcon from '../assets/products-icon.png'
import addProductIcon from '../assets/add-product-icon.png'
import myBidsIcon from '../assets/my-bids-icon.png'
import settingsIcon from '../assets/settings-icon.png'

const NavBar = () => {
  return (
    <div className="flex flex-col gap-3 w-[320px] h-screen border-r border-stone-300 py-8 px-5">
      <NavBarLink
        to="/products"
        title="Products"
        icon={productsIcon}
      />
      <NavBarLink
        to="/add-product"
        title="Add Product"
        icon={addProductIcon}
      />
      <NavBarLink
        to="/my-bids"
        title="My Bids"
        icon={myBidsIcon}
      />
      <NavBarLink
        to="/settings"
        title="Settings"
        icon={settingsIcon}
      />
    </div>
  )
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