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

## Backend integration (environment-aware)

The frontend reads the API root from the Vite environment variable `VITE_API_URL`.

- For local development, no configuration is required — the code falls back to `http://localhost:4000`.
- For production (Netlify), set `VITE_API_URL` to your backend base (either with or without the trailing `/api`).

Examples:

- Local (default): `http://localhost:4000` which will map to `http://localhost:4000/api`
- Production example: `https://api.your-backend.com` which will map to `https://api.your-backend.com/api`

The API service layer in `src/services/api.js` uses that variable and supports the following endpoints:

- `GET /api/reports`
- `POST /api/reports`
- `GET /api/reports/:id`
- `POST /api/reports/:id/upvote`

Important for Netlify deployment:

1. In your Netlify site settings go to **Site settings → Build & deploy → Environment**.
2. Add an environment variable named `VITE_API_URL` and set it to your backend base URL (for example `https://api.your-backend.com`).
3. Trigger a redeploy. The built frontend will then call the configured backend instead of `localhost`.

If you don't have a deployed backend yet, leave `VITE_API_URL` blank — the app will continue to use `http://localhost:4000` during local development. When you deploy a backend, add the production URL to Netlify's environment variables.
