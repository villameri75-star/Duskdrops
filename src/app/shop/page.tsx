import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Browse all Duskdrops digital products — branding kits, social templates, logo packs and bundles.',
}

const categories = ['All', 'Branding', 'Social', 'Logos', 'Bundles']

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <div className="bg-apricot border-b border-dusk py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <p className="font-body text-xs text-sunset uppercase tracking-widest mb-2">All products</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-night">
            Shop the drop
          </h1>
        </div>
      </div>

      {/* Category filter */}
      <div className="border-b border-dusk bg-ivory sticky top-16 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1 py-3 overflow-x-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                className="font-body text-xs px-4 py-2 rounded-full border border-dusk text-earth hover:bg-apricot hover:text-night transition-colors whitespace-nowrap first:bg-night first:text-white first:border-night"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Placeholder products — se poblarán desde Lemon Squeezy */}
          {[...Array(8)].map((_, i) => (
            <div key={i} className="product-card">
              <div
                className="h-40 sm:h-48"
                style={{ background: `hsl(${20 + i * 15}, 40%, ${85 - i * 2}%)` }}
              />
              <div className="p-3">
                <p className="font-body text-xs font-medium text-night mb-1">
                  Product name
                </p>
                <p className="font-display text-base font-bold text-sunset">$27</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
