import Blogs from "../components/BlogComponents/Blogs"
import HomeNav from "../components/HomeComponents/HomeNav"
import UserInterest from "../components/UserInterestComponents/UserInterest"

const HomePage = () => {
  return (
    <section className="home-section">
      <div className="home">
        <HomeNav />
        <Blogs />
      </div>
      <div className="interest">
        <UserInterest />
      </div>
    </section>
  )
}
export default HomePage
