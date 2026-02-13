import Header from '@/components/Header'
import Hero from '@/components/Hero'
import WhatIsABLR from '@/components/WhatIsABLR'
import DesignedForEveryStage from '@/components/DesignedForEveryStage'
import TwoComplementaryWings from '@/components/TwoComplementaryWings'
import WhyABLRIsDifferent from '@/components/WhyABLRIsDifferent'
import Programmes from '@/components/Programmes'
import Quote from '@/components/Quote'
import WhatYouWillAchieve from '@/components/WhatYouWillAchieve'
import ExploreABLR from '@/components/ExploreABLR'
import Faculty from '@/components/Faculty'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import ScrollAnimation from '@/components/ScrollAnimation'
import ScrollToTop from '@/components/ScrollToTop'

export default function Home() {
  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <ScrollToTop />
      <Header />
      <Hero />
      <WhatIsABLR />
      <DesignedForEveryStage />
      <TwoComplementaryWings />
      <WhyABLRIsDifferent />
      <Programmes />
      <Quote />
      <WhatYouWillAchieve />
      <ExploreABLR />
      <Faculty />
      <Testimonials />
      <FAQ />
      <Newsletter />
      <Footer />
    </main>
  )
}


