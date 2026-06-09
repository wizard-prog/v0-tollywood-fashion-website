import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { products } from "@/lib/data"

export default function PushpaRajPage() {
  // Filter products related to Pushpa Raj
  const pushpaProducts = products.filter((product) => product.character === "Pushpa Raj")

  return (
    <main className="flex min-h-screen flex-col pt-24">
      {/* Hero Banner */}
      <section className="relative h-[60vh]">
        <Image
          src="/images/characters/allu-arjun-pushpa.jpg"
          alt="Pushpa Raj"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Pushpa Raj</h1>
            <p className="text-xl text-white/90 max-w-2xl">
              The iconic style of Allu Arjun from Pushpa: The Rise that revolutionized fashion trends across India
            </p>
          </div>
        </div>
      </section>

      {/* Character Details */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold mb-6 text-navy-700">The Pushpa Raj Style</h2>
              <p className="text-gray-700 mb-6">
                Pushpa Raj, portrayed by Allu Arjun in the blockbuster "Pushpa: The Rise," created a fashion revolution
                with his distinctive rugged look. The character's style is defined by bold embroidered shirts, often in
                rich colors like burgundy and deep red, paired with dark trousers and statement accessories.
              </p>
              <p className="text-gray-700 mb-6">
                What makes this look iconic is the attention to detail - from the perfectly styled beard and tousled
                hair to the layered gold chains and rings. The style represents a perfect blend of rugged masculinity
                with flamboyant elements that showcase confidence and attitude.
              </p>

              <h3 className="text-2xl font-bold mt-8 mb-4 text-navy-700">Style Elements</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-coral-600 mb-2">Signature Shirts</h4>
                  <p className="text-gray-700">
                    Embroidered shirts with distinctive patterns, often with deep V-necks that showcase layered jewelry
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-coral-600 mb-2">Rugged Beard</h4>
                  <p className="text-gray-700">
                    The perfectly maintained beard with styled mustache became a trend among young men across India
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-coral-600 mb-2">Gold Accessories</h4>
                  <p className="text-gray-700">
                    Multiple gold chains, bracelets, and rings that add a flamboyant touch to the otherwise rugged look
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-bold text-coral-600 mb-2">Statement Belt</h4>
                  <p className="text-gray-700">
                    Large belt buckles and leather belts that add character to the simple trouser combinations
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-bold mt-8 mb-4 text-navy-700">Behind The Style</h3>
              <p className="text-gray-700 mb-6">
                Costume designer Miroslaw Brozek worked closely with Allu Arjun to create this distinctive look. The
                character's style evolution was carefully planned to reflect his journey from a humble laborer to a
                powerful smuggler. The red shirt became so iconic that it sparked a trend of "Pushpa shirts" across
                fashion markets in India.
              </p>
              <p className="text-gray-700 mb-6">
                Allu Arjun's commitment to the character included growing and maintaining the specific beard style for
                months during filming, which further cemented the look's authenticity and appeal.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-4 text-navy-700">Character Profile</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700">Actor</h4>
                  <p className="text-coral-600">Allu Arjun</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700">Movie</h4>
                  <p className="text-coral-600">Pushpa: The Rise (2021)</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700">Director</h4>
                  <p className="text-coral-600">Sukumar</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700">Style</h4>
                  <p className="text-coral-600">Rugged & Raw</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700">Signature Look</h4>
                  <p className="text-coral-600">Embroidered shirts, layered gold chains, styled beard</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700">Famous Dialogue</h4>
                  <p className="italic text-gray-700">"Pushpa naam sunke flower samjhe kya? Fire hai main!"</p>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-semibold text-gray-700 mb-2">Style Tags</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-navy-100 text-navy-700 text-sm rounded-full">Embroidered Shirts</span>
                  <span className="px-3 py-1 bg-navy-100 text-navy-700 text-sm rounded-full">Rugged</span>
                  <span className="px-3 py-1 bg-navy-100 text-navy-700 text-sm rounded-full">Earthy Tones</span>
                  <span className="px-3 py-1 bg-navy-100 text-navy-700 text-sm rounded-full">Bearded Look</span>
                  <span className="px-3 py-1 bg-navy-100 text-navy-700 text-sm rounded-full">Gold Accessories</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-navy-700">Shop Pushpa Raj's Style</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pushpaProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
              >
                <div className="relative h-64">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-navy-700">{product.name}</h3>
                  <p className="text-coral-500 font-semibold mb-2">₹{product.price}</p>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer" className="block w-full">
                    <Button className="w-full bg-coral-500 hover:bg-coral-600 text-white">
                      Buy Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/collections/pushpa">
              <Button className="bg-navy-700 hover:bg-navy-800 text-white">View Full Pushpa Collection</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Style Guide */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-navy-700">How to Style Like Pushpa Raj</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-navy-700">Essential Items</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-coral-500 rounded-full flex items-center justify-center text-white mr-3">
                    1
                  </span>
                  <p className="text-gray-700">
                    <span className="font-semibold">Embroidered shirt</span> - Look for shirts with bold patterns and
                    deep colors
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-coral-500 rounded-full flex items-center justify-center text-white mr-3">
                    2
                  </span>
                  <p className="text-gray-700">
                    <span className="font-semibold">Dark trousers</span> - Preferably black or navy blue with a relaxed
                    fit
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-coral-500 rounded-full flex items-center justify-center text-white mr-3">
                    3
                  </span>
                  <p className="text-gray-700">
                    <span className="font-semibold">Statement belt</span> - With a large, distinctive buckle
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-coral-500 rounded-full flex items-center justify-center text-white mr-3">
                    4
                  </span>
                  <p className="text-gray-700">
                    <span className="font-semibold">Layered gold chains</span> - Multiple chains of varying lengths
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-coral-500 rounded-full flex items-center justify-center text-white mr-3">
                    5
                  </span>
                  <p className="text-gray-700">
                    <span className="font-semibold">Rugged boots</span> - Dark colored with a worn-in look
                  </p>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-navy-700">Styling Tips</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-coral-500 rounded-full flex items-center justify-center text-white mr-3">
                    1
                  </span>
                  <p className="text-gray-700">
                    Leave the top buttons of your shirt open to showcase the layered chains
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-coral-500 rounded-full flex items-center justify-center text-white mr-3">
                    2
                  </span>
                  <p className="text-gray-700">Roll up your sleeves slightly for a more casual, rugged appearance</p>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-coral-500 rounded-full flex items-center justify-center text-white mr-3">
                    3
                  </span>
                  <p className="text-gray-700">Maintain a well-groomed beard with slightly longer length at the chin</p>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-coral-500 rounded-full flex items-center justify-center text-white mr-3">
                    4
                  </span>
                  <p className="text-gray-700">Add multiple rings on different fingers for the complete Pushpa look</p>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-coral-500 rounded-full flex items-center justify-center text-white mr-3">
                    5
                  </span>
                  <p className="text-gray-700">Complete the look with tinted sunglasses for that extra attitude</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
