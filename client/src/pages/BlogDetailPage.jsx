/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useBlogContext } from '../context/BlogContext'
import { AiOutlineLike } from 'react-icons/ai'
import { BsBookmark } from 'react-icons/bs'
import Spinner from './../components/Spinner'
import moment from 'moment'
import { useUserContext } from '../context/UserContext'

const BlogDetailPage = ({ socket }) => {
  const { id: blogId } = useParams()
  const { fetchSingleBlog, isLoading, blogData, likeBlog, } = useBlogContext()
  const [liked, setLiked] = useState()
  const [bookmarked, setBookmarked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const { user, bookmarkBlog } = useUserContext()


  const creatorUsername = blogData?.creator?.username || 'Unknown'
  const creatorId = blogData?.creator?._id



  const handleNotification = (type) => {
    socket.emit("sendNotification", {
      senderName: user.username,
      receiverName: creatorUsername,
      type
    })
  }


  useEffect(() => {
    if (user && blogData?.likes?.includes(user._id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, blogData.likes]);


  useEffect(() => {
    const fetchBlog = async () => {
      if (blogId) {
        await fetchSingleBlog(blogId)
      }
    }
    fetchBlog()
  }, [])

  useEffect(() => {
    if (blogData && blogData.likes) {
      setLikeCount(blogData.likes.length)
    }
  }, [blogData, blogData.likes])

  useEffect(() => {
    if (user && user.bookmarkedBlogs && user.bookmarkedBlogs.includes(blogId)) {
      setBookmarked(true);
    } else {
      setBookmarked(false);
    }
  }, [user, blogId]);

  const handleLikeClick = async () => {
    try {
      if (!liked) {
        handleNotification(1)
      } else {
        const notificationData = {
          senderName: user.username,
          receiverName: creatorUsername
        }
        socket.emit('removeNotification', notificationData)
      }
      await likeBlog(blogId, user._id)
      await fetchSingleBlog(blogId)
      setLiked((prevState) => !prevState)
    } catch (error) {
      console.error(error);
    }
  }



  const handleBookmarked = async () => {
    if (user && user.bookmarkedBlogs) {
      try {
        await bookmarkBlog(blogId, user._id);
        setBookmarked(prevState => !prevState)



      } catch (error) {
        console.error(error);
      }
    }
  }

  if (isLoading) {
    return <Spinner />
  }




  return (
    <section className='blogDetail-section'>
      <div className='blogDetail'>
        <div className='blogDetail__heading'>
          <div className='blogDetail__title'>
            <h1>{blogData.title}</h1>
            {
              user?._id === blogData?.creator?._id ? "" : (
                <div className='blogDetail__buttons'>
                  <button onClick={handleBookmarked} className={`${bookmarked ? "bookmarked" : ""}`}><BsBookmark /></button>

                  <button onClick={handleLikeClick} className={`${liked ? "liked" : ""}`}><AiOutlineLike /></button>
                  <p>{likeCount}</p>
                </div>
              )
            }
          </div>
          <div className='blogDetail__info'>
            <div className='blogDetail__info__imgDiv'>
              <img src={`http://localhost:8000/${blogData.image}`} alt={blogData.title} />
            </div>
            <div className='blogDetail__info--text'>
              <h3><span>Creator:</span> <Link to={`/profile/${creatorId}`}>{creatorUsername}</Link></h3>
              <h3><span>Date of Creation:</span> {moment(blogData.createdAt).format("MMMM Do YYYY")}</h3>
            </div>
          </div>
          <div className='blogDetail__content'>
            {blogData.content}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogDetailPage