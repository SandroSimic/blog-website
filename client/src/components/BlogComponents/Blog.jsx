/* eslint-disable react/prop-types */
import { BsDot } from "react-icons/bs"
import { AiFillRead, AiFillDelete, AiFillEdit } from "react-icons/ai"
import { Link } from "react-router-dom"
import { useBlogContext } from "../../context/BlogContext";
import { useUserContext } from "../../context/UserContext";

// eslint-disable-next-line react/prop-types
const Blog = ({ id, blogImage, dateOfCreation, title, content, creator, creatorImg }) => {
  const imageUrl = `http://localhost:8000/${blogImage}`;
  const creatorsImg = `http://localhost:8000/${creatorImg}`;
  const { deleteBlog } = useBlogContext()
  const { user } = useUserContext()


  const userCreatedBlog = user && user._id === creator._id

  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      deleteBlog(id)
    }
  }

  return (
    <div className="blog">
      <div className="blog__info">
        <div className="blog__userInfo">
          <div className="blog__userImg">
            <img src={`${creatorsImg}`} alt="user img" />
          </div>
          <div className="blog__userDesc">
            <div className="blog__username">
              <h3>{creator.username}</h3>
              <BsDot className="dot" />
              <p>{dateOfCreation}</p>
            </div>
          </div>
        </div>
        <div className="blog__actionBtn">

          {userCreatedBlog && (
            <>
              <Link className="edit" to={`/updateBlog/${id}`}><AiFillEdit /></Link>
              <div className="delete" onClick={handleDeleteClick}><AiFillDelete /></div>
            </>
          )}
        </div>
      </div>
      <div className="blog__blogInfo">
        <div className="blog__blogInfo__desc">
          <Link className="blog__blogInfo__heading" to={`/blog/${id}`}>{title}</Link>
          <p>{content}</p>
        </div>
        <div className="blog__blogInfo__image">
          <Link to={`/blog/${id}`}>
            <AiFillRead className="icon" />
            <img src={imageUrl} alt={title} />
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Blog
