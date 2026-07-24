import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchReports } from '../services/api.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import EmptyState from '../components/EmptyState.jsx';
import Icon from '../components/Icon.jsx';

function DashboardPage() {
  const [reports, setReports] = useState([]);
  const sectionVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadReports() {
      setLoading(true);
      setError('');
      try {
        const data = await fetchReports();
        setReports(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadReports();
  }, []);

  const totalReports = reports.length;
  const resolvedCount = reports.filter((report) => report.status === 'Resolved').length;
  const inProgressCount = reports.filter((report) => report.status === 'In Progress').length;
  const weekCount = reports.filter((report) => {
    const reportDate = new Date(report.dateReported);
    const now = new Date();
    return (now - reportDate) / (1000 * 60 * 60 * 24) <= 7;
  }).length;

  const categoryCounts = reports.reduce((acc, report) => {
    acc[report.category] = (acc[report.category] || 0) + 1;
    return acc;
  }, {});

  const recentReports = [...reports].sort((a, b) => new Date(b.dateReported) - new Date(a.dateReported)).slice(0, 4);

  return (
    <section className="section">
      <div className="container">
        <div className="page-header">
          <div>
            <p className="hero-eyebrow">Dashboard</p>
            <h1 className="page-title">Operational overview for community issues.</h1>
            <p className="page-subtitle">Track key metrics, recent reports, and status trends at a glance.</p>
          </div>
        </div>

        {loading && <LoadingSpinner />}
        {error && <EmptyState title="Unable to load dashboard" description={error} />}

        {!loading && !error && (
          <>
            <motion.div className="dashboard-top-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }} variants={sectionVariants}>
              <motion.div className="dashboard-summary card card-strong" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={sectionVariants}>
                <div className="dashboard-summary__head">
                  <div>
                    <p style={{ margin: 0, color: '#5f6c8b' }}>Neighborhood health</p>
                    <h2 style={{ margin: '14px 0 0' }}>{totalReports} total reports</h2>
                  </div>
                  <div className="dashboard-summary__icon">
                    <Icon name="ai" width={22} height={22} />
                  </div>
                </div>
                <p style={{ margin: '12px 0 0', color: '#5f6c8b' }}>
                  High-priority insights show where local maintenance and engagement are needed most.
                </p>
              </motion.div>

              <div className="dashboard-metrics">
                <div className="card card-strong metric-card">
                  <p style={{ margin: 0, color: '#5f6c8b' }}>Reports this week</p>
                  <h2 style={{ margin: '14px 0 0' }}>{weekCount}</h2>
                </div>
                <div className="card card-strong metric-card">
                  <p style={{ margin: 0, color: '#5f6c8b' }}>Resolved problems</p>
                  <h2 style={{ margin: '14px 0 0' }}>{resolvedCount}</h2>
                </div>
                <div className="card card-strong metric-card">
                  <p style={{ margin: 0, color: '#5f6c8b' }}>In progress</p>
                  <h2 style={{ margin: '14px 0 0' }}>{inProgressCount}</h2>
                </div>
              </div>
            </motion.div>

            <section className="section section--compact">
              <div className="container">
                <div className="card card-strong" style={{ padding: '28px' }}>
                  <h2 style={{ marginTop: 0 }}>Most reported categories</h2>
                  <div className="status-grid dashboard-category-grid">
                    {Object.entries(categoryCounts).length === 0 && <p style={{ margin: 0, color: '#5f6c8b' }}>No category data available yet.</p>}
                    {Object.entries(categoryCounts).map(([categoryName, count]) => (
                      <div key={categoryName} className="category-pill card">
                        <p style={{ margin: 0, color: '#5f6c8b' }}>{categoryName}</p>
                        <h3 style={{ margin: '12px 0 0' }}>{count} reports</h3>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="section section--compact">
              <div className="container">
                <div className="card card-strong" style={{ padding: '28px' }}>
                  <div className="dashboard-table-header">
                    <div>
                      <h2 style={{ marginTop: 0 }}>Recent reports</h2>
                      <p style={{ margin: '10px 0 0', color: '#5f6c8b' }}>Latest submissions from your neighborhood.</p>
                    </div>
                  </div>
                  <div className="dashboard-recent-grid">
                    {recentReports.map((report) => (
                      <div key={report.id} className="recent-report-card card">
                        <p style={{ margin: 0, color: '#5f6c8b' }}>{report.category}</p>
                        <h3 style={{ margin: '10px 0 8px' }}>{report.title}</h3>
                        <p style={{ margin: 0, color: '#5f6c8b' }}>{report.location}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </section>
  );
}

export default DashboardPage;
