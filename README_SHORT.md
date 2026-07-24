Short summary and next steps — ready to code

1) Each person should clone the branch `setup/initial` and follow their short checklist:

Person 2 (Backend):
- cd backend
- npm install
- npm run dev
- Visit http://localhost:4000/health — expect "OK"

Person 3 (AI):
- cd ai
- node generateCategory.js
- Expect output: Test sample -> Broken streetlight

Person 1 (Frontend):
- Follow frontend/START.md to scaffold the React app and paste the App.js code.
- After starting the React dev server, visit http://localhost:3000

2) After all three confirm success, we'll do one small change: Person 2 will import the AI module and call it when new reports are created so each new report gets a category. We'll provide the exact code and the single command to run.

If you want, I can also open a pull request with these changes or create issues for each person's tasks. Tell me which you prefer.
