/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react"
import { baseUrl } from "../helpers/constants"
import { toast } from 'react-toastify'

const BlogContext = createContext()
// Custom hook for access to blog context
export const useBlogContext = () => {
  return useContext(BlogContext)
}

// Initial state for blogs
const initialState = {
  blogData: [],
  isLoading: true,
}

const blogReducer = (state, action) => {

  switch (action.type) {
    case "FETCH_ALL_BLOGS":
      return { ...state, blogData: action.payload, isLoading: false }
    case "FETCH_SINGLE_BLOG":
      return { ...state, blogData: action.payload, isLoading: false }

    default:
      return state
  }
}

export const BlogContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, initialState)



  const fetchAllBlogs = async () => {
    try {
      const response = await fetch(`${baseUrl}/blogs`)

      if (response.status === 404) {
        toast.error('No Blogs Found! Create One')
      }

      if (!response.ok) {
        throw new Error("Failed to fetch blog data")
      }


      const data = await response.json()
      dispatch({ type: "FETCH_ALL_BLOGS", payload: data })
    } catch (error) {
      console.error("Error fetching blog data: ", error)
    }
  }

  const fetchSingleBlog = async (blogId) => {
    try {
      const response = await fetch(`${baseUrl}/blogs/${blogId}`)
      console.log(response)
      if (!response.ok) {
        throw new Error("Failed to fetch blog data")
      }
      const data = await response.json()
      dispatch({ type: "FETCH_SINGLE_BLOG", payload: data })
    } catch (error) {
      console.error("Error fetching blog data: ", error)
    }
  }

  const createBlog = async (title, content, image) => {

    try {
      const response = await fetch(`${baseUrl}/blogs`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title, content, image
        }),
        credentials: 'include'
      })


      if (!response.ok) {
        toast.error('An error occurred while creating the blog.');
      }

      const data = await response.json()
      toast.success('Blog Created Successfully');
    } catch (error) {
      console.error(error.message);
      toast.error('An error occurred while creating the blog.');
      return null;
    }
  }


  return (
    <BlogContext.Provider
      value={{ ...state, fetchAllBlogs, fetchSingleBlog, createBlog }}
    >
      {children}
    </BlogContext.Provider>
  )
}
