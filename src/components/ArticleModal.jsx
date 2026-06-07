import { useEffect, useRef } from 'react'

/* ─── ARTICLE MODAL ─── */
/* Full-screen overlay that slides up when a card is clicked.           */
/* Used by both Cases and AI Knowledge tabs.                            */
/* Pass `article` (object with title, tag, content) and `onClose`.     */
/* `content` is an array of paragraphs/sections (strings or JSX).      */

const ArticleModal = ({ article, onClose }) => {
  const overlayRef = useRef(null)

  /* Close on Escape key */
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'  /* prevent background scroll */
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  /* Close when clicking the dark overlay (not the article itself) */
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose()
  }

  if (!article) return null

  return (
    <div className="modal-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="modal-content">
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
        <h2 className="modal-title">{article.title}</h2>

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
