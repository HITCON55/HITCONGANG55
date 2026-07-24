import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import HomePage from './pages/HomePage.jsx';
import ReportPage from './pages/ReportPage.jsx';
import CommunityIssuesPage from './pages/CommunityIssuesPage.jsx';
import IssueDetailsPage from './pages/IssueDetailsPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import AuthPage from './pages/AuthPage.jsx';

function App() {
  return (
    <Router>
      <div className="app-shell">
        <ScrollProgress />
        <Navbar />
        <main className="page-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/issues" element={<CommunityIssuesPage />} />
            <Route path="/issues/:id" element={<IssueDetailsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
