# Duskdrops ✦

> Creative drops for bold brands — tienda de productos digitales bilingüe ES + EN

## Stack

- **Framework:** Next.js 14 (App Router)
- **Estilos:** Tailwind CSS con paleta personalizada Duskdrops
- **Tipografía:** Cormorant Garamond (display) + DM Sans (body) — Google Fonts
- **Pagos:** Lemon Squeezy
- **Email:** Brevo (ex Sendinblue)
- **Deploy:** Vercel

## Arrancar en local

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar variables de entorno
cp .env.example .env.local
# Edita .env.local con tus claves reales

# 3. Arrancar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

## Estructura del proyecto

```
src/
├── app/
│   ├── page.tsx              # Home
│   ├── layout.tsx            # Layout raíz (nav + footer)
│   ├── shop/
│   │   ├── page.tsx          # Tienda
│   │   └── [slug]/page.tsx   # Página de producto
│   ├── early-access/page.tsx # Lista de espera
│   ├── about/page.tsx        # Sobre Duskdrops (pendiente)
│   ├── legal/                # Páginas legales (pendientes)
│   └── api/
│       └── subscribe/route.ts # API Brevo
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── sections/
│       ├── HeroSection.tsx
│       ├── MarqueeSection.tsx
│       ├── TrustBar.tsx
│       ├── FeaturedProducts.tsx
│       └── EmailCapture.tsx
├── styles/
│   └── globals.css
└── lib/                      # Utilidades (pendiente)
```

## Añadir el logo

Cuando tengas el logo de Duskdrops listo:
1. Guarda el archivo en `/public/images/logo.svg` (SVG recomendado) o `logo.png`
2. Abre `src/components/layout/Navbar.tsx`
3. Descomenta el bloque `<Image>` y borra el placeholder `div`
4. Repite en `src/components/layout/Footer.tsx`

## Variables de entorno necesarias

| Variable | Dónde obtenerla |
|---|---|
| `BREVO_API_KEY` | dashboard.brevo.com → API Keys |
| `BREVO_LIST_ID` | Brevo → Contacts → Lists → ID de tu lista |
| `LEMONSQUEEZY_API_KEY` | app.lemonsqueezy.com → Settings → API |
| `LEMONSQUEEZY_STORE_ID` | app.lemonsqueezy.com → Settings → Store |

## Deploy en Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Añadir variables de entorno en Vercel Dashboard:
# Settings → Environment Variables → añade las mismas de .env.local
```

## Paleta de colores

| Nombre | Hex | Uso |
|---|---|---|
| Ivory | #FFFAF7 | Fondo principal |
| Apricot | #FBF3EC | Fondo cards / hero |
| Peach | #F0D9C4 | Secciones suaves |
| Sunset | #D4956A | CTA principal ← color firma |
| Lavender | #9B6B8A | Acento secundario |
| Pine | #5C7A6E | Tercer acento |
| Night | #28242E | Texto principal |
| Earth | #6B5E54 | Texto secundario |
