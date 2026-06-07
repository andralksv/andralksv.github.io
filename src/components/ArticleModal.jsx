import { useEffect, useRef } from 'react'

/* ─── ARTICLE MODAL ─── */
/* Accessible dialog that slides up when a card is clicked.              */
/* Used by both Cases and AI in Practice. Pass `article` (title, tag,    */
/* content[]) and `onClose`. Traps focus while open and restores focus   */
/* to the triggering card on close.                                      */

const ArticleModal = ({ article, onClose }) => {
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const previouslyFocused = useRef(null)

  useEffect(() => {
    /* Remember what was focused (the card) so we can restore it on close */
    previouslyFocused.current = document.activeElement
    const content = contentRef.current

    const getFocusable = () =>
      content.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )

    /* Move focus into the dialog */
    const focusables = getFocusable()
    ;(focusables[0] || content).focus()

    const handleKey = (e) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key !== 'Tab') return

      /* Focus trap — keep Tab cycling inside the dialog */
      const f = getFocusable()
      if (f.length === 0) { e.preventDefault(); return }
      const first = f[0]
      const last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'  /* prevent background scroll */
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
      /* Restore focus to the element that opened the modal */
      previouslyFocused.current?.focus?.()
    }
  }, [onClose])

  /* Close when clicking the dark overlay (not the article itself) */
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose()
  }

  if (!article) return null

  return (
    <div className="modal-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div
        className="modal-content"
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
      >
        {/* Close button — top right */}
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Tag pill */}
        <span className="case-card-tag" style={{ marginBottom: 12 }}>{article.tag}</span>

        {/* Title */}
        <h2 className="modal-title" id="modal-title">{article.title}</h2>

        {/* Article body — array of paragraphs rendered as <p> or raw JSX */}
        <div className="modal-body">
          {article.content.map((block, i) =>
            typeof block === 'string'
              ? <p key={i}>{block}</p>
              : <div key={i}>{block}</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ArticleModal
