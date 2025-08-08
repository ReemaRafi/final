// src/routes/router.jsx

import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Dashboard from "../pages/Dashboard";
import AdminDashboard from "../pages/AdminDashboard";
import Home from "../pages/Home"; // ✅ Landing page (image, get started, profile)
import { useAuth } from "../context/AuthContext";
import Profile from "../pages/Profile";


const Private = ({ children, role }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-6">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // ✅ Public Landing Page
      { index: true, element: <Home /> },

      // ✅ Protected Routes
      { path: "dashboard", element: <Private><Dashboard /></Private> },
      { path: "admin", element: <Private role="admin"><AdminDashboard /></Private> },

      // ✅ Auth Pages
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
      // pfofile pages
      { path: "profile", element: <Private><Profile /></Private> },
      // hijab style
    ],
  },
]);

export default router;
