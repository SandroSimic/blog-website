import { useState } from "react"
import Blogs from "../components/BlogComponents/Blogs"
import HomeNav from "../components/HomeComponents/HomeNav"
import UserInterest from "../components/UserInterestComponents/UserInterest"
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
const HomePage = () => {

  const [sortOrder, setSortOrder] = useState();
  const [searchValue, setSearchValue] = useState('');

  const handleSortOrderChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
  };

  const handleSearchChange = (newSearchValue) => {
    setSearchValue(newSearchValue);
  };

  return (
    <section className="home-section">
      <div className="home">
        <HomeNav onSortOrderChange={handleSortOrderChange}
          onSearchChange={handleSearchChange} />
        <Blogs sortOrder={sortOrder} searchValue={searchValue} />
        <div className="pagination">
          <div className="pagination__box">
            <AiOutlineLeft />
          </div>
          <div className="pagination__number">
            <p>1</p>
          </div>
          <div className="pagination__box">
            <AiOutlineRight />
          </div>
        </div>
      </div>
      <div className="interest">
        <UserInterest />
      </div>
    </section>
  )
}
export default HomePage
