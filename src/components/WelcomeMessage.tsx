import { useContext } from "react"
import { AccountContext } from "../contexts/AccountContext";
import { Link } from "react-router-dom";

const WelcomeMessage = () => {
    const { account } = useContext(AccountContext);

    return (
        <div className="text-lg mt-6">
            Welcome 
            <span className="ml-1 text-blue-500 text-lg">{account?.username}</span>
            , Here you will find the bests <Link className="ml-0.5 text-blue-500 text-lg" to="/products">products</Link> on auction
        </div>
    )
}

export default WelcomeMessage