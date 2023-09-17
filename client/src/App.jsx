/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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

const ProtectedRoute = ({ element, }) => {
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
  console.log(user)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route index element={<HomePage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route
            path="/profile"
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
        </Route>
        <Route path="/login" element={<AuthRedirectRoute element={<LoginPage />} />} />
        <Route
          path="/register"
          element={<AuthRedirectRoute element={<RegisterPage />} />}
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute element={user && user.role === 'admin' ? (
              <AdminDashboard />
            ) : (
              <Navigate to={'/'} replace />
            )} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
