import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./styles/main.scss"
import { BlogContextProvider } from "./context/BlogContext.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BlogContextProvider>
      <App />
    </BlogContextProvider>
  </React.StrictMode>
)
