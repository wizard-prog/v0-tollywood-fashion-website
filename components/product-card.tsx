"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Heart, ShoppingBag, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/types"

export default function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const { addItem } = useCart()

  // Construct image path based on product name
  const getProductImagePath = (productName: string) => {
    // Convert product name to kebab-case for image naming
    const imageName = productName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")

    return `/images/products/${imageName}.jpg`
  }

  const handleAddToCart = () => {
    setIsAddingToCart(true)
    addItem(product)

    // Reset animation after a delay
    setTimeout(() => {
      setIsAddingToCart(false)
    }, 1000)
  }

  const handleBuyNow = () => {
    window.open(product.affiliateLink, "_blank")
  }

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  return (
    <div
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-80 overflow-hidden">
        <Image
          src={getProductImagePath(product.name) || "/placeholder.svg"}
          alt={product.name}
          fill
          className={`object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
        />

        <button
          onClick={handleFavoriteToggle}
          className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            isFavorite
              ? "bg-coral-500 text-white transform rotate-0 scale-110"
              : "bg-white/80 text-gray-600 hover:bg-white"
          }`}
        >
          <Heart
            className={`h-5 w-5 transition-all duration-300 ${isFavorite ? "fill-white text-white" : "text-gray-600"}`}
          />
        </button>

        <div className="absolute bottom-0 left-0 w-full p-2">
          <Badge className="bg-coral-500 hover:bg-coral-600 text-white">
            {product.character} • {product.movie}
          </Badge>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 line-clamp-1 text-navy-700">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</p>

        <div className="flex justify-between items-center mt-4">
          <span className="font-bold text-lg text-navy-700">₹{product.price}</span>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              className={`border-navy-300 text-navy-700 hover:bg-navy-50 overflow-hidden relative ${
                isAddingToCart ? "border-coral-500" : ""
              }`}
              onClick={handleAddToCart}
              disabled={isAddingToCart}
            >
              {isAddingToCart ? (
                <>
                  <span className="animate-fade-out">
                    <Plus className="mr-1 h-4 w-4" /> Cart
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center animate-fade-in">Added!</span>
                </>
              ) : (
                <>
                  <Plus className="mr-1 h-4 w-4" /> Cart
                </>
              )}
            </Button>
            <Button
              size="sm"
              className="bg-navy-700 hover:bg-navy-800 text-white transition-transform active:scale-95"
              onClick={handleBuyNow}
            >
              <ShoppingBag className="mr-1 h-4 w-4" /> Buy
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
