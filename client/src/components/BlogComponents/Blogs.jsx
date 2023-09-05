import moment from "moment"
import Blog from "./Blog"
import { useBlogContext } from "../../context/BlogContext"
import { useEffect } from "react"

const Blogs = () => {

  const { blogData, fetchAllBlogs, isLoading } = useBlogContext()

  useEffect(() => {
    fetchAllBlogs()
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (!Array.isArray(blogData)) {
    return <p>No blog data available.</p>;
  }

  return (
    <section className="blogs-section">
      <h3 className="heading3">Articles</h3>
      <hr className="line" />
      {blogData.map((blog) => (
        <Blog
          key={blog._id}
          id={blog._id}
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
