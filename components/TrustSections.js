'use client'
import { useState } from 'react'
import CountUp from './CountUp'
import Reveal from './Reveal'

const brands = [
  { name: 'BMW', letter: 'B' },
  { name: 'Audi', letter: 'A' },
  { name: 'Mercedes', letter: 'M' },
  { name: 'Toyota', letter: 'T' },
  { name: 'Ford', letter: 'F' },
  { name: 'Volkswagen', letter: 'V' },
  { name: 'Honda', letter: 'H' },
  { name: 'Nissan', letter: 'N' },
]

const steps = [
  {
    number: '01',
    title: 'Search & Discover',
    desc: 'Browse thousands of verified listings, filter by make, model, price, and more.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Contact Seller',
    desc: 'Reach out directly to the owner via phone or email — no middleman, no fees.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Drive Away',
    desc: 'Inspect the car, agree the deal, and drive off with your new set of wheels.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 17h2l2-6h10l2 6h2M5 17v2a1 1 0 001 1h2a1 1 0 001-1v-2M15 17v2a1 1 0 001 1h2a1 1 0 001-1v-2" />
        <circle cx="7.5" cy="14.5" r="1.5" />
        <circle cx="16.5" cy="14.5" r="1.5" />
      </svg>
    ),
  },
]

const features = [
  {
    title: 'Direct Contact',
    desc: 'Talk to the seller — no agents, no delays. Real people, real answers.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: 'Zero Fees',
    desc: 'No hidden charges, no commissions. What you see is what you pay.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
  },
  {
    title: 'Verified Listings',
    desc: 'Every car listed with real details — mileage, history, and honest condition.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
      </svg>
    ),
  },
  {
    title: 'UK Focused',
    desc: 'Built for UK buyers and sellers — with local pricing, locations, and support.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
]

function TiltCard({ children }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateY = ((x - centerX) / centerX) * 8
    const rotateX = -((y - centerY) / centerY) * 8
    setTilt({ x: rotateX, y: rotateY })
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.2s ease',
      }}
    >
      {children}
    </div>
  )
}

export default function TrustSections() {
  return (
    <>
      {/* FEATURED BRANDS */}
      <section className="bg-white py-14 border-b border-asphalt/10">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-8">
            <span className="section-eyebrow justify-center" style={{ color: '#4A4F58', margin: '0 auto 0.75rem' }}>Trusted brands</span>
            <h2 className="display text-2xl md:text-3xl font-bold text-charcoal">
              All the makes you love
            </h2>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {brands.map((brand, i) => (
              <Reveal key={brand.name} delay={i * 60}>
                <div className="group aspect-square rounded-xl border border-asphalt/12 bg-offwhite flex flex-col items-center justify-center hover:bg-charcoal hover:border-charcoal transition-all cursor-pointer">
                  <span className="display text-3xl font-bold text-charcoal group-hover:text-amber transition-colors">
                    {brand.letter}
                  </span>
                  <span className="text-[10px] text-asphalt/60 group-hover:text-offwhite/70 mt-1 uppercase tracking-wider transition-colors">
                    {brand.name}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-offwhite">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <span className="section-eyebrow justify-center" style={{ margin: '0 auto 0.75rem' }}>How it works</span>
            <h2 className="display text-3xl md:text-4xl font-bold text-charcoal tracking-tight">
              Three steps to your next car
            </h2>
            <p className="text-asphalt mt-3">
              Buying a car shouldn't be complicated. Here's how simple we've made it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {steps.map((step, i) => (
              <Reveal key={step.number} delay={i * 120}>
                <div className="relative bg-white rounded-2xl border border-asphalt/10 p-7 h-full shadow-sm hover:shadow-lg transition-shadow group">
                  <div className="absolute top-5 right-5 display text-5xl font-bold text-amber/15 group-hover:text-amber/30 transition-colors">
                    {step.number}
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-amber-gradient flex items-center justify-center text-charcoal shadow-amber-glow mb-5">
                    {step.icon}
                  </div>
                  <h3 className="display text-xl font-bold text-charcoal mb-2">
                    {step.title}
                  </h3>
                  <p className="text-asphalt leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-charcoal text-offwhite relative overflow-hidden">
        <div className="hero-grid-overlay" />
        <div className="hero-blob" style={{ width: 320, height: 320, background: '#FFB020', top: '10%', left: '-100px' }} />
        <div className="hero-blob" style={{ width: 380, height: 380, background: '#0F5C5C', bottom: '5%', right: '-100px' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-5">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <span className="section-eyebrow justify-center" style={{ margin: '0 auto 0.75rem' }}>Why CarYard</span>
            <h2 className="display text-3xl md:text-4xl font-bold tracking-tight">
              Built for buyers and sellers
            </h2>
            <p className="text-offwhite/65 mt-3">
              We keep it simple, fair, and focused on what actually matters — the car and the deal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feat, i) => (
              <Reveal key={feat.title} delay={i * 100}>
                <TiltCard>
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 h-full hover:bg-white/10 hover:border-amber/40 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-amber/15 text-amber flex items-center justify-center mb-4">
                      {feat.icon}
                    </div>
                    <h3 className="display text-lg font-bold mb-2">{feat.title}</h3>
                    <p className="text-offwhite/65 text-sm leading-relaxed">{feat.desc}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="py-16 bg-amber-gradient relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="display text-4xl md:text-5xl font-bold text-charcoal">
                <CountUp end={500} suffix="+" />
              </p>
              <p className="text-charcoal/70 text-sm font-medium mt-2 uppercase tracking-wider">
                Cars listed
              </p>
            </div>
            <div>
              <p className="display text-4xl md:text-5xl font-bold text-charcoal">
                <CountUp end={1200} suffix="+" />
              </p>
              <p className="text-charcoal/70 text-sm font-medium mt-2 uppercase tracking-wider">
                Happy users
              </p>
            </div>
            <div>
              <p className="display text-4xl md:text-5xl font-bold text-charcoal">
                <CountUp end={98} suffix="%" />
              </p>
              <p className="text-charcoal/70 text-sm font-medium mt-2 uppercase tracking-wider">
                Satisfaction
              </p>
            </div>
            <div>
              <p className="display text-4xl md:text-5xl font-bold text-charcoal">
                <CountUp end={24} suffix="/7" />
              </p>
              <p className="text-charcoal/70 text-sm font-medium mt-2 uppercase tracking-wider">
                Available
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}