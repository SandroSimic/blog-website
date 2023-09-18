import AdminNav from "../components/NavComponents/AdminNav"

const AdminDashboard = () => {
    return (
        <section className="admin-section">
            <header className="admin-header">
                <AdminNav />
            </header>
            <main className="admin-main">
                Admin body
            </main>
        </section>
    )
}
export default AdminDashboard