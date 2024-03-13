import { Outlet } from "react-router-dom"
import MyNavbar from "./MyNavbar"

function App() {

  return (
    <>
    <MyNavbar/>
    <Outlet/>
    </>
  )
}

export default App
