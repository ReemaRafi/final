// src/pages/Profile.jsx
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <motion.div
      className="min-h-screen bg-indigo-950 text-white p-6 flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-indigo-800 rounded-2xl p-8 shadow-lg w-full max-w-md text-center space-y-4">
        <motion.img
          src={user?.avatar || "https://ui-avatars.com/api/?name=" + user?.name}
          alt="Profile"
          className="w-32 h-32 mx-auto rounded-full border-4 border-indigo-500 object-cover"
          whileHover={{ scale: 1.05 }}
        />

        <div>
          <h2 className="text-2xl font-bold">{user?.name || "No Name"}</h2>
          <p className="text-indigo-300">{user?.email || "Email not found"}</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-indigo-600 hover:bg-indigo-700 transition px-5 py-2 rounded-full font-semibold"
        >
          Edit Profile
        </motion.button>
      </div>
    </motion.div>
  );
}
