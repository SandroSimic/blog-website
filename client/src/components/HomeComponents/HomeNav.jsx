import { useState } from "react";

/* eslint-disable react/prop-types */
const HomeNav = ({ onSortOrderChange, onSearchChange }) => {

  const [searchValue, setSearchValue] = useState("");

  const handleSortOrderChange = (newSortOrder) => {
    onSortOrderChange(newSortOrder);
  }

  const handleInputChange = (e) => {
    const newValue = e.target.value
    setSearchValue(newValue);
    onSearchChange(newValue);
  }




  return (
    <div className="home__navigation">
      <input type="text" className="home__navigation__input" value={searchValue}
        onChange={handleInputChange} placeholder="Search blogs..." />
      <div className="home__navigation__sortBy">
        <p>Sort by:</p>
        <div className="home__navigation__buttons">
          <button onClick={() => handleSortOrderChange('asc')} >A-Z</button>
          <button onClick={() => handleSortOrderChange('desc')}>Z-A</button>
        </div>
      </div>
    </div>
  )
}
export default HomeNav
