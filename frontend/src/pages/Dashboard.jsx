import { useEffect, useState } from "react";
import api from "../lib/axios";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function Dashboard(){
  const [tasks,setTasks]=useState([]);
  useEffect(()=>{
    api.get("/tasks").then(res=> setTasks(res.data));
  },[]);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">My Tasks</h1>
      <TaskForm onCreated={t=>setTasks([t,...tasks])}/>
      <TaskList items={tasks} onChange={setTasks}/>
    </div>
  );
}
