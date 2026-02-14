'use client'

import { useState } from 'react'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export default function LeadEngine() {
  const [message, setMessage] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const processLead = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/process-lead`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: message,
            metadata: { source: 'web_app' }
          })
        }
      )
      
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: 'Failed to process lead' })
    }
    setLoading(false)
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Market Lead Engine</h1>
      <p style={{ color: '#666', fontSize: '1.1rem' }}>AI-powered lead processing and qualification</p>
      
      <div style={{ marginTop: '2rem' }}>
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
            fontSize: '1rem'
          }}
        />
        
        <button
          onClick={processLead}
          disabled={loading || !message}
          style={{
            marginTop: '1rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: loading ? '#ccc' : '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            fontWeight: '600'
          }}
        >
          {loading ? 'Processing...' : '⚡ Process Lead'}
        </button>
      </div>

      {result && (
        <div style={{ 
          marginTop: '2rem', 
          padding: '1.5rem',
          backgroundColor: result.error ? '#fee' : '#f0f9ff',
          borderRadius: '8px',
          border: `1px solid ${result.error ? '#fcc' : '#bae6fd'}`
        }}>
          <h2 style={{ marginTop: 0 }}>{result.error ? 'Error' : 'AI Analysis Result'}</h2>
          <pre style={{ 
            backgroundColor: '#fff', 
            padding: '1rem',
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '0.9rem'
          }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '2px solid #eee' }}>
        <h3>System Status</h3>
        <ul style={{ lineHeight: '1.8' }}>
          <li>✅ AI-powered lead scoring (Gemini 2.0 Flash)</li>
          <li>✅ Automatic categorization</li>
          <li>✅ SLA monitoring</li>
          <li>✅ Revenue leakage alerts</li>
          <li>✅ 10 Edge Functions deployed</li>
        </ul>
        
        <h3 style={{ marginTop: '1.5rem' }}>Deployed Functions</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          <div style={{ padding: '0.5rem', background: '#f5f5f5', borderRadius: '4px' }}>process-lead</div>
          <div style={{ padding: '0.5rem', background: '#f5f5f5', borderRadius: '4px' }}>sla-clock</div>
          <div style={{ padding: '0.5rem', background: '#f5f5f5', borderRadius: '4px' }}>alert-revenue-leakage</div>
          <div style={{ padding: '0.5rem', background: '#f5f5f5', borderRadius: '4px' }}>nba-executor</div>
          <div style={{ padding: '0.5rem', background: '#f5f5f5', borderRadius: '4px' }}>suggest-reply</div>
          <div style={{ padding: '0.5rem', background: '#f5f5f5', borderRadius: '4px' }}>analyze-conversation</div>
        </div>
      </div>
    </main>
  )
}
