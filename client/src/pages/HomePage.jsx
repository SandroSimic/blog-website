import { useEffect, useState } from "react"
import Blogs from "../components/BlogComponents/Blogs"
import HomeNav from "../components/HomeComponents/HomeNav"
import UserInterest from "../components/UserInterestComponents/UserInterest"
import { useBlogContext } from "../context/BlogContext"
import Pagination from "../components/Pagination"
const HomePage = () => {

  const { blogData, fetchAllBlogs } = useBlogContext()
  const [sortOrder, setSortOrder] = useState();
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1)
  const [blogsPerPage] = useState(4)


  useEffect(() => {
    const fetchBlogs = async () => {
      fetchAllBlogs()
    }
    fetchBlogs()
  }, [])


  const handleSortOrderChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
    setCurrentPage(1)
  };

  const handleSearchChange = (newSearchValue) => {
    setSearchValue(newSearchValue);
    setCurrentPage(1)
  };

  // Change Page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }


  // get current blogs
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogData.slice(indexOfFirstBlog, indexOfLastBlog)

  return (
    <section className="home-section">
      <div className="home">
        <HomeNav onSortOrderChange={handleSortOrderChange}
          onSearchChange={handleSearchChange} />
        <Blogs blogData={currentBlogs} sortOrder={sortOrder} searchValue={searchValue} />
        <Pagination blogsPerPage={blogsPerPage} totalBlogs={blogData.length} paginate={paginate} currentPage={currentPage}/>
      </div>
      <div className="interest">
        <UserInterest />
      </div>
    </section>
  )
}
export default HomePage
