import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { spotlightCharacters } from "@/lib/data"

export default function CharactersPage() {
  // Helper function to get character image path
  const getCharacterImagePath = (character) => {
    return `/images/characters/${character.actor.toLowerCase().replace(/\s+/g, "-")}-${character.movie
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .substring(0, 10)}.jpg`
  }

  return (
    <main className="flex min-h-screen flex-col pt-24">
      {/* Hero Banner */}
      <section className="relative h-64 md:h-80">
        <Image
          src="/images/banners/characters-banner.jpg"
          alt="Character Spotlight Banner"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy-800/70 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Character Spotlight</h1>
            <p className="text-white/90 max-w-2xl mx-auto px-4">
              Explore iconic Telugu cinema characters and their distinctive fashion styles
            </p>
          </div>
        </div>
      </section>

      {/* Character Grid */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-navy-700">All Characters</h2>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Filter by:</span>
              <select className="border rounded-md px-2 py-1">
                <option>All Actors</option>
                <option>Allu Arjun</option>
                <option>Mahesh Babu</option>
                <option>Prabhas</option>
                <option>Pawan Kalyan</option>
                <option>NTR</option>
                <option>Ram Charan</option>
                <option>Vijay Deverakonda</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {spotlightCharacters.map((character) => (
              <div
                key={character.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={character.image || getCharacterImagePath(character) || "/placeholder.svg"}
                    alt={character.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 to-transparent flex items-end p-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{character.name}</h3>
                      <p className="text-white/80">
                        {character.movie} • {character.actor}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-gray-600 mb-4">{character.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {character.lookTags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-navy-100 text-navy-700 text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={
                      character.name === "Komaram Bheem"
                        ? `/characters/komaram-bheem`
                        : `/collections?character=${encodeURIComponent(character.name)}`
                    }
                  >
                    <Button className="w-full bg-coral-500 hover:bg-coral-600 text-white">
                      {character.name === "Komaram Bheem" ? "View Character Profile" : "Shop This Look"}{" "}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Character Style Guide */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-10 text-center text-navy-700">Character Style Guide</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-navy-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-navy-700">How to Dress Like Your Favorite Character</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-coral-500 rounded-full flex items-center justify-center text-white mr-3">
                    1
                  </span>
                  <p className="text-gray-700">
                    Identify the key elements of your character's style (colors, patterns, fits)
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-coral-500 rounded-full flex items-center justify-center text-white mr-3">
                    2
                  </span>
                  <p className="text-gray-700">Look for similar pieces that capture the essence of the look</p>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-coral-500 rounded-full flex items-center justify-center text-white mr-3">
                    3
                  </span>
                  <p className="text-gray-700">Adapt the style to suit your body type and personal preferences</p>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-coral-500 rounded-full flex items-center justify-center text-white mr-3">
                    4
                  </span>
                  <p className="text-gray-700">Add personal touches to make the look your own</p>
                </li>
              </ul>
            </div>

            <div className="bg-navy-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-navy-700">Most Influential Character Styles</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-coral-500 rounded-full flex items-center justify-center text-white mr-3">
                    1
                  </span>
                  <p className="text-gray-700">
                    <span className="font-semibold">Pushpa Raj (Pushpa)</span> - Rugged look with floral shirts and
                    attitude
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-coral-500 rounded-full flex items-center justify-center text-white mr-3">
                    2
                  </span>
                  <p className="text-gray-700">
                    <span className="font-semibold">Arjun Reddy (Arjun Reddy)</span> - Rebellious style with bearded
                    look
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-coral-500 rounded-full flex items-center justify-center text-white mr-3">
                    3
                  </span>
                  <p className="text-gray-700">
                    <span className="font-semibold">Amarendra Baahubali (Baahubali)</span> - Royal warrior aesthetic
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-coral-500 rounded-full flex items-center justify-center text-white mr-3">
                    4
                  </span>
                  <p className="text-gray-700">
                    <span className="font-semibold">Komaram Bheem (RRR)</span> - Tribal-inspired authentic style
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
