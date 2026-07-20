'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const navLinks = [
  { label: 'Browse Cars', href: '/listings' },
  { label: 'Sell a Car', href: '/seller' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

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
        <Link href="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <div className="w-10 h-10 rounded-lg bg-amber-gradient flex items-center justify-center shadow-amber-glow group-hover:scale-110 transition-transform duration-300">
            <span className="font-mono font-bold text-charcoal text-lg">C</span>
          </div>
          <span className="display text-2xl font-bold tracking-tight text-offwhite">
            Car<span className="text-amber">Yard</span>
          </span>
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