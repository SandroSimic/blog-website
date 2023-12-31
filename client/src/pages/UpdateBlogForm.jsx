import { useNavigate, useParams } from "react-router-dom"
import { useBlogContext } from "../context/BlogContext"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const UpdateBlogForm = () => {
    const { blogData, fetchSingleBlog, updateBlog } = useBlogContext()
    const { blogId } = useParams()
    const [title, setTitle] = useState('') // Initialize with an empty string
    const [content, setContent] = useState('') // Initialize with an empty string
    const [fileName, setFileName] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                await fetchSingleBlog(blogId)
            } catch (error) {
                toast.error('Error fetching blog:', error)
            }
        }
        fetchBlog()
    }, [])

    useEffect(() => {
        // Update title and content when blogData is available
        setTitle(blogData.title || "");
        setContent(blogData.content || "");
    }, [blogData]);

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('title', title)
        formData.append('content', content)
        formData.append('blogImage', fileName[0])
        console.log(formData)

        try {
            await updateBlog(blogId, formData)
            navigate('/')
        } catch (error) {
            toast.error("Error updating blog:", error);
        }
    }

    return (
        <section>
            <form className="form" encType="multipart/form-data" onSubmit={handleSubmit}>
                <h2>Update blog</h2>
                <div className="formRow">
                    <label htmlFor='title'>* Title: </label>
                    <input id='title' name='title' type="text" placeholder="blog title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="formRow">
                    <label htmlFor='content'>* Content: </label>
                    <textarea id='content' name="content" type="textarea" placeholder="content" value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <div className="formRow">
                    <label htmlFor='image'>* Image: </label>
                    <input id='image' type="file" name="blogImage" accept="image/" onChange={(e) => setFileName(e.target.files)} />
                    <span className="file-label">Accepted file types: .jpg, .jpeg, .png | Max file size: 5MB</span>
                </div>
                <div className="formRow">
                    <button type="submit" disabled={false} className={'button'}>Update</button>
                </div>
            </form>
        </section>
    )
}
export default UpdateBlogForm
