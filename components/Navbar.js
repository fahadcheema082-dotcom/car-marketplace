'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const navLinks = [
  { label: 'Browse Cars', href: '/listings' },
  { label: 'Sell a Car', href: '/seller' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

function CarLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
      {/* Background circle */}
      <rect width="40" height="40" rx="10" fill="url(#logo-gradient)" />

      {/* Car silhouette */}
      <g transform="translate(6, 11)">
        {/* Car body */}
        <path
          d="M3 14h2.5l1.5-3h14l1.5 3H25"
          stroke="#1C1F26"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Car roof */}
        <path
          d="M8.5 11L11 5h6l2.5 6"
          stroke="#1C1F26"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Windows */}
        <path
          d="M11.5 6L10 10h4V6h-2.5z"
          fill="#1C1F26"
          opacity="0.3"
        />
        <path
          d="M16.5 6L18 10h-4V6h2.5z"
          fill="#1C1F26"
          opacity="0.3"
        />
        {/* Front wheel */}
        <circle cx="9" cy="15" r="2.5" fill="#1C1F26" />
        <circle cx="9" cy="15" r="1" fill="#FFB020" />
        {/* Rear wheel */}
        <circle cx="19" cy="15" r="2.5" fill="#1C1F26" />
        <circle cx="19" cy="15" r="1" fill="#FFB020" />
      </g>

      {/* Gradient definition */}
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="#FFB020" />
          <stop offset="100%" stopColor="#FF8C00" />
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
        <Link href="/" className="flex items-center gap-2.5 group" onClick={() => setOpen(false)}>
          <div className="group-hover:scale-110 transition-transform duration-300">
            <CarLogo />
          </div>
          <div className="flex flex-col">
            <span className="display text-xl font-bold tracking-tight text-offwhite leading-none">
              Car<span className="text-amber">Yard</span>
            </span>
            <span className="text-[9px] text-offwhite/40 font-mono uppercase tracking-[0.2em] leading-none mt-0.5">
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