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

function FooterCarLogo() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="10" fill="url(#footer-logo-grad)" />
      <g transform="translate(6, 11)">
        <path d="M3 14h2.5l1.5-3h14l1.5 3H25" stroke="#1C1F26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M8.5 11L11 5h6l2.5 6" stroke="#1C1F26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M11.5 6L10 10h4V6h-2.5z" fill="#1C1F26" opacity="0.3" />
        <path d="M16.5 6L18 10h-4V6h2.5z" fill="#1C1F26" opacity="0.3" />
        <circle cx="9" cy="15" r="2.5" fill="#1C1F26" />
        <circle cx="9" cy="15" r="1" fill="#FFB020" />
        <circle cx="19" cy="15" r="2.5" fill="#1C1F26" />
        <circle cx="19" cy="15" r="1" fill="#FFB020" />
      </g>
      <defs>
        <linearGradient id="footer-logo-grad" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="#FFB020" />
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
            <Link href="/" className="flex items-center gap-2.5 group mb-5 w-fit">
              <div className="group-hover:scale-110 transition-transform duration-300">
                <FooterCarLogo />
              </div>
              <div className="flex flex-col">
                <span className="display text-2xl font-bold tracking-tight leading-none">
                  Car<span className="text-amber">Yard</span>
                </span>
                <span className="text-[9px] text-offwhite/40 font-mono uppercase tracking-[0.2em] leading-none mt-0.5">
                  UK Marketplace
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