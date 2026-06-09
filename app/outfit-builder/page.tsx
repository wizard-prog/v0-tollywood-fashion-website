"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowRight, Undo, Download, Share2, ShoppingBag, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/lib/cart-context"
import { featuredProducts } from "@/lib/data"
import type { Product } from "@/lib/types"

// Group products by category
const groupedProducts = featuredProducts.reduce(
  (acc, product) => {
    const category = product.category.toLowerCase()
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(product)
    return acc
  },
  {} as Record<string, Product[]>,
)

// Categories for outfit building
const outfitCategories = [
  { id: "tops", label: "Tops", includes: ["shirts", "kurtas", "jackets"] },
  { id: "bottoms", label: "Bottoms", includes: ["denim", "dhoti", "period"] },
  { id: "dresses", label: "Dresses", includes: ["sarees", "anarkali", "dresses"] },
  { id: "accessories", label: "Accessories", includes: ["accessories", "jewelry"] },
]

export default function OutfitBuilderPage() {
  // State for selected items in each category
  const [outfit, setOutfit] = useState<Record<string, Product | null>>({
    tops: null,
    bottoms: null,
    dresses: null,
    accessories: null,
  })
  const [activeTab, setActiveTab] = useState("tops")
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [characterFilter, setCharacterFilter] = useState<string | null>(null)
  const { addItem } = useCart()

  // Filter products based on active tab
  useEffect(() => {
    const category = outfitCategories.find((cat) => cat.id === activeTab)
    if (!category) return

    let filtered: Product[] = []
    category.includes.forEach((includedCategory) => {
      const products = groupedProducts[includedCategory] || []
      filtered = [...filtered, ...products]
    })

    // Apply character filter if selected
    if (characterFilter) {
      filtered = filtered.filter((product) => product.character === characterFilter)
    }

    setFilteredProducts(filtered)
  }, [activeTab, characterFilter])

  // Select an item for the current category
  const selectItem = (product: Product) => {
    setOutfit((prev) => ({
      ...prev,
      [activeTab]: product,
    }))
  }

  // Reset the outfit
  const resetOutfit = () => {
    setOutfit({
      tops: null,
      bottoms: null,
      dresses: null,
      accessories: null,
    })
    setCharacterFilter(null)
  }

  // Add all outfit items to cart
  const addOutfitToCart = () => {
    Object.values(outfit).forEach((item) => {
      if (item) addItem(item)
    })
  }

  // Get unique characters from products
  const characters = Array.from(new Set(featuredProducts.map((product) => product.character)))

  // Calculate total price of outfit
  const totalPrice = Object.values(outfit)
    .filter(Boolean)
    .reduce((sum, item) => sum + (item?.price || 0), 0)

  return (
    <main className="flex min-h-screen flex-col pt-24">
      {/* Hero Section */}
      <section className="relative h-64">
        <Image src="/placeholder.svg?height=400&width=1920" alt="Outfit Builder" fill className="object-cover" />
        <div className="absolute inset-0 bg-navy-800/70 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Outfit Builder</h1>
            <p className="text-white/90 max-w-2xl mx-auto px-4">
              Mix and match items to create your perfect Tollywood-inspired look
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Outfit Preview */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-navy-700">Your Outfit</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetOutfit}
                    className="text-gray-500 hover:text-coral-500"
                  >
                    <Undo className="h-4 w-4 mr-1" /> Reset
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Character filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Character</label>
                    <select
                      value={characterFilter || ""}
                      onChange={(e) => setCharacterFilter(e.target.value || null)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">All Characters</option>
                      {characters.map((character) => (
                        <option key={character} value={character}>
                          {character}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Outfit preview */}
                  <div className="bg-gray-50 rounded-lg p-4 min-h-[400px]">
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(outfit).map(([category, product]) =>
                        product ? (
                          <div key={category} className="relative rounded-md overflow-hidden h-48 bg-white">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-contain"
                            />
                            <button
                              onClick={() => setOutfit((prev) => ({ ...prev, [category]: null }))}
                              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm"
                            >
                              <X className="h-4 w-4 text-gray-500" />
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 bg-navy-700/80 p-2">
                              <p className="text-white text-xs truncate">{product.name}</p>
                            </div>
                          </div>
                        ) : (
                          <div
                            key={category}
                            className="flex items-center justify-center h-48 bg-white rounded-md border-2 border-dashed border-gray-300"
                          >
                            <div className="text-center">
                              <p className="text-gray-500 font-medium mb-1">
                                {outfitCategories.find((cat) => cat.id === category)?.label || category}
                              </p>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setActiveTab(category)}
                                className="text-xs"
                              >
                                Add Item
                              </Button>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Outfit summary */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Total Items:</span>
                      <span className="font-medium">
                        {Object.values(outfit).filter(Boolean).length} item
                        {Object.values(outfit).filter(Boolean).length !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span className="text-gray-600">Total Price:</span>
                      <span className="font-bold text-navy-700">₹{totalPrice.toFixed(2)}</span>
                    </div>

                    <div className="space-y-2">
                      <Button
                        className="w-full bg-coral-500 hover:bg-coral-600 text-white"
                        onClick={addOutfitToCart}
                        disabled={!Object.values(outfit).some(Boolean)}
                      >
                        <ShoppingBag className="mr-2 h-4 w-4" /> Add Outfit to Cart
                      </Button>
                      <div className="flex space-x-2">
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
            </div>

            {/* Item Selection */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-navy-700 mb-6">Select Items</h2>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="w-full grid grid-cols-4">
                    {outfitCategories.map((category) => (
                      <TabsTrigger key={category.id} value={category.id}>
                        {category.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {outfitCategories.map((category) => (
                    <TabsContent key={category.id} value={category.id} className="pt-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {filteredProducts.length > 0 ? (
                          filteredProducts.map((product) => (
                            <div
                              key={product.id}
                              className={`border rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-md ${
                                outfit[category.id]?.id === product.id ? "ring-2 ring-coral-500" : ""
                              }`}
                              onClick={() => selectItem(product)}
                            >
                              <div className="relative h-48">
                                <Image
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="p-3">
                                <h3 className="font-medium text-navy-700 line-clamp-1">{product.name}</h3>
                                <p className="text-sm text-gray-500 mb-2">
                                  {product.character} • {product.movie}
                                </p>
                                <div className="flex justify-between items-center">
                                  <span className="font-bold text-navy-700">₹{product.price}</span>
                                  <Button
                                    size="sm"
                                    variant={outfit[category.id]?.id === product.id ? "default" : "outline"}
                                    className={
                                      outfit[category.id]?.id === product.id
                                        ? "bg-coral-500 hover:bg-coral-600 text-white"
                                        : "border-navy-300 text-navy-700"
                                    }
                                  >
                                    {outfit[category.id]?.id === product.id ? "Selected" : "Select"}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="col-span-full text-center py-12">
                            <p className="text-gray-500 mb-4">No items found for this category.</p>
                            {characterFilter && (
                              <Button
                                variant="outline"
                                onClick={() => setCharacterFilter(null)}
                                className="border-navy-300 text-navy-700"
                              >
                                Clear Character Filter
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outfit Inspiration */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-10 text-center text-navy-700">Character Outfit Inspiration</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="relative h-64">
                <Image
                  src="/placeholder.svg?height=400&width=300"
                  alt="Pushpa Raj Outfit"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-navy-700">Pushpa Raj Style</h3>
                <p className="text-gray-600 mb-4">
                  Rugged and bold with floral shirts, earthy tones, and a distinctive attitude.
                </p>
                <Button
                  onClick={() => setCharacterFilter("Pushpa Raj")}
                  className="w-full bg-coral-500 hover:bg-coral-600 text-white"
                >
                  Try This Look <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="relative h-64">
                <Image
                  src="/placeholder.svg?height=400&width=300"
                  alt="Baahubali Outfit"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-navy-700">Baahubali Royal Look</h3>
                <p className="text-gray-600 mb-4">
                  Majestic royal attire combining traditional elements with warrior aesthetics.
                </p>
                <Button
                  onClick={() => setCharacterFilter("Amarendra Baahubali")}
                  className="w-full bg-coral-500 hover:bg-coral-600 text-white"
                >
                  Try This Look <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="relative h-64">
                <Image
                  src="/placeholder.svg?height=400&width=300"
                  alt="Arjun Reddy Outfit"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-navy-700">Arjun Reddy Style</h3>
                <p className="text-gray-600 mb-4">
                  Rebellious casual style with dark colors, loose fits, and a signature beard.
                </p>
                <Button
                  onClick={() => setCharacterFilter("Arjun Reddy")}
                  className="w-full bg-coral-500 hover:bg-coral-600 text-white"
                >
                  Try This Look <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
