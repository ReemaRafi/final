import { useState } from "react";
import api from "../lib/axios";

export default function TaskForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const { data } = await api.post("/tasks", { title, description });
    setTitle("");
    setDescription("");
    onCreated?.(data);
  };

  return (
    <form
      onSubmit={submit}
      className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 space-y-4 shadow-lg hover:shadow-indigo-700/20 transition"
    >
      <h2 className="text-xl font-bold text-white">Add New Task</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        className="w-full px-4 py-2 bg-zinc-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full px-4 py-2 bg-zinc-700 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
        rows={4}
      />

      <button
        type="submit"
        className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-200"
      >
        Add Task
      </button>
    </form>
  );
}
