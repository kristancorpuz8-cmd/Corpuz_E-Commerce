import { useEffect, useRef, useState } from 'react'

export default function HorizontalScrollWrapper({ children, label = 'columns' }) {
  const containerRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [hasOverflow, setHasOverflow] = useState(false)

  const checkScroll = () => {
    const el = containerRef.current
    if (!el) return
    const scrollEl = el.querySelector('.table-responsive') || el.querySelector('.horizontal-scroll-body') || el
    const overflow = scrollEl.scrollWidth > scrollEl.clientWidth + 4
    setHasOverflow(overflow)
    setCanScrollLeft(scrollEl.scrollLeft > 6)
    setCanScrollRight(overflow && scrollEl.scrollLeft + scrollEl.clientWidth < scrollEl.scrollWidth - 6)
  }

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const scrollEl = el.querySelector('.table-responsive') || el.querySelector('.horizontal-scroll-body') || el

    checkScroll()
    scrollEl.addEventListener('scroll', checkScroll, { passive: true })
    window.addEventListener('resize', checkScroll)

    const observer = new ResizeObserver(checkScroll)
    observer.observe(scrollEl)

    return () => {
      scrollEl.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
      observer.disconnect()
    }
  }, [])

  const scrollBy = (offset) => {
    const el = containerRef.current
    if (!el) return
    const scrollEl = el.querySelector('.table-responsive') || el.querySelector('.horizontal-scroll-body') || el
    scrollEl.scrollBy({ left: offset, behavior: 'smooth' })
  }

  return (
    <div
      className={`horizontal-scroll-container ${hasOverflow ? 'has-overflow' : ''} ${
        canScrollRight ? 'has-overflow-right' : ''
      } ${canScrollLeft ? 'has-overflow-left' : ''}`}
      ref={containerRef}
    >
      <div className="horizontal-scroll-guide-bar">
        <div className="scroll-guide-badge">
          <i className="bi bi-arrows-left-right scroll-icon-pulse" aria-hidden="true" />
          <span>
            <strong>Scroll / swipe horizontally</strong> to view all {label}
          </span>
        </div>
        <div className="scroll-controls-mini" aria-hidden={!hasOverflow}>
          <button
            type="button"
            className="scroll-btn-mini"
            disabled={!canScrollLeft}
            onClick={() => scrollBy(-180)}
            aria-label="Scroll table left"
            title="Scroll left"
          >
            <i className="bi bi-chevron-left" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="scroll-btn-mini"
            disabled={!canScrollRight}
            onClick={() => scrollBy(180)}
            aria-label="Scroll table right"
            title="Scroll right"
          >
            <i className="bi bi-chevron-right" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="horizontal-scroll-body-wrap">{children}</div>

      {canScrollRight ? (
        <button
          type="button"
          className="scroll-edge-indicator right"
          onClick={() => scrollBy(200)}
          aria-label="More content available to the right. Click or swipe to view."
          title="Scroll right"
        >
          <span>More</span>
          <i className="bi bi-chevron-right animate-bounce-x" aria-hidden="true" />
        </button>
      ) : null}

      {canScrollLeft ? (
        <button
          type="button"
          className="scroll-edge-indicator left"
          onClick={() => scrollBy(-200)}
          aria-label="More content available to the left. Click or swipe to view."
          title="Scroll left"
        >
          <i className="bi bi-chevron-left animate-bounce-x-reverse" aria-hidden="true" />
          <span>Back</span>
        </button>
      ) : null}
    </div>
  )
}
