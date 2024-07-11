import { useContext } from "react";
import Container from "../components/Container";
import NotLogged from "../components/NotLogged";
import PageTitle from "../components/PageTitle";
import WelcomeMessage from "../components/WelcomeMessage";
import { AccountContext } from "../contexts/AccountContext";

const Home = () => {
    const context = useContext(AccountContext);

    return (
        <Container>
            <PageTitle title="Home"/>
            { context.account ? <WelcomeMessage /> : <NotLogged /> }
            {/* future first products */}
        </Container>
    )
}

export default Home