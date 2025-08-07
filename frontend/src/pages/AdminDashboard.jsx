import { useEffect, useState } from "react";
import api from "../lib/axios";
import StatusBadge from "../components/StatusBadge";

export default function AdminDashboard(){
  const [tasks,setTasks]=useState([]);
  useEffect(()=>{
    api.get("/admin/tasks").then(res=> setTasks(res.data));
  },[]);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">All Users' Tasks</h1>
      <ul className="space-y-3">
        {tasks.map(t=>(
          <li key={t._id} className="bg-zinc-900 p-4 rounded-2xl">
            <div className="text-sm text-zinc-400">{t.user?.name} ({t.user?.email})</div>
            <div className="font-medium">{t.title} <StatusBadge status={t.status}/></div>
            {t.description && <div className="text-sm text-zinc-400">{t.description}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
