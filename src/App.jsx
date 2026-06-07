import { useState, useRef } from 'react'
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
      <div className="tabs" role="tablist" aria-label="Portfolio sections">
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
              onClick={() => setTab(t.id)}
              onKeyDown={onTabKeyDown}
            >
              {t.label}
            </button>
          )
        })}
      </div>

      <hr className="divider" style={{ marginTop: 16 }} />

      {tab === 'about' && (
        <div id="panel-about" role="tabpanel" aria-labelledby="tab-about">
          <LogoBar />
          <hr className="divider" />
          <Strengths />
          <hr className="divider" />
          <Experience />
        </div>
      )}

      {tab === 'cases' && (
        <div id="panel-cases" role="tabpanel" aria-labelledby="tab-cases">
          <Cases />
        </div>
      )}

      {tab === 'ai' && (
        <div id="panel-ai" role="tabpanel" aria-labelledby="tab-ai">
          <Knowledge />
        </div>
      )}

      <Footer />
    </div>
  )
}

export default App
