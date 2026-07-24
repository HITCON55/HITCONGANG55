import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { fetchReportById } from '../services/api.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import EmptyState from '../components/EmptyState.jsx';

function IssueDetailsPage() {
  const { id } = useParams();
  const revealVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
  };
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadReport() {
      setLoading(true);
      setError('');
      try {
        const data = await fetchReportById(id);
        setReport(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadReport();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <EmptyState title="Unable to load issue details" description={error} />;
  if (!report) return <EmptyState title="Issue not found" description="This issue may have been removed or the ID is invalid." />;

  return (
    <motion.section className="section" initial="hidden" animate="visible" variants={revealVariants}>
      <div className="container">
        <div className="page-header">
          <div>
            <p className="hero-eyebrow">Issue details</p>
            <h1 className="page-title">{report.title}</h1>
            <p className="page-subtitle">Review current status, timeline, and community updates in one place.</p>
          </div>
        </div>

        <motion.div className="grid-2" style={{ gap: '30px' }} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={revealVariants}>
          <div className="card card-strong detail-media">
            {report.image ? (
              <img src={report.image} alt={report.title} />
            ) : (
              <div className="detail-media__empty">No image available</div>
            )}
          </div>

          <div className="card card-strong detail-summary">
            <div className="inline-row detail-summary__top" style={{ justifyContent: 'space-between' }}>
              <span className={`badge ${report.status === 'Resolved' ? 'badge--resolved' : report.status === 'In Progress' ? 'badge--in-progress' : 'badge--reported'}`}>
                {report.status}
              </span>
              <span className="detail-summary__date">{new Date(report.dateReported).toLocaleDateString()}</span>
            </div>
            <p>{report.description}</p>
            <div className="inline-row detail-summary__tags" style={{ gap: '12px', flexWrap: 'wrap' }}>
              <div className="badge badge--reported">{report.category}</div>
              <div className="badge badge--ghost detail-summary__location">{report.location}</div>
            </div>
            <button className="button button--secondary" style={{ marginTop: '24px' }}>
              Upvote issue ({report.upvotes || 0})
            </button>
          </div>
        </motion.div>

        <section className="section section--compact">
          <div className="container">
            <div className="grid-2" style={{ gap: '28px' }}>
              <div className="card card-strong" style={{ padding: '26px' }}>
                <h2>Progress timeline</h2>
                <div className="timeline timeline--spacious">
                  <div className="timeline-item">
                    <p className="timeline-item__label">Reported</p>
                    <p className="timeline-item__time">{new Date(report.dateReported).toLocaleString()}</p>
                  </div>
                  <div className="timeline-item">
                    <p className="timeline-item__label">Current status</p>
                    <p className="timeline-item__time">{report.status}</p>
                  </div>
                </div>
              </div>

              <div className="card card-strong" style={{ padding: '26px' }}>
                <h2>Community discussion</h2>
                <p className="detail-discussion-copy">
                  Comments and updates will appear here once connected to the backend service.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </motion.section>
  );
}

export default IssueDetailsPage;
