import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <div
      style={{
        backgroundImage: "url('https://as2.ftcdn.net/jpg/04/95/90/23/1000_F_495902387_5hqXzYFahTY1KSBcRouep3cGrePQPQmE.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
      className="text-zinc-100"
    >
      <div className="bg-black/70 min-h-screen">
        <Navbar />
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="max-w-3xl mx-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
