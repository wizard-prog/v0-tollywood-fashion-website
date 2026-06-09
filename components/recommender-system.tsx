"use client"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { spotlightCharacters, featuredProducts } from "@/lib/data"
import type { Product } from "@/lib/types"
import Link from "next/link"

export default function RecommenderSystem() {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null)
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([])

  // Character recommendations mapping
  const characterRecommendations: Record<string, string[]> = {
    "Arjun Reddy": ["Vijay Govind", "Shiva", "Pandu"],
    "Pushpa Raj": ["Lucky", "Pandu", "Sanjay Sahu"],
    "Amarendra Baahubali": ["Kala Bhairava", "Rishi", "Nandu"],
    Pandu: ["Arjun Reddy", "Shiva", "Tony"],
    "Sanjay Sahu": ["Prabha", "Lucky", "Pushpa Raj"],
    Prabha: ["Siddhu", "Vijay Govind", "Sanjay Sahu"],
    Siddhu: ["Prabha", "Vijay Govind", "Rishi"],
    Nandu: ["Rishi", "Amarendra Baahubali", "Tony"],
    Tony: ["Pandu", "Nandu", "Arjun Reddy"],
    Seetha: ["Sita Mahalakshmi", "Shakuntala", "Bhanumathi"],
    Lucky: ["Pushpa Raj", "Sanjay Sahu", "Prabha"],
    "Kala Bhairava": ["Amarendra Baahubali", "Nandu", "Rishi"],
    "Vijay Govind": ["Siddhu", "Prabha", "Arjun Reddy"],
    Shiva: ["Arjun Reddy", "Pandu", "Tony"],
    Rishi: ["Nandu", "Siddhu", "Vijay Govind"],
    "Sita Mahalakshmi": ["Seetha", "Bhanumathi", "Shakuntala"],
  }

  const handleCharacterSelect = (characterId: string) => {
    setSelectedCharacter(characterId)

    // Find the character
    const character = spotlightCharacters.find((c) => c.id === characterId)

    if (character) {
      // Get recommended character names
      const recommendedCharacterNames = characterRecommendations[character.name] || []

      // Find products associated with recommended characters
      const recommendations = featuredProducts
        .filter((product) => recommendedCharacterNames.includes(product.character))
        .slice(0, 3)

      setRecommendedProducts(recommendations)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
      <h3 className="text-xl font-bold mb-6 text-navy-700">Find Your Style Match</h3>

      <div className="mb-8">
        <p className="text-gray-600 mb-4">Select a character whose style you love:</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {spotlightCharacters.slice(0, 10).map((character) => (
            <button
              key={character.id}
              onClick={() => handleCharacterSelect(character.id)}
              className={`p-2 rounded-lg transition-all ${
                selectedCharacter === character.id
                  ? "bg-purple-100 border-2 border-purple-500"
                  : "bg-gray-100 hover:bg-gray-200 border-2 border-transparent"
              }`}
            >
              <div className="relative w-full h-24 mb-2 rounded overflow-hidden">
                <Image src={character.image || "/placeholder.svg"} alt={character.name} fill className="object-cover" />
              </div>
              <p className="text-sm font-medium text-navy-700 truncate">{character.name}</p>
            </button>
          ))}
        </div>
      </div>

      {selectedCharacter && recommendedProducts.length > 0 && (
        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-4 text-navy-700">
            If you like {spotlightCharacters.find((c) => c.id === selectedCharacter)?.name}, you might also love:
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {recommendedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all"
              >
                <div className="relative h-48">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h5 className="font-medium text-navy-700 mb-1">{product.name}</h5>
                  <p className="text-sm text-gray-500 mb-2">
                    {product.character} from {product.movie}
                  </p>
                  <p className="text-coral-600 font-bold mb-3">₹{product.price}</p>
                  <Link href={`/collections/${product.id}`}>
                    <Button className="w-full bg-navy-700 hover:bg-navy-800 text-white">View Details</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
