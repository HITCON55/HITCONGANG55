import { Link } from 'react-router-dom';

function EmptyState({ title, description, actionText, actionLink }) {
  return (
    <div className="empty-state">
      <h2 className="empty-state__title">{title}</h2>
      <p className="empty-state__copy">{description}</p>
      {actionText && actionLink && (
        <div className="empty-state__actions">
          <Link to={actionLink} className="button button--secondary">
            {actionText}
          </Link>
        </div>
      )}
    </div>
  );
}

export default EmptyState;
