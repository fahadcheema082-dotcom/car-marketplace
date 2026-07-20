'use client'
import { useState, useEffect } from 'react'
import Reveal from './Reveal'

const testimonials = [
  {
    name: 'James Whitfield',
    role: 'Bought a BMW 3 Series',
    location: 'Manchester',
    text: "Sold my old car and bought a newer one on CarYard within a week. The direct-contact model saved me hours of back-and-forth. Genuinely refreshing.",
    initial: 'JW',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Sold a Toyota Corolla',
    location: 'London',
    text: "Listing was live in minutes. Got 4 serious enquiries within 2 days. No agent fees, no hassle — just real buyers reaching out. Highly recommend.",
    initial: 'PS',
    rating: 5,
  },
  {
    name: 'David McKenzie',
    role: 'Bought an Audi A4',
    location: 'Edinburgh',
    text: "Loved the clean interface and how easy it was to filter cars. Contacted the seller, viewed the car same day, deal done. Simple as that.",
    initial: 'DM',
    rating: 5,
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="py-20 bg-offwhite">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <span className="section-eyebrow justify-center" style={{ margin: '0 auto 0.75rem' }}>What people say</span>
          <h2 className="display text-3xl md:text-4xl font-bold text-charcoal tracking-tight">
            Real stories, real cars
          </h2>
          <p className="text-asphalt mt-3">
            Buyers and sellers who found what they were looking for on CarYard.
          </p>
        </div>

        {/* Desktop: Grid of 3 */}
        <div className="hidden md:grid grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 120}>
              <div className="bg-white border border-asphalt/10 rounded-2xl p-7 h-full shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="#FFB020">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                {/* Text */}
                <p className="text-charcoal leading-relaxed mb-6 relative">
                  <span className="display text-4xl text-amber/30 absolute -top-3 -left-1 leading-none">"</span>
                  <span className="relative">{t.text}</span>
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-asphalt/10">
                  <div className="w-11 h-11 rounded-full bg-amber-gradient flex items-center justify-center display font-bold text-charcoal shadow-amber-glow">
                    {t.initial}
                  </div>
                  <div>
                    <p className="display font-semibold text-charcoal text-sm">{t.name}</p>
                    <p className="text-xs text-asphalt">{t.role} • {t.location}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Mobile: Slider */}
        <div className="md:hidden">
          <div className="bg-white border border-asphalt/10 rounded-2xl p-6 shadow-sm">
            <div className="flex gap-1 mb-4">
              {[...Array(testimonials[current].rating)].map((_, j) => (
                <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="#FFB020">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <p className="text-charcoal leading-relaxed mb-6">{testimonials[current].text}</p>
            <div className="flex items-center gap-3 pt-4 border-t border-asphalt/10">
              <div className="w-11 h-11 rounded-full bg-amber-gradient flex items-center justify-center display font-bold text-charcoal">
                {testimonials[current].initial}
              </div>
              <div>
                <p className="display font-semibold text-charcoal text-sm">{testimonials[current].name}</p>
                <p className="text-xs text-asphalt">{testimonials[current].role} • {testimonials[current].location}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mt-5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all rounded-full ${
                  i === current ? 'w-8 h-2 bg-amber' : 'w-2 h-2 bg-asphalt/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}