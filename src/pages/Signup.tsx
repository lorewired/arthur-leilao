import { Link, useNavigate } from "react-router-dom"
import Container from "../components/Container"
import PageTitle from "../components/PageTitle"
import { useContext, useState } from "react";
import { AccountContext } from "../contexts/AccountContext";
import PopUp from "../components/PopUp";

const Signup = () => {
    const [popupText, setPopupText] = useState('');
    const [popupColor, setPopupColor] = useState('');
    const [popupMargin, setPopupMargin] = useState('-200px');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const context = useContext(AccountContext);
    const navigate = useNavigate();

    const submitForm = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        if (password != repeatPassword) {
            setPopupText(`Passwords don't match`);
            setPopupColor('bg-orange-600');

            setUsername('');
            setPassword('');
            setRepeatPassword('');

            setPopupMargin('0');
            setTimeout(() => {
                setTimeout(() => setPopupMargin('mt-[-200px]'), 2500);
            }, 300);
            return
        }

        if (username.length > 30) {
            setPopupText(`Username max characters is 30`);
            setPopupColor('bg-orange-600');

            setUsername('');
            setPassword('');
            setRepeatPassword('');

            setPopupMargin('0');
            setTimeout(() => {
                setTimeout(() => setPopupMargin('mt-[-200px]'), 2500);
            }, 300);
            return
        }

        const status_code = await context.signupAccount({
            username, password
        });
        handlePopUp(status_code!);

        setUsername('');
        setPassword('');
        setRepeatPassword('');

        if (status_code === 200 || status_code === 201) {
            setTimeout(() => {
                navigate('/login');
                window.location.reload();
            }, 2000);
        }

        setPopupMargin('0');
        setTimeout(() => {
            setTimeout(() => setPopupMargin('mt-[-200px]'), 2500);
        }, 300);
    }

    const handlePopUp = (code: number) => {
        switch (code) {
        case 201:
        case 200:
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
            setPopupText('Account Already Exists');
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

            <PageTitle title="Signup" />
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
                        type="text"
                        id="username"
                        placeholder="username"
                        required
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-md ml-1">Password</label>
                    <input
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        className="bg-gray-200 px-3 py-1 rounded-lg text-sm w-[300px] placeholder:text-sm
                        transition duration-300 focus:bg-gray-300"
                        placeholder="********"
                        type="password"
                        id="password"
                        required
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="password2" className="text-md ml-1">Repeat Password</label>
                    <input
                        onChange={e => setRepeatPassword(e.target.value)}
                        value={repeatPassword}
                        className="bg-gray-200 px-3 py-1 rounded-lg text-md w-[300px] placeholder:text-sm
                        transition duration-300 focus:bg-gray-300"
                        placeholder="********"
                        type="password"
                        id="password2"
                        required
                    />
                </div>

                <button
                    onClick={e => submitForm(e)}
                    className="bg-gray-200 rounded-lg mt-1 py-1 text-md transition duration-300 hover:bg-gray-300"
                >
                    submit
                </button>

                <p>
                    already have an account?
                    <Link
                        to="/login"
                        className="text-blue-500 ml-1 transition duration-300 hover:text-blue-300"
                    >
                        login
                    </Link>
                </p>
            </form>
        </Container>
    )
}

export default Signup