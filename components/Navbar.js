'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const navLinks = [
  { label: 'Browse Cars', href: '/listings' },
  { label: 'Sell a Car', href: '/seller' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

function PremiumLogo() {
  return (
    <svg width="44" height="44" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer ring — dark charcoal */}
      <circle cx="30" cy="30" r="29" fill="#1C1F26" stroke="url(#ring-grad)" strokeWidth="1.5" />

      {/* Inner dark plate */}
      <circle cx="30" cy="30" r="26" fill="#1C1F26" />

      {/* Amber outer accent ring */}
      <circle cx="30" cy="30" r="26" stroke="#FFB020" strokeWidth="0.5" opacity="0.4" fill="none" />

      {/* Center — Stylized "CY" monogram */}
      {/* Letter C — left side arc */}
      <path
        d="M 22 20 A 10 10 0 1 0 22 40"
        stroke="url(#letter-grad)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Letter Y — right side */}
      <path
        d="M 30 20 L 34 28 L 38 20 M 34 28 L 34 40"
        stroke="url(#letter-grad)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Small accent dot — signature touch */}
      <circle cx="30" cy="47" r="1.2" fill="#FFB020" />

      {/* Top laurel accent */}
      <path
        d="M 25 13 L 30 11 L 35 13"
        stroke="#FFB020"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />

      {/* Gradient definitions */}
      <defs>
        <linearGradient id="ring-grad" x1="0" y1="0" x2="60" y2="60">
          <stop offset="0%" stopColor="#FFB020" />
          <stop offset="50%" stopColor="#FF8C00" />
          <stop offset="100%" stopColor="#FFB020" />
        </linearGradient>
        <linearGradient id="letter-grad" x1="0" y1="0" x2="0" y2="60">
          <stop offset="0%" stopColor="#FFD966" />
          <stop offset="50%" stopColor="#FFB020" />
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
        <Link href="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
          <div className="group-hover:rotate-[360deg] transition-transform duration-700 ease-out drop-shadow-[0_2px_12px_rgba(255,176,32,0.35)]">
            <PremiumLogo />
          </div>
          <div className="flex flex-col">
            <span className="display text-[22px] font-bold tracking-tight text-offwhite leading-none">
              Car<span className="text-amber">Yard</span>
            </span>
            <span className="text-[9px] text-amber/70 font-mono uppercase tracking-[0.25em] leading-none mt-1.5">
              Premium · UK
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