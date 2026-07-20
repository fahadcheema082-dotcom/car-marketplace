'use client'
import { useState } from 'react'

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! Tell me what car you're looking for — e.g. \"SUV under £15,000 automatic\"." },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  async function sendMessage() {
    if (!input.trim()) return
    const newMessages = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })
      const data = await res.json()
      setMessages([...newMessages, { role: 'assistant', content: data.reply }])
    } catch (e) {
      setMessages([...newMessages, { role: 'assistant', content: "Sorry, something went wrong. Please try again." }])
    }
    setLoading(false)
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="w-80 h-96 bg-white rounded-lg shadow-2xl border border-asphalt/20 flex flex-col mb-3">
          <div className="bg-charcoal text-offwhite px-4 py-3 rounded-t-lg flex justify-between items-center">
            <span className="display font-semibold text-sm">Find your car</span>
            <button onClick={() => setOpen(false)} className="text-offwhite/70 hover:text-white">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm px-3 py-2 rounded-lg max-w-[85%] ${
                  m.role === 'user'
                    ? 'bg-amber text-charcoal ml-auto'
                    : 'bg-offwhite text-charcoal'
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && <div className="text-sm text-asphalt/60 px-3">Typing…</div>}
          </div>
          <div className="p-3 border-t border-asphalt/10 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about a car…"
              className="flex-1 text-sm border border-asphalt/20 rounded-md px-3 py-2 outline-none focus:border-amber"
            />
            <button
              onClick={sendMessage}
              className="bg-amber text-charcoal text-sm font-semibold px-3 py-2 rounded-md"
            >
              Send
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="bg-amber text-charcoal w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-2xl hover:scale-105 transition-transform"
        aria-label="Open chat"
      >
        💬
      </button>
    </div>
  )
}
