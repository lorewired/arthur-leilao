import { useContext } from "react"
import { Link } from "react-router-dom"
import { AccountContext } from "../contexts/AccountContext";
import logo from '../assets/logo.png'

const Header = () => {
  const { account } = useContext(AccountContext);

  return (
    <div className="flex w-screen items-center justify-between border-b border-stone-300">
        <div className="w-[320px] px-5 border-r border-stone-300">
            <Link to="/" className="flex gap-2 items-center">
                <img
                  className="w-[80px]"
                  src={logo}
                  alt="yurai logo"
                />
                <h1>Yurai Bids</h1>
            </Link>
        </div>
        <h3 className="py-3 px-5">{account?.username}</h3>
    </div>
  )
}

export default Header