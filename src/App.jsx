import { useState, useRef, useCallback, useLayoutEffect, useEffect } from 'react'
import Hero from './components/Hero'
import LogoBar from './components/LogoBar'
import Strengths from './components/Strengths'
import Experience from './components/Experience'
import Cases from './components/Cases'
import Knowledge from './components/Knowledge'
import Footer from './components/Footer'
import ThemeToggle from './components/ThemeToggle'
import './App.css'

/* Top-level tabs. */
const TABS = [
  { id: 'about', label: 'about' },
  { id: 'cases', label: 'cases' },
  { id: 'ai', label: 'AI in my practice' },
]

function App() {
  const [tab, setTab] = useState('about')
  const tabRefs = useRef({})
  const tabBarRef = useRef(null)
  const [indicatorStyle, setIndicatorStyle] = useState({ opacity: 0 })
  const [indicatorPulse, setIndicatorPulse] = useState(false)
  const pulseTimer = useRef(null)

  /* Measure active tab and position the sliding indicator pill */
  const updateIndicator = useCallback(() => {
    const activeEl = tabRefs.current[tab]
    if (!activeEl || !tabBarRef.current) return
    const barRect = tabBarRef.current.getBoundingClientRect()
    const tabRect = activeEl.getBoundingClientRect()
    setIndicatorStyle({
      left: tabRect.left - barRect.left,
      top: tabRect.top - barRect.top,
      width: tabRect.width,
      height: tabRect.height,
      opacity: 1,
    })
  }, [tab])

  useLayoutEffect(() => {
    updateIndicator()
  }, [updateIndicator])

  useEffect(() => {
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [updateIndicator])

  /* Arrow / Home / End navigation between tabs (ARIA tablist pattern) */
  const onTabKeyDown = (e) => {
    const idx = TABS.findIndex((t) => t.id === tab)
    let nextIdx = null
    if (e.key === 'ArrowRight') nextIdx = (idx + 1) % TABS.length
    else if (e.key === 'ArrowLeft') nextIdx = (idx - 1 + TABS.length) % TABS.length
    else if (e.key === 'Home') nextIdx = 0
    else if (e.key === 'End') nextIdx = TABS.length - 1
    if (nextIdx === null) return
    e.preventDefault()
    const nextId = TABS[nextIdx].id
    setTab(nextId)
    tabRefs.current[nextId]?.focus()
  }

  return (
    <div className="container">
      {/* Sun/moon toggle in top-right corner — switches light/dark theme */}
      <ThemeToggle />
      <Hero />

      {/* Tab bar — proper ARIA tablist with roving tabindex + arrow keys */}
      <div className="tabs" ref={tabBarRef} role="tablist" aria-label="Portfolio sections">
        {/* Sliding jelly indicator pill — follows the active tab */}
        <div className={`tab-indicator${indicatorPulse ? ' tab-indicator--pulse' : ''}`} style={indicatorStyle} />
        {TABS.map((t) => {
          const selected = tab === t.id
          return (
            <button
              key={t.id}
              ref={(el) => { tabRefs.current[t.id] = el }}
              id={`tab-${t.id}`}
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${t.id}`}
              tabIndex={selected ? 0 : -1}
              className={`tab-btn ${selected ? 'active' : ''}`}
              onClick={() => {
                if (tab === t.id) {
                  /* Already active — pulse the indicator glow */
                  setIndicatorPulse(false)
                  clearTimeout(pulseTimer.current)
                  requestAnimationFrame(() => {
                    setIndicatorPulse(true)
                    pulseTimer.current = setTimeout(() => setIndicatorPulse(false), 500)
                  })
                } else {
                  setTab(t.id)
                }
              }}
              onKeyDown={onTabKeyDown}
            >
              {t.label}
            </button>
          )
        })}
      </div>

      <hr className="divider" style={{ marginTop: 16 }} />

      {tab === 'about' && (
        <div id="panel-about" role="tabpanel" aria-labelledby="tab-about" className="tab-panel">
          <LogoBar />
          <hr className="divider" />
          <Strengths />
          <hr className="divider" />
          <Experience />
        </div>
      )}

      {tab === 'cases' && (
        <div id="panel-cases" role="tabpanel" aria-labelledby="tab-cases" className="tab-panel">
          <Cases />
        </div>
      )}

      {tab === 'ai' && (
        <div id="panel-ai" role="tabpanel" aria-labelledby="tab-ai" className="tab-panel">
          <Knowledge />
        </div>
      )}

      <Footer />
    </div>
  )
}

export default App
