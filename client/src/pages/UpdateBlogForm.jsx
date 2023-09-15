import { useParams } from "react-router-dom"
import { useBlogContext } from "../context/BlogContext"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const UpdateBlogForm = () => {

    const { blogData, fetchSingleBlog } = useBlogContext()
    const { blogId } = useParams()

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



    return (
        <section>
            <form className="form" encType="multipart/form-data">
                <div className="formRow">
                    <label htmlFor='title'>* Title: </label>
                    <input id='title' name='title' type="text" placeholder="blog title" defaultValue={blogData.title} />
                </div>
                <div className="formRow">
                    <label htmlFor='content'>*Content: </label>
                    <textarea id='content' name="content" type="textarea" placeholder="content" defaultValue={blogData.content} />
                </div>
                <div className="formRow">
                    <label htmlFor='image'>*Image: </label>
                    <input id='image' type="file" name="blogImage" accept="image/" />
                    <span className="file-label">Accepted file types: .jpg, .jpeg, .png | Max file size: 5MB</span>
                </div>
                <div className="formRow">
                    <button type="submit" disabled={false} className={'button'}>Create</button>
                </div>
            </form>
        </section>
    )
}
export default UpdateBlogForm