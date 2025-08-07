import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();
  const { login } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await login(email, password);
      nav("/");
    } catch (e) {
      setErr(e.response?.data?.message || "Error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-900 to-indigo-950 px-4"
    >
      <div className="bg-zinc-800 rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6 border border-indigo-600">
        <h2 className="text-3xl font-bold text-white text-center">Login</h2>
        {err && <div className="text-red-400 text-sm text-center">{err}</div>}

        <form onSubmit={submit} className="space-y-4">
          <input
            className="w-full px-4 py-2 bg-zinc-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full px-4 py-2 bg-zinc-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 rounded-lg text-white font-semibold shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>

        <div className="text-sm text-gray-400 flex justify-between">
          <Link to="/register" className="hover:underline text-indigo-400">
            Create account
          </Link>
          <Link to="/forgot-password" className="hover:underline text-indigo-400">
            Forgot password?
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
