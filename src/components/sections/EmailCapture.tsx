'use client'

import { useState } from 'react'

export default function EmailCapture() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setStatus('error')
      setMessage('Please enter a valid email address.')
      return
    }

    setStatus('loading')

    try {
      // TODO: conectar con Brevo API — endpoint /api/subscribe
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setStatus('success')
        setMessage("You're on the list ✦ We'll drop you a note soon.")
        setEmail('')
      } else {
        throw new Error('Subscription failed')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Try again in a moment.')
    }
  }

  return (
    <section className="bg-night py-20 px-4 sm:px-6">
      <div className="max-w-xl mx-auto text-center">

        <span className="text-sunset text-sm" aria-hidden="true">✦</span>

        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-3 mb-3">
          Get early access drops
        </h2>
        <p className="font-body text-sm text-cream/70 mb-8 leading-relaxed">
          New kits land first in your inbox. Early subscribers get{' '}
          <span className="text-sunset font-medium">30% off</span> every launch.
          No spam, ever — unsubscribe any time.
        </p>

        {status === 'success' ? (
          <div className="bg-pine/20 border border-pine/30 rounded-2xl px-6 py-4">
            <p className="font-body text-sm text-white">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-cream/40 font-body text-sm focus:outline-none focus:border-sunset transition-colors"
              disabled={status === 'loading'}
              aria-label="Email address"
              required
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary text-sm shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Joining…' : 'Join the drop'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="font-body text-xs text-red-400 mt-3">{message}</p>
        )}

        <p className="font-body text-xs text-cream/30 mt-6">
          By joining you agree to our{' '}
          <a href="/legal/privacy" className="underline hover:text-cream/60 transition-colors">
            privacy policy
          </a>
          . Unsubscribe any time.
        </p>
      </div>
    </section>
  )
}
