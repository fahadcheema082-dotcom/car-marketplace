import Link from 'next/link'

const linkGroups = [
  {
    title: 'Marketplace',
    links: [
      { label: 'Browse cars', href: '/listings' },
      { label: 'Sell a car', href: '/seller' },
      { label: 'New arrivals', href: '/listings' },
      { label: 'Search cars', href: '/listings' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact us', href: '/contact' },
      { label: 'FAQ', href: '/#faq' },
      { label: 'Safety tips', href: '/contact' },
      { label: 'Seller support', href: '/contact' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About CarYard', href: '/about' },
      { label: 'Our mission', href: '/about' },
      { label: 'How it works', href: '/about' },
      { label: 'Testimonials', href: '/#testimonials' },
    ],
  },
]

const socials = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/1JLWBxUwJD/?mibextid=wwXIfr',
    icon: <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/asad_cheemaa_',
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
      </>
    ),
  },
]

function FooterPremiumLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 60 60" fill="none">
      <circle cx="30" cy="30" r="29" fill="#1C1F26" stroke="url(#f-ring-grad)" strokeWidth="1.5" />
      <circle cx="30" cy="30" r="26" fill="#1C1F26" />
      <circle cx="30" cy="30" r="26" stroke="#FFB020" strokeWidth="0.5" opacity="0.4" fill="none" />
      <path d="M 22 20 A 10 10 0 1 0 22 40" stroke="url(#f-letter-grad)" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 30 20 L 34 28 L 38 20 M 34 28 L 34 40" stroke="url(#f-letter-grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="30" cy="47" r="1.2" fill="#FFB020" />
      <path d="M 25 13 L 30 11 L 35 13" stroke="#FFB020" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.7" />
      <defs>
        <linearGradient id="f-ring-grad" x1="0" y1="0" x2="60" y2="60">
          <stop offset="0%" stopColor="#FFB020" />
          <stop offset="50%" stopColor="#FF8C00" />
          <stop offset="100%" stopColor="#FFB020" />
        </linearGradient>
        <linearGradient id="f-letter-grad" x1="0" y1="0" x2="0" y2="60">
          <stop offset="0%" stopColor="#FFD966" />
          <stop offset="50%" stopColor="#FFB020" />
          <stop offset="100%" stopColor="#FF8C00" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-charcoal text-offwhite relative overflow-hidden">
      <div className="hero-grid-overlay" />
      <div className="hero-blob" style={{ width: 320, height: 320, background: '#FFB020', top: '-80px', right: '15%', opacity: 0.15 }} />

      <div className="h-1 bg-amber-gradient" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 lg:gap-8">
          <div>
            <Link href="/" className="flex items-center gap-3 group mb-5 w-fit">
              <div className="group-hover:rotate-[360deg] transition-transform duration-700 ease-out">
                <FooterPremiumLogo />
              </div>
              <div className="flex flex-col">
                <span className="display text-2xl font-bold tracking-tight leading-none">
                  Car<span className="text-amber">Yard</span>
                </span>
                <span className="text-[9px] text-amber/70 font-mono uppercase tracking-[0.25em] leading-none mt-1.5">
                  Premium · UK
                </span>
              </div>
            </Link>

            <p className="text-offwhite/60 leading-relaxed max-w-sm mb-6">
              A premium UK marketplace for buying and selling cars — direct between owners, without fees or middlemen.
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="plate-badge">UK BASED</span>
              <span className="plate-badge">EST. 2025</span>
            </div>

            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-offwhite/70 hover:text-amber hover:border-amber hover:-translate-y-1 transition-all"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {linkGroups.map((group) => (
            <div key={group.title}>
              <h4 className="display font-semibold text-amber text-sm uppercase tracking-wider mb-4">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-offwhite/65 hover:text-offwhite hover:translate-x-1 inline-block transition-all text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="h-px bg-white/10 my-10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 text-sm text-offwhite/55">
            <p>© {year} CarYard. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <a href="#" className="hover:text-amber transition-colors">Privacy</a>
              <a href="#" className="hover:text-amber transition-colors">Terms</a>
              <a href="#" className="hover:text-amber transition-colors">Cookies</a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-offwhite/45 font-mono uppercase tracking-wider">
              Proudly built
            </span>
            <span className="plate-badge">🇬🇧 IN THE UK</span>
          </div>
        </div>
      </div>
    </footer>
  )
}