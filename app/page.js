import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Pricing from '@/components/Pricing'
import Testimonials from '@/components/Testimonials'
import Gallery from '@/components/Gallery'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Pricing />
      <Testimonials />
      <Gallery />
      <Footer />
    </main>
  )
}
