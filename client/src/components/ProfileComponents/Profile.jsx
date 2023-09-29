import { useUserContext } from "../../context/UserContext"
import { useBlogContext } from "../../context/BlogContext"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { AiFillRead } from "react-icons/ai"


// eslint-disable-next-line react/prop-types
const Profile = ({ userId }) => {
    const { users, getUserById } = useUserContext()
    const { blogData, getUserBlogs } = useBlogContext()




    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                await getUserById(userId);

                await getUserBlogs(userId);
            }
        }

        fetchData();
    }, [userId]);


    const user = users.user;

    const imageUrl = user ? `https://reader-j6tn.onrender.com/${users.user.image}` : '';

    return (
        <div className="profile">
            <div className="profile__actions">
                {imageUrl && <img src={imageUrl} className="profile__image" alt="Profile" />}
                <h1>{user ? user.username : ""}</h1>
            </div>
            <div className="profile__info">
                <div className="profile__info__action">
                    <span>Blogs</span>
                    <p>{blogData && blogData.length}</p>
                </div>
            </div>
            <div className="profile__blogs">

                {Array.isArray(blogData) && blogData.length > 0 ? blogData.map(blog => (
                    <div key={blog._id}>
                        <Link to={`/blog/${blog._id}`}>
                            <div className="profile__blog">
                                <img src={`https://reader-j6tn.onrender.com/${blog.image}`} alt={blog.title} />
                                <div className="heading">
                                    <AiFillRead className="icon" />
                                    <h2 >{blog.title}</h2>
                                </div>
                            </div>
                        </Link>
                    </div>
                )) : <p>This user does not have any blogs</p>}
            </div>
        </div>
    );
}
export default Profile