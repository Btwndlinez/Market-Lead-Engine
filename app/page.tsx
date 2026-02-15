'use client'

import { useState } from 'react'
import Image from 'next/image'
import { qualifyLead, getMonthlySummary, createCheckout, processLead, checkSLA, checkRevenueLeakage, invokeEngine } from '@/lib/engine'

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
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <header className="flex justify-between items-center border-b-4 border-black pb-4 mb-12">
        <div className="flex items-center gap-3">
          <Image src={`${basePath}/logo.png`} alt="Logo" width={40} height={40} className="invert" />
          <h1 className="text-2xl font-black uppercase">Market Lead Engine</h1>
        </div>
        <div className="text-[10px] font-mono opacity-50">DEPLOYMENT: GITHUB_PAGES</div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <button onClick={() => handleAction(() => qualifyLead('test'), 'qualifyLead')} disabled={loading} className="engine-card text-left">
          <h2 className="text-xs font-mono mb-2 opacity-50">MODULE_01</h2>
          <p className="text-xl font-bold uppercase">Qualify AI</p>
        </button>

        <button onClick={() => handleAction(() => getMonthlySummary(), 'getMonthlySummary')} disabled={loading} className="engine-card text-left">
          <h2 className="text-xs font-mono mb-2 opacity-50">MODULE_02</h2>
          <p className="text-xl font-bold uppercase">Monthly Summary</p>
        </button>

        <button onClick={() => handleAction(() => createCheckout([{id: 'test', name: 'Test'}]), 'createCheckout')} disabled={loading} className="engine-card text-left">
          <h2 className="text-xs font-mono mb-2 opacity-50">MODULE_03</h2>
          <p className="text-xl font-bold uppercase">Create Checkout</p>
        </button>

        <button onClick={() => handleAction(() => processLead("Manual", {}), 'processLead')} disabled={loading} className="engine-card text-left">
          <h2 className="text-xs font-mono mb-2 opacity-50">ANALYSIS</h2>
          <p className="text-xl font-bold uppercase">Process Lead</p>
        </button>

        <button onClick={() => handleAction(() => checkSLA(), 'checkSLA')} disabled={loading} className="engine-card text-left">
          <h2 className="text-xs font-mono mb-2 opacity-50">OPERATIONS</h2>
          <p className="text-xl font-bold uppercase">SLA Status</p>
        </button>

        <button onClick={() => handleAction(() => checkRevenueLeakage(), 'checkRevenueLeakage')} disabled={loading} className="engine-card text-left">
          <h2 className="text-xs font-mono mb-2 opacity-50">FINANCE</h2>
          <p className="text-xl font-bold uppercase">Revenue Leak</p>
        </button>

        {['nba-executor', 'suggest-reply', 'analyze-conversation', 'generate-weekly-report'].map((fn) => (
          <button key={fn} onClick={() => handleGeneric(fn)} disabled={loading} className="engine-card text-left">
            <h2 className="text-xs font-mono opacity-50">{fn}</h2>
          </button>
        ))}
      </div>

      {result && (
        <div className={`mt-8 border-2 ${result.error ? 'border-red-500' : 'border-black'} p-6`}>
          <pre className="text-xs overflow-auto">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
