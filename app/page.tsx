'use client'

import { useState } from 'react'
import Image from 'next/image'
import { processLead, checkSLA, checkRevenueLeakage, invokeEngine } from '@/lib/engine'

export default function Home() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const basePath = '/Market-Lead-Engine'

  const handleProcessLead = async () => {
    setLoading(true)
    try {
      const data = await processLead("Manual Trigger", {})
      setResult(data)
    } catch (error: any) {
      setResult({ error: error.message || 'Failed to process lead' })
    }
    setLoading(false)
  }

  const handleCheckSLA = async () => {
    setLoading(true)
    try {
      const data = await checkSLA()
      setResult(data)
    } catch (error: any) {
      setResult({ error: error.message || 'Failed to check SLA' })
    }
    setLoading(false)
  }

  const handleRevenueLeakage = async () => {
    setLoading(true)
    try {
      const data = await checkRevenueLeakage()
      setResult(data)
    } catch (error: any) {
      setResult({ error: error.message || 'Failed to check leakage' })
    }
    setLoading(false)
  }

  const handleGenericInvoke = async (fnName: string) => {
    setLoading(true)
    try {
      const data = await invokeEngine(fnName, { test: true })
      setResult(data)
    } catch (error: any) {
      setResult({ error: error.message || `Failed to invoke ${fnName}` })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-white text-black selection:bg-blue-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-black p-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image 
            src={`${basePath}/logo.png`} 
            alt="Engine Logo" 
            width={32} 
            height={32} 
            className="invert" 
          />
          <h1 className="text-xl font-black uppercase tracking-tighter">Market Lead Engine</h1>
        </div>
        <div className="hidden md:block text-[10px] font-mono uppercase opacity-40">
          Terminal Status: Online // Port: 443
        </div>
      </header>

      {/* Main Grid */}
      <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Module 1 */}
        <button 
          onClick={handleProcessLead}
          disabled={loading}
          className="group border border-black p-8 text-left transition-all duration-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 active:scale-95 disabled:opacity-50"
        >
          <span className="block text-[10px] font-mono mb-4 opacity-50 group-hover:opacity-100">01_ANALYSIS</span>
          <h2 className="text-2xl font-bold leading-none">Process Lead</h2>
          <p className="mt-4 text-sm opacity-60 group-hover:opacity-100">Invoke Gemini 2.0 to analyze current lead stack.</p>
        </button>

        {/* Module 2 */}
        <button 
          onClick={handleCheckSLA}
          disabled={loading}
          className="group border border-black p-8 text-left transition-all duration-300 hover:bg-black hover:text-white active:scale-95 disabled:opacity-50"
        >
          <span className="block text-[10px] font-mono mb-4 opacity-50 group-hover:opacity-100">02_OPERATIONS</span>
          <h2 className="text-2xl font-bold leading-none">SLA Status</h2>
          <p className="mt-4 text-sm opacity-60 group-hover:opacity-100">Check response times and identify breaches.</p>
        </button>

        {/* Module 3 */}
        <button 
          onClick={handleRevenueLeakage}
          disabled={loading}
          className="group border border-black p-8 text-left transition-all duration-300 hover:bg-red-600 hover:text-white hover:border-red-600 active:scale-95 disabled:opacity-50"
        >
          <span className="block text-[10px] font-mono mb-4 opacity-50 group-hover:opacity-100">03_FINANCE</span>
          <h2 className="text-2xl font-bold leading-none">Revenue Leak</h2>
          <p className="mt-4 text-sm opacity-60 group-hover:opacity-100">Find high-value leads currently unassigned.</p>
        </button>

        {/* Additional Functions */}
        {['nba-executor', 'suggest-reply', 'analyze-conversation', 'generate-weekly-report', 'generate-monthly-summary', 'qualify-ai', 'create-checkout'].map((fn) => (
          <button
            key={fn}
            onClick={() => handleGenericInvoke(fn)}
            disabled={loading}
            className="group border border-black p-6 text-left transition-all duration-300 hover:bg-gray-100 active:scale-95 disabled:opacity-50"
          >
            <span className="block text-[10px] font-mono opacity-50">{fn}</span>
          </button>
        ))}

      </main>

      {/* Result Display */}
      {result && (
        <div className="p-6 mt-4">
          <div className={`border ${result.error ? 'border-red-500 bg-red-50' : 'border-black bg-gray-50'} p-6`}>
            <h3 className="text-sm font-mono uppercase mb-2">{result.error ? 'Error' : 'Result'}</h3>
            <pre className="text-xs overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-black p-6 mt-12">
        <div className="text-[10px] font-mono uppercase opacity-40 flex justify-between">
          <span>10 Edge Functions</span>
          <span>Gemini 2.0 Flash</span>
          <span>hbciotxcovzhfmsufuiw</span>
        </div>
      </footer>
    </div>
  )
}
