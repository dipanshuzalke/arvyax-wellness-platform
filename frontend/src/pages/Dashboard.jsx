import { useEffect, useState } from "react";
import axios from "axios";
import SessionCard from "../components/SessionCard";

export default function Dashboard() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/sessions")
      .then((res) => setSessions(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 text-center">🌿 Published Wellness Sessions</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sessions.length > 0 ? (
          sessions.map((session) => (
            <SessionCard key={session._id} session={session} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No sessions published yet.</p>
        )}
      </div>
    </div>
  );
}
