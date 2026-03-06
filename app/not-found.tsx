import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="container max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-4 text-ablr-primary">
          404
        </h1>
        <p className="text-xl sm:text-2xl text-gray-700 mb-8">
          Page Not Found
        </p>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-ablr-primary text-white px-6 py-3 rounded-lg hover:bg-ablr-dark transition-colors"
        >
          Go Home
        </Link>
      </div>
      <Footer />
    </main>
  )
}






