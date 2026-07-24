import React, { useState } from 'react'

export default function ReportForm({ onReportCreated }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!title || !description) {
      setError('Please provide title and description')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('http://localhost:5000/api/problems', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, location })
      })
      if (!res.ok) throw new Error('Failed to submit')
      const data = await res.json()
      setTitle('')
      setDescription('')
      setLocation('')
      onReportCreated(data)
    } catch (err) {
      console.error(err)
      setError('Failed to submit report')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="report-form" onSubmit={handleSubmit}>
      <h2>Report a Problem (MVP)</h2>
      {error && <div className="error">{error}</div>}
      <label>Title</label>
      <input value={title} onChange={e => setTitle(e.target.value)} />

      <label>Description</label>
      <textarea value={description} onChange={e => setDescription(e.target.value)} />

      <label>Location (optional)</label>
      <input value={location} onChange={e => setLocation(e.target.value)} />

      <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
    </form>
  )
}
