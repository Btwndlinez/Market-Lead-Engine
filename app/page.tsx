'use client'

import { useState } from 'react'
import Image from 'next/image'
import { processLead, checkSLA, getWeeklyReport, checkRevenueLeakage, invokeEngine } from '@/lib/engine'

export default function Dashboard() {
  const [message, setMessage] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [activeFunction, setActiveFunction] = useState('')
  
  const basePath = '/Market-Lead-Engine'

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
    <div className="min-h-screen p-8 max-w-5xl mx-auto bg-white text-black">
      {/* Header */}
      <header className="flex items-center justify-between border-b-2 border-black pb-4 mb-12">
        <div className="flex items-center gap-3">
          <Image 
            src={`${basePath}/logo.png`} 
            alt="Logo" 
            width={40} 
            height={40}
            className="invert"
          />
          <h1 className="text-2xl font-bold tracking-tighter uppercase">Market Lead Engine</h1>
        </div>
      </header>

      {/* Lead Input */}
      <div className="mb-8">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter lead message (e.g., 'Hey my roof is caving in after the storm!')"
          className="w-full h-32 p-4 border border-black text-lg"
        />
      </div>

      {/* Interactive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button 
          onClick={handleProcessLead}
          disabled={loading || !message}
          className="engine-card text-left"
        >
          <h2 className="text-xs uppercase font-mono opacity-50 mb-1">01 Analysis</h2>
          <p className="text-xl font-bold">
            {loading && activeFunction === 'process-lead' ? 'Processing...' : 'Process New Lead'}
          </p>
        </button>
        
        <button 
          onClick={handleRevenueLeakage}
          disabled={loading}
          className="engine-card text-left"
        >
          <h2 className="text-xs uppercase font-mono opacity-50 mb-1">02 Revenue</h2>
          <p className="text-xl font-bold">
            {loading && activeFunction === 'alert-revenue-leakage' ? 'Analyzing...' : 'Check Leakage'}
          </p>
        </button>

        <button 
          onClick={handleCheckSLA}
          disabled={loading}
          className="engine-card text-left"
        >
          <h2 className="text-xs uppercase font-mono opacity-50 mb-1">03 Operations</h2>
          <p className="text-xl font-bold">
            {loading && activeFunction === 'sla-clock' ? 'Checking...' : 'SLA Status'}
          </p>
        </button>

        <button 
          onClick={handleWeeklyReport}
          disabled={loading}
          className="engine-card text-left"
        >
          <h2 className="text-xs uppercase font-mono opacity-50 mb-1">04 Reports</h2>
          <p className="text-xl font-bold">
            {loading && activeFunction === 'generate-weekly-report' ? 'Generating...' : 'Weekly Report'}
          </p>
        </button>

        {/* Additional Functions */}
        {['nba-executor', 'suggest-reply', 'analyze-conversation', 'generate-monthly-summary', 'qualify-ai', 'create-checkout'].map((fn) => (
          <button
            key={fn}
            onClick={() => handleGenericInvoke(fn)}
            disabled={loading}
            className="engine-card text-left"
          >
            <h2 className="text-xs uppercase font-mono opacity-50">{fn}</h2>
          </button>
        ))}
      </div>

      {/* Results */}
      {result && (
        <div className={`mt-8 p-6 border ${result.error ? 'border-red-500 bg-red-50' : 'border-black bg-gray-50'}`}>
          <h2 className="text-lg font-bold mb-4">
            {result.error ? 'Error' : 'Result'}
            {activeFunction && <span className="text-xs font-normal opacity-50 ml-2">({activeFunction})</span>}
          </h2>
          <pre className="text-sm overflow-auto bg-white p-4 border border-gray-200">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-16 pt-6 border-t-2 border-black text-xs font-mono uppercase opacity-50">
        <div className="flex justify-between">
          <span>10 Edge Functions Active</span>
          <span>Gemini 2.0 Flash</span>
        </div>
      </footer>
    </div>
  )
}
