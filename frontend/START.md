# Frontend START instructions (React) — copy these commands exactly

This file explains how to create the React frontend locally and where to paste the App.js code.

From the repository root run (one-time):

1) Create the React app (this will scaffold a new React project in /frontend):

   npx create-react-app frontend

2) Move into the frontend folder:

   cd frontend

3) Add a proxy to package.json so the React dev server forwards API calls to the backend.

Open frontend/package.json in a text editor and add this line at the top level (comma after "private": true)

  "proxy": "http://localhost:4000",

4) Replace src/App.js with the following code (copy-paste exactly):

```javascript
import React, { useEffect, useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchReports();
  }, []);

  async function fetchReports() {
    setLoading(true);
    try {
      const res = await fetch("/api/reports");
      const data = await res.json();
      setReports(data);
    } catch (err) {
      console.error("Fetch reports error:", err);
      setMessage("Could not load reports.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title || !description) {
      alert("Please add a title and description.");
      return;
    }
    const payload = { title, description, location };
    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Network response not ok");
      const saved = await res.json();
      setTitle("");
      setDescription("");
      setLocation("");
      setMessage("Report submitted!");
      // refresh list
      fetchReports();
    } catch (err) {
      console.error("Submit error:", err);
      setMessage("Failed to submit report.");
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
      <h1>Smart Community Problem Solver — Demo</h1>

      <section style={{ marginBottom: 20 }}>
        <h2>Submit a problem</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 8 }}>
            <input
              placeholder="Title (e.g., Broken streetlight)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "100%", padding: 8 }}
            />
          </div>
          <div style={{ marginBottom: 8 }}>
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: "100%", padding: 8, height: 80 }}
            />
          </div>
          <div style={{ marginBottom: 8 }}>
            <input
              placeholder="Location (optional)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{ width: "100%", padding: 8 }}
            />
          </div>
          <button type="submit" style={{ padding: "8px 16px" }}>
            Submit
          </button>
        </form>
        <div style={{ marginTop: 8, color: "green" }}>{message}</div>
      </section>

      <section>
        <h2>Reported problems</h2>
        {loading ? (
          <div>Loading...</div>
        ) : reports.length === 0 ? (
          <div>No reports yet.</div>
        ) : (
          <ul style={{ paddingLeft: 0, listStyle: "none" }}>
            {reports.map((r) => (
              <li key={r.id} style={{ border: "1px solid #ddd", padding: 10, marginBottom: 8 }}>
                <strong>{r.title}</strong> — <em>{r.category || "Uncategorized"}</em>
                <div>{r.description}</div>
                <div style={{ color: "#666", fontSize: 12 }}>
                  {r.location ? `Location: ${r.location} · ` : ""} Status: {r.status}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;
```

5) Install and start the frontend dev server:

   npm install
   npm start

Open http://localhost:3000 in your browser. The app will hot-reload when you save files.

Notes:
- The frontend expects the backend at http://localhost:4000 because of the proxy setting in package.json.
- If the backend is not running yet, the frontend will still load but submitting reports will fail.
