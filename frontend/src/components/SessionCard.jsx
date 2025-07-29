export default function SessionCard({ session }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition">
      <h3 className="text-xl font-semibold">{session.title}</h3>
      <p className="text-sm text-gray-500">
        Tags: {session.tags && session.tags.length > 0 ? session.tags.join(", ") : "No tags"}
      </p>
      <p className="text-xs text-gray-400 mt-2">By {session.user_id?.email || "Anonymous"}</p>
    </div>
  );
}
