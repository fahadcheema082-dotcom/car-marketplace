'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const navLinks = [
  { label: 'Browse Cars', href: '/listings' },
  { label: 'Sell a Car', href: '/seller' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

function PremiumCarLogo() {
  return (
    <svg width="42" height="42" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Rounded square background with gradient */}
      <rect width="48" height="48" rx="12" fill="url(#premium-bg)" />
      
      {/* Subtle inner shadow/border */}
      <rect x="1" y="1" width="46" height="46" rx="11" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" fill="none" />

      {/* Sleek sports car - side profile */}
      <g transform="translate(5, 14)">
        {/* Car body - sleek aerodynamic shape */}
        <path
          d="M4 16 L7 16 L8 13 L12 13 L14 7 L16 5 L22 4 L28 5 L30 7 L31 10 L33 13 L35 13 L36 16 L38 16"
          stroke="#1C1F26"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="rgba(28,31,38,0.15)"
        />

        {/* Windshield */}
        <path
          d="M15 7.5 L17 5.5 L22 4.5 L26 5 L28 6.5 L29 9 L15 9 Z"
          fill="rgba(28,31,38,0.35)"
          stroke="#1C1F26"
          strokeWidth="0.8"
        />

        {/* Window divider */}
        <line x1="22" y1="4.8" x2="22" y2="9" stroke="#1C1F26" strokeWidth="0.8" />

        {/* Headlight front */}
        <ellipse cx="34" cy="12" rx="1.5" ry="1" fill="#1C1F26" />
        <ellipse cx="34" cy="12" rx="0.7" ry="0.5" fill="#FFB020" />

        {/* Tail light rear */}
        <ellipse cx="7" cy="13.5" rx="1.2" ry="0.8" fill="#cc3333" opacity="0.8" />

        {/* Door line */}
        <path d="M18 9 L18 13" stroke="#1C1F26" strokeWidth="0.6" opacity="0.5" />

        {/* Side accent line */}
        <path
          d="M9 13 L33 13"
          stroke="#1C1F26"
          strokeWidth="0.5"
          opacity="0.3"
        />

        {/* Side skirt line */}
        <path
          d="M10 14.5 L32 14.5"
          stroke="#1C1F26"
          strokeWidth="0.6"
          opacity="0.2"
        />

        {/* Front wheel */}
        <circle cx="13" cy="16" r="3.2" fill="#1C1F26" />
        <circle cx="13" cy="16" r="2" fill="#2a2a2a" />
        <circle cx="13" cy="16" r="1.2" fill="#FFB020" />
        <circle cx="13" cy="16" r="0.4" fill="#1C1F26" />
        {/* Wheel spokes */}
        <line x1="13" y1="14" x2="13" y2="14.8" stroke="#444" strokeWidth="0.4" />
        <line x1="13" y1="17.2" x2="13" y2="18" stroke="#444" strokeWidth="0.4" />
        <line x1="11" y1="16" x2="11.8" y2="16" stroke="#444" strokeWidth="0.4" />
        <line x1="14.2" y1="16" x2="15" y2="16" stroke="#444" strokeWidth="0.4" />

        {/* Rear wheel */}
        <circle cx="31" cy="16" r="3.2" fill="#1C1F26" />
        <circle cx="31" cy="16" r="2" fill="#2a2a2a" />
        <circle cx="31" cy="16" r="1.2" fill="#FFB020" />
        <circle cx="31" cy="16" r="0.4" fill="#1C1F26" />
        {/* Wheel spokes */}
        <line x1="31" y1="14" x2="31" y2="14.8" stroke="#444" strokeWidth="0.4" />
        <line x1="31" y1="17.2" x2="31" y2="18" stroke="#444" strokeWidth="0.4" />
        <line x1="29" y1="16" x2="29.8" y2="16" stroke="#444" strokeWidth="0.4" />
        <line x1="32.2" y1="16" x2="33" y2="16" stroke="#444" strokeWidth="0.4" />

        {/* Ground reflection line */}
        <line x1="8" y1="19.5" x2="36" y2="19.5" stroke="#1C1F26" strokeWidth="0.3" opacity="0.15" />
      </g>

      {/* Gradient definitions */}
      <defs>
        <linearGradient id="premium-bg" x1="0" y1="0" x2="48" y2="48">
          <stop offset="0%" stopColor="#FFBE2E" />
          <stop offset="50%" stopColor="#FFB020" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav-glass sticky top-0 z-50 ${scrolled ? 'scrolled' : ''}`}>
      <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
          <div className="group-hover:scale-105 transition-transform duration-300 drop-shadow-lg">
            <PremiumCarLogo />
          </div>
          <div className="flex flex-col">
            <span className="display text-[22px] font-bold tracking-tight text-offwhite leading-none">
              Car<span className="text-amber">Yard</span>
            </span>
            <span className="text-[9px] text-offwhite/45 font-mono uppercase tracking-[0.18em] leading-none mt-1">
              UK Marketplace
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-underline text-offwhite/85 hover:text-amber transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <Link href="/listings" className="btn-primary !py-2.5 !px-5 !text-sm">
            Find a Car
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden w-10 h-10 rounded-lg border border-white/15 flex items-center justify-center text-offwhite hover:border-amber hover:text-amber transition-colors"
          aria-label="Toggle menu"
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="lg:hidden border-t border-white/10 bg-charcoal/98 backdrop-blur-xl animate-slide-down">
          <nav className="max-w-6xl mx-auto px-5 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-offwhite/85 hover:text-amber px-3 py-3 rounded-lg hover:bg-white/5 transition-all"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/listings"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2"
            >
              Find a Car
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}