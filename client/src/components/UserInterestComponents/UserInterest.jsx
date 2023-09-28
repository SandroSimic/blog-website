import ReadingList from "./ReadingList"
import { useUserContext } from '../../context/UserContext'
import { useEffect, } from "react"
const UserInterest = () => {

  const { user, getUserBookmarkedBlogs, bookmarkedBlogs } = useUserContext()

  const bookmarkBlogs = bookmarkedBlogs.bookmarkedBlogs
  useEffect(() => {
    if (user) {
      getUserBookmarkedBlogs(user._id)
    }
  }, [user])


  return (
    <section className="userInterest-section">
      <div className="readingList">
        <h2>My Reading List</h2>
        {
          bookmarkBlogs?.length > 0 ? (
            bookmarkBlogs?.map((blog) => (
              <ReadingList key={blog._id} blogId={blog._id} blog={{ ...blog }} />
            ))
        ): <p>No Blogs Bookmarked!</p>
        }
      </div>
    </section>
  )
}
export default UserInterest
