/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react"
import { baseUrl } from "../helpers/constants"
import { toast } from 'react-toastify'
import axios from 'axios'

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
      dispatch({ type: "FETCH_ALL_BLOGS", payload: [], isLoading: true });

      const response = await axios.get(`${baseUrl}/blogs`);
      if (response.status === 404) {
        return toast.info('No Blogs Found! Create One');
      }
      const data = response.data;


      dispatch({ type: "FETCH_ALL_BLOGS", payload: data });
    } catch (error) {
      console.log(error)
      if (error?.response?.status === 404) {
        return toast.info('No Blogs Found! Create One');
      }
      else {
        return toast.error('Something went wrong try again later');
      }
    }
  }

  const fetchSingleBlog = async (blogId) => {
    try {
      const response = await axios.get(`${baseUrl}/blogs/${blogId}`)
      const data = response.data
      dispatch({ type: "FETCH_SINGLE_BLOG", payload: data, })

    } catch (error) {
      toast.error("Error fetching blog data: ", error)
    }
  }

  const createBlog = async (formData) => {

    try {


      const response = await axios.post(`${baseUrl}/blogs`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      })


      if (response.status === 201) {
        toast.success("Blog Created Successfully");

        fetchAllBlogs();
      } else {
        console.error("Failed to create blog:", response);
        toast.error("An error occurred while creating the blog.");
      }
      console.log(formData)

    } catch (error) {
      console.error(error.message);
      toast.error('An error occurred while creating the blog.');
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
