import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div className="flex w-screen items-center justify-between border-b border-stone-300">
        <div className="w-[320px] py-4 px-5 border-r border-stone-300">
            <Link to="/">
                <button className="">Arthur Apostas</button>
            </Link>
        </div>
        <button className="py-3 px-5">Docs</button>
    </div>
  )
}

export default Header