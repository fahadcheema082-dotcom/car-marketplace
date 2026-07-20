'use client'
import { useState } from 'react'
import Link from 'next/link'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mnjevlen'
const CONTACT_EMAIL = 'fahadcheema082@gmail.com'

const contactCards = [
  {
    title: 'General enquiries',
    text: 'Questions about CarYard, listings, or how the marketplace works.',
    value: CONTACT_EMAIL,
    icon: '✉️',
  },
  {
    title: 'Seller support',
    text: 'Need help creating, updating, or removing your vehicle listing?',
    value: CONTACT_EMAIL,
    icon: '🛠️',
  },
  {
    title: 'UK focused',
    text: 'Built for buyers and sellers across the United Kingdom.',
    value: 'United Kingdom',
    icon: '🇬🇧',
  },
]

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    topic: 'General enquiry',
    message: '',
  })
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState(null) // 'success' | 'error' | null

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    setStatus(null)

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('success')
        setForm({
          name: '',
          email: '',
          topic: 'General enquiry',
          message: '',
        })
        setTimeout(() => setStatus(null), 6000)
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    } finally {
      setSending(false)
    }
  }

  return (
    <main>
      {/* HERO */}
      <section className="relative bg-charcoal text-offwhite overflow-hidden">
        <div className="hero-grid-overlay" />
        <div className="hero-blob" style={{ width: 360, height: 360, background: '#FFB020', top: '-80px', right: '12%' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-5 py-20 md:py-24">
          <span className="plate-badge plate-badge-dark">CONTACT CARYARD</span>
          <h1 className="display text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight mt-6 max-w-3xl">
            Let's talk about
            <span className="block text-amber">your next move.</span>
          </h1>
          <p className="text-offwhite/70 text-lg md:text-xl mt-6 max-w-2xl leading-relaxed">
            Whether you're buying, selling, or just need help — send us a message and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="py-12 bg-offwhite">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {contactCards.map((card) => (
              <div key={card.title} className="bg-white border border-asphalt/10 rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all">
                <div className="text-3xl mb-4">{card.icon}</div>
                <h3 className="display text-lg font-bold text-charcoal">{card.title}</h3>
                <p className="text-asphalt text-sm leading-relaxed mt-2">{card.text}</p>
                <p className="text-teal font-semibold mt-4 break-all">{card.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.75fr] gap-10">
            {/* Form */}
            <div className="bg-offwhite border border-asphalt/10 rounded-3xl p-6 md:p-8 shadow-sm">
              <span className="section-eyebrow">Send a message</span>
              <h2 className="display text-3xl font-bold text-charcoal mb-2">
                How can we help?
              </h2>
              <p className="text-asphalt mb-7">
                Fill in the form below and your message will land directly in our inbox.
              </p>

              {status === 'success' && (
                <div className="bg-teal/10 border border-teal/30 text-teal rounded-xl p-4 mb-5 font-semibold flex items-center gap-3 fade-up">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <div>
                    <p>Message sent successfully!</p>
                    <p className="text-sm font-normal opacity-80">We'll get back to you soon.</p>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-5 font-semibold fade-up">
                  <p>Something went wrong.</p>
                  <p className="text-sm font-normal">Please try again or email us directly at {CONTACT_EMAIL}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-asphalt uppercase tracking-wider mb-1.5">
                      Name
                    </label>
                    <input
                      required
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-asphalt uppercase tracking-wider mb-1.5">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@email.com"
                      className="input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-asphalt uppercase tracking-wider mb-1.5">
                    Topic
                  </label>
                  <select name="topic" value={form.topic} onChange={handleChange} className="input">
                    <option>General enquiry</option>
                    <option>I want to sell a car</option>
                    <option>I need help buying</option>
                    <option>Report a listing</option>
                    <option>Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-asphalt uppercase tracking-wider mb-1.5">
                    Message
                  </label>
                  <textarea
                    required
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Write your message..."
                    className="input resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="btn-primary w-full !py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <>
                      <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M21 12a9 9 0 11-6.219-8.56" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send message
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Side info */}
            <div className="space-y-5">
              <div className="bg-charcoal text-offwhite rounded-3xl p-7 relative overflow-hidden">
                <div className="hero-grid-overlay" />
                <div className="relative z-10">
                  <span className="plate-badge">SAFETY FIRST</span>
                  <h3 className="display text-2xl font-bold mt-5">
                    Meet safely. Check carefully.
                  </h3>
                  <p className="text-offwhite/65 mt-3 leading-relaxed">
                    Always inspect the vehicle in person, verify documents, check MOT history, and meet in a safe public place.
                  </p>
                  <Link href="/listings" className="btn-primary mt-6">
                    Browse listings
                  </Link>
                </div>
              </div>

              <div className="bg-offwhite border border-asphalt/10 rounded-3xl p-7">
                <span className="section-eyebrow">Support hours</span>
                <div className="space-y-4 mt-3">
                  <div className="flex items-center justify-between border-b border-asphalt/10 pb-3">
                    <span className="text-asphalt">Monday — Friday</span>
                    <span className="font-semibold text-charcoal">9am — 6pm</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-asphalt/10 pb-3">
                    <span className="text-asphalt">Saturday</span>
                    <span className="font-semibold text-charcoal">10am — 4pm</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-asphalt">Sunday</span>
                    <span className="font-semibold text-charcoal">Closed</span>
                  </div>
                </div>
              </div>

              <div className="bg-offwhite border border-asphalt/10 rounded-3xl p-7">
                <span className="section-eyebrow">Quick actions</span>
                <div className="grid grid-cols-1 gap-3 mt-3">
                  <Link href="/seller" className="bg-white border border-asphalt/10 rounded-xl px-4 py-3 hover:border-amber hover:shadow-sm transition-all">
                    <span className="font-semibold text-charcoal">List a car</span>
                    <span className="block text-sm text-asphalt">Publish your vehicle in minutes.</span>
                  </Link>
                  <Link href="/listings" className="bg-white border border-asphalt/10 rounded-xl px-4 py-3 hover:border-amber hover:shadow-sm transition-all">
                    <span className="font-semibold text-charcoal">Find a car</span>
                    <span className="block text-sm text-asphalt">Browse the latest listings.</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}