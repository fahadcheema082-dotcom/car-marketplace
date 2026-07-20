'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1920&q=80',
    eyebrow: 'PREMIUM SELECTION',
    title: 'Drive something',
    highlight: 'extraordinary.',
    subtitle: 'Handpicked luxury and performance cars from trusted UK sellers.',
    cta: 'Browse premium cars',
  },
  {
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1920&q=80',
    eyebrow: 'SPORTS & PERFORMANCE',
    title: 'For those who',
    highlight: 'live to drive.',
    subtitle: 'Sports cars, supercars, and everything in between — direct from owners.',
    cta: 'Explore sports cars',
  },
  {
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1920&q=80',
    eyebrow: 'FAMILY & SUV',
    title: 'Space, comfort,',
    highlight: 'and confidence.',
    subtitle: 'Family SUVs and estates from verified sellers across the UK.',
    cta: 'See family cars',
  },
  {
    image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=1920&q=80',
    eyebrow: 'CITY & COMPACT',
    title: 'Made for the',
    highlight: 'modern commute.',
    subtitle: 'Efficient, reliable, and easy on your wallet — city cars done right.',
    cta: 'View city cars',
  },
  {
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80',
    eyebrow: 'ELECTRIC & HYBRID',
    title: 'The future is',
    highlight: 'already here.',
    subtitle: 'Electric and hybrid vehicles — cleaner, quieter, smarter.',
    cta: 'Browse EVs',
  },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      goToSlide((current + 1) % slides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [current])

  function goToSlide(index) {
    if (index === current) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrent(index)
      setIsTransitioning(false)
    }, 400)
  }

  function nextSlide() {
    goToSlide((current + 1) % slides.length)
  }

  function prevSlide() {
    goToSlide((current - 1 + slides.length) % slides.length)
  }

  const slide = slides[current]

  return (
    <section className="hero-slider relative w-full h-screen min-h-[600px] max-h-[900px] overflow-hidden bg-charcoal">
      {/* Background Images (all preloaded, cross-fade) */}
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
          style={{
            opacity: i === current ? 1 : 0,
            zIndex: i === current ? 1 : 0,
          }}
        >
          <img
            src={s.image}
            alt=""
            className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-out ${
              i === current ? 'scale-110' : 'scale-100'
            }`}
          />
        </div>
      ))}

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-charcoal/85 via-charcoal/50 to-charcoal/30" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />

      {/* Grid overlay */}
      <div className="hero-grid-overlay z-10" />

      {/* Content */}
      <div className="relative z-20 h-full max-w-6xl mx-auto px-5 flex items-center">
        <div
          key={current}
          className={`max-w-2xl transition-all duration-700 ${
            isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          <div className="fade-up">
            <span className="plate-badge plate-badge-dark">{slide.eyebrow}</span>
          </div>

          <h1 className="fade-up anim-delay-1 display text-5xl md:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight mt-6 text-offwhite">
            {slide.title}
            <span className="block text-amber">{slide.highlight}</span>
          </h1>

          <p className="fade-up anim-delay-2 text-offwhite/80 text-lg md:text-xl mt-6 max-w-xl leading-relaxed">
            {slide.subtitle}
          </p>

          <div className="fade-up anim-delay-3 flex flex-wrap gap-3 mt-9">
            <Link href="/listings" className="btn-primary">
              {slide.cta}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link href="/seller" className="btn-secondary">
              List your car
            </Link>
          </div>
        </div>
      </div>

      {/* Arrow Controls */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center text-offwhite hover:bg-amber hover:text-charcoal hover:border-amber transition-all"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center text-offwhite hover:bg-amber hover:text-charcoal hover:border-amber transition-all"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Bottom Bar — Dots + Counter */}
      <div className="absolute bottom-8 left-0 right-0 z-30">
        <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`transition-all rounded-full ${
                  i === current
                    ? 'w-8 h-2 bg-amber'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Counter */}
          <div className="hidden sm:flex items-center gap-3 text-offwhite/70 font-mono text-sm">
            <span className="text-amber font-semibold text-lg">
              {String(current + 1).padStart(2, '0')}
            </span>
            <span className="w-8 h-px bg-white/30" />
            <span>{String(slides.length).padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 hidden lg:flex flex-col items-center gap-2 text-offwhite/50">
        <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-amber to-transparent animate-pulse" />
      </div>
    </section>
  )
}