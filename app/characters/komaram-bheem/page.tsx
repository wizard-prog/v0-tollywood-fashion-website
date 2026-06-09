import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function KomaramBheemPage() {
  return (
    <main className="flex min-h-screen flex-col pt-24">
      {/* Hero Banner */}
      <section className="relative h-80 md:h-96">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 to-navy-900/70">
          <div className="container mx-auto h-full flex items-center px-4">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Komaram Bheem</h1>
              <p className="text-white/90 text-lg mb-6">
                The tribal revolutionary from RRR whose strength and authenticity created a fashion statement
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["Tribal", "Rugged", "Earthy", "Revolutionary", "Authentic"].map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-white/20 text-white text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Image
          src="/images/characters/ntr-rrr.jpg"
          alt="Komaram Bheem from RRR"
          fill
          className="object-cover object-top -z-10"
          priority
        />
      </section>

      {/* Character Details */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-navy-700 mb-4">The Character</h2>
              <p className="text-gray-700 mb-4">
                Komaram Bheem, portrayed by NTR Jr. in S.S. Rajamouli's epic RRR, is a tribal leader fighting for the
                freedom of his people against British colonialism. His character combines raw physical strength with
                emotional depth and unwavering loyalty.
              </p>
              <p className="text-gray-700 mb-4">
                The character is inspired by the real-life tribal leader who fought against the Nizam of Hyderabad in
                the 1920s. In the film, Bheem's journey takes him to Delhi in search of a young girl from his tribe who
                was taken by British officials.
              </p>
              <p className="text-gray-700">
                His iconic line "Water is water, but blood is blood" captures the essence of his character - a man
                connected to nature but fiercely protective of his people.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-navy-700 mb-4">The Style</h2>
              <p className="text-gray-700 mb-4">
                Komaram Bheem's style in RRR is a masterful blend of tribal authenticity and practical workwear. His
                look evolves throughout the film, from traditional tribal attire to more adapted clothing as he
                navigates British-occupied Delhi.
              </p>
              <p className="text-gray-700 mb-4">Key elements of his style include:</p>
              <ul className="list-disc pl-5 text-gray-700 mb-4 space-y-2">
                <li>Navy blue workwear shirts with rolled-up sleeves</li>
                <li>Leather accents and shoulder pieces</li>
                <li>Cross-body leather straps and belts</li>
                <li>Traditional dhoti pants adapted for mobility</li>
                <li>Earthy tones that connect to his tribal roots</li>
                <li>Minimal but meaningful accessories</li>
              </ul>
              <p className="text-gray-700">
                The costume design for Bheem balances historical accuracy with cinematic impact, creating a look that's
                both authentic and visually striking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Style Elements */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-navy-700 mb-8 text-center">Key Style Elements</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-navy-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-navy-700 font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold text-navy-700 mb-2">Workwear Shirts</h3>
              <p className="text-gray-700">
                Durable navy blue shirts with practical details, often with sleeves rolled up to show strength and
                readiness for action.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-navy-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-navy-700 font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold text-navy-700 mb-2">Leather Accents</h3>
              <p className="text-gray-700">
                Distinctive leather shoulder pieces and straps that add a warrior-like quality while serving practical
                purposes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-navy-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-navy-700 font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold text-navy-700 mb-2">Traditional Dhoti</h3>
              <p className="text-gray-700">
                Modified traditional dhoti pants that honor his tribal roots while allowing the mobility needed for the
                character's action sequences.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-navy-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-navy-700 font-bold text-xl">4</span>
              </div>
              <h3 className="text-xl font-bold text-navy-700 mb-2">Natural Hairstyle</h3>
              <p className="text-gray-700">
                Curly, natural hair that represents his authentic tribal identity and connection to nature, contrasting
                with the more structured British styles.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-navy-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-navy-700 font-bold text-xl">5</span>
              </div>
              <h3 className="text-xl font-bold text-navy-700 mb-2">Earthy Color Palette</h3>
              <p className="text-gray-700">
                Colors drawn from nature - deep blues, browns, and earthy tones that reflect his connection to the
                forest and tribal heritage.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-navy-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-navy-700 font-bold text-xl">6</span>
              </div>
              <h3 className="text-xl font-bold text-navy-700 mb-2">Minimal Accessories</h3>
              <p className="text-gray-700">
                Purposeful accessories that each tell a story - from tribal markers to practical tools, nothing is
                purely decorative.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Shop the Look */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-navy-700 mb-8 text-center">Shop Komaram Bheem's Look</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-64">
                <Image
                  src="/images/products/rrr-komaram-bheem-dhoti.jpg"
                  alt="RRR Inspired Dhoti Set"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-navy-700">RRR Inspired Dhoti Set</h3>
                <p className="text-coral-500 mb-2">₹1,899</p>
                <p className="text-gray-600 text-sm mb-4">Traditional dhoti set inspired by NTR Jr's look in RRR</p>
                <Button className="w-full bg-coral-500 hover:bg-coral-600 text-white">Add to Cart</Button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-64">
                <Image
                  src="/placeholder.svg?height=500&width=400&text=Navy+Workwear+Shirt"
                  alt="Navy Blue Workwear Shirt"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-navy-700">Navy Blue Workwear Shirt</h3>
                <p className="text-coral-500 mb-2">₹1,499</p>
                <p className="text-gray-600 text-sm mb-4">Durable cotton shirt inspired by Bheem's iconic blue shirt</p>
                <Button className="w-full bg-coral-500 hover:bg-coral-600 text-white">Add to Cart</Button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-64">
                <Image
                  src="/placeholder.svg?height=500&width=400&text=Leather+Accessories"
                  alt="Leather Shoulder Strap"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-navy-700">Leather Shoulder Strap</h3>
                <p className="text-coral-500 mb-2">₹2,299</p>
                <p className="text-gray-600 text-sm mb-4">Authentic leather accessory inspired by Bheem's costume</p>
                <Button className="w-full bg-coral-500 hover:bg-coral-600 text-white">Add to Cart</Button>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/collections?character=Komaram%20Bheem">
              <Button size="lg" className="bg-navy-700 hover:bg-navy-800 text-white">
                View Full Collection <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Behind the Style */}
      <section className="py-12 bg-navy-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-navy-700 mb-8 text-center">Behind the Style</h2>

          <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
            <blockquote className="text-gray-700 text-lg italic mb-6">
              "For Bheem's character, we wanted to create a look that honored his tribal roots while showing his
              adaptability. The blue shirt represents the sky and freedom, while the leather elements connect to his
              strength and resilience."
            </blockquote>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-navy-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-navy-700 font-bold">SR</span>
              </div>
              <div>
                <p className="font-bold text-navy-700">S.S. Rajamouli</p>
                <p className="text-gray-600 text-sm">Director, RRR</p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-navy-700 mb-4">Cultural Significance</h3>
              <p className="text-gray-700">
                Komaram Bheem's style in RRR pays homage to the tribal communities of India, particularly the Gond
                tribe. The costume designers researched traditional tribal clothing while adapting elements to suit the
                character's journey and the film's narrative needs.
              </p>
              <p className="text-gray-700 mt-4">
                The character's look has sparked renewed interest in traditional tribal textiles and craftsmanship,
                bringing attention to these rich cultural traditions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-navy-700 mb-4">Fashion Impact</h3>
              <p className="text-gray-700">
                Following RRR's global success, elements of Komaram Bheem's style have influenced fashion trends,
                particularly the revival of workwear with traditional accents. The character's distinctive look has
                inspired designers to incorporate tribal elements into contemporary clothing.
              </p>
              <p className="text-gray-700 mt-4">
                The blue shirt with leather accents has become particularly iconic, with variations appearing in fashion
                collections across India and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
