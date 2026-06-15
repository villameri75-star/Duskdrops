const items = [
  'Branding Kits',
  'Social Templates',
  'Logo Packs',
  'Canva Ready',
  'Instant Download',
  'ES + EN',
  'Faceless Brands',
  'Digital Assets',
]

export default function MarqueeSection() {
  // Duplicamos los items para el loop infinito sin salto visual
  const doubled = [...items, ...items]

  return (
    <div className="bg-peach border-y border-dusk overflow-hidden py-3 select-none">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="font-body text-xs font-medium text-earth tracking-wide px-5">
              {item}
            </span>
            <span className="text-sunset text-xs" aria-hidden="true">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
