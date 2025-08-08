import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  const linkClasses = (path) =>
    `px-4 py-2 rounded-lg transition-all duration-200 ${
      pathname === path ? "bg-indigo-700 text-white" : "text-gray-300 hover:bg-zinc-700"
    }`;

  return (
    <nav className="border-b border-zinc-800 bg-zinc-900/70 backdrop-blur-md sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-white font-bold text-xl tracking-wide hover:text-indigo-400 transition">
    🧕 Hijab Styles Gallery with Reviews
        </Link>

        <div className="flex items-center gap-3">
          {user?.role === "admin" && (
            <Link to="/admin" className={linkClasses("/admin")}>
              Admin
            </Link>
          )}

          {user && (
            <Link to="/profile" className={linkClasses("/profile")}>
              Profile
            </Link>
          )}

          {user ? (
            <button
              onClick={logout}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className={linkClasses("/login")}>
                Login
              </Link>
              <Link to="/register" className={linkClasses("/register")}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
