const express = require("express");
const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");
const path = require("path");
const fs = require("fs");

// Import AI stub
const { generateCategory } = require(path.join(__dirname, "..", "ai", "generateCategory"));

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

// Serve static frontend from /public
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

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

// POST /api/reports — create a new report (uses AI stub to set category)
app.post("/api/reports", async (req, res) => {
  const { title, description, location } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: "Title and description are required." });
  }
  await db.read();

  // Call AI stub to get category
  let category = "Uncategorized";
  try {
    category = generateCategory({ title, description }) || "Uncategorized";
  } catch (err) {
    console.error("AI category error:", err);
    category = "Uncategorized";
  }

  const newReport = {
    id: Date.now().toString(),
    title,
    description,
    location: location || "",
    category,
    status: "Reported",
    createdAt: new Date().toISOString(),
  };
  db.data.reports.unshift(newReport);
  await db.write();
  res.status(201).json(newReport);
});

// simple health check
app.get("/health", (req, res) => res.send("OK"));

// For any other route, serve index.html so SPA works
app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

const PORT = process.env.PORT || 4000;
initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend (single-server) listening on http://localhost:${PORT}`);
  });
});
