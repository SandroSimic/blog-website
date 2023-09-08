import { HiOutlineBell } from "react-icons/hi"
import { BiEdit } from "react-icons/Bi"
import { FaUserAlt } from 'react-icons/fa'
import { Link } from "react-router-dom"
import { useUserContext } from "../../context/UserContext"

const Navbar = () => {

  const { user, logoutUser } = useUserContext()
  return (
    <nav className="navigation">
      <div className="navigation__items">
        <h1>
          <Link to={'/blogs'}>READER</Link>
        </h1>
        {user ? <div className="navigation__mainItems">
          <div className="navigation__notification">
            <HiOutlineBell className="navigation__notification--icon" />
          </div>
          <div className="navigation__profileIcon">
            <img src={user.image} alt={user.username} />
          </div>
        </div> : ''}

        <div className="navigation__buttons">
          {user &&
            <Link to={'/new-blog'}>
              <button className="navigation__btn">
                <BiEdit />
                Write
              </button>
            </Link>
          }
          {user ? (
            <Link to={'/'}>
              <button className="navigation__btn" onClick={() => logoutUser()}>
                <FaUserAlt />
                Logout
              </button>
            </Link>) : (
            <Link to={'/login'}>
              <button className="navigation__btn">
                <FaUserAlt />
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
export default Navbar
