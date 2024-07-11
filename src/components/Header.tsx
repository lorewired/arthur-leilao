import { useContext } from "react"
import { Link } from "react-router-dom"
import { AccountContext } from "../contexts/AccountContext";

const Header = () => {
  const { account } = useContext(AccountContext);

  return (
    <div className="flex w-screen items-center justify-between border-b border-stone-300">
        <div className="w-[320px] py-4 px-5 border-r border-stone-300">
            <Link to="/">
                <button className="">Arthur Apostas</button>
            </Link>
        </div>
        <h3 className="py-3 px-5">{account?.username}</h3>
    </div>
  )
}

export default Header