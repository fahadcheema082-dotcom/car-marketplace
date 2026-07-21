import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import CarCard from '@/components/CarCard'
import CarGallery from '@/components/CarGallery'
import ShareButtons from '@/components/ShareButtons'
import ContactSellerButton from '@/components/ContactSellerButton'

export const revalidate = 0

export default async function CarDetailPage({ params }) {
  const { data: car } = await supabase
    .from('listings')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!car) return notFound()

  const { data: relatedCars } = await supabase
    .from('listings')
    .select('*')
    .neq('id', car.id)
    .limit(3)

  const galleryImages = car.image_url
    ? [
        car.image_url,
        'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=80',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80',
      ]
    : [
        'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&q=80',
        'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=80',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80',
      ]

  return (
    <main className="bg-offwhite pb-24">
      <div className="max-w-6xl mx-auto px-5 pt-6">
        <div className="flex items-center gap-2 text-sm text-asphalt">
          <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
          <span className="opacity-40">/</span>
          <Link href="/listings" className="hover:text-charcoal transition-colors">Browse</Link>
          <span className="opacity-40">/</span>
          <span className="text-charcoal font-medium">{car.make} {car.model}</span>
        </div>

        <Link
          href="/listings"
          className="inline-flex items-center gap-2 text-asphalt hover:text-charcoal text-sm transition-colors group mt-4"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to listings
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8">
          <div className="fade-up">
            <CarGallery images={galleryImages} alt={`${car.make} ${car.model}`} />

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Direct contact', icon: '📞' },
                { label: 'Verified listing', icon: '✓' },
                { label: 'Real details', icon: '📋' },
                { label: 'UK seller', icon: '🇬🇧' },
              ].map((b) => (
                <div key={b.label} className="bg-white border border-asphalt/10 rounded-xl p-3 text-center hover:border-amber/40 transition-colors">
                  <div className="text-lg mb-1">{b.icon}</div>
                  <p className="text-xs font-semibold text-charcoal uppercase tracking-wider">{b.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-white border border-asphalt/10 rounded-2xl p-6 md:p-7">
              <span className="section-eyebrow">About this car</span>
              <h2 className="display text-2xl font-bold text-charcoal mb-4">Description</h2>
              <p className="text-asphalt leading-relaxed whitespace-pre-line">
                {car.description || 'No description provided by the seller.'}
              </p>
            </div>

            <div className="mt-6 bg-white border border-asphalt/10 rounded-2xl p-6 md:p-7">
              <span className="section-eyebrow">Key specifications</span>
              <h2 className="display text-2xl font-bold text-charcoal mb-5">At a glance</h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-offwhite border border-asphalt/10 rounded-xl p-4">
                  <p className="text-xs text-asphalt uppercase tracking-wider">Year</p>
                  <p className="display font-bold text-xl text-charcoal mt-1">{car.year}</p>
                </div>
                <div className="bg-offwhite border border-asphalt/10 rounded-xl p-4">
                  <p className="text-xs text-asphalt uppercase tracking-wider">Mileage</p>
                  <p className="display font-bold text-xl text-charcoal mt-1">
                    {Number(car.mileage).toLocaleString()}<span className="text-sm text-asphalt font-normal ml-1">mi</span>
                  </p>
                </div>
                <div className="bg-offwhite border border-asphalt/10 rounded-xl p-4">
                  <p className="text-xs text-asphalt uppercase tracking-wider">Gearbox</p>
                  <p className="display font-bold text-xl text-charcoal mt-1">{car.transmission}</p>
                </div>
                <div className="bg-offwhite border border-asphalt/10 rounded-xl p-4">
                  <p className="text-xs text-asphalt uppercase tracking-wider">Fuel</p>
                  <p className="display font-bold text-xl text-charcoal mt-1">{car.fuel_type}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 pt-5 border-t border-asphalt/10">
                <div className="flex items-center justify-between">
                  <span className="text-asphalt text-sm">Body type</span>
                  <span className="font-semibold text-charcoal text-sm">Standard</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-asphalt text-sm">Condition</span>
                  <span className="font-semibold text-charcoal text-sm">Used</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-asphalt text-sm">Location</span>
                  <span className="font-semibold text-charcoal text-sm">{car.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-asphalt text-sm">Listing ID</span>
                  <span className="font-mono text-charcoal text-sm">#{String(car.id).padStart(6, '0')}</span>
                </div>
              </div>
            </div>

            <ShareButtons car={car} />
          </div>

          <div className="fade-up anim-delay-2 lg:sticky lg:top-24 lg:self-start">
            <div className="bg-white border border-asphalt/10 rounded-2xl p-6 md:p-7 shadow-sm">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="plate-badge">{car.year}</span>
                <span className="plate-badge">{Number(car.mileage).toLocaleString()} mi</span>
                <span className="plate-badge">{car.transmission}</span>
              </div>

              <h1 className="display text-3xl md:text-4xl font-bold text-charcoal tracking-tight leading-tight">
                {car.make} {car.model}
              </h1>

              <div className="mt-4 flex items-baseline gap-2">
                <p className="display text-4xl font-bold text-amber">
                  £{Number(car.price).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-2 mt-3 text-asphalt">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-sm">{car.location}</span>
              </div>

              <div className="h-px bg-asphalt/10 my-5" />

              {/* Seller badge */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-full bg-amber-gradient flex items-center justify-center shadow-amber-glow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1C1F26" strokeWidth="2.2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div>
                  <p className="display font-semibold text-charcoal">Private seller</p>
                  <p className="text-xs text-asphalt">Verified • Responds within 24h</p>
                </div>
              </div>

              {/* Contact seller — main CTA (opens modal) */}
              <ContactSellerButton car={car} />

              <p className="text-xs text-asphalt/70 text-center mt-4">
                🔒 Your details are only shared with the seller.
                <br />
                Always inspect the car in person before buying.
              </p>
            </div>
          </div>
        </div>

        {relatedCars && relatedCars.length > 0 && (
          <section className="mt-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <span className="section-eyebrow">More options</span>
                <h2 className="display text-3xl font-bold text-charcoal tracking-tight">
                  You may also like
                </h2>
                <p className="text-asphalt mt-2">Other cars from our marketplace.</p>
              </div>
              <Link href="/listings" className="inline-flex items-center gap-2 text-teal font-semibold hover:text-charcoal transition-colors">
                See all cars
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {relatedCars.map((relCar) => (
                <CarCard key={relCar.id} car={relCar} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}