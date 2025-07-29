import { useEffect, useState } from "react";

export default function SessionCard({ session }) {
  const [jsonData, setJsonData] = useState(null);

  // ✅ Fetch JSON file from URL if provided by backend
  useEffect(() => {
    if (session.json_file_url) {
      fetch(session.json_file_url)
        .then((res) => res.json())
        .then((data) => setJsonData(data))
        .catch((err) => console.error("❌ JSON fetch error:", err));
    }
  }, [session.json_file_url]);

  return (
    <div className="border rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition">
      {/* ✅ Title from MongoDB */}
      <h3 className="text-xl font-bold text-blue-600">{session.title}</h3>

      {/* ✅ Tags from MongoDB */}
      {session.tags && session.tags.length > 0 && (
        <div className="mt-1">
          {session.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full mr-2"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* ✅ Show JSON Data (if exists) */}
      {jsonData ? (
        <pre className="bg-gray-100 p-3 mt-3 rounded-lg text-sm overflow-x-auto">
          {JSON.stringify(jsonData, null, 2)}
        </pre>
      ) : (
        session.json_file_url ? (
          <p className="text-gray-400 mt-2 text-sm">Loading session details...</p>
        ) : (
          <p className="text-gray-400 mt-2 text-sm">No JSON data linked.</p>
        )
      )}
    </div>
  );
}
