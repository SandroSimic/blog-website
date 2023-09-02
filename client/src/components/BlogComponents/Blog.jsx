import image from "../../images/dummyProfileImg.jpg"
import image2 from "../../images/laptopImg.jpg"
import { BsDot } from "react-icons/bs"
import { AiFillRead } from "react-icons/ai"
import { Link } from "react-router-dom"

const Blog = () => {
  return (
    <div className="blog">
      <div className="blog__userInfo">
        <div className="blog__userImg">
          <img src={image} alt="user img" />
        </div>
        <div className="blog__userDesc">
          <div className="blog__username">
            <h3>User Name</h3>
            <BsDot className="dot" />
            <p>Apr 16, 2023</p>
          </div>
          <p>The Founder & chief designer at YourUXTeam</p>
        </div>
      </div>
      <div className="blog__blogInfo">
        <div className="blog__blogInfo__desc">
          <Link className="blog__blogInfo__heading">
            8 Psychology-Based Design Hacks That Will make you a better ux
            designer
          </Link>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni, cum
            ullam maiores aperiam sunt minus eos illum in assumenda, fugiat
            eaque aliquam ea iure, neque voluptates. Ipsam, dolorum temporibus
            voluptates veniam fugit vero nihil id est officia, totam beatae
            officiis consequatur repellendus dolores ad tenetur ut laudantium
            harum eos nulla.
          </p>
        </div>
        <div className="blog__blogInfo__image">
        <AiFillRead className="icon" />
          <img src={image2} alt="blog img" />
        </div>
      </div>
    </div>
  )
}
export default Blog
