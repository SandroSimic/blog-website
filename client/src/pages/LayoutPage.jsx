import { Outlet } from "react-router-dom"
import Navbar from "../components/NavComponents/Navbar"

const LayoutPage = () => {
  return (
    <div>
        <Navbar />
        <main>
            <Outlet />
        </main>
    </div>
  )
}
export default LayoutPage