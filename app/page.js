import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import CarCard from '@/components/CarCard'
import Reveal from '@/components/Reveal'
import HeroSlider from '@/components/HeroSlider'
import TrustSections from '@/components/TrustSections'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import Newsletter from '@/components/Newsletter'

export const revalidate = 0

export default async function HomePage() {
  const { data: cars } = await supabase
    .from('listings')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6)

  return (
    <main>
      {/* CINEMATIC HERO SLIDER */}
      <HeroSlider />

      {/* TRUST STRIP */}
      <section className="relative bg-charcoal text-offwhite border-t border-white/10">
        <div className="max-w-6xl mx-auto px-5 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="display text-lg font-semibold">
              Simple car buying and selling — without the noise.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="plate-badge">DIRECT CONTACT</span>
              <span className="plate-badge">REAL DETAILS</span>
              <span className="plate-badge">FAST SEARCH</span>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST SECTIONS — Brands, How It Works, Why Us, Stats */}
      <TrustSections />

      {/* SEARCH SECTION */}
      <section className="max-w-4xl mx-auto px-5 py-14">
        <div className="text-center mb-8">
          <span className="section-eyebrow justify-center" style={{ margin: '0 auto 0.75rem' }}>Find your car</span>
          <h2 className="display text-3xl md:text-4xl font-bold text-charcoal tracking-tight">
            Start your search
          </h2>
          <p className="text-asphalt mt-2">Search by make, model, or any keyword.</p>
        </div>

        <form action="/listings" className="filter-bar max-w-2xl mx-auto">
          <div className="flex items-center gap-2 flex-1 min-w-[220px]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4A4F58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              name="q"
              placeholder="BMW, Audi, Toyota, diesel..."
              className="filter-input"
              style={{ background: 'transparent', border: 0, padding: 0 }}
            />
          </div>
          <button type="submit" className="btn-primary !py-2.5 !px-6 !text-sm">
            Search
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </form>
      </section>

      {/* FEATURED LISTINGS */}
      <section className="relative max-w-6xl mx-auto px-5 py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
          <div>
            <span className="section-eyebrow">Fresh arrivals</span>
            <h2 className="display text-3xl md:text-4xl font-bold text-charcoal tracking-tight">
              Latest listings
            </h2>
            <p className="text-asphalt mt-2 max-w-xl">
              Browse newly added cars and jump straight into the details.
            </p>
          </div>

          <Link href="/listings" className="inline-flex items-center gap-2 text-teal font-semibold hover:text-charcoal transition-colors">
            View all cars
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {cars && cars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {cars.map((car, i) => (
              <Reveal key={car.id} delay={i * 80}>
                <CarCard car={car} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-asphalt/20 rounded-2xl bg-white">
            <p className="display text-xl font-semibold text-charcoal">No cars listed yet.</p>
            <p className="text-asphalt mt-2">Add the first vehicle and it will appear here.</p>
            <Link href="/seller" className="btn-primary mt-5 inline-flex">Add the first listing</Link>
          </div>
        )}
      </section>

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />

      {/* NEWSLETTER */}
      <Newsletter />
    </main>
  )
}