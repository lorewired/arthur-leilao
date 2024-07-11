import { useContext, useEffect, useState } from "react";
import { childrenProps } from "../utils/interfaces";
import { AccountContext } from "../contexts/AccountContext";

const Container = ({ children }: childrenProps) => {
    const [op, setOp] = useState(0);
    const context = useContext(AccountContext);

    useEffect(() => {
        context.getAccount();
        setTimeout(() => setOp(1), 50);
    }, []);

    return (
        <div
            style={{transition: '.3s all', opacity: op}}
            className="h-screen flex flex-col py-6 px-10"
        >
            { children }
        </div>
    )
}

export default Container