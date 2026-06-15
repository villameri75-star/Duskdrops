import Link from 'next/link'

const footerLinks = {
  shop: [
    { label: 'Branding kits',      href: '/shop?cat=branding' },
    { label: 'Social templates',   href: '/shop?cat=social' },
    { label: 'Logo packs',         href: '/shop?cat=logos' },
    { label: 'Bundles',            href: '/shop?cat=bundles' },
  ],
  info: [
    { label: 'About Duskdrops',  href: '/about' },
    { label: 'How it works',     href: '/about#how-it-works' },
    { label: 'FAQ',              href: '/faq' },
    { label: 'Early access',     href: '/early-access' },
  ],
  legal: [
    { label: 'Privacy policy',  href: '/legal/privacy' },
    { label: 'Terms of use',    href: '/legal/terms' },
    { label: 'Refund policy',   href: '/legal/refunds' },
    { label: 'License terms',   href: '/legal/license' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-night text-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">

        {/* Top — logo + links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-10 border-b border-white/10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              {/* Logo placeholder — misma lógica que en Navbar */}
              <div className="w-7 h-7 rounded-md border border-sunset/40 flex items-center justify-center text-sunset/60 text-xs group-hover:border-sunset group-hover:text-sunset transition-colors">
                ✦
              </div>
              <span className="font-display text-lg font-bold text-white">
                Dusk<span className="text-sunset">drops</span>
              </span>
            </Link>
            <p className="font-body text-xs text-cream/70 leading-relaxed max-w-[180px]">
              Creative drops for bold brands. Digital assets, instant download.
            </p>
          </div>

          {/* Shop */}
          <div>
            <p className="font-body text-xs font-semibold text-white/50 uppercase tracking-widest mb-4">Shop</p>
            <ul className="space-y-2.5">
              {footerLinks.shop.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="font-body text-xs text-cream/70 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <p className="font-body text-xs font-semibold text-white/50 uppercase tracking-widest mb-4">Info</p>
            <ul className="space-y-2.5">
              {footerLinks.info.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="font-body text-xs text-cream/70 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="font-body text-xs font-semibold text-white/50 uppercase tracking-widest mb-4">Legal</p>
            <ul className="space-y-2.5">
              {footerLinks.legal.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="font-body text-xs text-cream/70 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-cream/40">
            © 2026 Duskdrops ✦ All rights reserved
          </p>
          <div className="flex items-center gap-4">
            <button className="font-body text-xs text-cream/40 hover:text-white transition-colors">EN</button>
            <button className="font-body text-xs text-cream/40 hover:text-white transition-colors">ES</button>
          </div>
        </div>
      </div>
    </footer>
  )
}
