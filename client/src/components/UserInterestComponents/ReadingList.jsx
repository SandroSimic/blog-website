import image from "../../images/dummyProfileImg.jpg"
import image2 from "../../images/laptopImg.jpg"

const ReadingList = () => {
  return (
    <div className="readingList__group">
      <div className="readingList__info">
        <h2>A Beginner's Guide to write balance in photography</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit quae
          obcaecati facilis adipisci vitae amet nobis autem, cupiditate optio et
          repellat ducimus libero eveniet pariatur?
        </p>
        <div className="readingList__userInfo">
          <div className="readingList__userInfo__image">
            <img src={image} alt="user Profile" />
          </div>
          <p>Irene au</p>
          <span>Apr 16, 2022</span>
        </div>
      </div>
    </div>
  )
}
export default ReadingList
