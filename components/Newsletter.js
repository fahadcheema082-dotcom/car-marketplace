'use client'
import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
      setTimeout(() => setSubmitted(false), 3500)
    }
  }

  return (
    <section className="py-16 bg-charcoal text-offwhite relative overflow-hidden">
      <div className="hero-grid-overlay" />
      <div className="hero-blob" style={{ width: 340, height: 340, background: '#FFB020', top: '-80px', right: '10%' }} />
      <div className="hero-blob" style={{ width: 280, height: 280, background: '#0F5C5C', bottom: '-60px', left: '5%' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-5 text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-8 h-px bg-amber" />
          <span className="font-mono text-xs uppercase tracking-widest text-amber font-semibold">
            Stay in the loop
          </span>
          <span className="w-8 h-px bg-amber" />
        </div>

        <h2 className="display text-3xl md:text-5xl font-bold tracking-tight leading-tight">
          Get new listings <span className="text-amber">before anyone else.</span>
        </h2>

        <p className="text-offwhite/65 mt-4 max-w-xl mx-auto">
          Join our newsletter and get the latest cars, price drops, and market insights straight to your inbox — no spam, ever.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
          <div className="search-glass">
            <div className="flex items-center gap-2 flex-1 px-2 min-w-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(247,246,242,0.55)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full min-w-0"
              />
            </div>
            <button type="submit" className="btn-primary shrink-0 !py-2.5 !px-5 !text-sm">
              Subscribe
            </button>
          </div>

          {submitted && (
            <p className="mt-4 text-teal-light font-semibold text-sm fade-up">
              ✓ Thanks! You're on the list.
            </p>
          )}
        </form>

        <p className="text-xs text-offwhite/40 mt-5">
          We respect your inbox. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}