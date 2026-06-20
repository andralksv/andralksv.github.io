/**
 * Prerender script — runs after `vite build` (client + SSR).
 * Loads the SSR bundle, renders the React app to a string,
 * and injects it into the built dist/index.html so crawlers
 * and social-media previews see real content instead of an
 * empty <div id="root"></div>.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distPath = path.resolve(__dirname, '..', 'dist')

// Load the SSR bundle produced by `vite build --ssr`
const { render } = await import(path.resolve(distPath, 'server', 'entry-server.js'))

// Render the app to an HTML string
const appHtml = render()

// Read the client-built index.html
const indexPath = path.resolve(distPath, 'index.html')
let html = fs.readFileSync(indexPath, 'utf-8')

// Inject the rendered markup into the root div
html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

fs.writeFileSync(indexPath, html)

// Clean up the server bundle — not needed in the deployed output
fs.rmSync(path.resolve(distPath, 'server'), { recursive: true, force: true })

console.log('✓ Pre-rendered index.html with static content')
