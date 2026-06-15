import HeroSection from '@/components/sections/HeroSection'
import MarqueeSection from '@/components/sections/MarqueeSection'
import TrustBar from '@/components/sections/TrustBar'
import FeaturedProducts from '@/components/sections/FeaturedProducts'
import EmailCapture from '@/components/sections/EmailCapture'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <TrustBar />
      <FeaturedProducts />
      <EmailCapture />
    </>
  )
}
