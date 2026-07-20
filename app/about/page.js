import Link from 'next/link'

const values = [
  {
    title: 'Transparency first',
    desc: 'Clear listings, real details, and direct seller contact — no hidden layers.',
  },
  {
    title: 'Built for the UK',
    desc: 'Locations, pricing, and buyer expectations designed around the UK market.',
  },
  {
    title: 'No middlemen',
    desc: 'Buyers and sellers connect directly, making the process faster and fairer.',
  },
  {
    title: 'Premium experience',
    desc: 'A polished, modern platform that makes car shopping feel simple and enjoyable.',
  },
]

const milestones = [
  { year: '01', title: 'Search', desc: 'Find cars by make, model, price, fuel type, and transmission.' },
  { year: '02', title: 'Connect', desc: 'Contact the seller directly through phone or email.' },
  { year: '03', title: 'Inspect', desc: 'View the car in person, check documents, and agree the deal.' },
  { year: '04', title: 'Drive', desc: 'Complete the purchase and enjoy your new car.' },
]

export const metadata = {
  title: 'About CarYard — Premium UK Car Marketplace',
  description: 'Learn about CarYard, a premium UK car marketplace built for direct buying and selling.',
}

export default function AboutPage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative bg-charcoal text-offwhite overflow-hidden">
        <div className="hero-grid-overlay" />
        <div className="hero-blob" style={{ width: 380, height: 380, background: '#FFB020', top: '-90px', right: '10%' }} />
        <div className="hero-blob" style={{ width: 300, height: 300, background: '#0F5C5C', bottom: '-80px', left: '8%' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-5 py-20 md:py-28">
          <div className="max-w-3xl">
            <span className="plate-badge plate-badge-dark">ABOUT CARYARD</span>
            <h1 className="display text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight mt-6">
              A better way to
              <span className="block text-amber">buy and sell cars.</span>
            </h1>
            <p className="text-offwhite/70 text-lg md:text-xl mt-6 leading-relaxed max-w-2xl">
              CarYard is a premium UK-focused marketplace designed to make car buying and selling simpler,
              cleaner, and more direct — without middlemen, fees, or confusing experiences.
            </p>

            <div className="flex flex-wrap gap-3 mt-9">
              <Link href="/listings" className="btn-primary">
                Browse cars
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link href="/seller" className="btn-secondary">
                Sell your car
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="py-20 bg-offwhite">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-eyebrow">Our story</span>
              <h2 className="display text-3xl md:text-4xl font-bold text-charcoal tracking-tight">
                Designed to feel different from ordinary car websites.
              </h2>
              <p className="text-asphalt mt-5 leading-relaxed">
                Many car marketplaces feel crowded, outdated, and difficult to trust. CarYard was created
                with a different approach — clean design, direct communication, and a premium user experience.
              </p>
              <p className="text-asphalt mt-4 leading-relaxed">
                Whether someone is listing a family car, searching for a performance model, or browsing electric
                options, the experience should feel modern, fast, and trustworthy.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-white border border-asphalt/10 rounded-2xl p-5">
                  <p className="display text-3xl font-bold text-amber">0%</p>
                  <p className="text-sm text-asphalt mt-1">Platform fees</p>
                </div>
                <div className="bg-white border border-asphalt/10 rounded-2xl p-5">
                  <p className="display text-3xl font-bold text-amber">UK</p>
                  <p className="text-sm text-asphalt mt-1">Market focused</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-5 bg-amber/20 blur-3xl rounded-full" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white">
                <img
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80"
                  alt="Premium car"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="plate-badge">PREMIUM EXPERIENCE</span>
                  <p className="display text-2xl font-bold text-offwhite mt-3">
                    Built around trust, speed, and simplicity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-eyebrow justify-center" style={{ margin: '0 auto 0.75rem' }}>Our values</span>
            <h2 className="display text-3xl md:text-4xl font-bold text-charcoal tracking-tight">
              What CarYard stands for
            </h2>
            <p className="text-asphalt mt-3">
              Every part of the platform is shaped around making the car journey smoother.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value, i) => (
              <div key={value.title} className="bg-offwhite border border-asphalt/10 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all">
                <div className="w-11 h-11 rounded-xl bg-amber-gradient flex items-center justify-center display font-bold text-charcoal mb-4">
                  {i + 1}
                </div>
                <h3 className="display text-lg font-bold text-charcoal mb-2">{value.title}</h3>
                <p className="text-asphalt text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 bg-charcoal text-offwhite relative overflow-hidden">
        <div className="hero-grid-overlay" />
        <div className="relative z-10 max-w-6xl mx-auto px-5">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-eyebrow justify-center" style={{ margin: '0 auto 0.75rem' }}>The journey</span>
            <h2 className="display text-3xl md:text-4xl font-bold tracking-tight">
              From search to keys
            </h2>
            <p className="text-offwhite/65 mt-3">
              The process is designed to be clear from the first search to the final handshake.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {milestones.map((item) => (
              <div key={item.year} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-amber/40 transition-all">
                <p className="display text-4xl font-bold text-amber/70">{item.year}</p>
                <h3 className="display text-xl font-bold mt-4">{item.title}</h3>
                <p className="text-offwhite/65 text-sm leading-relaxed mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-amber-gradient">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="display text-3xl md:text-4xl font-bold text-charcoal">
            Ready to find your next car?
          </h2>
          <p className="text-charcoal/70 mt-3">
            Browse available listings or publish your own car in minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-7">
            <Link href="/listings" className="bg-charcoal text-offwhite font-semibold px-6 py-3 rounded-lg hover:bg-asphalt transition-colors">
              Browse cars
            </Link>
            <Link href="/seller" className="bg-white text-charcoal font-semibold px-6 py-3 rounded-lg hover:bg-offwhite transition-colors">
              Sell a car
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}