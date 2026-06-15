import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Duskdrops — tonos de paisaje y atardecer
        ivory:      '#FFFAF7', // Fondo principal
        apricot:    '#FBF3EC', // Fondo de cards y hero
        peach:      '#F0D9C4', // Secciones de acento suave / trust bar
        sunset:     '#D4956A', // CTA principal, botones, precios ← color firma
        lavender:   '#9B6B8A', // Badges, etiquetas, acento secundario
        pine:       '#5C7A6E', // Detalles, iconos, tercer acento
        night:      '#28242E', // Texto principal, navbar, footer
        earth:      '#6B5E54', // Texto secundario, subtítulos
        cream:      '#C4A882', // Texto placeholder y muted
        border:     '#EAD9C8', // Bordes sutiles
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '5xl': ['3rem',    { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        '4xl': ['2.25rem', { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        '3xl': ['1.875rem',{ lineHeight: '1.15', letterSpacing: '-0.01em' }],
        '2xl': ['1.5rem',  { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'xl':  ['1.25rem', { lineHeight: '1.4'  }],
        'lg':  ['1.125rem',{ lineHeight: '1.5'  }],
        'base':['1rem',    { lineHeight: '1.7'  }],
        'sm':  ['0.875rem',{ lineHeight: '1.6'  }],
        'xs':  ['0.75rem', { lineHeight: '1.5'  }],
      },
      borderRadius: {
        'xl':  '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      animation: {
        'marquee': 'marquee 22s linear infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
