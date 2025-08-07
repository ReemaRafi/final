import StatusBadge from "./StatusBadge";
import api from "../lib/axios";

export default function TaskList({ items, onChange }) {
  const toggle = async (t) => {
    const next = t.status === "Pending" ? "Done" : "Pending";
    const { data } = await api.put(`/tasks/${t._id}`, { status: next });
    onChange(items.map((i) => (i._id === t._id ? data : i)));
  };

  const remove = async (id) => {
    await api.delete(`/tasks/${id}`);
    onChange(items.filter((i) => i._id !== id));
  };

  return (
    <ul className="space-y-4">
      {items.map((t) => (
        <li
          key={t._id}
          className="bg-zinc-800 border border-zinc-700 rounded-2xl p-5 flex items-center justify-between shadow-lg hover:shadow-indigo-700/30 transition"
        >
          <div>
            <div className="text-lg font-semibold text-white flex items-center gap-2">
              {t.title}
              <StatusBadge status={t.status} />
            </div>
            {t.description && (
              <div className="text-sm text-gray-400 mt-1">{t.description}</div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => toggle(t)}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              {t.status === "Pending" ? "Mark Done" : "Mark Pending"}
            </button>
            <button
              onClick={() => remove(t._id)}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
