/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useReducer } from "react"
import { baseUrl } from "../helpers/constants"
import { toast } from "react-toastify"
import { redirect } from "react-router-dom"
import axios from 'axios'


const UserContext = createContext()

export const useUserContext = () => {
    return useContext(UserContext)
}


const initialState = {
    user: null,
    users: [],
    isLoading: true,
    bookmarkedBlogs: []
}



const userReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_USER":
            localStorage.setItem("user", JSON.stringify(action.payload));
            return { ...state, user: action.payload, isLoading: false }
        case "REGISTER_USER":
            return { ...state, user: action.payload, isLoading: false }
        case "LOGOUT_USER":
            return { ...state, user: "", isLoading: false }
        case "SET_USERS":
            return { ...state, users: action.payload, isLoading: false }
        case "FETCH_USERS_BLOGS":
            return { ...state, bookmarkedBlogs: action.payload, isLoading: false }
        case "GET_USER":
            return { ...state, users: action.payload, isLoading: false }
        default:
            return state
    }
}

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState)

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            dispatch({ type: "LOGIN_USER", payload: JSON.parse(userData) });
        }
    }, []);

    const registerUser = async (formData) => {
        try {
            await axios.post(`${baseUrl}/users/register`, formData, {
                headers: {
                    'Content-Type': "multipart/form-data"
                },
                withCredentials: true
            })
            toast.success('User Created')
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }


    const loginUser = async (formData) => {
        try {
            const response = await axios.post(`${baseUrl}/users/login`, formData, {
                headers: {
                    'Content-Type': "application/json"
                },
                withCredentials: true
            })
            console.log(response)

            const data = await response.data
            console.log(data)
            localStorage.setItem("user", JSON.stringify(data));
            dispatch({ type: "LOGIN_USER", payload: data })
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    const logoutUser = async () => {
        localStorage.removeItem("user");

        const response = await fetch(`${baseUrl}/users/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        })

        if (response.ok) {
            console.log('Logged out successfully')
        } else {
            console.log('Logout failed')
        }

        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT_USER" })
    }

    const getAllUsers = async () => {
        try {
            const response = await axios.get(`${baseUrl}/users`);
            const users = response.data
            console.log(response)
            console.log(users)
            dispatch({ type: "SET_USERS", payload: users })
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getUserById = async (userId) => {
        try {
            const response = await axios.get(`${baseUrl}/users/${userId}`)
            const user = response.data
            dispatch({ type: "GET_USER", payload: user })
        } catch (error) {
            toast.error(error.message)
        }
    }

    const bookmarkBlog = async (blogId, userId) => {
        try {
            const response = await axios.post(`${baseUrl}/blogs/${blogId}/bookmark`, { userId }, {
                withCredentials: true
            });

            if (response.status === 200) {
                // Update user's bookmarkedBlogs in the state
                const user = state.user;
                const isBookmarked = user.bookmarkedBlogs.includes(blogId);

                if (isBookmarked) {
                    // If already bookmarked, remove it
                    const updatedBookmarkedBlogs = user.bookmarkedBlogs.filter(id => id !== blogId);
                    const updatedUser = { ...user, bookmarkedBlogs: updatedBookmarkedBlogs };
                    dispatch({ type: "LOGIN_USER", payload: updatedUser });
                    toast.info("Blog removed from bookmarks");
                } else {
                    // If not bookmarked, add it
                    const updatedUser = { ...user, bookmarkedBlogs: [...user.bookmarkedBlogs, blogId] };
                    dispatch({ type: "LOGIN_USER", payload: updatedUser });

                    toast.info(response.data.message);
                }
            } else {
                console.error("Failed to bookmark blog:", response);
                toast.error("An error occurred while bookmarking the blog.");
            }
        } catch (error) {
            console.error("Error bookmarkblog:", error);
            toast.error("An error occurred while bookmarking the blog.");
        }
    }

    const getUserBookmarkedBlogs = async (userId) => {
        try {
            const response = await axios.get(`${baseUrl}/users/${userId}/bookmarked-blogs`);
            const data = response.data;
            dispatch({ type: "FETCH_USERS_BLOGS", payload: data });
        } catch (error) {
            dispatch({ type: "FETCH_USERS_BLOGS", payload: [] });
            console.error("Error fetching user's bookmarked blogs:", error);
            toast.error("An error occurred while fetching user's bookmarked blogs.");
        }
    };

    return (
        <UserContext.Provider value={{ ...state, loginUser, registerUser, logoutUser, getAllUsers, getUserById, bookmarkBlog, getUserBookmarkedBlogs }}>
            {children}
        </UserContext.Provider>
    )
}