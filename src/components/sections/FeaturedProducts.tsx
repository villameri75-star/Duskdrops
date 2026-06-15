import Link from 'next/link'

// Productos placeholder — se reemplazarán con datos reales de Lemon Squeezy
const products = [
  {
    id: '1',
    slug: 'dusk-branding-kit',
    name: 'Dusk Branding Kit',
    price: 27,
    badge: 'New drop',
    badgeVariant: 'sunset' as const,
    // Color de fondo del thumb hasta que haya imagen real
    thumbBg: 'from-peach to-sunset/60',
    emoji: '🌅',
    category: 'Branding',
  },
  {
    id: '2',
    slug: 'golden-hour-social-pack',
    name: 'Golden Hour Social Pack',
    price: 17,
    badge: 'Bestseller',
    badgeVariant: 'lavender' as const,
    thumbBg: 'from-lavender/20 to-lavender/50',
    emoji: '✨',
    category: 'Social',
  },
  {
    id: '3',
    slug: 'forest-logo-bundle',
    name: 'Forest Logo Bundle',
    price: 37,
    badge: 'Bundle',
    badgeVariant: 'pine' as const,
    thumbBg: 'from-pine/20 to-pine/50',
    emoji: '🌿',
    category: 'Logos',
  },
  {
    id: '4',
    slug: 'creator-starter-kit',
    name: 'Creator Starter Kit',
    price: 47,
    badge: 'Most popular',
    badgeVariant: 'sunset' as const,
    thumbBg: 'from-peach to-lavender/30',
    emoji: '🎨',
    category: 'Bundle',
  },
  {
    id: '5',
    slug: 'noir-brand-kit',
    name: 'Noir Brand Kit',
    price: 27,
    badge: null,
    badgeVariant: 'sunset' as const,
    thumbBg: 'from-night/80 to-earth/60',
    emoji: '🖤',
    category: 'Branding',
  },
  {
    id: '6',
    slug: 'bloom-social-templates',
    name: 'Bloom Social Templates',
    price: 17,
    badge: null,
    badgeVariant: 'lavender' as const,
    thumbBg: 'from-peach to-sunset/30',
    emoji: '🌸',
    category: 'Social',
  },
]

const badgeClasses = {
  sunset:   'badge-sunset',
  lavender: 'badge-lavender',
  pine:     'badge-pine',
}

export default function FeaturedProducts() {
  return (
    <section className="bg-ivory py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-baseline justify-between mb-10">
          <div>
            <p className="font-body text-xs text-sunset uppercase tracking-widest mb-2">Latest drops</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-night">
              Shop the collection
            </h2>
          </div>
          <Link
            href="/shop"
            className="font-body text-sm text-sunset hover:text-earth transition-colors hidden sm:block"
          >
            View all →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/shop/${product.slug}`} className="product-card group">

              {/* Thumbnail — placeholder hasta tener imágenes reales */}
              <div className={`h-44 sm:h-52 bg-gradient-to-br ${product.thumbBg} flex items-center justify-center text-4xl`}>
                {product.emoji}
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="font-body text-sm font-medium text-night leading-snug">
                    {product.name}
                  </p>
                  {product.badge && (
                    <span className={`badge ${badgeClasses[product.badgeVariant]} shrink-0 text-xs`}>
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="font-display text-lg font-bold text-sunset">${product.price}</p>
                  <p className="font-body text-xs text-earth">{product.category}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile — ver todos */}
        <div className="mt-8 text-center sm:hidden">
          <Link href="/shop" className="btn-secondary text-sm">
            View all products
          </Link>
        </div>
      </div>
    </section>
  )
}
