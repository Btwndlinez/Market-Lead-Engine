'use client'

import { useState } from 'react'
import { invokeEngine, processLead, checkSLA, getWeeklyReport, checkRevenueLeakage } from '@/lib/engine'

export default function Dashboard() {
  const [message, setMessage] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [activeFunction, setActiveFunction] = useState('')

  const handleProcessLead = async () => {
    if (!message) return
    setLoading(true)
    setActiveFunction('process-lead')
    try {
      const data = await processLead(message, { source: 'web_app' })
      setResult(data)
    } catch (error) {
      setResult({ error: 'Failed to process lead' })
    }
    setLoading(false)
    setActiveFunction('')
  }

  const handleCheckSLA = async () => {
    setLoading(true)
    setActiveFunction('sla-clock')
    try {
      const data = await checkSLA()
      setResult(data)
    } catch (error) {
      setResult({ error: 'Failed to check SLA' })
    }
    setLoading(false)
    setActiveFunction('')
  }

  const handleWeeklyReport = async () => {
    setLoading(true)
    setActiveFunction('generate-weekly-report')
    try {
      const data = await getWeeklyReport()
      setResult(data)
    } catch (error) {
      setResult({ error: 'Failed to generate report' })
    }
    setLoading(false)
    setActiveFunction('')
  }

  const handleRevenueLeakage = async () => {
    setLoading(true)
    setActiveFunction('alert-revenue-leakage')
    try {
      const data = await checkRevenueLeakage()
      setResult(data)
    } catch (error) {
      setResult({ error: 'Failed to check revenue leakage' })
    }
    setLoading(false)
    setActiveFunction('')
  }

  const handleGenericInvoke = async (fnName: string) => {
    setLoading(true)
    setActiveFunction(fnName)
    try {
      const data = await invokeEngine(fnName, { test: true })
      setResult(data)
    } catch (error) {
      setResult({ error: `Failed to invoke ${fnName}` })
    }
    setLoading(false)
    setActiveFunction('')
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Market Lead Engine</h1>
      <p style={{ color: '#666', fontSize: '1.1rem' }}>AI-powered lead processing and qualification system</p>
      
      {/* Lead Processing Section */}
      <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f8fafc', borderRadius: '12px' }}>
        <h2 style={{ marginTop: 0, color: '#1e293b' }}>Process New Lead</h2>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter lead message (e.g., 'Hey my roof is caving in after the storm!')"
          style={{ 
            width: '100%', 
            height: '100px', 
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '1rem',
            marginBottom: '1rem'
          }}
        />
        
        <button
          onClick={handleProcessLead}
          disabled={loading || !message}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: loading && activeFunction === 'process-lead' ? '#ccc' : '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            fontWeight: '600'
          }}
        >
          {loading && activeFunction === 'process-lead' ? 'Processing...' : '⚡ Process Lead'}
        </button>
      </div>

      {/* Quick Actions */}
      <div style={{ marginTop: '2rem' }}>
        <h3>Quick Actions</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <button
            onClick={handleCheckSLA}
            disabled={loading}
            style={{
              padding: '1rem',
              backgroundColor: loading && activeFunction === 'sla-clock' ? '#ccc' : '#f59e0b',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: '600'
            }}
          >
            {loading && activeFunction === 'sla-clock' ? 'Checking...' : '⏰ Check SLA Status'}
          </button>

          <button
            onClick={handleWeeklyReport}
            disabled={loading}
            style={{
              padding: '1rem',
              backgroundColor: loading && activeFunction === 'generate-weekly-report' ? '#ccc' : '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: '600'
            }}
          >
            {loading && activeFunction === 'generate-weekly-report' ? 'Generating...' : '📊 Weekly Report'}
          </button>

          <button
            onClick={handleRevenueLeakage}
            disabled={loading}
            style={{
              padding: '1rem',
              backgroundColor: loading && activeFunction === 'alert-revenue-leakage' ? '#ccc' : '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: '600'
            }}
          >
            {loading && activeFunction === 'alert-revenue-leakage' ? 'Checking...' : '💰 Revenue Leakage'}
          </button>
        </div>
      </div>

      {/* Results Display */}
      {result && (
        <div style={{ 
          marginTop: '2rem', 
          padding: '1.5rem',
          backgroundColor: result.error ? '#fee' : '#f0f9ff',
          borderRadius: '12px',
          border: `2px solid ${result.error ? '#fcc' : '#bae6fd'}`
        }}>
          <h2 style={{ marginTop: 0 }}>
            {result.error ? '❌ Error' : '✅ Result'}
            {activeFunction && <span style={{ fontSize: '0.8em', color: '#666', marginLeft: '1rem' }}>({activeFunction})</span>}
          </h2>
          <pre style={{ 
            backgroundColor: '#fff', 
            padding: '1rem',
            borderRadius: '8px',
            overflow: 'auto',
            fontSize: '0.9rem',
            border: '1px solid #e5e7eb'
          }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      {/* System Status */}
      <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '2px solid #eee' }}>
        <h3>System Status</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
            <strong>✅ AI Engine</strong>
            <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem', color: '#166534' }}>Gemini 2.0 Flash active</p>
          </div>
          <div style={{ padding: '1rem', backgroundColor: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd' }}>
            <strong>✅ Edge Functions</strong>
            <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem', color: '#0369a1' }}>10 functions deployed</p>
          </div>
          <div style={{ padding: '1rem', backgroundColor: '#fef3c7', borderRadius: '8px', border: '1px solid #fde68a' }}>
            <strong>✅ SLA Monitoring</strong>
            <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem', color: '#92400e' }}>Real-time tracking</p>
          </div>
        </div>
        
        <h3 style={{ marginTop: '2rem' }}>All Deployed Functions</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.5rem' }}>
          {['process-lead', 'sla-clock', 'alert-revenue-leakage', 'nba-executor', 'suggest-reply', 
            'analyze-conversation', 'generate-weekly-report', 'generate-monthly-summary', 
            'qualify-ai', 'create-checkout'].map(fn => (
            <button
              key={fn}
              onClick={() => handleGenericInvoke(fn)}
              disabled={loading}
              style={{
                padding: '0.5rem',
                backgroundColor: '#f3f4f6',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '0.85rem',
                textAlign: 'left'
              }}
            >
              {fn}
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}
