"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { RefreshCw, Download, Share2, ShoppingBag, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { featuredProducts, spotlightCharacters } from "@/lib/data"
import type { Product, Character } from "@/lib/types"

type OutfitItem = {
  product: Product
  reason: string
}

type GeneratedOutfit = {
  tops: OutfitItem | null
  bottoms: OutfitItem | null
  footwear: OutfitItem | null
  accessories: OutfitItem | null
  description: string
  occasions: string[]
}

export default function AIOutfitGeneratorPage() {
  const searchParams = useSearchParams()
  const characterParam = searchParams.get("character")
  const styleParam = searchParams.get("style")

  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generatedOutfit, setGeneratedOutfit] = useState<GeneratedOutfit | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Find the character based on URL params
  useEffect(() => {
    if (characterParam) {
      const character = spotlightCharacters.find((char) => char.name === characterParam)
      if (character) {
        setSelectedCharacter(character)
      }
    }
  }, [characterParam])

  // Generate outfit based on character and style
  const generateOutfit = async () => {
    if (!selectedCharacter) return

    setIsGenerating(true)
    setGenerationProgress(0)
    setError(null)

    // Simulate progress
    const progressInterval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return prev
        }
        return prev + 5
      })
    }, 300)

    try {
      // For demo purposes, we'll create a mock outfit based on the character
      // In a real app, you would use the OpenAI API to generate the outfit

      // Find products related to the character
      const characterProducts = featuredProducts.filter(
        (product) => product.character === selectedCharacter.name || product.style.includes(selectedCharacter.style),
      )

      const tops = characterProducts.find(
        (p) => p.category.toLowerCase().includes("shirt") || p.category.toLowerCase().includes("kurta"),
      )

      const bottoms = characterProducts.find(
        (p) => p.category.toLowerCase().includes("denim") || p.category.toLowerCase().includes("dhoti"),
      )

      const accessories = characterProducts.find(
        (p) => p.category.toLowerCase().includes("accessories") || p.category.toLowerCase().includes("jewelry"),
      )

      // Create the outfit
      const outfit = {
        tops: tops
          ? {
              product: tops,
              reason: `This ${tops.name} perfectly captures ${selectedCharacter.name}'s signature style from ${selectedCharacter.movie}.`,
            }
          : null,
        bottoms: bottoms
          ? {
              product: bottoms,
              reason: `These bottoms complement the top and match ${selectedCharacter.name}'s iconic look.`,
            }
          : null,
        footwear: null,
        accessories: accessories
          ? {
              product: accessories,
              reason: `These accessories complete the ${selectedCharacter.name} inspired outfit.`,
            }
          : null,
        description: `This outfit captures the essence of ${selectedCharacter.name}'s iconic style from ${selectedCharacter.movie}, featuring the character's signature elements and aesthetic.`,
        occasions: ["Casual outings", "Fan events", "Themed parties"],
      }

      setGeneratedOutfit(outfit)
      setGenerationProgress(100)
    } catch (error) {
      console.error("Error generating outfit:", error)
      setError("Failed to generate outfit. Please try again.")

      // Create fallback outfit if AI fails
      if (selectedCharacter) {
        const characterProducts = featuredProducts.filter(
          (product) => product.character === selectedCharacter.name || product.style.includes(selectedCharacter.style),
        )

        const tops = characterProducts.find(
          (p) => p.category.toLowerCase().includes("shirt") || p.category.toLowerCase().includes("kurta"),
        )
        const bottoms = characterProducts.find(
          (p) => p.category.toLowerCase().includes("denim") || p.category.toLowerCase().includes("dhoti"),
        )

        if (tops || bottoms) {
          setGeneratedOutfit({
            tops: tops ? { product: tops, reason: `This matches ${selectedCharacter.name}'s signature style.` } : null,
            bottoms: bottoms
              ? { product: bottoms, reason: `Perfect complement to complete the ${selectedCharacter.name} look.` }
              : null,
            footwear: null,
            accessories: null,
            description: `This outfit captures the essence of ${selectedCharacter.name}'s iconic style from ${selectedCharacter.movie}, featuring the character's signature elements and aesthetic.`,
            occasions: ["Casual outings", "Fan events", "Themed parties"],
          })
        }
      }
    } finally {
      clearInterval(progressInterval)
      setIsGenerating(false)
    }
  }

  // Add all outfit items to cart
  const addOutfitToCart = () => {
    // Implementation would go here
    alert("Added outfit to cart!")
  }

  // Calculate total price of outfit
  const calculateTotalPrice = () => {
    if (!generatedOutfit) return 0

    let total = 0
    if (generatedOutfit.tops?.product) total += generatedOutfit.tops.product.price
    if (generatedOutfit.bottoms?.product) total += generatedOutfit.bottoms.product.price
    if (generatedOutfit.footwear?.product) total += generatedOutfit.footwear.product.price
    if (generatedOutfit.accessories?.product) total += generatedOutfit.accessories.product.price

    return total
  }

  return (
    <main className="flex min-h-screen flex-col pt-24">
      {/* Hero Section */}
      <section className="relative h-64">
        <Image src="/placeholder.svg?height=400&width=1920" alt="AI Outfit Generator" fill className="object-cover" />
        <div className="absolute inset-0 bg-navy-800/70 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">AI Outfit Generator</h1>
            <p className="text-white/90 max-w-2xl mx-auto px-4">
              Create complete character-inspired outfits with our AI stylist
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
              <h2 className="text-2xl font-bold text-navy-700 mb-6">Generate Your Character-Inspired Outfit</h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Character Selection */}
                <div className="lg:col-span-1">
                  <div className="bg-navy-50 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-navy-700 mb-4">Character Inspiration</h3>

                    {selectedCharacter ? (
                      <div className="space-y-4">
                        <div className="relative h-48 rounded-lg overflow-hidden">
                          <Image
                            src={selectedCharacter.image || "/placeholder.svg"}
                            alt={selectedCharacter.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div>
                          <h4 className="font-bold text-navy-700">{selectedCharacter.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {selectedCharacter.movie} • {selectedCharacter.actor}
                          </p>
                          <p className="text-sm text-gray-700 mb-3">{selectedCharacter.description}</p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {selectedCharacter.lookTags.map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-navy-100 text-navy-700 text-xs rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="pt-4 border-t border-gray-200">
                            <p className="text-sm font-medium text-navy-700 mb-2">Style: {selectedCharacter.style}</p>
                            {styleParam && styleParam !== selectedCharacter.style && (
                              <p className="text-sm text-coral-500 mb-2">Focusing on: {styleParam} elements</p>
                            )}
                          </div>

                          <div className="mt-4">
                            <Link href="/characters">
                              <Button variant="outline" className="w-full border-navy-300 text-navy-700">
                                Change Character
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Sparkles className="h-12 w-12 text-navy-300 mx-auto mb-4" />
                        <h4 className="text-lg font-medium text-navy-700 mb-2">No Character Selected</h4>
                        <p className="text-gray-600 mb-4">
                          Select a character to generate an outfit inspired by their style
                        </p>
                        <Link href="/characters">
                          <Button className="bg-navy-700 hover:bg-navy-800 text-white">Browse Characters</Button>
                        </Link>
                      </div>
                    )}

                    {selectedCharacter && !generatedOutfit && !isGenerating && (
                      <div className="mt-6">
                        <Button onClick={generateOutfit} className="w-full bg-coral-500 hover:bg-coral-600 text-white">
                          <Sparkles className="mr-2 h-4 w-4" /> Generate Outfit
                        </Button>
                      </div>
                    )}

                    {isGenerating && (
                      <div className="mt-6 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Generating your outfit...</span>
                          <span className="text-navy-700 font-medium">{generationProgress}%</span>
                        </div>
                        <Progress value={generationProgress} className="h-2" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Generated Outfit */}
                <div className="lg:col-span-2">
                  {error && !generatedOutfit && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                      <p className="text-red-600">{error}</p>
                    </div>
                  )}

                  {generatedOutfit ? (
                    <div className="space-y-6 animate-fade-in">
                      <div className="bg-navy-50 rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-xl font-bold text-navy-700">Your Generated Outfit</h3>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={generateOutfit}
                            className="border-navy-300 text-navy-700"
                          >
                            <RefreshCw className="mr-2 h-4 w-4" /> Regenerate
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                          {/* Tops */}
                          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                            <div className="relative h-48">
                              {generatedOutfit.tops ? (
                                <Image
                                  src={generatedOutfit.tops.product.image || "/placeholder.svg"}
                                  alt={generatedOutfit.tops.product.name}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                  <p className="text-gray-500 text-sm">No top selected</p>
                                </div>
                              )}
                            </div>
                            <div className="p-3">
                              <h4 className="font-medium text-navy-700 line-clamp-1">
                                {generatedOutfit.tops?.product.name || "Top"}
                              </h4>
                              {generatedOutfit.tops && (
                                <p className="text-sm text-gray-600 line-clamp-2 mt-1">{generatedOutfit.tops.reason}</p>
                              )}
                            </div>
                          </div>

                          {/* Bottoms */}
                          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                            <div className="relative h-48">
                              {generatedOutfit.bottoms ? (
                                <Image
                                  src={generatedOutfit.bottoms.product.image || "/placeholder.svg"}
                                  alt={generatedOutfit.bottoms.product.name}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                  <p className="text-gray-500 text-sm">No bottoms selected</p>
                                </div>
                              )}
                            </div>
                            <div className="p-3">
                              <h4 className="font-medium text-navy-700 line-clamp-1">
                                {generatedOutfit.bottoms?.product.name || "Bottoms"}
                              </h4>
                              {generatedOutfit.bottoms && (
                                <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                                  {generatedOutfit.bottoms.reason}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Footwear */}
                          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                            <div className="relative h-48">
                              {generatedOutfit.footwear ? (
                                <Image
                                  src={generatedOutfit.footwear.product.image || "/placeholder.svg"}
                                  alt={generatedOutfit.footwear.product.name}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                  <p className="text-gray-500 text-sm">No footwear selected</p>
                                </div>
                              )}
                            </div>
                            <div className="p-3">
                              <h4 className="font-medium text-navy-700 line-clamp-1">
                                {generatedOutfit.footwear?.product.name || "Footwear"}
                              </h4>
                              {generatedOutfit.footwear && (
                                <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                                  {generatedOutfit.footwear.reason}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Accessories */}
                          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                            <div className="relative h-48">
                              {generatedOutfit.accessories ? (
                                <Image
                                  src={generatedOutfit.accessories.product.image || "/placeholder.svg"}
                                  alt={generatedOutfit.accessories.product.name}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                  <p className="text-gray-500 text-sm">No accessories selected</p>
                                </div>
                              )}
                            </div>
                            <div className="p-3">
                              <h4 className="font-medium text-navy-700 line-clamp-1">
                                {generatedOutfit.accessories?.product.name || "Accessories"}
                              </h4>
                              {generatedOutfit.accessories && (
                                <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                                  {generatedOutfit.accessories.reason}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 mb-6">
                          <h4 className="font-medium text-navy-700 mb-2">Outfit Description</h4>
                          <p className="text-gray-700">{generatedOutfit.description}</p>

                          <div className="mt-4">
                            <h4 className="font-medium text-navy-700 mb-2">Perfect For</h4>
                            <div className="flex flex-wrap gap-2">
                              {generatedOutfit.occasions.map((occasion, index) => (
                                <span key={index} className="px-3 py-1 bg-navy-100 text-navy-700 text-sm rounded-full">
                                  {occasion}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="flex-1 bg-white rounded-lg p-4 border border-gray-200">
                            <h4 className="font-medium text-navy-700 mb-2">Total Price</h4>
                            <p className="text-2xl font-bold text-navy-700">₹{calculateTotalPrice().toFixed(2)}</p>
                          </div>
                          <div className="flex-1 flex flex-col gap-2">
                            <Button className="bg-coral-500 hover:bg-coral-600 text-white" onClick={addOutfitToCart}>
                              <ShoppingBag className="mr-2 h-4 w-4" /> Add Outfit to Cart
                            </Button>
                            <div className="flex gap-2">
                              <Button variant="outline" className="flex-1 border-navy-300 text-navy-700">
                                <Download className="mr-2 h-4 w-4" /> Save
                              </Button>
                              <Button variant="outline" className="flex-1 border-navy-300 text-navy-700">
                                <Share2 className="mr-2 h-4 w-4" /> Share
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg p-6 h-full">
                      <div className="text-center py-8">
                        <Sparkles className="h-12 w-12 text-navy-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-navy-700 mb-4">AI-Powered Outfit Generation</h3>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                          Select a character and let our AI stylist create a complete outfit inspired by their iconic
                          look from Telugu cinema.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto text-left">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium text-navy-700 mb-2">Character Analysis</h4>
                            <p className="text-sm text-gray-600">
                              Our AI analyzes the character's style, fashion elements, and iconic looks
                            </p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium text-navy-700 mb-2">Product Matching</h4>
                            <p className="text-sm text-gray-600">
                              The AI selects products that best match the character's signature style
                            </p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium text-navy-700 mb-2">Complete Outfit</h4>
                            <p className="text-sm text-gray-600">
                              Get a full outfit with tops, bottoms, footwear, and accessories
                            </p>
                          </div>
                        </div>

                        {!selectedCharacter && (
                          <div className="mt-8">
                            <Link href="/ai-style-matcher">
                              <Button className="bg-navy-700 hover:bg-navy-800 text-white">
                                Find Your Style Match First <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Featured Character Styles */}
            <div className="mt-12">
              <h3 className="text-xl font-bold text-navy-700 mb-6">Popular Character Styles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {spotlightCharacters.slice(0, 4).map((character) => (
                  <Link
                    key={character.id}
                    href={`/ai-outfit-generator?character=${encodeURIComponent(character.name)}`}
                  >
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
                      <div className="relative h-48">
                        <Image
                          src={character.image || "/placeholder.svg"}
                          alt={character.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 to-transparent flex items-end p-4">
                          <div>
                            <h4 className="text-lg font-bold text-white">{character.name}</h4>
                            <p className="text-white/80">{character.style}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
