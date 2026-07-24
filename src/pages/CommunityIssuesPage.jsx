import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchReports } from '../services/api.js';
import IssueCard from '../components/IssueCard.jsx';
import EmptyState from '../components/EmptyState.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const categories = ['', 'Garbage & Waste', 'Roads & Potholes', 'Water', 'Electricity', 'Streetlights', 'Public Safety', 'Other'];
const statuses = ['', 'Reported', 'In Progress', 'Resolved'];
const sortOptions = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'popular', label: 'Most upvotes' },
];

function CommunityIssuesPage() {
  const [reports, setReports] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [sortKey, setSortKey] = useState('newest');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadReports() {
      setLoading(true);
      setError('');
      try {
        const reportData = await fetchReports();
        setReports(reportData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadReports();
  }, []);

  useEffect(() => {
    let next = [...reports];
    if (query.trim()) {
      const lower = query.toLowerCase();
      next = next.filter((item) => item.title.toLowerCase().includes(lower) || item.description.toLowerCase().includes(lower) || item.location.toLowerCase().includes(lower));
    }
    if (category) next = next.filter((item) => item.category === category);
    if (status) next = next.filter((item) => item.status === status);

    if (sortKey === 'newest') {
      next.sort((a, b) => new Date(b.dateReported) - new Date(a.dateReported));
    } else if (sortKey === 'oldest') {
      next.sort((a, b) => new Date(a.dateReported) - new Date(b.dateReported));
    } else if (sortKey === 'popular') {
      next.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
    }
    setFiltered(next);
  }, [reports, query, category, status, sortKey]);

  return (
    <section className="section">
      <div className="container">
        <div className="page-header">
          <div>
            <p className="hero-eyebrow">Community issues</p>
            <h1 className="page-title">See what your neighborhood is reporting.</h1>
            <p className="page-subtitle">Filter by category, status, or urgency to find the reports that need attention most.</p>
          </div>
          <div className="status-pill">
            <span>{filtered.length} reports visible</span>
          </div>
        </div>

        <div className="card" style={{ padding: '24px 22px 22px' }}>
          <div className="filters issue-filters">
            <div className="filter-control filter-search">
              <label className="label" htmlFor="search">Search</label>
              <div className="search-field">
                <input id="search" className="field" placeholder="Search reports" value={query} onChange={(event) => setQuery(event.target.value)} />
              </div>
            </div>
            <div className="filter-control">
              <label className="label" htmlFor="category">Category</label>
              <select id="category" className="field" value={category} onChange={(event) => setCategory(event.target.value)}>
                {categories.map((item) => (
                  <option key={item} value={item}>{item || 'All categories'}</option>
                ))}
              </select>
            </div>
            <div className="filter-control">
              <label className="label" htmlFor="status">Status</label>
              <select id="status" className="field" value={status} onChange={(event) => setStatus(event.target.value)}>
                {statuses.map((item) => (
                  <option key={item} value={item}>{item || 'All statuses'}</option>
                ))}
              </select>
            </div>
            <div className="filter-control">
              <label className="label" htmlFor="sort">Sort by</label>
              <select id="sort" className="field" value={sortKey} onChange={(event) => setSortKey(event.target.value)}>
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading && <LoadingSpinner />}
        {error && <EmptyState title="Unable to load community issues" description={error} actionText="Try again later" actionLink="/" />}
        {!loading && !error && filtered.length === 0 && <EmptyState title="No issues found" description="No reports match your current search or filters. Try broadening your selection." actionText="Report a problem" actionLink="/report" />}

        <motion.div className="grid issue-grid" style={{ marginTop: '24px' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
        >
          {filtered.map((issue) => (
            <motion.div
              key={issue.id}
              variants={{
                hidden: { opacity: 0, y: 34 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <IssueCard issue={issue} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default CommunityIssuesPage;
