import { BsGraphDown } from 'react-icons/bs'
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
      </ul>
    </nav>
  )
}
export default AdminNav