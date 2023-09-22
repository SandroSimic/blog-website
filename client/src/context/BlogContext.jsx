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
    case "FETCH_USERS_BLOGS":
      return { ...state, blogData: action.payload, isLoading: false }
    default:
      return state
  }
}

export const BlogContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogReducer, initialState)



  const fetchAllBlogs = async (sortOrder, currentPage = 1) => {
    dispatch({ type: "FETCH_ALL_BLOGS", payload: [], isLoading: true });
    try {

      const response = await axios.get(`${baseUrl}/blogs/?sortOrder=${sortOrder}`);
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
        fetchAllBlogs();
        toast.success("Blog Created Successfully");

      } else {
        console.error("Failed to create blog:", response);
        toast.error("An error occurred while creating the blog.");
      }

    } catch (error) {
      console.error(error.message);
      toast.error('An error occurred while creating the blog.');
    }
  }

  const deleteBlog = async (blogId) => {
    try {
      const response = await axios.delete(`${baseUrl}/blogs/${blogId}`, {
        withCredentials: true
      })

      if (response.status === 204) {
        toast.success('Blog Deleted Successfully')
        fetchAllBlogs()
      } else {
        console.error('Failed to delete blog:', response)
        toast.error('An error occurred while deleting the blog.')
      }

    } catch (error) {
      console.error("Error deleting blog:", error)
      toast.error("An error occurred while deleting the blog.")
    }
  }

  const updateBlog = async (blogId, formData) => {
    try {
      const response = await axios.patch(`${baseUrl}/blogs/${blogId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      })
      if (response.status === 200) {
        const updatedBlogData = response.data;

        dispatch({ type: "FETCH_SINGLE_BLOG", payload: updatedBlogData });
        toast.success("Blog Updated Successfully");

      } else {
        console.error("Failed to update blog:", response);
        toast.error("An error occurred while updating the blog.");
      }
    } catch (error) {
      console.error("Error updating blog:", error)
      toast.error("An error occurred while updating the blog.")
    }
  }

  const getUserBlogs = async (userId) => {
    try {
      const response = await axios.get(`${baseUrl}/users/blog/${userId}`);
      const data = response.data

      dispatch({ type: "FETCH_USERS_BLOGS", payload: data })
    } catch (error) {
      console.error("Error updating blog:", error.response.data.message)
      dispatch({ type: "FETCH_USERS_BLOGS", payload: [] })
      toast.info("This user does not have any blogs")
    }
  }

  return (
    <BlogContext.Provider
      value={{ ...state, fetchAllBlogs, fetchSingleBlog, createBlog, deleteBlog, updateBlog, getUserBlogs }}
    >
      {children}
    </BlogContext.Provider>
  )
}
