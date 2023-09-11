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
      const response = await axios.get(`${baseUrl}/blogs`);
      const data = response.data;

      if (data.length === 0) {
        toast.error('No Blogs Found! Create One');
        return;
      }

      dispatch({ type: "FETCH_ALL_BLOGS", payload: data });
    } catch (error) {
      console.error("Error fetching blog data: ", error);
    }
  }

  const fetchSingleBlog = async (blogId) => {
    try {
      const response = await axios.get(`${baseUrl}/blogs/${blogId}`)
      console.log(response)
      const data = response.data
      console.log(data)
      dispatch({ type: "FETCH_SINGLE_BLOG", payload: data })
    } catch (error) {
      console.error("Error fetching blog data: ", error)
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
