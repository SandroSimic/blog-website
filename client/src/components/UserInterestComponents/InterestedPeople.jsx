import image from "../../images/dummyProfileImg.jpg"
import { Link } from "react-router-dom"

const InterestedPeople = () => {
  return (
    <div className="people">

      <div className="people__peopleGroup">
        <div className="people__wrapper">
          <div className="people__image">
            <img src={image} alt="profile picture" />
          </div>
          <div className="people__text">
            <Link className="">User Name</Link>
            <p>The founder and chief designer at YourUXTeam</p>
          </div>
          <button className="people__btn ">Follow</button>
        </div>
      </div>
    </div>
  )
}
export default InterestedPeople
