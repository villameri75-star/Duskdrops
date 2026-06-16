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

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <Image
            src="/images/logo.png"
            alt="Duskdrops logo"
            width={140}
            height={40}
            className="shrink-0"
            priority
          />
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
