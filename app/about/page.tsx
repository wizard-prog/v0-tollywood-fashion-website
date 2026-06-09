import Image from "next/image"
import { Star } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col pt-24">
      {/* Hero Section */}
      <section className="relative h-80">
        <Image
          src="/placeholder.svg?height=400&width=1920"
          alt="About Tollywood Threads"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy-800/70 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Us</h1>
            <p className="text-white/90 max-w-2xl mx-auto px-4">
              The story behind Tollywood Threads and our mission to bring Telugu cinema fashion to life
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-navy-700">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Tollywood Threads was born from a passion for Telugu cinema and its distinctive fashion sensibilities.
                As avid fans of Tollywood, we noticed how the unique styles of iconic characters influenced fashion
                trends across India, yet there was no dedicated platform to explore and shop these looks.
              </p>
              <p className="text-gray-600 mb-4">
                Founded in 2023, we set out to bridge this gap by creating a curated platform that celebrates the rich
                fashion heritage of Telugu cinema and makes it accessible to fans and fashion enthusiasts alike.
              </p>
              <p className="text-gray-600">
                Our team of fashion experts and film aficionados work together to identify iconic looks from Telugu
                movies, source similar products from trusted retailers, and bring them to you in an easy-to-shop format.
              </p>
            </div>
            <div className="w-full md:w-1/2 relative h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/placeholder.svg?height=500&width=800"
                alt="Tollywood Threads Team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-navy-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-navy-700">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                At Tollywood Threads, our mission is to celebrate the rich fashion heritage of Telugu cinema and make
                iconic character styles accessible to fans and fashion enthusiasts worldwide.
              </p>
              <p className="text-gray-600 mb-4">
                We believe that fashion is a powerful form of self-expression, and the distinctive styles showcased in
                Telugu cinema offer a unique blend of traditional and contemporary elements that deserve to be
                celebrated.
              </p>
              <p className="text-gray-600">
                Through our platform, we aim to bridge the gap between screen and street, bringing Tollywood's vibrant
                fashion sensibilities to your everyday wardrobe while supporting the growth and recognition of Telugu
                cinema on a global scale.
              </p>
            </div>
            <div className="w-full md:w-1/2 relative h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
              <Image src="/placeholder.svg?height=500&width=800" alt="Our Mission" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center text-navy-700">Our Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-navy-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-navy-700">Authenticity</h3>
              <p className="text-gray-600">
                We strive to capture the essence of each character's style while making it wearable for everyday life.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-navy-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-navy-700">Accessibility</h3>
              <p className="text-gray-600">
                We believe cinema-inspired fashion should be accessible to all, regardless of budget or location.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-navy-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-navy-700">Cultural Celebration</h3>
              <p className="text-gray-600">
                We honor and celebrate the rich cultural heritage of Telugu cinema and its influence on fashion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center text-navy-700">Meet Our Team</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                <Image src="/placeholder.svg?height=150&width=150" alt="Team Member" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold mb-1 text-navy-700">Priya Reddy</h3>
              <p className="text-coral-500 mb-3">Founder & CEO</p>
              <p className="text-gray-600 text-sm">
                Fashion enthusiast and Tollywood aficionado with a vision to bring cinema fashion to everyday life.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                <Image src="/placeholder.svg?height=150&width=150" alt="Team Member" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold mb-1 text-navy-700">Ravi Kumar</h3>
              <p className="text-coral-500 mb-3">Creative Director</p>
              <p className="text-gray-600 text-sm">
                Former costume designer with a keen eye for translating on-screen looks to wearable fashion.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                <Image src="/placeholder.svg?height=150&width=150" alt="Team Member" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold mb-1 text-navy-700">Ananya Sharma</h3>
              <p className="text-coral-500 mb-3">Fashion Curator</p>
              <p className="text-gray-600 text-sm">
                Fashion blogger and stylist specializing in Indian cinema-inspired looks and trends.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                <Image src="/placeholder.svg?height=150&width=150" alt="Team Member" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold mb-1 text-navy-700">Karthik Naidu</h3>
              <p className="text-coral-500 mb-3">Tech Lead</p>
              <p className="text-gray-600 text-sm">
                Tech enthusiast and film buff who brings the Tollywood Threads experience to life online.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
