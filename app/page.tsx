'use client'

import { useState } from 'react'
import Image from 'next/image'
import * as Engine from '@/lib/engine'

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

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto bg-white text-black">
      <header className="flex justify-between items-center border-b-4 border-black pb-6 mb-12">
        <div className="flex items-center gap-4">
          <Image src={`${basePath}/logo.png`} alt="Logo" width={45} height={45} className="invert" />
          <h1 className="text-3xl font-black uppercase tracking-tighter italic">Market Lead Engine</h1>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Action 1: Process Lead */}
        <button 
          onClick={() => handleAction(() => Engine.processLead("New Lead", {source: 'dashboard'}), 'processLead')}
          disabled={loading}
          className="action-card text-left"
        >
          <p className="text-[10px] font-mono mb-4 opacity-50">ANALYSIS_v2.0</p>
          <h2 className="text-2xl font-bold uppercase">Process Lead</h2>
        </button>

        {/* Action 2: Qualify AI */}
        <button 
          onClick={() => handleAction(() => Engine.qualifyLead("ID_01"), 'qualifyLead')}
          disabled={loading}
          className="action-card text-left"
        >
          <p className="text-[10px] font-mono mb-4 opacity-50">AI_QUALIFY</p>
          <h2 className="text-2xl font-bold uppercase">Qualify AI</h2>
        </button>

        {/* Action 3: Create Checkout */}
        <button 
          onClick={() => handleAction(() => Engine.createCheckout([{id: 'PROD_01', name: 'Test'}]), 'createCheckout')}
          disabled={loading}
          className="action-card text-left"
        >
          <p className="text-[10px] font-mono mb-4 opacity-50">SALES_GATEWAY</p>
          <h2 className="text-2xl font-bold uppercase">Create Checkout</h2>
        </button>

        {/* SLA Status */}
        <button 
          onClick={() => handleAction(() => Engine.checkSLA(), 'checkSLA')}
          disabled={loading}
          className="action-card text-left"
        >
          <p className="text-[10px] font-mono mb-4 opacity-50">OPERATIONS</p>
          <h2 className="text-2xl font-bold uppercase">SLA Status</h2>
        </button>

        {/* Revenue Leakage */}
        <button 
          onClick={() => handleAction(() => Engine.checkRevenueLeakage(), 'checkRevenueLeakage')}
          disabled={loading}
          className="action-card text-left"
        >
          <p className="text-[10px] font-mono mb-4 opacity-50">FINANCE</p>
          <h2 className="text-2xl font-bold uppercase">Revenue Leak</h2>
        </button>

        {/* Monthly Summary */}
        <button 
          onClick={() => handleAction(() => Engine.getMonthlySummary(), 'getMonthlySummary')}
          disabled={loading}
          className="action-card text-left"
        >
          <p className="text-[10px] font-mono mb-4 opacity-50">REPORTS</p>
          <h2 className="text-2xl font-bold uppercase">Monthly Summary</h2>
        </button>

      </div>

      {/* Result Display */}
      {result && (
        <div className={`mt-8 border-2 ${result.error ? 'border-red-500' : 'border-black'} p-6`}>
          <pre className="text-xs overflow-auto">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
