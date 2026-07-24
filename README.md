# Smart Community

A polished React frontend for the Smart Community hackathon project.

## Project structure

- `src/` — React source files
- `src/components/` — reusable UI components
- `src/pages/` — page views
- `src/services/` — API helper functions
- `src/styles/` — CSS and design tokens

## Run locally

1. Install dependencies:

```powershell
cd "c:\Users\Userrrr\Documents\GitHub\HITCONGANG55"
npm install
```

2. Start the development server:

```powershell
npm start
```

3. Open `http://localhost:3000` in your browser.

## Backend integration

This frontend is prepared to connect to a backend at `http://localhost:4000`.
The API service layer in `src/services/api.js` is ready for:

- `GET /api/reports`
- `POST /api/reports`
- `GET /api/reports/:id`
- `POST /api/reports/:id/upvote`
