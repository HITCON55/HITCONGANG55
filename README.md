# Smart Community Problem Solver

This repository contains the starter files for the hackathon project "Smart Community Problem Solver".

Goal of this branch:
- Add simple backend and AI stub files so the team can clone and start coding immediately.
- Provide exact instructions for the frontend (React) setup so teammates can run the app locally.

Team roles:
- Person 1 — Frontend (React)
- Person 2 — Backend (Node + Express + lowdb)
- Person 3 — AI integration (placeholder now)

Prerequisites (on each teammate machine):
- Git: https://git-scm.com/ (verify: git --version)
- Node.js LTS (18.x or newer): https://nodejs.org/ (verify: node -v and npm -v)

How to get this branch locally:
1. Clone the repo (if not already):
   git clone https://github.com/HITCON55/HITCONGANG55.git
2. Switch to the new branch:
   cd HITCONGANG55
   git fetch origin
   git checkout setup/initial

Files added in this branch:
- backend/server.js — minimal Express server
- backend/package.json — backend npm config
- ai/generateCategory.js — simple rule-based AI stub
- frontend/START.md — exact instructions for creating the React app and the App.js file to paste
- .gitignore
- README_SHORT.md — short summary and next steps for the team

What to do next (very short):
- Person 2: start the backend (cd backend && npm install && npm run dev) and confirm http://localhost:4000/health returns OK.
- Person 1: follow frontend/START.md to create the React app locally and paste App.js (or wait until backend is running before testing submit).
- Person 3: run node ai/generateCategory.js to verify stub works.

When done: reply here with "done" and the exact outputs you see (server console, browser screenshot/text, or console output). Then we'll integrate the AI stub into the backend in one small step.
