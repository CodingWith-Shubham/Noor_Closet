import { HeroSection } from '@/sections/HeroSection'
import { FeaturedCollections } from '@/sections/FeaturedCollections'
import { NewArrivals } from '@/sections/NewArrivals'
import { EditorialLookbook } from '@/sections/EditorialLookbook'
import { WhyNoor } from '@/sections/WhyNoor'
import { Gallery } from '@/sections/Gallery'
import { Testimonials } from '@/sections/Testimonials'
import { BrandStory } from '@/sections/BrandStory'
import { CTASection } from '@/sections/CTASection'
import { Footer } from '@/sections/Footer'

export default function Home() {
  return (
    <main className="bg-cream">
      <HeroSection />
      <FeaturedCollections />
      <NewArrivals />
      <EditorialLookbook />
      <WhyNoor />
      <Gallery />
      <Testimonials />
      <BrandStory />
      <CTASection />
      <Footer />
    </main>
  )
}
