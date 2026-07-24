import React from 'react'

export default function Dashboard({ problems }) {
  return (
    <div className="dashboard">
      <h2>Reported Problems</h2>
      {problems.length === 0 && <div>No reports yet</div>}
      <ul>
        {problems.map(p => (
          <li key={p._id} className="problem-card">
            <div className="meta">
              <strong>{p.title}</strong>
              <span className="status">{p.status}</span>
            </div>
            <div className="desc">{p.description}</div>
            <div className="location">{p.location}</div>
            <div className="footer">Upvotes: {p.upvotes} • {new Date(p.createdAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
