'use client'

import { useState } from 'react'
import { processLead, checkSLA, getWeeklyReport, checkRevenueLeakage, invokeEngine } from '@/lib/engine'

export default function Dashboard() {
  const [message, setMessage] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [activeFunction, setActiveFunction] = useState('')
  
  const basePath = '/market-lead-engine'

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
    <div className="min-h-screen bg-white text-black p-8">
      {/* HEADER: Strictly B&W */}
      <header className="flex justify-between items-center border-b border-black pb-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-black" />
          <h1 className="text-xl font-bold tracking-tighter uppercase">Market Lead Engine</h1>
        </div>
        <div className="text-xs font-mono uppercase opacity-50">System Active // v1.0</div>
      </header>

      {/* DASHBOARD GRID */}
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Lead Input Section */}
        <div className="col-span-full lg:col-span-2">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter lead message (e.g., 'Hey my roof is caving in after the storm!')"
            className="w-full h-32 p-4 border border-black rounded-none text-lg"
          />
        </div>

        {/* Process Lead Button */}
        <button 
          onClick={handleProcessLead}
          disabled={loading || !message}
          className="engine-button col-span-full"
        >
          <span className="block text-xs mb-2 opacity-50">01 / Analysis</span>
          <span className="text-lg font-bold">
            {loading && activeFunction === 'process-lead' ? 'Processing...' : 'Process New Lead'}
          </span>
        </button>

        {/* SLA Status */}
        <button 
          onClick={handleCheckSLA}
          disabled={loading}
          className="engine-button"
        >
          <span className="block text-xs mb-2 opacity-50">02 / Operations</span>
          <span className="text-lg font-bold">
            {loading && activeFunction === 'sla-clock' ? 'Checking...' : 'Check SLA Status'}
          </span>
        </button>

        {/* Weekly Report */}
        <button 
          onClick={handleWeeklyReport}
          disabled={loading}
          className="engine-button"
        >
          <span className="block text-xs mb-2 opacity-50">03 / Reports</span>
          <span className="text-lg font-bold">
            {loading && activeFunction === 'generate-weekly-report' ? 'Generating...' : 'Weekly Report'}
          </span>
        </button>

        {/* Revenue Leakage */}
        <button 
          onClick={handleRevenueLeakage}
          disabled={loading}
          className="engine-button"
        >
          <span className="block text-xs mb-2 opacity-50">04 / Revenue</span>
          <span className="text-lg font-bold">
            {loading && activeFunction === 'alert-revenue-leakage' ? 'Analyzing...' : 'Revenue Leakage'}
          </span>
        </button>

        {/* Additional Functions */}
        {['process-lead', 'sla-clock', 'alert-revenue-leakage', 'nba-executor', 'suggest-reply', 
          'analyze-conversation', 'generate-monthly-summary', 'qualify-ai', 'create-checkout'].map((fn) => (
          <button
            key={fn}
            onClick={() => handleGenericInvoke(fn)}
            disabled={loading}
            className="engine-button text-left"
          >
            <span className="block text-xs opacity-50">{fn}</span>
          </button>
        ))}

        {/* Results Display */}
        {result && (
          <div className={`col-span-full p-6 border ${result.error ? 'border-red-500 bg-red-50' : 'border-black bg-gray-50'}`}>
            <h2 className="text-lg font-bold mb-4">
              {result.error ? 'Error' : 'Result'}
              {activeFunction && <span className="text-xs font-normal opacity-50 ml-2">({activeFunction})</span>}
            </h2>
            <pre className="text-sm overflow-auto bg-white p-4 border border-gray-200">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 pt-6 border-t border-black text-xs font-mono uppercase opacity-50">
        <div className="flex justify-between">
          <span>10 Edge Functions Active</span>
          <span>Gemini 2.0 Flash</span>
          <span>hbciotxcovzhfmsufuiw</span>
        </div>
      </footer>
    </div>
  )
}
