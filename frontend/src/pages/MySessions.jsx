import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function MySessions() {
  const [drafts, setDrafts] = useState([]);
  const [published, setPublished] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // ✅ Fetch sessions & split them into drafts & published
  const fetchSessions = () => {
    axios
      .get("http://localhost:5000/api/my-sessions", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setDrafts(res.data.filter((s) => s.status === "draft"));
        setPublished(res.data.filter((s) => s.status === "published"));
      })
      .catch(() => toast.error("Failed to load your sessions"));
  };

  useEffect(() => {
    fetchSessions();
  }, [token]);

  // ✅ Open draft in editor
  const openEditor = (sessionId) => {
    navigate(`/editor?id=${sessionId}`);
  };

  // ✅ Delete session (draft or published)
  const deleteSession = async (sessionId) => {
    if (!window.confirm("Are you sure you want to delete this session?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/my-sessions/${sessionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("✅ Session deleted");
      fetchSessions(); // refresh list
    } catch {
      toast.error("❌ Delete failed");
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 text-center">📝 Drafts</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {drafts.length > 0 ? (
          drafts.map((session) => (
            <div
              key={session._id}
              className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
            >
              <h3
                className="text-lg font-semibold cursor-pointer hover:text-blue-600"
                onClick={() => openEditor(session._id)}
              >
                {session.title || "Untitled Draft"}
              </h3>
              <p className="text-sm text-gray-500">Status: <span className="text-orange-500">{session.status}</span></p>
              <div className="flex justify-between mt-2">
                <button
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => openEditor(session._id)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => deleteSession(session._id)}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No drafts available.</p>
        )}
      </div>
    </div>
  );
}
