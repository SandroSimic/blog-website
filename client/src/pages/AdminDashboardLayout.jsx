import AdminBox from "../components/AdminComponents/AdminBox"
import AdminNav from "../components/AdminComponents/AdminNav"
import { BsFillPeopleFill } from 'react-icons/bs'
import { FaBookOpen } from 'react-icons/fa'
import { useUserContext } from "../context/UserContext"
import { useBlogContext } from "../context/BlogContext"
import { useEffect } from "react"
import { Link, Outlet } from "react-router-dom"

const AdminDashboardLayout = () => {
    const { users, getAllUsers } = useUserContext()
    const { blogData, fetchAllBlogs } = useBlogContext()

    useEffect(() => {
        getAllUsers()
        fetchAllBlogs()
    }, [])
    return (
        <section className="admin-section">
            <header className="admin-header">
                <AdminNav />
            </header>

            <main className="admin-main">
                <Link to={'/admin-dashboard/users'}>
                    <AdminBox count={users.length} name={"Users"} icon={<BsFillPeopleFill />} />
                </Link>
                <Link to={'/admin-dashboard/blogs'}>
                    <AdminBox count={blogData.length} name={"Blogs"} icon={<FaBookOpen />} />
                </Link>
            </main>

            <Outlet />
        </section>
    );
};

export default AdminDashboardLayout