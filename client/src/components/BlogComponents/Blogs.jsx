import { useEffect, useState } from "react"
import { baseUrl } from "../../helpers/constants"
import moment from "moment"
import Blog from "./Blog"

const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  const getAllBlogs = async () => {
    const response = await fetch(`${baseUrl}/blogs`)
    const data = await response.json()
    setBlogs(data)
  }

  useEffect(() => {
    getAllBlogs()
    console.log(blogs)
  }, [])

  return (
    <section className="blogs-section">
      <h3 className="heading3">Articles</h3>
      <hr className="line" />
      {blogs.map((blog) => (
        <Blog
          key={blog._id}
          title={blog.title}
          blogImage={blog.image}
          dateOfCreation={moment().format("MMMM Do YYYY", blog.createdAt)}
          content={blog.content}
        />
      ))}
    </section>
  )
}
export default Blogs
