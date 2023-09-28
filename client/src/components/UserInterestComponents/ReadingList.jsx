/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const ReadingList = ({ blog }) => {
  const imageUrl = `http://localhost:8000/${blog.image}`;



  return (
    <div className="readingList__group">
      <div className="readingList__info">
        <h1>
          <Link to={`/blog/${blog._id}`}>
            {blog.title}
          </Link>
        </h1>
        <p>
          {blog.content}
        </p>
      </div>
      <div className="readingList__image">
        <Link to={`/blog/${blog._id}`}>
          <img src={imageUrl} />
        </Link>
      </div>
    </div>
  )
}
export default ReadingList
