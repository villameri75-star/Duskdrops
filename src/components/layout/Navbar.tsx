'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { label: 'Shop',           href: '/shop' },
  { label: 'Collections',    href: '/shop#collections' },
  { label: 'Early access',   href: '/early-access' },
  { label: 'About',          href: '/about' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-ivory/95 backdrop-blur-sm border-b border-dusk">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

        {/* Logo + nombre */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          {/*
            ╔══════════════════════════════════════════════════════╗
            ║  ESPACIO PARA EL LOGO DE DUSKDROPS                  ║
            ║  Cuando tengas el logo listo:                        ║
            ║  1. Guarda el archivo en /public/images/logo.svg     ║
            ║     (o logo.png si prefieres PNG)                    ║
            ║  2. Descomenta el bloque <Image> de abajo            ║
            ║  3. Ajusta width y height según el logo              ║
            ╚══════════════════════════════════════════════════════╝
          */}

          {/* Logo placeholder — reemplazar cuando esté listo */}
          <div
            className="w-8 h-8 rounded-lg border-2 border-dashed border-sunset/40 flex items-center justify-center text-sunset/60 text-xs font-body font-medium shrink-0 group-hover:border-sunset group-hover:text-sunset transition-colors duration-200"
            title="Logo Duskdrops — próximamente"
            aria-label="Logo placeholder"
          >
            ✦
          </div>

          {/*
          <Image
            src="/images/logo.svg"
            alt="Duskdrops logo"
            width={32}
            height={32}
            className="shrink-0"
            priority
          />
          */}

          <span className="font-display text-xl font-bold tracking-tight text-night">
            Dusk<span className="text-sunset">drops</span>
          </span>
        </Link>

        {/* Nav links — desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm text-earth hover:text-night transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA + lang toggle — desktop */}
        <div className="hidden md:flex items-center gap-3">
          <button className="font-body text-xs text-earth hover:text-night transition-colors">
            ES
          </button>
          <Link href="/early-access" className="btn-primary text-xs px-4 py-2">
            Get early access
          </Link>
        </div>

        {/* Hamburger — mobile */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-apricot transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          <span className="block w-5 h-0.5 bg-night mb-1 transition-transform duration-200" style={{ transform: menuOpen ? 'rotate(45deg) translate(2px, 3px)' : 'none' }} />
          <span className="block w-5 h-0.5 bg-night mb-1 transition-opacity duration-200" style={{ opacity: menuOpen ? 0 : 1 }} />
          <span className="block w-5 h-0.5 bg-night transition-transform duration-200" style={{ transform: menuOpen ? 'rotate(-45deg) translate(2px, -3px)' : 'none' }} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-ivory border-t border-dusk px-4 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-body text-sm text-earth hover:text-night py-1 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/early-access"
            onClick={() => setMenuOpen(false)}
            className="btn-primary text-sm mt-2 text-center"
          >
            Get early access
          </Link>
        </div>
      )}
    </header>
  )
}
