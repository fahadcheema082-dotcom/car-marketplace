'use client'
import { useState } from 'react'
import ContactSellerModal from './ContactSellerModal'

export default function ContactSellerButton({ car }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="btn-primary w-full"
      >
        Contact seller
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </button>

      <ContactSellerModal
        car={car}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  )
}