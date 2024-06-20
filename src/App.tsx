import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import NavBar from "./components/NavBar"
import Container from "./components/Container"

const App = () => {
  return (
    <div>
      <Header />
      <div className="w-screen flex">
        <NavBar />
        <Container>
          <Outlet />
        </Container>
      </div>
    </div>
  )
}

export default App