/* eslint-disable react/prop-types */
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LayoutPage from "./pages/LayoutPage";
import HomePage from "./pages/HomePage";
import BlogDetailPage from "./pages/BlogDetailPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NewBlogForm from "./pages/NewBlogForm";
import { useUserContext } from "./context/UserContext";
import UpdateBlogForm from "./pages/UpdateBlogForm";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBlogs from "./pages/AdminBlogs";
import AdminUsers from "./pages/AdminUsers";
import AdminGraph from "./pages/AdminGraph";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const ProtectedRoute = ({ element }) => {
  const { user } = useUserContext();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return element;
};

const AuthRedirectRoute = ({ element }) => {
  const { user } = useUserContext();
  if (user) {
    return <Navigate to="/" replace />;
  }
  return element;
};

function App() {
  const { user } = useUserContext();

  const [socket, setSocket] = useState(null)

  console.log(user)
  useEffect(() => {
    setSocket(io('http://localhost:3000'))
  }, [])

  useEffect(() => {
    socket?.emit("newUser", user?.username)
    console.log(socket)
    console.log(user?.username)
  }, [socket, user])


  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutPage socket={socket} />}>
          <Route index element={<HomePage />} />
          <Route path="/blog/:id" element={<BlogDetailPage socket={socket} />} />
          <Route
            path="/profile/:userId"
            element={<ProtectedRoute element={<ProfilePage />} />}
          />
          <Route
            path="/new-blog"
            element={<ProtectedRoute element={<NewBlogForm />} />}
          />
          <Route
            path="/updateBlog/:blogId"
            element={<ProtectedRoute element={<UpdateBlogForm />} />}
          />

          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute
                element={
                  user && user.role === "admin" ? (
                    <AdminDashboard />
                  ) : (
                    <Navigate to={"/"} replace />
                  )
                }
              >
              </ProtectedRoute>
            }
          >
            <Route path="/admin-dashboard/blogs" element={<AdminBlogs />} />
            <Route path="/admin-dashboard/users" element={<AdminUsers />} />
            <Route path="/admin-dashboard/graph" element={<AdminGraph />} />
          </Route>
        </Route>
        <Route path="/login" element={<AuthRedirectRoute element={<LoginPage />} />} />
        <Route
          path="/register"
          element={<AuthRedirectRoute element={<RegisterPage />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
