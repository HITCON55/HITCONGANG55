const express = require("express");
const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");
const path = require("path");
const fs = require("fs");

// Create backend folder path for db file
const dbFile = path.join(__dirname, "db.json");

// Ensure db.json exists
if (!fs.existsSync(dbFile)) {
  fs.writeFileSync(dbFile, JSON.stringify({ reports: [] }, null, 2));
}

// lowdb setup
const adapter = new JSONFile(dbFile);
const db = new Low(adapter);

async function initDb() {
  await db.read();
  db.data = db.data || { reports: [] };
  await db.write();
}

const app = express();
app.use(express.json());

// Simple logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// GET /api/reports — return all reports
app.get("/api/reports", async (req, res) => {
  await db.read();
  res.json(db.data.reports);
});

// POST /api/reports — create a new report
app.post("/api/reports", async (req, res) => {
  const { title, description, location } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: "Title and description are required." });
  }
  await db.read();
  const newReport = {
    id: Date.now().toString(),
    title,
    description,
    location: location || "",
    category: null, // Person 3 will fill this later
    status: "Reported",
    createdAt: new Date().toISOString(),
  };
  db.data.reports.unshift(newReport);
  await db.write();
  res.status(201).json(newReport);
});

// simple health check
app.get("/health", (req, res) => res.send("OK"));

const PORT = process.env.PORT || 4000;
initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend listening on http://localhost:${PORT}`);
  });
});
