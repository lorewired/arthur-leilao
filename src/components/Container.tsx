import { useEffect, useState } from "react";
import { childrenProps } from "../utils/interfaces";

const Container = ({ children }: childrenProps) => {
    const [op, setOp] = useState(0);

    useEffect(() => {
        setTimeout(() => setOp(1), 50);
    });

    return (
        <div
            style={{transition: '.3s all', opacity: op}}
            className="py-6 px-8"
        >
            {children}
        </div>
    )
}

export default Container