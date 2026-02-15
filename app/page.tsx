'use client'

import { useState } from 'react'
import Image from 'next/image'
import { processLead, checkSLA, checkRevenueLeakage, qualifyLead, getMonthlySummary, createCheckout, invokeEngine } from '@/lib/engine'

export default function Home() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const basePath = '/Market-Lead-Engine'

  const handleAction = async (fn: () => Promise<any>, name: string) => {
    setLoading(true)
    try {
      const data = await fn()
      setResult(data)
    } catch (error: any) {
      setResult({ error: error.message || `Failed: ${name}` })
    }
    setLoading(false)
  }

  const handleGeneric = async (fnName: string) => {
    setLoading(true)
    try {
      const data = await invokeEngine(fnName, { test: true })
      setResult(data)
    } catch (error: any) {
      setResult({ error: error.message || `Failed: ${fnName}` })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-white text-black selection:bg-blue-500 selection:text-white font-mono">
      {/* Header */}
      <header className="border-b-4 border-black p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image 
              src={`${basePath}/logo.png`} 
              alt="Engine Logo" 
              width={32} 
              height={32} 
              className="invert" 
            />
            <h1 className="text-2xl font-black uppercase tracking-tighter">Market Lead Engine v1.0</h1>
          </div>
          <div className="text-[10px] uppercase opacity-40">
            Terminal Status: Online // Port: 443
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* ACTION 1: QUALIFY */}
        <button 
          onClick={() => handleAction(() => qualifyLead('test-id'), 'qualifyLead')}
          disabled={loading}
          className="border-2 border-black p-8 text-left transition-all hover:bg-black hover:text-white group disabled:opacity-50"
        >
          <span className="text-xs block mb-2 opacity-50 group-hover:opacity-100">ACTION_01</span>
          <h2 className="text-xl font-bold uppercase">Qualify AI</h2>
          <p className="mt-2 text-sm opacity-60 group-hover:opacity-100">Analyze and qualify leads automatically.</p>
        </button>

        {/* ACTION 2: MONTHLY SUMMARY */}
        <button 
          onClick={() => handleAction(() => getMonthlySummary(), 'getMonthlySummary')}
          disabled={loading}
          className="border-2 border-black p-8 text-left transition-all hover:bg-black hover:text-white group disabled:opacity-50"
        >
          <span className="text-xs block mb-2 opacity-50 group-hover:opacity-100">ACTION_02</span>
          <h2 className="text-xl font-bold uppercase">Monthly Summary</h2>
          <p className="mt-2 text-sm opacity-60 group-hover:opacity-100">Generate comprehensive monthly reports.</p>
        </button>

        {/* ACTION 3: CHECKOUT */}
        <button 
          onClick={() => handleAction(() => createCheckout([{id: 'prod_123', name: 'Test Product'}]), 'createCheckout')}
          disabled={loading}
          className="border-2 border-black p-8 text-left transition-all hover:bg-black hover:text-white group disabled:opacity-50"
        >
          <span className="text-xs block mb-2 opacity-50 group-hover:opacity-100">ACTION_03</span>
          <h2 className="text-xl font-bold uppercase">Create Checkout</h2>
          <p className="mt-2 text-sm opacity-60 group-hover:opacity-100">Initialize payment flow for leads.</p>
        </button>

        {/* PROCESS LEAD */}
        <button 
          onClick={() => handleAction(() => processLead("Manual Trigger", { source: 'dashboard' }), 'processLead')}
          disabled={loading}
          className="border-2 border-black p-8 text-left transition-all hover:bg-blue-600 hover:text-white group disabled:opacity-50"
        >
          <span className="text-xs block mb-2 opacity-50 group-hover:opacity-100">ANALYSIS</span>
          <h2 className="text-xl font-bold uppercase">Process Lead</h2>
        </button>

        {/* SLA STATUS */}
        <button 
          onClick={() => handleAction(() => checkSLA(), 'checkSLA')}
          disabled={loading}
          className="border-2 border-black p-8 text-left transition-all hover:bg-black hover:text-white group disabled:opacity-50"
        >
          <span className="text-xs block mb-2 opacity-50 group-hover:opacity-100">OPERATIONS</span>
          <h2 className="text-xl font-bold uppercase">SLA Status</h2>
        </button>

        {/* REVENUE LEAK */}
        <button 
          onClick={() => handleAction(() => checkRevenueLeakage(), 'checkRevenueLeakage')}
          disabled={loading}
          className="border-2 border-black p-8 text-left transition-all hover:bg-red-600 hover:text-white group disabled:opacity-50"
        >
          <span className="text-xs block mb-2 opacity-50 group-hover:opacity-100">FINANCE</span>
          <h2 className="text-xl font-bold uppercase">Revenue Leak</h2>
        </button>

        {/* Additional Functions */}
        {['nba-executor', 'suggest-reply', 'analyze-conversation', 'generate-weekly-report'].map((fn) => (
          <button
            key={fn}
            onClick={() => handleGeneric(fn)}
            disabled={loading}
            className="border-2 border-black p-6 text-left transition-all hover:bg-gray-100 group disabled:opacity-50"
          >
            <span className="text-xs uppercase opacity-50">{fn}</span>
          </button>
        ))}

      </main>

      {/* Result Display */}
      {result && (
        <div className="p-6">
          <div className={`border-2 ${result.error ? 'border-red-500 bg-red-50' : 'border-black bg-gray-50'} p-6`}>
            <h3 className="text-sm font-bold uppercase mb-2">{result.error ? 'ERROR' : 'SUCCESS'}</h3>
            <pre className="text-xs overflow-auto max-h-64">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t-4 border-black p-6 mt-12">
        <div className="text-[10px] uppercase opacity-40 flex justify-between">
          <span>10 Edge Functions Active</span>
          <span>Gemini 2.0 Flash</span>
          <span>hbciotxcovzhfmsufuiw</span>
        </div>
      </footer>
    </div>
  )
}
