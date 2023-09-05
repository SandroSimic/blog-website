/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react"
import { baseUrl } from "../helpers/constants"

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


  return (
    <BlogContext.Provider
      value={{ ...state, fetchAllBlogs, fetchSingleBlog }}
    >
      {children}
    </BlogContext.Provider>
  )
}
