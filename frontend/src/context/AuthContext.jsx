import { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/axios";

const AuthCtx = createContext(null);
export const useAuth = ()=> useContext(AuthCtx);

export default function AuthProvider({ children }){
  const [user,setUser] = useState(null);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    api.get("/auth/me").then(res=> setUser(res.data.user)).finally(()=>setLoading(false));
  },[]);

  const login = async (email,password)=>{
    const res = await api.post("/auth/login",{email,password});
    setUser(res.data.user);
  };
  const register = async (payload)=>{
    const res = await api.post("/auth/register", payload);
    setUser(res.data.user);
  };
  const logout = async ()=>{
    await api.post("/auth/logout");
    setUser(null);
  };

  return <AuthCtx.Provider value={{user,loading,login,register,logout}}>
    {children}
  </AuthCtx.Provider>;
}
