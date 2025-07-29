import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function SessionEditor() {
  const [formData, setFormData] = useState({ id: "", title: "", tags: "", json_file_url: "" });
  const token = localStorage.getItem("token");
  const saveTimer = useRef(null);
  const location = useLocation();

  // ✅ Get session id from URL if editing
  const params = new URLSearchParams(location.search);
  const sessionId = params.get("id");

  // ✅ Load existing draft if ID is provided
  useEffect(() => {
    if (sessionId) {
      axios
        .get(`https://arvyax-wellness-platform.onrender.com/api/my-sessions/${sessionId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setFormData({
            id: res.data._id,
            title: res.data.title,
            tags: res.data.tags.join(", "),
            json_file_url: res.data.json_file_url,
          });
        })
        .catch(() => toast.error("Failed to load draft"));
    }
  }, [sessionId, token]);

  // ✅ Auto-save draft
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      saveDraft();
    }, 5000);
  };

  const saveDraft = async () => {
    try {
      await axios.post("https://arvyax-wellness-platform.onrender.com/api/my-sessions/save-draft", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("✅ Draft auto-saved");
    } catch (error) {
      toast.error("❌ Auto-save failed");
    }
  };

  const handlePublish = async () => {
    try {
      await axios.post("https://arvyax-wellness-platform.onrender.com/api/my-sessions/publish", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("✅ Session published!");
    } catch (error) {
      toast.error("❌ Publish failed");
    }
  };

  useEffect(() => {
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, []);

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">
        {sessionId ? "✍️ Edit Draft" : "✍️ Create New Session"}
      </h2>

      <input
        type="text"
        name="title"
        placeholder="Session Title"
        className="w-full p-3 border rounded-lg mb-4"
        value={formData.title}
        onChange={handleChange}
      />

      <input
        type="text"
        name="tags"
        placeholder="Tags (comma separated)"
        className="w-full p-3 border rounded-lg mb-4"
        value={formData.tags}
        onChange={handleChange}
      />

      <input
        type="text"
        name="json_file_url"
        placeholder="JSON File URL"
        className="w-full p-3 border rounded-lg mb-4"
        value={formData.json_file_url}
        onChange={handleChange}
      />

      <div className="flex justify-between">
        <button
          type="button"
          onClick={saveDraft}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Save Draft
        </button>
        <button
          type="button"
          onClick={handlePublish}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Publish
        </button>
      </div>
    </div>
  );
}
