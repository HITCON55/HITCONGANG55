import React, { useState } from 'react'

export default function ReportForm({ onReportCreated, disabled }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)

    if (!title || !description) {
      setError('Please provide title and description')
      return
    }

    const newProblem = {
      id: Date.now(),
      title,
      description,
      location,
      status: 'open',
      createdAt: new Date().toISOString()
    }

    onReportCreated(newProblem)

    setTitle('')
    setDescription('')
    setLocation('')
  }

  return (
    <form className="report-form" onSubmit={handleSubmit}>
      <h2>Report a Problem (MVP)</h2>
      {error && <div className="error">{error}</div>}
      {disabled && (
        <div className="error">Connect a JSON file above before submitting reports.</div>
      )}

      <label>Title</label>
      <input value={title} onChange={e => setTitle(e.target.value)} />

      <label>Description</label>
      <textarea value={description} onChange={e => setDescription(e.target.value)} />

      <label>Location (optional)</label>
      <input value={location} onChange={e => setLocation(e.target.value)} />

      <button type="submit" disabled={disabled}>Submit</button>
    </form>
  )
}
