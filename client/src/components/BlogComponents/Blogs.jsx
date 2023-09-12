import moment from "moment"
import Blog from "./Blog"
import { useBlogContext } from "../../context/BlogContext"
import { useEffect } from "react"
import Spinner from "../Spinner"

const Blogs = () => {

  const { blogData, fetchAllBlogs, isLoading } = useBlogContext()
  useEffect(() => {
    const fetchBlogs = async () => {
      await fetchAllBlogs()
    }
    fetchBlogs()
  }, [])


  if (isLoading) {
    return <Spinner />
  }


  if (blogData.length < 1) {
    return <p className="emptyBlog">No Blogs Found! Be the first to create a blog!</p>
  }



  return (
    <section className="blogs-section">
      <h3 className="heading3">Articles</h3>
      <hr className="line" />
      {blogData && blogData.length > 0 ? (
        blogData.map((blog) => (
          <Blog
            key={blog._id}
            id={blog._id}
            title={blog.title}
            blogImage={blog.image}
            dateOfCreation={moment(blog.createdAt).format("MMMM Do YYYY")}
            content={blog.content}
            creator={blog.creator}
          />
        ))
      ) : (
        <p className="emptyBlog">No Blogs Found! Be the first to create a blog!</p>
      )}
    </section>
  )
}
export default Blogs
