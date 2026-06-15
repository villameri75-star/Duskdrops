import type { Metadata } from 'next'
import Link from 'next/link'

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
  }
}

export default function ProductPage({ params }: Props) {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* Galería */}
          <div className="space-y-3">
            <div className="aspect-square rounded-3xl bg-apricot flex items-center justify-center text-8xl">
              🌅
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((n) => (
                <div key={n} className="aspect-square rounded-2xl bg-peach" />
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="sticky top-24">
            <p className="font-body text-xs text-sunset uppercase tracking-widest mb-2">Branding Kit</p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-night mb-4">
              {params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </h1>

            <p className="font-display text-4xl font-bold text-sunset mb-6">$27</p>

            <p className="font-body text-sm text-earth leading-relaxed mb-6">
              A complete branding kit designed for faceless creators. Includes logo variations,
              color palette, typography guide, and 20+ social media templates — all editable in Canva.
            </p>

            {/* Qué incluye */}
            <div className="bg-apricot rounded-2xl p-5 mb-6">
              <p className="font-body text-xs font-semibold text-earth uppercase tracking-wider mb-3">
                What's inside
              </p>
              <ul className="space-y-2">
                {[
                  '20+ Canva templates (Instagram, TikTok, Pinterest)',
                  'Logo pack — 5 variations (SVG + PNG)',
                  'Color palette guide',
                  'Typography pairing guide',
                  'Brand style guide PDF',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 font-body text-sm text-earth">
                    <span className="text-sunset mt-0.5 shrink-0">✦</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA — Lemon Squeezy */}
            <a
              href="https://duskdrops.lemonsqueezy.com/checkout/buy/0c56d0fb-79e5-4425-858c-afe8db9adbeb"
              target="_blank"
rel="noopener noreferrer"
              className="btn-primary w-full text-base mb-3 justify-center"
            >
              Buy now — $27
            </a>
            <p className="font-body text-xs text-earth text-center">
              Instant download ✦ Canva ready ✦ Secure checkout via Lemon Squeezy
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
