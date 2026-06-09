"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, Plus, Eye, Share2, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/types"

interface FloatingProductCardProps {
  product: Product
  genre?: "action" | "fantasy" | "romance" | "thriller"
}

export default function FloatingProductCard({ product, genre = "action" }: FloatingProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const cardRef = useRef<HTMLDivElement>(null)
  const { addItem } = useCart()

  // Motion values for 3D effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]))
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]))

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) / (rect.width / 2))
    y.set((e.clientY - centerY) / (rect.height / 2))
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  const getProductImagePath = (productName: string) => {
    if (productName.toLowerCase().includes("pushpa")) {
      return "/images/characters/allu-arjun-pushpa.jpg"
    }
    return product.image || `/placeholder.svg?height=500&width=400&text=${encodeURIComponent(productName)}`
  }

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    addItem(product)
    setTimeout(() => setIsAddingToCart(false), 1500)
  }

  const handleBuyNow = () => {
    window.open(product.affiliateLink, "_blank")
  }

  const genreClasses = {
    action: "genre-action",
    fantasy: "genre-fantasy",
    romance: "genre-romance",
    thriller: "genre-thriller",
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative group floating-card glass-effect rounded-2xl overflow-hidden ${genreClasses[genre]}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ z: 50 }}
    >
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-neon-blue via-neon-pink to-neon-green rounded-2xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-500" />

      {/* Image Container */}
      <div className="relative h-80 overflow-hidden">
        <motion.div
          className="relative w-full h-full"
          style={{ z: 20 }}
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.7 }}
        >
          <Image
            src={getProductImagePath(product.name) || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark/80 via-transparent to-transparent" />
        </motion.div>

        {/* Character Badge */}
        <motion.div
          className="absolute bottom-4 left-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Badge className="bg-gradient-to-r from-neon-blue to-neon-pink text-white border-0 px-3 py-1">
            <Zap className="w-3 h-3 mr-1" />
            {product.character} • {product.movie}
          </Badge>
        </motion.div>

        {/* Favorite Button */}
        <motion.button
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
            isFavorite ? "bg-neon-pink/80 text-white" : "bg-white/10 text-white hover:bg-white/20"
          }`}
          onClick={(e) => {
            e.stopPropagation()
            setIsFavorite(!isFavorite)
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
        </motion.button>

        {/* Action Buttons */}
        <motion.div
          className="absolute bottom-4 right-4 flex flex-col space-y-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
        >
          <Link href={`/collections/${product.id}`}>
            <motion.button
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-neon-blue/50 transition-all duration-300 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Eye className="w-4 h-4" />
            </motion.button>
          </Link>

          <motion.button
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-neon-green/50 transition-all duration-300 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Share2 className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6" style={{ transform: "translateZ(30px)" }}>
        <Link href={`/collections/${product.id}`}>
          <motion.h3
            className="font-bold text-xl mb-2 text-white group-hover:text-neon-blue transition-colors duration-300 line-clamp-1"
            whileHover={{ x: 5 }}
          >
            {product.name}
          </motion.h3>
        </Link>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>

        <div className="flex justify-between items-center">
          <motion.span
            className="font-bold text-2xl bg-gradient-to-r from-neon-blue to-neon-pink bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            ₹{product.price}
          </motion.span>

          <div className="flex space-x-2">
            <motion.button
              className="px-4 py-2 bg-white/10 backdrop-blur-md border border-neon-blue/50 text-neon-blue rounded-lg hover:bg-neon-blue hover:text-cinema-dark transition-all duration-300 flex items-center text-sm font-medium"
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isAddingToCart ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Plus className="w-4 h-4" />
                </motion.div>
              ) : (
                <Plus className="w-4 h-4 mr-1" />
              )}
              {isAddingToCart ? "Adding..." : "Cart"}
            </motion.button>

            <motion.button
              className="px-4 py-2 bg-gradient-to-r from-neon-pink to-neon-blue text-white rounded-lg font-medium text-sm flex items-center shadow-lg shadow-neon-pink/25"
              onClick={handleBuyNow}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 0, 128, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag className="w-4 h-4 mr-1" />
              Buy
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
