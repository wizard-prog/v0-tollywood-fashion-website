"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, ShoppingBag, Plus, Eye, Share2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/types"
import EnhancedButton from "@/components/ui/enhanced-button"

export default function EnhancedProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const { addItem } = useCart()

  // Track mouse position for 3D effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20

    setMousePosition({ x: rotateY, y: rotateX })
  }

  // Reset position when mouse leaves
  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePosition({ x: 0, y: 0 })
  }

  // Construct image path based on product name
  const getProductImagePath = (productName: string) => {
    // For Pushpa products, use the character image
    if (productName.toLowerCase().includes("pushpa")) {
      return "/images/characters/allu-arjun-pushpa.jpg"
    }

    // For other products, use the existing logic or placeholder
    return product.image || `/placeholder.svg?height=500&width=400&text=${encodeURIComponent(productName)}`
  }

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    addItem(product)

    // Reset animation after a delay
    setTimeout(() => {
      setIsAddingToCart(false)
    }, 1500)
  }

  const handleBuyNow = () => {
    window.open(product.affiliateLink, "_blank")
  }

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  // Animation variants
  const cardVariants = {
    hover: {
      scale: 1.03,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
    rest: {
      scale: 1,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  }

  const imageVariants = {
    hover: { scale: 1.1, transition: { duration: 0.7, ease: "easeOut" } },
    rest: { scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
  }

  const actionButtonsVariants = {
    hover: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
    rest: { opacity: 0, y: 20, transition: { staggerChildren: 0.1 } },
  }

  const buttonVariants = {
    hover: { opacity: 1, y: 0 },
    rest: { opacity: 0, y: 10 },
  }

  return (
    <motion.div
      ref={cardRef}
      className="bg-white rounded-xl overflow-hidden"
      variants={cardVariants}
      initial="rest"
      animate={isHovered ? "hover" : "rest"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
      }}
    >
      <div className="relative h-80 overflow-hidden">
        <motion.div variants={imageVariants} initial="rest" animate={isHovered ? "hover" : "rest"}>
          <Image
            src={getProductImagePath(product.name) || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Character badge */}
        <div className="absolute bottom-0 left-0 w-full p-2">
          <Badge className="bg-coral-500 hover:bg-coral-600 text-white">
            {product.character} • {product.movie}
          </Badge>
        </div>

        {/* Favorite button */}
        <EnhancedButton
          variant="ghost"
          size="icon"
          onClick={handleFavoriteToggle}
          className={`absolute top-4 right-4 w-9 h-9 rounded-full ${
            isFavorite ? "bg-coral-500 text-white" : "bg-white/80 text-gray-600 hover:bg-white"
          }`}
          rippleEffect
        >
          <Heart
            className={`h-5 w-5 transition-all duration-300 ${isFavorite ? "fill-white text-white" : "text-gray-600"}`}
          />
        </EnhancedButton>

        {/* Action buttons */}
        <motion.div
          className="absolute bottom-12 right-4 flex flex-col space-y-2"
          variants={actionButtonsVariants}
          initial="rest"
          animate={isHovered ? "hover" : "rest"}
        >
          <motion.div variants={buttonVariants}>
            <Link href={`/collections/${product.id}`}>
              <EnhancedButton
                variant="ghost"
                size="icon"
                className="w-9 h-9 rounded-full bg-white text-navy-700 hover:bg-navy-50 shadow-md"
                rippleEffect
              >
                <Eye className="h-4 w-4" />
              </EnhancedButton>
            </Link>
          </motion.div>
          <motion.div variants={buttonVariants}>
            <EnhancedButton
              variant="ghost"
              size="icon"
              className="w-9 h-9 rounded-full bg-white text-navy-700 hover:bg-navy-50 shadow-md"
              onClick={(e) => e.stopPropagation()}
              rippleEffect
            >
              <Share2 className="h-4 w-4" />
            </EnhancedButton>
          </motion.div>
        </motion.div>
      </div>

      <div className="p-4">
        <Link href={`/collections/${product.id}`}>
          <h3 className="font-bold text-lg mb-1 line-clamp-1 text-navy-700 group-hover:text-coral-500 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</p>

        <div className="flex justify-between items-center mt-4">
          <span className="font-bold text-lg text-navy-700">₹{product.price}</span>
          <div className="flex space-x-2">
            <EnhancedButton
              variant="outline"
              size="sm"
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              loading={isAddingToCart}
              icon={<Plus className="w-4 h-4" />}
              iconPosition="left"
              className="border-navy-300 text-navy-700 hover:bg-navy-50"
            >
              {isAddingToCart ? "Adding..." : "Cart"}
            </EnhancedButton>

            <EnhancedButton
              variant="primary"
              size="sm"
              onClick={handleBuyNow}
              icon={<ShoppingBag className="w-4 h-4" />}
              iconPosition="left"
              glowEffect
            >
              Buy
            </EnhancedButton>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
