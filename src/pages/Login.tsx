import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Container from "../components/Container"
import PageTitle from "../components/PageTitle"
import PopUp from "../components/PopUp"
import { AccountContext } from "../contexts/AccountContext"

const Login = () => {
    const [popupText, setPopupText] = useState('');
    const [popupColor, setPopupColor] = useState('');
    const [popupMargin, setPopupMargin] = useState('-200px');

    const [redirect, setRedirect] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const context = useContext(AccountContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (redirect) {
            setTimeout(() => navigate('/'), 200);
        }
    }, [redirect, navigate]);

    const submitForm = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        
        const status_code = await context.loginAccount({
            username, password
        });

        handlePopUp(status_code!);

        setUsername('');
        setPassword('');

        if (status_code === 200 || status_code === 201) {
            setRedirect(true);
        }
    }

    const handlePopUp = (code: number) => {
        switch (code) {
        case 200 || 201:
            setPopupText('Success');
            setPopupColor('bg-green-500');
            break;
        case 404:
            setPopupText('Not Found');
            setPopupColor('bg-orange-600');
            break;
        case 400:
            setPopupText('Invalid Credentials');
            setPopupColor('bg-red-500');
            break;
        default:
            setPopupText('Internal Error');
            setPopupColor('bg-red-500');
            break;
        }

        setPopupMargin('0');
        setTimeout(() => {
            setTimeout(() => setPopupMargin('mt-[-200px]'), 2500);
        }, 300);
    }

    return (
        <Container>
            <PopUp 
                text={popupText}
                color={popupColor}
                margin={popupMargin}
            />

            <PageTitle title="Login" />
            <form
                className="mt-10 flex flex-col gap-2"
            >
                <div className="flex flex-col gap-1">
                    <label htmlFor="username" className="text-md ml-1">Username</label>
                    <input
                        onChange={e => setUsername(e.target.value)}
                        value={username}
                        className="bg-gray-200 px-3 py-1 rounded-lg text-sm w-[300px]
                        transition duration-300 focus:bg-gray-300"
                        required
                        type="text"
                        id="username"
                        placeholder="username"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="username" className="text-md ml-1">Password</label>
                    <input
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        className="bg-gray-200 px-3 py-1 rounded-lg text-sm w-[300px] placeholder:text-sm
                        transition duration-300 focus:bg-gray-300"
                        required
                        placeholder="********"
                        type="password"
                        id="password"
                    />
                </div>

                <button
                    onClick={e => submitForm(e)}
                    className="bg-gray-200 rounded-lg mt-1 py-1 text-md transition duration-300 hover:bg-gray-300"
                >
                    submit
                </button>

                <p>
                    don't have an account?
                    <Link
                        to="/signup"
                        className="text-blue-500 ml-1 transition duration-300 hover:text-blue-300"
                    >
                        signup
                    </Link>
                </p>
            </form>
        </Container>
    )
}

export default Login