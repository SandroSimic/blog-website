import Blog from "./Blog"

const Blogs = () => {
  return (
    <section className="blogs-section">
    <h3 className="heading3">Articles</h3>
    <hr  className="line"/>
      <Blog />
      <Blog />
      <Blog />
    </section>
  )
}
export default Blogs