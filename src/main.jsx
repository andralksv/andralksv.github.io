import { StrictMode } from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Prerendered HTML present (production) → hydrate; empty (dev) → fresh render
if (root.innerHTML.trim()) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
