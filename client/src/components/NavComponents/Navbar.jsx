import { HiOutlineBell } from "react-icons/hi"
import { BiEdit } from "react-icons/Bi"

import image from "../../images/dummyProfileImg.jpg"

const Navbar = () => {
  return (
    <nav className="navigation">
      <div className="navigation__items">
        <h1>READER</h1>
        <div className="navigation__mainItems">
          <div className="navigation__notification">
            <HiOutlineBell className="navigation__notification--icon" />
          </div>
          <div className="navigation__profileIcon">
            <img src={image} alt="profile picture" />
          </div>
        </div>
        <button className="navigation__btn">
          <BiEdit />
          Write
        </button>
      </div>
    </nav>
  )
}
export default Navbar
