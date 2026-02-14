import Header from '@/components/Header'
import About from '@/components/About'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import ScrollToTop from '@/components/ScrollToTop'

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <ScrollToTop />
      <Header />
      <About />
      <Footer />
    </main>
  )
}


