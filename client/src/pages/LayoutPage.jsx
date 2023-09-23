/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom"
import Navbar from "../components/NavComponents/Navbar"

const LayoutPage = ({socket}) => {
  return (
    <div>
        <Navbar socket={socket}/>
        <main>
            <Outlet />
        </main>
    </div>
  )
}
export default LayoutPage