
// eslint-disable-next-line react/prop-types
const AdminBox = ({ icon, count, name }) => {
    return (
        <div className="adminBox">
            <div className="iconBox">
                {icon}
            </div>
            <h2>{count}</h2>
            <p>{name}</p>
        </div>
    )
}
export default AdminBox