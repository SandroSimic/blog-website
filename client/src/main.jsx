import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./styles/main.scss"
import { BlogContextProvider } from "./context/BlogContext.jsx"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { UserContextProvider } from "./context/UserContext.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <BlogContextProvider>
        <App />
        <ToastContainer position="top-center" autoClose={1000} />
      </BlogContextProvider>
    </UserContextProvider>
  </React.StrictMode>
)
