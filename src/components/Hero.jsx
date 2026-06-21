import { useState, useRef, useEffect } from 'react'
import { analytics } from '../analytics'

/* CV — static PDF served from /public */
const CV_URL = '/andrei-alekseev-cv.pdf'

/* ─── EMAIL POPOVER ─── */
/* Email is NOT in the HTML source — assembled from parts in JS only    */
/* when the user clicks. Bots/crawlers that scrape HTML won't find it.  */

const EmailPopover = ({ open, onClose, anchorRef }) => {
  const popoverRef = useRef(null)

  /* Build the email from separate pieces (defeats simple scrapers) */
  const getEmail = () => {
    const user = 'andr.alksv'       // ← change your email username here
    const domain = 'gmail.com'      // ← change your email domain here
    return user + '@' + domain
  }

  /* Close when clicking outside the popover */
  useEffect(() => {
    if (!open) return
    const handleClick = (e) => {
      if (
        popoverRef.current && !popoverRef.current.contains(e.target) &&
        anchorRef.current && !anchorRef.current.contains(e.target)
      ) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open, onClose, anchorRef])

  if (!open) return null

  const email = getEmail()

  return (
    <div className="email-popover" ref={popoverRef}>
      {/* Email text — assembled at render time, not in static HTML */}
      <span className="email-popover-address">{email}</span>

      {/* Copy button */}
      <button
        className="email-popover-btn"
        title="Copy email"
        onClick={() => { navigator.clipboard.writeText(email); analytics.emailCopied() }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      </button>

      {/* Send button — this is the only place mailto: exists */}
      <a
        href={`mailto:${email}`}
        className="email-popover-btn"
        title="Open email app"
        onClick={() => analytics.emailSendClicked()}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22L11 13L2 9L22 2Z" />
        </svg>
      </a>
    </div>
  )
}

/* ─── HERO SECTION ─── */

const Hero = () => {
  const [popoverOpen, setPopoverOpen] = useState(false)
  const btnRef = useRef(null)

  return (
    <header className="hero">
      <div className="hero-text">
        <h1>Andrei Alekseev</h1>
        <p className="hero-tagline">
          product manager / product owner <br />
          onboarding & monetization <br />
        </p>
        <div className="social-row">
          {/* CTA button + popover — wrapper provides positioning context */}
          <div className="cta-wrapper">
            <button
              ref={btnRef}
              className="btn-primary"
              onClick={() => {
                const next = !popoverOpen
                setPopoverOpen(next)
                if (next) analytics.contactOpened()
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              contact me
            </button>
            <EmailPopover
              open={popoverOpen}
              onClose={() => setPopoverOpen(false)}
              anchorRef={btnRef}
            />
          </div>

          {/* CV download — serves static PDF from /public */}
          <a
            href={CV_URL}
            download="Andrei_Alekseev_CV.pdf"
            className="btn-secondary"
            onClick={() => analytics.cvDownloaded()}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <path d="M7 10l5 5 5-5" />
              <path d="M12 15V3" />
            </svg>
            download CV
          </a>

          {/* Social icons — grouped so they always wrap together */}
          <div className="social-icons-group">
            <a href="https://linkedin.com/in/andr-alksv/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn" onClick={() => analytics.socialLinkClicked('linkedin')}>
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://t.me/andralksv" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Telegram" onClick={() => analytics.socialLinkClicked('telegram')}>
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            </a>
          </div>
        </div>
      </div>
      {/* Profile photo — change filename to swap your photo */}
      <img src="andrei-alekseev-hero.png" alt="Andrei Alekseev" className="hero-photo" />
    </header>
  )
}

export default Hero
