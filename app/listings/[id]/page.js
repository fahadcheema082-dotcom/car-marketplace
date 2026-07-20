import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import CarCard from '@/components/CarCard'
import CarGallery from '@/components/CarGallery'
import ShareButtons from '@/components/ShareButtons'

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

  // Build Gmail compose URL (opens Gmail in new tab, pre-filled)
  const emailSubject = `Interested in ${car.make} ${car.model}`
  const emailBody = `Hi,\n\nI'm interested in your ${car.make} ${car.model} listed for £${Number(car.price).toLocaleString()} on CarYard.\n\nCould you please share more details?\n\nThanks.`
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${car.contact_email}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`

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

              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-full bg-amber-gradient flex items-center justify-center shadow-amber-glow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1C1F26" strokeWidth="2.2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div>
                  <p className="display font-semibold text-charcoal">Private seller</p>
                  <p className="text-xs text-asphalt">Direct contact — no middleman</p>
                </div>
              </div>

              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-2 text-sm">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4A4F58" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0122 16.92z" />
                  </svg>
                  <a href={`tel:${car.contact_phone}`} className="text-charcoal hover:text-teal transition-colors">
                    {car.contact_phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4A4F58" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <a href={`mailto:${car.contact_email}`} className="text-charcoal hover:text-teal transition-colors break-all">
                    {car.contact_email}
                  </a>
                </div>
              </div>

              {/* Gmail compose — opens in new tab */}
              <a
                href={gmailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full"
              >
                Email seller
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>

              {/* WhatsApp seller — universal option */}
              <a
                href={`https://wa.me/${car.contact_phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi, I'm interested in your ${car.make} ${car.model} (£${Number(car.price).toLocaleString()}) listed on CarYard.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold py-2.5 rounded-lg hover:bg-[#1eb955] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp seller
              </a>

              {/* Call seller */}
              <a
                href={`tel:${car.contact_phone}`}
                className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-charcoal text-offwhite font-semibold py-2.5 rounded-lg hover:bg-asphalt transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0122 16.92z" />
                </svg>
                Call seller
              </a>

              <p className="text-xs text-asphalt/70 text-center mt-4">
                Always meet in a safe public location and inspect the car in person.
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