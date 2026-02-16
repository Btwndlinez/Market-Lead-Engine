'use client'

import { useState, useEffect } from 'react'
import * as Engine from '@/lib/engine'

/* ── SVG Icon helpers ────────────────────────────────────────────── */
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
)

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

const BoltIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)

const TargetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
)

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
)

const AlertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)

const BarChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" />
  </svg>
)

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
)

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const LogoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)

/* ── Mock data for demo functions ────────────────────────────── */
const mockCreateCheckout = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        checkout_url: 'https://checkout.stripe.com/c/pay/cs_test_123',
        session_id: 'cs_test_' + Math.random().toString(36).substr(2, 9),
        amount: 299.00,
        currency: 'usd',
        status: 'pending',
        next_action: 'Share checkout link with customer'
      })
    }, 600)
  })
}

const mockMonthlySummary = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        period: 'February 2026',
        total_leads: 156,
        qualified_leads: 42,
        conversion_rate: 26.9,
        revenue_leakage_detected: 3,
        ai_score_avg: 78,
        top_performing_source: 'Organic Search',
        next_action: 'Follow up on 3 high-value leads at risk'
      })
    }, 800)
  })
}

/* ── Card data ───────────────────────────────────────────────── */
const cards = [
  {
    id: 'processLead',
    label: 'ANALYSIS',
    title: 'Process Lead',
    desc: 'AI-powered lead analysis with Gemini 2.0 Flash scoring and next-action recommendations.',
    icon: <BoltIcon />,
    action: () => Engine.processLead("New Lead", { source: 'dashboard' }),
  },
  {
    id: 'qualifyLead',
    label: 'QUALIFICATION',
    title: 'Qualify AI',
    desc: 'Intelligent lead qualification that scores and routes prospects automatically.',
    icon: <TargetIcon />,
    action: () => Engine.qualifyLead("ID_01"),
  },
  {
    id: 'createCheckout',
    label: 'SALES',
    title: 'Create Checkout',
    desc: 'Generate payment sessions and checkout flows for qualified leads.',
    icon: <CartIcon />,
    action: () => mockCreateCheckout(),
  },
  {
    id: 'checkSLA',
    label: 'OPERATIONS',
    title: 'SLA Status',
    desc: 'Real-time SLA breach monitoring across all active leads and providers.',
    icon: <ClockIcon />,
    action: () => Engine.checkSLA(),
  },
  {
    id: 'checkRevenueLeakage',
    label: 'FINANCE',
    title: 'Revenue Leak',
    desc: 'Detect high-value leads that may be at risk of revenue leakage.',
    icon: <AlertIcon />,
    action: () => Engine.checkRevenueLeakage(),
  },
  {
    id: 'getMonthlySummary',
    label: 'REPORTS',
    title: 'Monthly Summary',
    desc: 'Comprehensive monthly analytics and performance reports at a glance.',
    icon: <BarChartIcon />,
    action: () => mockMonthlySummary(),
  },
]

/* ── Main Page Component ──────────────────────────────────────── */
export default function Home() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [activeFn, setActiveFn] = useState<string>('')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  // Hydrate theme from DOM (set by the inline script in layout.tsx)
  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme')
    if (current === 'dark') setTheme('dark')
  }, [])

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('mle-theme', next)
  }

  const handleAction = async (fn: () => Promise<any>, name: string) => {
    setLoading(true)
    setActiveFn(name)
    try {
      const data = await fn()
      setResult(data)
    } catch (error: any) {
      setResult({ error: error.message || `Failed: ${name}` })
    }
    setLoading(false)
    setActiveFn('')
  }

  return (
    <div className="dot-grid-bg" style={{ minHeight: '100vh' }}>

      {/* ── Floating Nav ── */}
      <nav className="site-nav" id="main-nav">
        <div className="nav-logo">
          <div className="nav-logo-icon nav-logo-icon-red">
            <LogoIcon />
          </div>
          <span>MLE</span>
        </div>

        <div className="nav-links">
          <a href="#engine" className="nav-link">Engine</a>
          <a href="#functions" className="nav-link">Functions</a>
          <a href="https://github.com/Btwndlinez/Market-Lead-Engine" target="_blank" rel="noopener noreferrer" className="nav-link">GitHub</a>
        </div>

        <div className="nav-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            id="theme-toggle"
          >
            <div className="theme-toggle-knob">
              {theme === 'light' ? <SunIcon /> : <MoonIcon />}
            </div>
          </button>
          <a href="#engine" className="btn btn-primary" id="get-started-btn">
            Get Started
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero" id="hero">
        <div className="hero-badge">
          <div className="hero-badge-dot" />
          6 AI Functions Active
        </div>

        <h1>
          AI-Powered Lead Processing <span>Built for Speed</span>
        </h1>

        <p className="hero-sub">
          Process, qualify, and convert leads with six intelligent edge functions.
          Real-time SLA monitoring, revenue leak detection, and AI-driven insights — all in one engine.
        </p>

        <div className="hero-cta">
          <a href="#engine" className="btn btn-primary" id="hero-cta-primary">
            Launch Engine
          </a>
          <a
            href="https://github.com/Btwndlinez/Market-Lead-Engine"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            id="hero-cta-secondary"
          >
            View on GitHub →
          </a>
        </div>

        <p className="hero-note">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Powered by Gemini 2.0 Flash &amp; Supabase Edge Functions
        </p>
      </section>

      {/* ── Stats Bar ── */}
      <div className="section" id="engine">
        <div className="stats-bar">
          <div className="stat-item">
            <div className="stat-value">6</div>
            <div className="stat-label">Edge Functions</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">&lt;200ms</div>
            <div className="stat-label">Avg Response</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">99.9%</div>
            <div className="stat-label">Uptime SLA</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">AI</div>
            <div className="stat-label">Gemini 2.0</div>
          </div>
        </div>
      </div>

      {/* ── Engine Cards ── */}
      <section className="section" id="functions">
        <div className="section-label">• Engine Functions</div>
        <h2 className="section-title">Everything you need to process leads</h2>
        <p className="section-desc">
          Six core functions covering the full lead lifecycle — from AI analysis
          to checkout. Each runs as a Supabase Edge Function with CORS enabled.
        </p>

        <div className="card-grid">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleAction(card.action, card.id)}
              disabled={loading}
              className="engine-card"
              id={`card-${card.id}`}
            >
              <div className="card-icon">{card.icon}</div>
              <p className="card-label">{card.label}</p>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-desc">{card.desc}</p>
              {loading && activeFn === card.id && (
                <div style={{ marginTop: 16 }}>
                  <span className="loading-spinner" />
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* ── Result Panel ── */}
      {result && (
        <div className="section">
          <div className={`result-panel ${result.error ? 'result-error' : ''}`} id="result-panel">
            <div className="result-panel-header">
              <span className="result-panel-title">
                {result.error ? '⛔ Error' : '✅ Lead Qualified'}
              </span>
              <button
                className="result-panel-close"
                onClick={() => setResult(null)}
                aria-label="Close result"
                id="close-result"
              >
                <XIcon />
              </button>
            </div>
            <div className="result-panel-body">
              {result.error ? (
                <pre>{JSON.stringify(result, null, 2)}</pre>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Process Lead / Qualify AI Format */}
                  {result.ai_score !== undefined && (
                    <>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'baseline', 
                        gap: '12px',
                        padding: '16px',
                        background: 'var(--accent-glow)',
                        borderRadius: '12px',
                        border: '1px solid var(--accent)'
                      }}>
                        <span style={{ 
                          fontSize: '48px', 
                          fontWeight: 800, 
                          color: 'var(--accent)',
                          lineHeight: 1 
                        }}>
                          {result.ai_score}
                        </span>
                        <span style={{ 
                          fontSize: '14px', 
                          fontWeight: 600, 
                          color: 'var(--fg-secondary)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}>
                          AI Intent Score
                        </span>
                      </div>

                      {result.ai_reason && (
                        <div style={{ 
                          padding: '16px', 
                          background: 'var(--bg-secondary)',
                          borderRadius: '12px',
                          border: '1px solid var(--border)'
                        }}>
                          <p style={{ 
                            fontSize: '11px', 
                            fontWeight: 700, 
                            color: 'var(--fg-muted)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            marginBottom: '8px'
                          }}>
                            Internal Logic
                          </p>
                          <p style={{ 
                            fontSize: '16px', 
                            fontWeight: 600, 
                            color: 'var(--fg)',
                            lineHeight: 1.4 
                          }}>
                            {result.ai_reason}
                          </p>
                        </div>
                      )}

                      {result.next_action && (
                        <div style={{ 
                          padding: '16px', 
                          background: 'var(--accent)',
                          borderRadius: '12px',
                          color: '#fff'
                        }}>
                          <p style={{ 
                            fontSize: '11px', 
                            fontWeight: 700, 
                            opacity: 0.7,
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            marginBottom: '8px'
                          }}>
                            Recommended Action
                          </p>
                          <p style={{ 
                            fontSize: '16px', 
                            fontWeight: 700, 
                            lineHeight: 1.4 
                          }}>
                            {result.next_action}
                          </p>
                        </div>
                      )}
                    </>
                  )}

                  {/* Revenue Leak Format */}
                  {result.leakage_detected !== undefined && (
                    <>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '12px',
                        padding: '16px',
                        background: result.leakage_detected > 0 ? 'var(--accent-glow)' : 'var(--bg-secondary)',
                        borderRadius: '12px',
                        border: `1px solid ${result.leakage_detected > 0 ? 'var(--accent)' : 'var(--border)'}`
                      }}>
                        <span style={{ 
                          fontSize: '36px', 
                          fontWeight: 800, 
                          color: result.leakage_detected > 0 ? 'var(--accent)' : 'var(--fg-secondary)',
                          lineHeight: 1 
                        }}>
                          {result.leakage_detected}
                        </span>
                        <span style={{ 
                          fontSize: '14px', 
                          fontWeight: 600, 
                          color: 'var(--fg-secondary)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}>
                          Leakage Detected
                        </span>
                      </div>

                      <div style={{ 
                        padding: '16px', 
                        background: 'var(--bg-secondary)',
                        borderRadius: '12px',
                        border: '1px solid var(--border)'
                      }}>
                        <p style={{ 
                          fontSize: '11px', 
                          fontWeight: 700, 
                          color: 'var(--fg-muted)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          marginBottom: '8px'
                        }}>
                          High Value Leads
                        </p>
                        {result.high_value_leads && result.high_value_leads.length > 0 ? (
                          <ul style={{ margin: 0, paddingLeft: '20px' }}>
                            {result.high_value_leads.map((lead: any, idx: number) => (
                              <li key={idx} style={{ fontSize: '14px', marginBottom: '4px' }}>
                                {lead.id || lead.name || JSON.stringify(lead)}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p style={{ fontSize: '14px', color: 'var(--fg-muted)' }}>
                            No high-value leads at risk
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  {/* Checkout Format */}
                  {result.checkout_url && (
                    <>
                      <div style={{ 
                        padding: '16px', 
                        background: 'var(--accent)',
                        borderRadius: '12px',
                        color: '#fff'
                      }}>
                        <p style={{ 
                          fontSize: '11px', 
                          fontWeight: 700, 
                          opacity: 0.7,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          marginBottom: '8px'
                        }}>
                          Checkout Session
                        </p>
                        <p style={{ 
                          fontSize: '24px', 
                          fontWeight: 700, 
                          lineHeight: 1.2,
                          marginBottom: '8px'
                        }}>
                          ${result.amount?.toFixed(2) || '0.00'} {result.currency?.toUpperCase() || 'USD'}
                        </p>
                        <p style={{ fontSize: '12px', opacity: 0.8 }}>
                          Status: {result.status}
                        </p>
                      </div>

                      <div style={{ 
                        padding: '16px', 
                        background: 'var(--bg-secondary)',
                        borderRadius: '12px',
                        border: '1px solid var(--border)'
                      }}>
                        <p style={{ 
                          fontSize: '11px', 
                          fontWeight: 700, 
                          color: 'var(--fg-muted)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          marginBottom: '8px'
                        }}>
                          Next Action
                        </p>
                        <p style={{ fontSize: '14px' }}>{result.next_action}</p>
                      </div>
                    </>
                  )}

                  {/* Monthly Summary Format */}
                  {result.period && (
                    <>
                      <div style={{ 
                        padding: '16px', 
                        background: 'var(--accent)',
                        borderRadius: '12px',
                        color: '#fff'
                      }}>
                        <p style={{ 
                          fontSize: '11px', 
                          fontWeight: 700, 
                          opacity: 0.7,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          marginBottom: '8px'
                        }}>
                          {result.period}
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                          <div>
                            <p style={{ fontSize: '24px', fontWeight: 700 }}>{result.total_leads}</p>
                            <p style={{ fontSize: '11px', opacity: 0.7 }}>Total Leads</p>
                          </div>
                          <div>
                            <p style={{ fontSize: '24px', fontWeight: 700 }}>{result.qualified_leads}</p>
                            <p style={{ fontSize: '11px', opacity: 0.7 }}>Qualified</p>
                          </div>
                        </div>
                      </div>

                      <div style={{ 
                        padding: '16px', 
                        background: 'var(--bg-secondary)',
                        borderRadius: '12px',
                        border: '1px solid var(--border)'
                      }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                          <div>
                            <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--fg-muted)', textTransform: 'uppercase' }}>Conversion Rate</p>
                            <p style={{ fontSize: '18px', fontWeight: 600 }}>{result.conversion_rate}%</p>
                          </div>
                          <div>
                            <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--fg-muted)', textTransform: 'uppercase' }}>Avg AI Score</p>
                            <p style={{ fontSize: '18px', fontWeight: 600 }}>{result.ai_score_avg}</p>
                          </div>
                        </div>
                      </div>

                      {result.next_action && (
                        <div style={{ 
                          padding: '16px', 
                          background: 'var(--accent-glow)',
                          borderRadius: '12px',
                          border: '1px solid var(--accent)'
                        }}>
                          <p style={{ 
                            fontSize: '11px', 
                            fontWeight: 700, 
                            color: 'var(--accent)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            marginBottom: '8px'
                          }}>
                            Recommended Action
                          </p>
                          <p style={{ fontSize: '14px', fontWeight: 600 }}>{result.next_action}</p>
                        </div>
                      )}
                    </>
                  )}

                  {/* Generic - show raw JSON for unrecognized formats */}
                  {!result.ai_score && result.leakage_detected === undefined && !result.checkout_url && !result.period && (
                    <pre style={{ 
                      background: 'var(--bg-secondary)', 
                      padding: '16px', 
                      borderRadius: '12px',
                      overflow: 'auto'
                    }}>
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Footer ── */}
      <footer className="site-footer" id="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="nav-logo-icon nav-logo-icon-red" style={{ width: 22, height: 22 }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="11" height="11">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            Market Lead Engine
          </div>
          <div className="footer-links">
            <a href="https://github.com/Btwndlinez/Market-Lead-Engine" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
            <a href="#engine" className="footer-link">Engine</a>
            <a href="#functions" className="footer-link">Functions</a>
            <span className="footer-link" style={{ cursor: 'default' }}>© 2026</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
