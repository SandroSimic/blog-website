/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useReducer } from "react"
import { baseUrl } from "../helpers/constants"
import { toast } from "react-toastify"
import { redirect } from "react-router-dom"

const UserContext = createContext()

export const useUserContext = () => {
    return useContext(UserContext)
}

const initialState = {
    user: null,
    isLoading: true,
}


const userReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_USER":
            return { ...state, user: action.payload, isLoading: false }
        case "REGISTER_USER":
            return { ...state, user: action.payload, isLoading: false }
        case "LOGOUT_USER":
            return { ...state, user: action.payload, isLoading: false }
        default:
            return state
    }
}

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState)


    const registerUser = async (username, email, password, image) => {
        try {
            const response = await fetch(`${baseUrl}/users/register`, {
                method: "POST",
                body: JSON.stringify({ username, email, password, image }),
                headers: { "Content-Type": "application/json" }
            })

            if (!response.ok) {
                toast.error()
            }

            const data = await response.json()

            console.log(data)
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
                })
            })
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
            const data = await response.json()



            dispatch({ type: "LOGIN_USER", payload: data })
        } catch (error) {
            toast.error(error.message)
        }
    }

    const logoutUser = () => {
        dispatch({ type: "LOGOUT_USER", payload: "" })
    }


    return (
        <UserContext.Provider value={{ ...state, loginUser, registerUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    )
}