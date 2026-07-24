import React, { useState, useRef } from 'react'
import ReportForm from './components/ReportForm'
import Dashboard from './components/Dashboard'
import './app.css'

export default function App() {
  const [problems, setProblems] = useState([])
  const [fileConnected, setFileConnected] = useState(false)
  const [fileError, setFileError] = useState(null)
  const fileHandleRef = useRef(null)

  const supported = typeof window !== 'undefined' && 'showSaveFilePicker' in window

  const connectFile = async () => {
    setFileError(null)
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: 'problems.json',
        types: [
          {
            description: 'JSON file',
            accept: { 'application/json': ['.json'] }
          }
        ]
      })

      fileHandleRef.current = handle

      // Try to read existing content (if the file already had data in it)
      let existing = []
      try {
        const file = await handle.getFile()
        const text = await file.text()
        if (text.trim()) {
          existing = JSON.parse(text)
        }
      } catch {
        existing = []
      }

      setProblems(existing)
      setFileConnected(true)

      // Make sure the file has valid JSON in it even if it was empty/new
      await writeToFile(existing, handle)
    } catch (err) {
      // User cancelled the picker, or permission was denied
      if (err.name !== 'AbortError') {
        console.error('Failed to connect file', err)
        setFileError('Could not connect to the file.')
      }
    }
  }

  const writeToFile = async (data, handle = fileHandleRef.current) => {
    if (!handle) return
    try {
      const writable = await handle.createWritable()
      await writable.write(JSON.stringify(data, null, 2))
      await writable.close()
    } catch (err) {
      console.error('Failed to write to file', err)
      setFileError('Could not save to the file.')
    }
  }

  const handleNewReport = (problem) => {
    setProblems(prev => {
      const next = [problem, ...prev]
      writeToFile(next)
      return next
    })
  }

  return (
    <div className="container">
      <div className="mains">
        <h1>Smart Community Problem Solver</h1>

        {!supported && (
          <p className="file-warning">
            Your browser doesn't support saving files this way. Please use Chrome or Edge.
          </p>
        )}

        {supported && !fileConnected && (
          <button className="connect-btn" onClick={connectFile}>
            Connect JSON File
          </button>
        )}

        {supported && fileConnected && (
          <p className="file-status">✓ Connected — saving reports to your local file</p>
        )}

        {fileError && <p className="file-warning">{fileError}</p>}

        <div className="columns">
          <div className="left">
            <ReportForm onReportCreated={handleNewReport} disabled={!fileConnected} />
          </div>
          <div className="right">
            <Dashboard problems={problems} />
          </div>
        </div>
      </div>
    </div>
  )
}
