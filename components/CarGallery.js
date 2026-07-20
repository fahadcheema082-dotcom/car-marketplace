'use client'
import { useState } from 'react'

export default function CarGallery({ images = [], alt = 'Car' }) {
  const [current, setCurrent] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  if (!images || images.length === 0) {
    return (
      <div className="detail-image-wrap">
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-asphalt/10 to-asphalt/5">
          <p className="text-asphalt/50">No photos available</p>
        </div>
      </div>
    )
  }

  function next() {
    setCurrent((current + 1) % images.length)
  }

  function prev() {
    setCurrent((current - 1 + images.length) % images.length)
  }

  return (
    <>
      {/* Main image */}
      <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-charcoal/5 group shadow-lg">
        <img
          src={images[current]}
          alt={alt}
          className="w-full h-full object-cover cursor-zoom-in transition-transform duration-700 group-hover:scale-105"
          onClick={() => setLightbox(true)}
        />

        {/* Counter */}
        <div className="absolute top-4 left-4 bg-charcoal/70 backdrop-blur-md text-offwhite text-xs font-mono px-3 py-1.5 rounded-full">
          {current + 1} / {images.length}
        </div>

        {/* Zoom hint */}
        <div className="absolute top-4 right-4 bg-charcoal/70 backdrop-blur-md text-offwhite p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-charcoal hover:bg-amber hover:text-charcoal shadow-lg opacity-0 group-hover:opacity-100 transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-charcoal hover:bg-amber hover:text-charcoal shadow-lg opacity-0 group-hover:opacity-100 transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3 mt-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                i === current
                  ? 'border-amber shadow-md scale-[1.02]'
                  : 'border-transparent opacity-60 hover:opacity-100 hover:border-asphalt/30'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-charcoal/95 z-[100] flex items-center justify-center p-6 backdrop-blur-md"
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-offwhite hover:bg-amber hover:text-charcoal transition-colors"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <img
            src={images[current]}
            alt={alt}
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-offwhite hover:bg-amber hover:text-charcoal transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-offwhite hover:bg-amber hover:text-charcoal transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-offwhite font-mono text-sm">
            {current + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  )
}