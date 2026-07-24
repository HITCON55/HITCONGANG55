# Initial setup: run backend and frontend locally

Follow these steps as a team. Do one step at a time and confirm it works before moving to the next.

## 1) Clone the repo

Open a terminal and run:

1. git clone git@github.com:HITCON55/HITCONGANG55.git
2. cd HITCONGANG55
3. git checkout -b initial-setup

(If you prefer HTTPS: git clone https://github.com/HITCON55/HITCONGANG55.git)

## 2) Setup backend

1. cd backend
2. Create a .env file based on .env.example and set MONGO_URI. For local testing you can use a local MongoDB server (mongodb://localhost:27017/smart-community) or create a free MongoDB Atlas cluster.

Example .env (create backend/.env):

MONGO_URI=mongodb://localhost:27017/smart-community
PORT=5000

3. Install dependencies:

npm install

4. Start the backend in development mode (requires nodemon) or start normally:

npm run dev

or

npm start

The server will run on http://localhost:5000 and expose API endpoints:
- GET /api/problems
- POST /api/problems


## 3) Setup frontend

Open a new terminal tab/window.

1. cd frontend
2. Install dependencies:

npm install

3. Start the frontend dev server:

npm run dev

Vite will give you a local URL (usually http://localhost:5173). Open it in your browser.

The frontend expects the backend at http://localhost:5000. If your backend runs on a different port, update the fetch URL in frontend/src/App.jsx and frontend/src/components/ReportForm.jsx.

## 4) Test the MVP

1. Open the frontend URL (Vite's dev server).
2. Fill the form (Title, Description, optional Location) and submit.
3. The backend should respond with the saved problem and the dashboard should show the new problem at the top.

If you see errors:
- Check backend terminal for logs.
- Check browser console/network for frontend requests.


## Next steps (we will do these one at a time):
- Add image upload and store images (or temporary base64) on server
- Add AI integration (Gemini) to auto-categorize reports
- Add authentication (signup/login) and associate reports with users
- Add upvote endpoint and UI
- Add map-based location capture


If you want, confirm that the MVP works and I will guide you step-by-step to add the next feature (image upload / AI categorization).