import { Link } from 'react-router-dom';

function IssueCard({ issue }) {
  const statusClass = issue.status === 'Resolved' ? 'badge--resolved' : issue.status === 'In Progress' ? 'badge--in-progress' : 'badge--reported';
  return (
    <Link to={`/issues/${issue.id}`} className="issue-card">
      <div className="issue-card__media">
        {issue.image ? <img src={issue.image} alt={issue.title} /> : <div style={{ padding: '20px', color: '#5f6c8b' }}>No image available</div>}
      </div>
      <div className="issue-card__body">
        <div className="issue-card__row">
          <span className={`badge ${statusClass}`}>{issue.status}</span>
          <span style={{ color: '#5f6c8b', fontSize: '0.9rem' }}>{issue.upvotes || 0} upvotes</span>
        </div>
        <h3 className="issue-card__heading">{issue.title}</h3>
        <p className="issue-card__description">{issue.description.slice(0, 110)}{issue.description.length > 110 ? '…' : ''}</p>
        <div className="issue-card__meta">
          <span className="issue-card__location">{issue.location}</span>
          <span className="issue-card__date">{new Date(issue.dateReported).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  );
}

export default IssueCard;
