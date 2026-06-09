"use client"
import { useState, useRef } from "react"
import type React from "react"

import Image from "next/image"

interface HoverGlowCardProps {
  title: string
  image: string
  description: string
  onClick: () => void
}

export default function HoverGlowCard({ title, image, description, onClick }: HoverGlowCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  return (
    <div
      ref={cardRef}
      className="relative h-80 rounded-lg overflow-hidden cursor-pointer transition-all duration-500 transform hover:scale-[1.02] hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={image || "/placeholder.svg?height=500&width=400"}
          alt={title}
          fill
          className="object-cover transition-transform duration-700"
          style={{
            transform: isHovered ? "scale(1.1)" : "scale(1)",
          }}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

      {/* Glow effect */}
      {isHovered && (
        <div
          className="absolute w-[150px] h-[150px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)",
            left: mousePosition.x - 75,
            top: mousePosition.y - 75,
          }}
        ></div>
      )}

      {/* Content */}
      <div className="absolute bottom-0 left-0 p-6 w-full">
        <h3
          className="text-xl font-bold text-white mb-2 transition-all duration-300"
          style={{
            textShadow: isHovered ? "0 0 10px rgba(255,255,255,0.5)" : "none",
          }}
        >
          {title}
        </h3>
        <p
          className={`text-white/80 transition-all duration-300 ${
            isHovered ? "opacity-100 max-h-20" : "opacity-70 max-h-10 overflow-hidden"
          }`}
        >
          {description}
        </p>
        <div className={`h-0.5 bg-white/50 mt-3 transition-all duration-500 ${isHovered ? "w-full" : "w-0"}`}></div>
      </div>
    </div>
  )
}
