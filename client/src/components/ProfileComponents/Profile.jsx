import { useUserContext } from "../../context/UserContext"
import { useBlogContext } from "../../context/BlogContext"
import { useEffect, useState } from "react"
import { HiUserAdd } from 'react-icons/hi'
import { Link } from "react-router-dom"
import { AiFillRead } from "react-icons/ai"


// eslint-disable-next-line react/prop-types
const Profile = ({ userId }) => {
    const [following, setFollowing] = useState(false)
    const { users, getUserById } = useUserContext()
    const { blogData, getUserBlogs } = useBlogContext()

    const handleFollow = () => {
        setFollowing(!following)
    }


    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                await getUserById(userId);

                await getUserBlogs(userId);
            }
        }

        fetchData();
    }, [userId]);

    console.log(blogData)

    const user = users.user;

    const imageUrl = user ? `http://localhost:8000/${users.user.image}` : '';

    return (
        <div className="profile">
            <div className="profile__actions">
                {imageUrl && <img src={imageUrl} className="profile__image" alt="Profile" />}
                <h1>{user ? user.username : ""}</h1>
                <button className="profile__btn" onClick={handleFollow}>
                    <HiUserAdd />
                    <span>{following ? "unfollow" : "Follow"}</span>
                </button>
            </div>
            <div className="profile__info">
                <div className="profile__info__action">
                    <span>Blogs</span>
                    <p>{blogData && blogData.length}</p>
                </div>
                <div className="profile__info__action">
                    <span>Followers</span>
                    <p>123</p>
                </div>
                <div className="profile__info__action">
                    <span>Following</span>
                    <p>123</p>
                </div>
            </div>
            <div className="profile__blogs">

                {Array.isArray(blogData) && blogData.length > 0  ? blogData.map(blog => (
                    <div key={blog._id}>
                        <Link to={`/blog/${blog._id}`}>
                            <div className="profile__blog">
                                <img src={`http://localhost:8000/${blog.image}`} alt={blog.title} />
                                <div className="heading">
                                    <AiFillRead className="icon"/>
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