import Anthropic from '@anthropic-ai/sdk'
import { supabase } from '@/lib/supabase'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req) {
  const { messages } = await req.json()

  // Pull a snapshot of current listings so the AI can recommend real cars
  const { data: cars } = await supabase.from('listings').select('*').limit(50)

  const carSummary = (cars || [])
    .map((c) => `${c.make} ${c.model} (${c.year}) - £${c.price} - ${c.mileage}mi - ${c.transmission} - ${c.location}`)
    .join('\n')

  const systemPrompt = `You are a friendly car-buying assistant for a UK car marketplace called CarYard.
Help the user find a car from the current listings below. Be concise and specific.
If nothing matches, say so honestly and suggest broadening the search.

Current listings:
${carSummary || 'No listings available yet.'}`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-5',
    max_tokens: 400,
    system: systemPrompt,
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
  })

  const reply = response.content.find((b) => b.type === 'text')?.text || "Sorry, I couldn't find anything."

  return Response.json({ reply })
}
