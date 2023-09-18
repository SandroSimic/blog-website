import { FaBookOpen, FaUsers, FaTable } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const AdminNav = () => {
  return (
    <nav className="admin__nav">
      <button className='adminBtn main'>Home</button>
      <ul className="admin__nav__links">
        <Link to='/admin-dashboard'>
          <li className="admin__nav__link">
            <FaTable />
            Main
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