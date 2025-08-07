export default function StatusBadge({status}){
  const cls = status==="Done" ? "bg-green-600" : "bg-yellow-600";
  return <span className={`text-xs px-2 py-0.5 rounded ${cls}`}>{status}</span>;
}
