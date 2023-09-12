import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useBlogContext } from '../context/BlogContext'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { BsFillBookmarkFill, BsBookmark } from 'react-icons/bs'
import Spinner from './../components/Spinner'
import moment from 'moment'

const BlogDetailPage = () => {
  const { id: blogId } = useParams()
  const { fetchSingleBlog, isLoading, blogData } = useBlogContext()

  useEffect(() => {

    const fetchBlog = async () => {
      if (blogId) {
        await fetchSingleBlog(blogId)
      }
    }
    fetchBlog()
  }, [])

  if (isLoading) {
    return <Spinner />
  }


  // Access the creator's username if it exists
  const creatorUsername = blogData?.creator?.username || 'Unknown'

  return (
    <section className='blogDetail-section'>
      <div className='blogDetail'>
        <div className='blogDetail__heading'>
          <div className='blogDetail__title'>
            <h1>{blogData.title}</h1>
            <div className='blogDetail__buttons'>
              <button><BsBookmark /></button>
              <button><AiOutlineLike /></button>
            </div>
          </div>
          <div className='blogDetail__info'>
            <div className='blogDetail__info__imgDiv'>
              <img src={`http://localhost:8000/${blogData.image}`} alt={blogData.title} />
            </div>
            <div className='blogDetail__info--text'>
              <h3><span>Creator:</span> {creatorUsername}</h3>
              <h3><span>Date of Creation:</span> {moment(blogData.createdAt).format("MMMM Do YYYY")}</h3>
            </div>
          </div>
          <div className='blogDetail__content'>
            {blogData.content}
          </div>
        </div>
      </div>
      <div className='blogDetail__commentBox'>
        <h2>Comments</h2>
        <div className='blogDetail__comment'>
          <div className='blogDetail__comment--userInfo'>
            <h3>Your Name</h3>
            <p>1/20/2023</p>
          </div>
          <p>Comment</p>
        </div>
        <div className='blogDetail__comment'>
          <div className='blogDetail__comment--userInfo'>
            <h3>Your Name</h3>
            <p>1/20/2023</p>
          </div>
          <p>Comment</p>
        </div>
        <form className='blogDetail__commentForm'>
          <input type='text' placeholder='Enter Comment' />
          <button type='submit'>Comment</button>
        </form>
      </div>
    </section>
  )
}

export default BlogDetailPage