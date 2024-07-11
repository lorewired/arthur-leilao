import { Link } from "react-router-dom"

const NotLogged = () => {
  return (
    <div className="mt-4 flex flex-col">
      <div className="[&>*]:text-lg">
        <Link className="text-blue-500 font-bold transition duration-300 hover:text-blue-300" to="/login">
          Log in
        </Link>
        <span className="ml-1">
          to your account to participate in the auction.
        </span>
      </div>
    </div>
  )
}

export default NotLogged