import type { Metadata } from 'next'
import EmailCapture from '@/components/sections/EmailCapture'

export const metadata: Metadata = {
  title: 'Early access',
  description: 'Join the Duskdrops waitlist and get 30% off every launch.',
}

export default function EarlyAccessPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-apricot py-16 px-4 sm:px-6 text-center border-b border-dusk">
        <div className="max-w-xl mx-auto">
          <span className="text-sunset text-sm">✦</span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-night mt-3 mb-4">
            Be the first to drop in
          </h1>
          <p className="font-body text-base text-earth leading-relaxed">
            New branding kits and design assets land here first.
            Early subscribers get <strong className="text-sunset">30% off</strong> every launch, forever.
          </p>
        </div>
      </div>

      <EmailCapture />

      {/* Beneficios */}
      <div className="bg-ivory py-14 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { icon: '🎁', title: '30% off every drop', body: 'Early subscribers get permanent early-bird pricing on every new product.' },
              { icon: '⚡', title: 'First access', body: 'New kits go to the list first — 48h before public launch.' },
              { icon: '✦',  title: 'No spam', body: 'One email per drop, that\'s it. Unsubscribe any time.' },
            ].map((b) => (
              <div key={b.title}>
                <div className="text-3xl mb-3">{b.icon}</div>
                <p className="font-display text-xl font-bold text-night mb-2">{b.title}</p>
                <p className="font-body text-sm text-earth leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
