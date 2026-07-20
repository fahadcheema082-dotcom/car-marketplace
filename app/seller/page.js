'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function SellerPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    make: '', model: '', year: '', price: '', mileage: '',
    transmission: 'Manual', fuel_type: 'Petrol', location: '',
    contact_phone: '', contact_email: '', description: '',
  })
  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleFileChange(e) {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)

    let image_url = null
    if (imageFile) {
      const fileName = `${Date.now()}-${imageFile.name}`
      const { error: uploadError } = await supabase.storage
        .from('car-images')
        .upload(fileName, imageFile)
      if (!uploadError) {
        const { data } = supabase.storage.from('car-images').getPublicUrl(fileName)
        image_url = data.publicUrl
      }
    }

    const { error } = await supabase.from('listings').insert([{ ...form, image_url }])

    setSubmitting(false)
    if (!error) {
      setSuccess(true)
      setTimeout(() => router.push('/listings'), 1200)
    } else {
      alert('Something went wrong: ' + error.message)
    }
  }

  return (
    <main>
      {/* Header */}
      <section className="bg-charcoal text-offwhite relative overflow-hidden">
        <div className="hero-grid-overlay" />
        <div className="hero-blob" style={{ width: 260, height: 260, background: '#FFB020', top: '-40px', right: '5%' }} />

        <div className="relative z-10 max-w-3xl mx-auto px-5 py-12 md:py-14">
          <div className="fade-up">
            <span className="section-eyebrow">List your vehicle</span>
          </div>
          <h1 className="fade-up anim-delay-1 display text-4xl md:text-5xl font-bold tracking-tight">
            Sell your car
          </h1>
          <p className="fade-up anim-delay-2 text-offwhite/65 mt-3 max-w-xl">
            Fill in the details below — takes about 2 minutes. Your listing will appear immediately.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="max-w-3xl mx-auto px-5 py-10">
        {success ? (
          <div className="bg-teal/10 border-2 border-teal/30 rounded-2xl p-8 text-center fade-up">
            <div className="w-16 h-16 rounded-full bg-teal/20 flex items-center justify-center mx-auto mb-4">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#0F5C5C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="display text-2xl font-bold text-teal mb-2">Listing added!</p>
            <p className="text-asphalt">Redirecting you to browse listings...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Car details */}
            <div className="bg-white border border-asphalt/10 rounded-2xl p-6 shadow-sm">
              <div className="mb-5">
                <span className="section-eyebrow" style={{ color: '#0F5C5C' }}>Step 1</span>
                <h2 className="display text-xl font-semibold text-charcoal">Car details</h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-asphalt uppercase tracking-wider mb-1.5">Make</label>
                    <input required name="make" placeholder="e.g. Toyota" onChange={handleChange} className="input" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-asphalt uppercase tracking-wider mb-1.5">Model</label>
                    <input required name="model" placeholder="e.g. Corolla" onChange={handleChange} className="input" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-asphalt uppercase tracking-wider mb-1.5">Year</label>
                    <input required name="year" type="number" placeholder="2020" onChange={handleChange} className="input" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-asphalt uppercase tracking-wider mb-1.5">Price (£)</label>
                    <input required name="price" type="number" placeholder="5000" onChange={handleChange} className="input" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-asphalt uppercase tracking-wider mb-1.5">Mileage</label>
                    <input required name="mileage" type="number" placeholder="45000" onChange={handleChange} className="input" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-asphalt uppercase tracking-wider mb-1.5">Transmission</label>
                    <select name="transmission" onChange={handleChange} className="input">
                      <option>Manual</option>
                      <option>Automatic</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-asphalt uppercase tracking-wider mb-1.5">Fuel type</label>
                    <select name="fuel_type" onChange={handleChange} className="input">
                      <option>Petrol</option>
                      <option>Diesel</option>
                      <option>Hybrid</option>
                      <option>Electric</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-asphalt uppercase tracking-wider mb-1.5">Location</label>
                  <input required name="location" placeholder="e.g. Manchester" onChange={handleChange} className="input" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-asphalt uppercase tracking-wider mb-1.5">Description</label>
                  <textarea
                    name="description"
                    placeholder="Tell buyers about the car — condition, service history, features, etc."
                    rows={5}
                    onChange={handleChange}
                    className="input resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Photo */}
            <div className="bg-white border border-asphalt/10 rounded-2xl p-6 shadow-sm">
              <div className="mb-5">
                <span className="section-eyebrow" style={{ color: '#0F5C5C' }}>Step 2</span>
                <h2 className="display text-xl font-semibold text-charcoal">Car photo</h2>
              </div>

              <label className="block border-2 border-dashed border-asphalt/25 rounded-xl p-6 text-center cursor-pointer hover:border-amber hover:bg-amber/5 transition-colors">
                {previewUrl ? (
                  <div>
                    <img src={previewUrl} alt="Preview" className="max-h-56 mx-auto rounded-lg" />
                    <p className="mt-3 text-sm text-teal font-medium">Click to change photo</p>
                  </div>
                ) : (
                  <div>
                    <div className="w-12 h-12 rounded-full bg-amber/15 flex items-center justify-center mx-auto mb-3">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFB020" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                    </div>
                    <p className="text-charcoal font-medium">Click to upload a photo</p>
                    <p className="text-xs text-asphalt mt-1">JPG, PNG — one photo for now</p>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
            </div>

            {/* Section 3: Contact */}
            <div className="bg-white border border-asphalt/10 rounded-2xl p-6 shadow-sm">
              <div className="mb-5">
                <span className="section-eyebrow" style={{ color: '#0F5C5C' }}>Step 3</span>
                <h2 className="display text-xl font-semibold text-charcoal">Contact info</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-asphalt uppercase tracking-wider mb-1.5">Phone</label>
                  <input required name="contact_phone" placeholder="+44 ..." onChange={handleChange} className="input" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-asphalt uppercase tracking-wider mb-1.5">Email</label>
                  <input required name="contact_email" type="email" placeholder="you@email.com" onChange={handleChange} className="input" />
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              disabled={submitting}
              className="btn-primary w-full !py-4 !text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M21 12a9 9 0 11-6.219-8.56" />
                  </svg>
                  Adding your listing...
                </>
              ) : (
                <>
                  Publish listing
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </button>

            <p className="text-xs text-asphalt/70 text-center">
              By publishing, you confirm the details are accurate to the best of your knowledge.
            </p>
          </form>
        )}
      </section>
    </main>
  )
}