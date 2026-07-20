'use client'
import { useState } from 'react'
import Reveal from './Reveal'

const faqs = [
  {
    q: 'Is CarYard free to use?',
    a: 'Yes — completely free for both buyers and sellers. There are no listing fees, no commission, and no hidden charges. What you agree with the seller is what you pay.',
  },
  {
    q: 'How do I contact a seller?',
    a: 'Every listing shows the seller\'s phone number and email directly on the page. You can call, text, or email them straight away — no middleman, no delays.',
  },
  {
    q: 'How do I list my car for sale?',
    a: 'Click "Sell a Car" in the navigation, fill in the details (make, model, year, price, photos, and contact info), and hit publish. Your car will be live within seconds.',
  },
  {
    q: 'Are the listings verified?',
    a: 'Sellers submit their own details, so we always recommend inspecting the car in person, verifying documents (V5C, service history, MOT), and meeting in a safe public location.',
  },
  {
    q: 'Can I edit or remove my listing?',
    a: 'Absolutely. Once you list a car you can update the price, photos, description, or remove it entirely whenever you like from your listing page.',
  },
  {
    q: 'Do you cover the whole UK?',
    a: 'Yes — CarYard is built specifically for the UK market. Sellers from all regions can list, and buyers can filter by location to find cars near them.',
  },
]

function FAQItem({ q, a, isOpen, onClick }) {
  return (
    <div className="border-b border-asphalt/15 last:border-b-0">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span className={`display text-lg font-semibold transition-colors ${
          isOpen ? 'text-amber' : 'text-charcoal group-hover:text-teal'
        }`}>
          {q}
        </span>
        <span className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
          isOpen
            ? 'bg-amber border-amber rotate-45'
            : 'bg-transparent border-asphalt/30 group-hover:border-charcoal'
        }`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isOpen ? '#1C1F26' : '#4A4F58'} strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </button>

      <div
        className="grid transition-all duration-400 ease-in-out"
        style={{
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="overflow-hidden">
          <p className="text-asphalt leading-relaxed pb-5 pr-12">{a}</p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-5">
        <div className="text-center mb-12">
          <span className="section-eyebrow justify-center" style={{ margin: '0 auto 0.75rem' }}>Got questions?</span>
          <h2 className="display text-3xl md:text-4xl font-bold text-charcoal tracking-tight">
            Frequently asked
          </h2>
          <p className="text-asphalt mt-3">
            Everything you need to know before buying or selling.
          </p>
        </div>

        <Reveal>
          <div className="bg-offwhite rounded-2xl border border-asphalt/10 px-6 md:px-8 shadow-sm">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                q={faq.q}
                a={faq.a}
                isOpen={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </div>
        </Reveal>

        <div className="text-center mt-8">
          <p className="text-asphalt text-sm">
            Still have questions? <span className="text-teal font-semibold hover:underline cursor-pointer">Get in touch</span>
          </p>
        </div>
      </div>
    </section>
  )
}