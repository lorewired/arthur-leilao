import { Outlet } from "react-router-dom"
import Container from "./components/Container"
import Header from "./components/Header"
import NavBar from "./components/NavBar"

const App = () => {

  return (
    <div>
      <Header />
      <div className="flex">
        <NavBar />
        <Container>
          <Outlet />
        </Container>
      </div>
    </div>
  )
}

export default App