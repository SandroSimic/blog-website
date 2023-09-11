import { useState } from "react"
import { useBlogContext } from "../context/BlogContext"
import { useNavigate } from "react-router-dom"


const NewBlogForm = () => {

  const { createBlog } = useBlogContext()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [fileName, setFileName] = useState('')
  const navigate = useNavigate()


  

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('blogImage', fileName[0]);


    await createBlog(formData);
    
    setTimeout(() => {
      navigate('/')
    }, 2300)
  }


  const isFormValid = title.trim() === '' || content.trim() === '';
  return (
    <section>
      <form className="form" onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="formRow">
          <label htmlFor='title'>* Title: </label>
          <input id='title' name='title' type="text" placeholder="blog title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="formRow">
          <label htmlFor='content'>*Content: </label>
          <textarea id='content' name="content" type="textarea" placeholder="content" value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div className="formRow">
          <label htmlFor='image'>*Image: </label>
          <input id='image' type="file" name="blogImage" accept="image/" onChange={(e) => setFileName(e.target.files)} />
          <span className="file-label">Accepted file types: .jpg, .jpeg, .png | Max file size: 5MB</span>
        </div>
        <div className="formRow">
          <button type="submit" disabled={isFormValid} className={`${isFormValid ? 'disable' : 'button'}`}>Create</button>
        </div>
      </form>
    </section>
  )
}
export default NewBlogForm