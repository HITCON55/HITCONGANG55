import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import LoadingSplash from './components/LoadingSplash.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import HomePage from './pages/HomePage.jsx';
import ReportPage from './pages/ReportPage.jsx';
import CommunityIssuesPage from './pages/CommunityIssuesPage.jsx';
import IssueDetailsPage from './pages/IssueDetailsPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import AuthPage from './pages/AuthPage.jsx';

function App() {
  const [showSplash, setShowSplash] = React.useState(true);

  React.useEffect(() => {
    // Safety: ensure splash does not hang if asset loading/events fail
    const timeout = setTimeout(() => setShowSplash(false), 2200);
    return () => clearTimeout(timeout);
  }, []);

  React.useEffect(() => {
    // Apply cinematic body class to enable cursor hide and global effects
    document.body.classList.add('is-cinematic');
    return () => document.body.classList.remove('is-cinematic');
  }, []);

  React.useEffect(() => {
    // Magnetic button micro-interaction
    const buttons = Array.from(document.querySelectorAll('.button'));
    const handlers = [];

    buttons.forEach((btn) => {
      const onMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / rect.width * 18; // scale
        const dy = (e.clientY - cy) / rect.height * 10;
        btn.style.transform = `translate(${dx}px, ${dy}px) scale(1.03)`;
      };
      const onEnter = () => { btn.style.transition = 'transform 160ms cubic-bezier(.2,.9,.2,1)'; };
      const onLeave = () => { btn.style.transform = ''; btn.style.transition = 'transform 260ms cubic-bezier(.2,.9,.2,1)'; };
      btn.addEventListener('pointermove', onMove);
      btn.addEventListener('pointerenter', onEnter);
      btn.addEventListener('pointerleave', onLeave);
      handlers.push(() => {
        btn.removeEventListener('pointermove', onMove);
        btn.removeEventListener('pointerenter', onEnter);
        btn.removeEventListener('pointerleave', onLeave);
      });
    });

    return () => handlers.forEach((h) => h());
  }, []);

  return (
    <Router>
      <div className="app-shell">
        <CustomCursor />
        <div className="grain-overlay" />
        <ScrollProgress />
        <Navbar />
        {showSplash && <LoadingSplash onFinish={() => setShowSplash(false)} />}
        <main className="page-content" style={showSplash ? { visibility: 'hidden' } : {}}>
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
