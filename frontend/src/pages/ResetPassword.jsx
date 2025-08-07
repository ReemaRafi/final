import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../lib/axios";

export default function ResetPassword(){
  const [sp] = useSearchParams(); const nav = useNavigate();
  const [password,setPassword]=useState(""); const [msg,setMsg]=useState(""); const [err,setErr]=useState("");
  const submit = async e=>{
    e.preventDefault(); setErr("");
    try{
      await api.post("/auth/reset",{ id: sp.get("id"), token: sp.get("token"), password });
      setMsg("Password updated. You can login now."); setTimeout(()=>nav("/login"), 1200);
    }catch(e){ setErr(e.response?.data?.message||"Error"); }
  };
  return (
    <div className="max-w-sm mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      {msg && <div className="text-green-400">{msg}</div>}
      {err && <div className="text-red-400">{err}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full px-3 py-2 rounded bg-zinc-800" type="password" placeholder="New password" value={password} onChange={e=>setPassword(e.target.value)}/>
        <button className="w-full py-2 rounded bg-red-600 hover:bg-red-700">Reset</button>
      </form>
    </div>
  );
}
