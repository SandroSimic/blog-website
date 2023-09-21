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
        case "GET_USER":
            return { ...state, users: action.payload, isLoading: false }
        default:
            return state
    }
}

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState)


    // Initialize user data from local storage on component mount
    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            dispatch({ type: "LOGIN_USER", payload: JSON.parse(userData) });
        }
    }, []);

    const registerUser = async (formData) => {
        try {
            const response = await axios.post(`${baseUrl}/users/register`, formData, {
                headers: {
                    'Content-Type': "multipart/form-data"
                },
                withCredentials: true
            })

            if (!response.ok) {
                toast.error()
            }
            toast.success('User Created')
            console.log(formData)
            console.log(response)
        } catch (error) {
            toast.error(error.message)
        }
    }


    const loginUser = async (email, password) => {
        try {
            const response = await fetch(`${baseUrl}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                }),
                credentials: 'include'
            })

            // Log response headers and cookies
            console.log('Response Headers:', response.headers);
            console.log('Response Cookies:', document.cookie);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
            const data = await response.json()
            console.log(data)

            localStorage.setItem("user", JSON.stringify(data));
            dispatch({ type: "LOGIN_USER", payload: data })
        } catch (error) {
            toast.error(error.message)
        }
    }

    const logoutUser = async () => {

        // Clear user data from local storage
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


    return (
        <UserContext.Provider value={{ ...state, loginUser, registerUser, logoutUser, getAllUsers, getUserById }}>
            {children}
        </UserContext.Provider>
    )
}