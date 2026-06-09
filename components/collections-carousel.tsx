"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Collection } from "@/lib/types"
import { motion, AnimatePresence } from "framer-motion"

interface CollectionsCarouselProps {
  collections: Collection[]
  className?: string
}

export default function CollectionsCarousel({ collections, className }: CollectionsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const itemsToShow = 3
  const totalSlides = Math.ceil(collections.length / itemsToShow)

  const goToNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides)
  }

  const goToPrev = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        goToNext()
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused])

  const handleMouseEnter = () => setIsPaused(true)
  const handleMouseLeave = () => setIsPaused(false)

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const getVisibleCollections = () => {
    const startIndex = currentIndex * itemsToShow
    return collections.slice(startIndex, startIndex + itemsToShow)
  }

  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={carouselRef}
    >
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="flex gap-6"
        >
          {getVisibleCollections().map((collection) => (
            <div key={collection.id} className="flex-1 min-w-0">
              <Link href={`/collections/${collection.id}`}>
                <div className="relative h-80 group overflow-hidden rounded-lg cursor-pointer">
                  <Image
                    src={collection.image || "/placeholder.svg?height=500&width=400"}
                    alt={collection.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 to-transparent flex items-end p-6">
                    <div className="transform transition-transform group-hover:translate-y-0 translate-y-4">
                      <h3 className="text-xl font-bold text-white mb-1">{collection.name}</h3>
                      <p className="text-white/80 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {collection.character}'s Look from {collection.movie}
                      </p>
                      <div className="h-0.5 w-0 bg-coral-500 group-hover:w-full transition-all duration-300"></div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white rounded-full z-10"
        onClick={goToPrev}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white rounded-full z-10"
        onClick={goToNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              currentIndex === index ? "bg-coral-500 w-6" : "bg-white/50 hover:bg-white/80",
            )}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
          />
        ))}
      </div>
    </div>
  )
}
