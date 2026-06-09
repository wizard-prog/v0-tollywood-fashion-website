"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { spotlightCharacters } from "@/lib/data"
import { EnhancedCharacterImage } from "@/components/enhanced-character-image"

export default function CharacterCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleItems, setVisibleItems] = useState(4)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1)
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2)
      } else if (window.innerWidth < 1280) {
        setVisibleItems(3)
      } else {
        setVisibleItems(4)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const totalSlides = spotlightCharacters.length
  const maxIndex = totalSlides - visibleItems

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1))
  }

  // Helper function to get character image path
  const getCharacterImagePath = (character) => {
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
    <div className="relative w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-navy-700">Character Spotlight</h2>
        <div className="flex space-x-2">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-navy-100 text-navy-700 hover:bg-navy-200"
            aria-label="Previous characters"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-navy-100 text-navy-700 hover:bg-navy-200"
            aria-label="Next characters"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          ref={containerRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
        >
          {spotlightCharacters.map((character, index) => (
            <div key={character.id} className="flex-shrink-0 px-2" style={{ width: `${100 / visibleItems}%` }}>
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full">
                <div className="relative h-64">
                  <EnhancedCharacterImage
                    src={getCharacterImagePath(character) || "/placeholder.svg"}
                    alt={character.name}
                    fill
                    className="object-cover"
                    quality={95}
                    priority={index < 4}
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

                <div className="p-4">
                  <p className="text-gray-600 mb-4 line-clamp-3">{character.description}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {character.lookTags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-navy-100 text-navy-700 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                    {character.lookTags.length > 2 && (
                      <span className="px-2 py-1 bg-navy-100 text-navy-700 text-xs rounded-full">
                        +{character.lookTags.length - 2}
                      </span>
                    )}
                  </div>

                  <Link href={`/collections?character=${encodeURIComponent(character.name)}`}>
                    <Button className="w-full bg-coral-500 hover:bg-coral-600 text-white text-sm">
                      Shop This Look
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link href="/characters">
          <Button variant="outline" className="border-navy-300 text-navy-700 hover:bg-navy-100">
            View All Characters
          </Button>
        </Link>
      </div>
    </div>
  )
}
