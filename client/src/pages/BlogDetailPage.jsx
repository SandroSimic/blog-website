import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useBlogContext } from '../context/BlogContext'
const BlogDetailPage = () => {



  const { id: blogId } = useParams()
  const { fetchSingleBlog, isLoading, blogData } = useBlogContext()
  const [blog, setBlog] = useState('')

  useEffect(() => {
    if (blogId) {
      fetchSingleBlog(blogId).then((blogs) => setBlog(blogs)).catch((error) => console.error(error))
    }
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
    
  }

  if (!blog && blogData.length === 0) {
    return <p>Blog not found</p>
  }
  console.log(blogData)

  return (
    <div>
      <h2>{blogData.title}</h2>
      <p>{blogData.content}</p>
    </div>
  )
}
export default BlogDetailPage