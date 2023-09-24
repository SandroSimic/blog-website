/* eslint-disable react/prop-types */
import { HiOutlineBell } from "react-icons/hi"
import { BiEdit } from "react-icons/Bi"
import { MdAdminPanelSettings } from "react-icons/md"
import { FaUserAlt } from 'react-icons/fa'
import { Link } from "react-router-dom"
import { useUserContext } from "../../context/UserContext"
import { useEffect, useState } from "react"

const Navbar = ({ socket }) => {

  const [notifications, setNotifications] = useState([])
  const [notificationOpen, setNotificationOpen] = useState(false)
  useEffect(() => {
    socket?.on("getNotification", data => {
      setNotifications((prev) => [...prev, data])
    })
  }, [socket])


  const displayNotification = ({ senderName, type }, index) => {
    let action;

    if (type === 1) {
      action = "like"
    } else if (type === 2) {
      action = "bookmarked"
    } else {
      action = "commented"
    }
    return (
      <span className="notification" key={index}>
        {`${senderName} ${action} your blog`}
      </span>
    )
  }

  const openNotification = () => {
    setNotificationOpen(!notificationOpen)
  }
  const clearNotification = () => {
    setNotifications([])
    setNotificationOpen(false)
  }

  const { user, logoutUser } = useUserContext()
  return (
    <nav className="navigation">
      <div className="navigation__items">
        <h1>
          <Link to={'/'}>READER</Link>
        </h1>
        {user ? <div className="navigation__mainItems">
          <div className="navigation__notification">
            <HiOutlineBell className="navigation__notification--icon" onClick={openNotification} />
            {
              notifications.length > 0 && (
                <div className="navigation__notification--alert">
                  {notifications.length}
                </div>
              )
            }
            {notificationOpen && (

              notifications.length > 0 ? (
                <div className="navigation__notification--message">{notifications.map((n, index) => displayNotification(n, index)
                )}
                  <button onClick={clearNotification} className="navigation__notification--btn">Mark Read</button>
                </div>
              ) : <div className="navigation__notification--message">Your notifications are empty</div>
            )}
          </div>
          <Link to={`/profile/${user._id}`}>
            <div className="navigation__profileIcon">
              <img src={`http://localhost:8000/${user.image}`} alt={user.username} />
            </div>
          </Link>
        </div> : ''}

        <div className="navigation__buttons">
          {user && (
            <>
              {user.role === 'admin' && (
                <Link to={'/admin-dashboard'}>
                  <button className="navigation__btn">
                    <MdAdminPanelSettings />
                    Admin
                  </button>
                </Link>
              )}
              <Link to={'/new-blog'}>
                <button className="navigation__btn">
                  <BiEdit />
                  Write
                </button>
              </Link>
            </>
          )
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
