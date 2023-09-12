/* eslint-disable react/prop-types */
import image from "../../images/dummyProfileImg.jpg"
import { BsDot } from "react-icons/bs"
import { AiFillRead } from "react-icons/ai"
import { Link } from "react-router-dom"

// eslint-disable-next-line react/prop-types
const Blog = ({ id, blogImage, dateOfCreation, title, content, creator }) => {
  const imageUrl = `http://localhost:8000/${blogImage}`;
  return (
    <div className="blog">
      <div className="blog__userInfo">
        <div className="blog__userImg">
          <img src={image} alt="user img" />
        </div>
        <div className="blog__userDesc">
          <div className="blog__username">
            <h3>{creator.username}</h3>
            <BsDot className="dot" />
            <p>{dateOfCreation}</p>
          </div>
          <p>The Founder & chief designer at YourUXTeam</p>
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
