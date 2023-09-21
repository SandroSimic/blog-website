import { useParams } from "react-router-dom"
import Profile from "../components/ProfileComponents/Profile"

const ProfilePage = () => {
  const { userId } = useParams()
  console.log(userId);
  return (
    <section className="profile-section">
      <Profile userId={userId} />
    </section>
  )
}
export default ProfilePage