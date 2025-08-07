// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function Register(){
//   const [form,setForm]=useState({name:"",email:"",password:"",role:"user"});
//   const [err,setErr]=useState(""); const nav=useNavigate(); const { register } = useAuth();

//   const submit = async e=>{
//     e.preventDefault(); setErr("");
//     try{ await register(form); nav("/"); }catch(e){ setErr(e.response?.data?.message||"Error"); }
//   };

//   return (
//     <div className="max-w-sm mx-auto mt-10">
//       <h1 className="text-2xl font-bold mb-4">Register</h1>
//       {err && <div className="mb-2 text-red-400">{err}</div>}
//       <form onSubmit={submit} className="space-y-3">
//         <input className="w-full px-3 py-2 rounded bg-zinc-800" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
//         <input className="w-full px-3 py-2 rounded bg-zinc-800" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
//         <input className="w-full px-3 py-2 rounded bg-zinc-800" type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>
//         <select className="w-full px-3 py-2 rounded bg-zinc-800" value={form.role} onChange={e=>setForm({...form,role:e.target.value})}>
//           <option value="user">User</option>
//           <option value="admin">Admin</option>
//         </select>
//         <button className="w-full py-2 rounded bg-red-600 hover:bg-red-700">Create</button>
//       </form>
//     </div>
//   );
// }





import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [err, setErr] = useState("");
  const nav = useNavigate();
  const { register } = useAuth();

  const submit = async e => {
    e.preventDefault();
    setErr("");
    try {
      await register(form);
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
        <h2 className="text-3xl font-bold text-white text-center">Create Account</h2>
        {err && <div className="text-red-400 text-sm text-center">{err}</div>}
        <form onSubmit={submit} className="space-y-4">
          <input
            className="w-full px-4 py-2 bg-zinc-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="w-full px-4 py-2 bg-zinc-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="w-full px-4 py-2 bg-zinc-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
          <select
            className="w-full px-4 py-2 bg-zinc-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 rounded-lg text-white font-semibold shadow-md hover:shadow-lg"
          >
            Create Account
          </button>
        </form>
        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </motion.div>
  );
}
