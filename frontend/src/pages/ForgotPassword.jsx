import { useState } from "react";
import api from "../lib/axios";
import { motion } from "framer-motion";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/forgot", { email });
      setMsg("If email exists, reset link sent.");
    } catch (err) {
      setMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-900 to-indigo-950 px-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="bg-zinc-800 rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6 border border-indigo-600">
        <h2 className="text-3xl font-bold text-white text-center">Forgot Password</h2>
        {msg && <div className="text-green-400 text-sm text-center">{msg}</div>}

        <form onSubmit={submit} className="space-y-4">
          <input
            className="w-full px-4 py-2 bg-zinc-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 rounded-lg text-white font-semibold shadow-md hover:shadow-lg"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </motion.div>
  );
}
