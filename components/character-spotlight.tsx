import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Character } from "@/lib/types"

export function CharacterSpotlight({ character }: { character: Character }) {
  // Construct image path based on character name and actor
  const getCharacterImagePath = () => {
    // Use the direct image path for Pushpa Raj
    if (character.name === "Pushpa Raj") {
      return "/images/characters/allu-arjun-pushpa.jpg"
    }

    // For other characters, use the existing logic
    return `/images/characters/${character.actor.toLowerCase().replace(/\s+/g, "-")}-${character.movie
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .substring(0, 10)}.jpg`
  }

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative w-full md:w-2/5 h-64 md:h-auto">
        <Image src={getCharacterImagePath() || "/placeholder.svg"} alt={character.name} fill className="object-cover" />
      </div>

      <div className="p-6 flex-1">
        <h3 className="text-2xl font-bold mb-2 text-navy-700">{character.name}</h3>
        <p className="text-coral-500 mb-4">
          {character.movie} • {character.style}
        </p>
        <p className="text-gray-600 mb-6">{character.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {character.lookTags.map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-navy-100 text-navy-700 text-sm rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <Button variant="outline" className="border-coral-500 text-coral-500 hover:bg-coral-500 hover:text-white">
          Shop This Look <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default CharacterSpotlight
