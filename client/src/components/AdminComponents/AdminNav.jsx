import { FaBookOpen, FaUsers } from 'react-icons/fa'
import {BsGraphDown} from 'react-icons/bs'
import { Link } from 'react-router-dom'
const AdminNav = () => {
  return (
    <nav className="admin__nav">
      <Link to={'/'} className='adminBtn'>Home</Link>
      <ul className="admin__nav__links">
        <Link to='/admin-dashboard/graph'>
          <li className="admin__nav__link">
            <BsGraphDown />
            Graph
          </li>
        </Link>
        <Link to='/admin-dashboard/blogs'>
          <li className="admin__nav__link">
            <FaBookOpen />
            Blogs
          </li>
        </Link>
        <Link to='/admin-dashboard/users'>
          <li className="admin__nav__link">
            <FaUsers />
            Users
          </li>
        </Link>
      </ul>
      <button className='adminBtn logout'>Logout</button>
    </nav>
  )
}
export default AdminNav