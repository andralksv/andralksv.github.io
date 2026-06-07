import { useState } from 'react'
import Hero from './components/Hero'
import LogoBar from './components/LogoBar'
import Strengths from './components/Strengths'
import Experience from './components/Experience'
import Cases from './components/Cases'
import Knowledge from './components/Knowledge'
import Footer from './components/Footer'
import ThemeToggle from './components/ThemeToggle'
import './App.css'

function App() {
  const [tab, setTab] = useState('about')

  return (
    <div className="container">
      {/* Sun/moon toggle in top-right corner — switches light/dark theme */}
      <ThemeToggle />
      <Hero />

      <div className="tabs">
        <button
          className={`tab-btn ${tab === 'about' ? 'active' : ''}`}
          onClick={() => setTab('about')}
        >
          About
        </button>
        <button
          className={`tab-btn ${tab === 'cases' ? 'active' : ''}`}
          onClick={() => setTab('cases')}
        >
          Cases
        </button>
        <button
          className={`tab-btn ${tab === 'knowledge' ? 'active' : ''}`}
          onClick={() => setTab('knowledge')}
        >
          AI Knowledge
        </button>
      </div>

      <hr className="divider" style={{ marginTop: 16 }} />

      {tab === 'about' && (
        <>
          <LogoBar />
          <hr className="divider" />
          <Strengths />
          <hr className="divider" />
          <Experience />
        </>
      )}

      {tab === 'cases' && <Cases />}
      {tab === 'knowledge' && <Knowledge />}

      <Footer />
    </div>
  )
}

export default App
