import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="bg-apricot pt-16 pb-0 px-4 sm:px-6 text-center overflow-hidden">
      <div className="max-w-3xl mx-auto">

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 bg-white/60 border border-dusk rounded-full px-4 py-1.5 mb-8 animate-fade-up">
          <span className="text-sunset text-xs">✦</span>
          <span className="font-body text-xs text-earth tracking-wide">
            Digital design assets · Instant download · Canva ready
          </span>
        </div>

        {/* H1 */}
        <h1
          className="font-display text-5xl sm:text-6xl font-bold text-night mb-6 animate-fade-up"
          style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}
        >
          Beautiful brands<br />
          for{' '}
          <em className="not-italic text-sunset">faceless</em>
          {' '}creators
        </h1>

        {/* Subtitle */}
        <p
          className="font-body text-base sm:text-lg text-earth max-w-xl mx-auto mb-8 leading-relaxed animate-fade-up"
          style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}
        >
          Premium branding kits, social templates & design assets — made for
          creators who let their work speak for itself.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10 animate-fade-up"
          style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}
        >
          <Link href="/shop" className="btn-primary text-sm w-full sm:w-auto">
            Shop the drop
          </Link>
          <Link href="/early-access" className="btn-secondary text-sm w-full sm:w-auto">
            Get early access
          </Link>
        </div>

        {/* Social proof placeholder */}
        <p
          className="font-body text-xs text-cream mb-12 animate-fade-up"
          style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}
        >
          Join the waitlist — be among the first ✦
        </p>
      </div>
    </section>
  )
}
