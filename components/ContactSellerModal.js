'use client'
import { useState, useEffect } from 'react'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mnjevlen'

export default function ContactSellerModal({ car, isOpen, onClose }) {
  const [form, setForm] = useState({
    buyer_name: '',
    buyer_email: '',
    buyer_phone: '',
    best_time: 'Anytime',
    budget_ok: 'Yes, matches my budget',
    message: '',
  })
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState(null)

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    setStatus(null)

    // Build a nicely formatted payload
    const listingUrl = typeof window !== 'undefined' ? window.location.href : ''

    const payload = {
      _subject: `🚗 New Enquiry: ${car.make} ${car.model} — ${form.buyer_name}`,
      _replyto: form.buyer_email,

      // === CAR DETAILS ===
      '── CAR DETAILS ──': '',
      Car: `${car.make} ${car.model} (${car.year})`,
      Price: `£${Number(car.price).toLocaleString()}`,
      Mileage: `${Number(car.mileage).toLocaleString()} mi`,
      Transmission: car.transmission,
      Fuel: car.fuel_type,
      Location: car.location,
      'Listing ID': `#${String(car.id).padStart(6, '0')}`,
      'Listing URL': listingUrl,

      // === BUYER DETAILS ===
      '── BUYER DETAILS ──': '',
      'Buyer Name': form.buyer_name,
      'Buyer Email': form.buyer_email,
      'Buyer Phone': form.buyer_phone,
      'Best Time to Contact': form.best_time,
      'Budget Confirmation': form.budget_ok,

      // === MESSAGE ===
      '── MESSAGE ──': '',
      Message: form.message,
    }

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setStatus('success')
        setForm({
          buyer_name: '',
          buyer_email: '',
          buyer_phone: '',
          best_time: 'Anytime',
          budget_ok: 'Yes, matches my budget',
          message: '',
        })
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    } finally {
      setSending(false)
    }
  }

  if (!isOpen) return null

  // WhatsApp fallback
  const waLink = `https://wa.me/${car.contact_phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi, I'm interested in your ${car.make} ${car.model} (£${Number(car.price).toLocaleString()}) listed on CarYard.`)}`

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl w-full max-w-lg max-h-[92vh] overflow-y-auto shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-charcoal/5 hover:bg-charcoal hover:text-offwhite text-charcoal flex items-center justify-center transition-all z-10"
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Success State */}
        {status === 'success' ? (
          <div className="p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-teal/15 flex items-center justify-center mx-auto mb-5">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0F5C5C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="display text-2xl font-bold text-charcoal mb-2">
              Enquiry sent!
            </h2>
            <p className="text-asphalt leading-relaxed mb-6">
              Your details have been delivered to the seller.
              You'll usually hear back within 24 hours.
            </p>

            <div className="bg-offwhite border border-asphalt/10 rounded-2xl p-4 mb-6 text-left">
              <p className="text-xs uppercase tracking-wider text-asphalt mb-2">What happens next</p>
              <ul className="text-sm text-charcoal space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-amber font-bold">1.</span>
                  <span>Seller receives your enquiry via email</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber font-bold">2.</span>
                  <span>They'll contact you on the phone/email you provided</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber font-bold">3.</span>
                  <span>Arrange a viewing and inspect the car in person</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onClose}
              className="btn-primary w-full"
            >
              Continue browsing
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="bg-charcoal text-offwhite p-6 rounded-t-3xl relative overflow-hidden">
              <div className="hero-grid-overlay" />
              <div className="hero-blob" style={{ width: 200, height: 200, background: '#FFB020', top: '-50px', right: '-30px', opacity: 0.3 }} />

              <div className="relative z-10">
                <span className="plate-badge plate-badge-dark">CONTACT SELLER</span>
                <h2 className="display text-2xl font-bold mt-3 leading-tight">
                  Interested in the {car.make} {car.model}?
                </h2>
                <div className="flex items-center gap-3 mt-3 text-sm text-offwhite/70">
                  <span className="text-amber font-bold display text-lg">£{Number(car.price).toLocaleString()}</span>
                  <span className="opacity-40">•</span>
                  <span>{car.year}</span>
                  <span className="opacity-40">•</span>
                  <span>{Number(car.mileage).toLocaleString()} mi</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-6">
              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-4 text-sm">
                  Something went wrong. Please try again or use WhatsApp/Call below.
                </div>
              )}

              <p className="text-asphalt text-sm mb-5">
                Fill in your details — the seller will get back to you directly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-asphalt uppercase tracking-wider mb-1.5">
                    Your name <span className="text-amber">*</span>
                  </label>
                  <input
                    required
                    name="buyer_name"
                    value={form.buyer_name}
                    onChange={handleChange}
                    placeholder="John Smith"
                    className="input"
                  />
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-asphalt uppercase tracking-wider mb-1.5">
                      Email <span className="text-amber">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      name="buyer_email"
                      value={form.buyer_email}
                      onChange={handleChange}
                      placeholder="you@email.com"
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-asphalt uppercase tracking-wider mb-1.5">
                      Phone <span className="text-amber">*</span>
                    </label>
                    <input
                      required
                      type="tel"
                      name="buyer_phone"
                      value={form.buyer_phone}
                      onChange={handleChange}
                      placeholder="+44 ..."
                      className="input"
                    />
                  </div>
                </div>

                {/* Best time */}
                <div>
                  <label className="block text-xs font-semibold text-asphalt uppercase tracking-wider mb-1.5">
                    Best time to contact
                  </label>
                  <select
                    name="best_time"
                    value={form.best_time}
                    onChange={handleChange}
                    className="input"
                  >
                    <option>Anytime</option>
                    <option>Morning (9am - 12pm)</option>
                    <option>Afternoon (12pm - 5pm)</option>
                    <option>Evening (5pm - 9pm)</option>
                    <option>Weekends only</option>
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-xs font-semibold text-asphalt uppercase tracking-wider mb-1.5">
                    Budget check
                  </label>
                  <select
                    name="budget_ok"
                    value={form.budget_ok}
                    onChange={handleChange}
                    className="input"
                  >
                    <option>Yes, matches my budget</option>
                    <option>Yes, but hoping to negotiate</option>
                    <option>Need finance/payment plan</option>
                    <option>Just enquiring for now</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-asphalt uppercase tracking-wider mb-1.5">
                    Your message <span className="text-amber">*</span>
                  </label>
                  <textarea
                    required
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Hi, is this car still available? I'd like to arrange a viewing..."
                    className="input resize-none"
                  />
                </div>

                {/* Submit */}
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
                      Sending enquiry...
                    </>
                  ) : (
                    <>
                      Send enquiry to seller
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-asphalt/15" />
                <span className="text-xs text-asphalt uppercase tracking-wider">Or reach directly</span>
                <div className="flex-1 h-px bg-asphalt/15" />
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold py-2.5 rounded-lg hover:bg-[#1eb955] transition-colors text-sm"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
                  </svg>
                  WhatsApp
                </a>
                <a
                  href={`tel:${car.contact_phone}`}
                  className="inline-flex items-center justify-center gap-2 bg-charcoal text-offwhite font-semibold py-2.5 rounded-lg hover:bg-asphalt transition-colors text-sm"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0122 16.92z" />
                  </svg>
                  Call
                </a>
              </div>

              <p className="text-xs text-asphalt/60 text-center mt-4">
                Your details are only shared with the seller — no third parties.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}