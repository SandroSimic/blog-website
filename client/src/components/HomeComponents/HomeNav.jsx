const HomeNav = () => {
  return (
    <div className="home__navigation">
      <input type="text" className="home__navigation__input" />
      <p>Sort by:</p>
      <div className="home__navigation__buttons">
        <button>A-Z</button>
        <button>Z-A</button>
        <button>Most Liked</button>
        <button>Least Liked</button>
      </div>
    </div>
  )
}
export default HomeNav