import HeroSection from '@/components/home/HeroSection'
import IntroEditorial from '@/components/home/IntroEditorial'
import FeaturedLibrary from '@/components/home/FeaturedLibrary'
import PhilosophyMethod from '@/components/home/PhilosophyMethod'
import ServicesPreview from '@/components/home/ServicesPreview'
import JournalPreview from '@/components/home/JournalPreview'
import FinalCTA from '@/components/home/FinalCTA'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroEditorial />
      <FeaturedLibrary />
      <PhilosophyMethod />
      <ServicesPreview />
      <JournalPreview />
      <FinalCTA />
    </>
  )
}
