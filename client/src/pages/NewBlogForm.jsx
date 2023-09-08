import { useState } from "react"
import { useBlogContext } from "../context/BlogContext"
import { useNavigate } from "react-router-dom"


const NewBlogForm = () => {

  const { createBlog } = useBlogContext()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState('https://via.placeholder.com/400x300')
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()
    await createBlog(title, content, image);

    setTimeout(() => {
      navigate('/')
    }, 2300)
  }


  const isFormValid = title.trim() === '' || content.trim() === '';
  return (
    <section>
      <form className="form" onSubmit={handleSubmit}>
        <div className="formRow">
          <label htmlFor='title'>* Title: </label>
          <input id='title' name='title' type="type" placeholder="blog title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="formRow">
          <label htmlFor='content'>*Content: </label>
          <textarea id='content' name="content" type="textarea" placeholder="content" value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div className="formRow">
          <label htmlFor='image'>*Image: </label>
          <input id='image' name="image" type="file" onChange={(e) => setImage(e.target.value)} />
        </div>
        <div className="formRow">
          <button type="submit" disabled={isFormValid} className={`${isFormValid ? 'disable' : 'button'}`}>Create</button>
        </div>
      </form>
    </section>
  )
}
export default NewBlogForm