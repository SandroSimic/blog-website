import InterestedPeople from "./InterestedPeople"
import ReadingList from "./ReadingList"

const UserInterest = () => {
  return (
    <section className="userInterest-section">
      <h2>People you might be interested</h2>
      <div className="userInterested-section__people">
        <InterestedPeople />
        <InterestedPeople />
        <InterestedPeople />
      </div>
      <div className="readingList">
        <h2>My Reading List</h2>
        <ReadingList />
        <ReadingList />
        <ReadingList />
      </div>
    </section>
  )
}
export default UserInterest
