import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import CarCard from '@/components/CarCard'
import Reveal from '@/components/Reveal'

export const revalidate = 0

export default async function ListingsPage({ searchParams }) {
  const q = searchParams?.q || ''
  const maxPrice = searchParams?.maxPrice || ''
  const transmission = searchParams?.transmission || ''
  const fuel_type = searchParams?.fuel_type || ''

  let query = supabase.from('listings').select('*').order('created_at', { ascending: false })

  if (q) {
    query = query.or(`make.ilike.%${q}%,model.ilike.%${q}%,description.ilike.%${q}%`)
  }
  if (maxPrice) {
    query = query.lte('price', maxPrice)
  }
  if (transmission) {
    query = query.eq('transmission', transmission)
  }
  if (fuel_type) {
    query = query.eq('fuel_type', fuel_type)
  }

  const { data: cars } = await query
  const hasFilters = q || maxPrice || transmission || fuel_type
  const resultCount = cars?.length || 0

  return (
    <main>
      {/* Page Header */}
      <section className="bg-charcoal text-offwhite relative overflow-hidden">
        <div className="hero-grid-overlay" />
        <div className="hero-blob" style={{ width: 300, height: 300, background: '#FFB020', top: '-60px', right: '10%' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-5 py-14 md:py-16">
          <div className="fade-up">
            <span className="section-eyebrow">Browse marketplace</span>
          </div>
          <h1 className="fade-up anim-delay-1 display text-4xl md:text-5xl font-bold tracking-tight">
            Find your next car
          </h1>
          <p className="fade-up anim-delay-2 text-offwhite/65 mt-3 max-w-xl">
            {resultCount > 0
              ? `${resultCount} ${resultCount === 1 ? 'car' : 'cars'} available right now.`
              : 'Search across all listings — filter by price, fuel, and transmission.'}
          </p>
        </div>
      </section>

      {/* Filter + Results */}
      <section className="max-w-6xl mx-auto px-5 py-10">
        {/* Filter Bar */}
        <form className="filter-bar mb-8">
          <div className="flex items-center gap-2 flex-1 min-w-[220px]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4A4F58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              name="q"
              defaultValue={q}
              placeholder="Search make, model, keyword..."
              className="filter-input !border-0 !bg-transparent !p-0 focus:!shadow-none"
              style={{ background: 'transparent', border: 0, padding: 0 }}
            />
          </div>

          <input
            name="maxPrice"
            defaultValue={maxPrice}
            type="number"
            placeholder="Max £"
            className="filter-input"
            style={{ maxWidth: 130 }}
          />

          <select name="transmission" defaultValue={transmission} className="filter-input" style={{ maxWidth: 160 }}>
            <option value="">Any transmission</option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>

          <select name="fuel_type" defaultValue={fuel_type} className="filter-input" style={{ maxWidth: 150 }}>
            <option value="">Any fuel</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Electric">Electric</option>
          </select>

          <button type="submit" className="btn-primary !py-2.5 !px-6 !text-sm">
            Apply
          </button>

          {hasFilters && (
            <Link
              href="/listings"
              className="text-asphalt text-sm hover:text-charcoal transition-colors underline underline-offset-2"
            >
              Clear
            </Link>
          )}
        </form>

        {/* Results Header */}
        {hasFilters && (
          <div className="flex items-center gap-2 mb-6 text-sm text-asphalt">
            <span className="plate-badge">{resultCount} RESULTS</span>
            {q && <span>for "<span className="text-charcoal font-medium">{q}</span>"</span>}
          </div>
        )}

        {/* Grid */}
        {cars && cars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {cars.map((car, i) => (
              <Reveal key={car.id} delay={i * 60}>
                <CarCard car={car} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-dashed border-asphalt/20 rounded-2xl">
            <div className="w-14 h-14 rounded-2xl bg-amber/15 flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFB020" strokeWidth="1.8">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            <p className="display text-xl font-semibold text-charcoal">No cars match your search.</p>
            <p className="text-asphalt mt-2">Try adjusting your filters or clearing them.</p>
            {hasFilters && (
              <Link href="/listings" className="btn-primary mt-5 inline-flex">
                Clear filters
              </Link>
            )}
          </div>
        )}
      </section>
    </main>
  )
}