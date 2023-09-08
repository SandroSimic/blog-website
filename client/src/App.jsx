import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LayoutPage from "./pages/LayoutPage"
import HomePage from "./pages/HomePage"
import BlogDetailPage from "./pages/BlogDetailPage"
import ProfilePage from "./pages/ProfilePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import NewBlogForm from "./pages/NewBlogForm"

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/blogs', element: <HomePage /> },
      { path: "/blog/:id", element: <BlogDetailPage /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/new-blog", element: <NewBlogForm /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
