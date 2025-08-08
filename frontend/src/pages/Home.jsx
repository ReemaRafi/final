import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center px-4">
      <div className="max-w-4xl text-center space-y-8">
        {/* Hero Image */}
        <img
          src="https://as2.ftcdn.net/jpg/04/95/90/23/1000_F_495902387_5hqXzYFahTY1KSBcRouep3cGrePQPQmE.jpg"
alt="Task Management"
          className="w-full max-h-[400px] object-contain mx-auto rounded-xl shadow-lg"
        />

        {/* Heading & Text */}
        <h1 className="text-4xl font-extrabold text-indigo-400">Simplify Your Review</h1>
        <p className="text-lg text-gray-300">Organize, manage, and track Review.</p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="px-6 py-2 border border-indigo-500 hover:bg-indigo-500 text-white rounded-lg font-medium transition"
          >
            Profile
          </button>
        </div>
      </div>
    </div>
  );
}



