import React, { useEffect, useState } from 'react'
import ReportForm from './components/ReportForm'
import Dashboard from './components/Dashboard'

export default function App() {
  const [problems, setProblems] = useState([])

  const fetchProblems = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/problems')
      const data = await res.json()
      setProblems(data)
    } catch (err) {
      console.error('Failed to fetch problems', err)
    }
  }

  useEffect(() => {
    fetchProblems()
  }, [])

  const handleNewReport = (problem) => {
    // Prepend so the newest appears first
    setProblems(prev => [problem, ...prev])
  }

  return (
    <div className="container">
      <h1>Smart Community Problem Solver</h1>
      <div className="columns">
        <div className="left">
          <ReportForm onReportCreated={handleNewReport} />
        </div>
        <div className="right">
          <Dashboard problems={problems} />
        </div>
      </div>
    </div>
  )
}
