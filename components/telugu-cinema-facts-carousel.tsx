"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Comprehensive list of Telugu cinema facts
const teluguCinemaFacts = [
  {
    id: 1,
    title: "Global Reach",
    fact: "Baahubali 2: The Conclusion (2017) became the highest-grossing Indian film worldwide, earning over ₹1,800 crore ($250 million) and was screened in over 9,000 theaters globally.",
  },
  {
    id: 2,
    title: "Fashion Influence",
    fact: "After the release of 'Pushpa: The Rise' (2021), Allu Arjun's distinctive style sparked a nationwide fashion trend, with his rugged look and hand gestures being imitated across India.",
  },
  {
    id: 3,
    title: "Ramoji Film City",
    fact: "Located in Hyderabad, Ramoji Film City holds the Guinness World Record as the largest film studio complex in the world, spanning 1,666 acres and capable of hosting 50 film units simultaneously.",
  },
  {
    id: 4,
    title: "RRR's Global Recognition",
    fact: "'RRR' (2022) made history when its song 'Naatu Naatu' won the Golden Globe and Academy Award for Best Original Song, marking the first time a Telugu film received such international recognition.",
  },
  {
    id: 5,
    title: "Iconic Dynasties",
    fact: "Telugu cinema features several prominent film families, with the Mega family (including Chiranjeevi, Ram Charan, Allu Arjun) and Akkineni family (ANR, Nagarjuna, Naga Chaitanya) spanning multiple generations of successful actors.",
  },
  {
    id: 6,
    title: "Technological Innovation",
    fact: "Telugu cinema has been at the forefront of technological innovation in Indian cinema, with films like 'Eega' (2012) pushing the boundaries of VFX with its story of a man reincarnated as a housefly.",
  },
  {
    id: 7,
    title: "Box Office Records",
    fact: "Telugu films consistently break box office records, with 'RRR' earning over ₹1,200 crore worldwide and 'Pushpa: The Rise' collecting more than ₹350 crore despite releasing during pandemic restrictions.",
  },
  {
    id: 8,
    title: "Dance Choreography",
    fact: "Telugu cinema is renowned for its elaborate dance sequences, with stars like Allu Arjun (known as 'Stylish Star') and NTR Jr. famous for their exceptional dancing skills that influence fashion and dance trends.",
  },
  {
    id: 9,
    title: "Historical Epics",
    fact: "Telugu cinema has produced some of India's most ambitious historical epics, including 'Baahubali', 'Sye Raa Narasimha Reddy', and 'RRR', which showcase Telugu cultural heritage and history on a grand scale.",
  },
  {
    id: 10,
    title: "Costume Design",
    fact: "Costume designers in Telugu cinema, like Rama Rajamouli and Neeraja Kona, have revolutionized character styling, creating iconic looks that influence fashion trends across India.",
  },
  {
    id: 11,
    title: "Film Production",
    fact: "Hyderabad produces approximately 200 Telugu films annually, making it one of the most prolific film industries in India, second only to Bollywood in terms of production volume.",
  },
  {
    id: 12,
    title: "International Collaborations",
    fact: "Telugu cinema has increasingly collaborated with international technicians, with films like 'Saaho' featuring action sequences choreographed by Hollywood stunt coordinators and shot across Europe and the Middle East.",
  },
]

export default function TeluguCinemaFactsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === teluguCinemaFacts.length - 1 ? 0 : prevIndex + 1))
  }, [])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? teluguCinemaFacts.length - 1 : prevIndex - 1))
  }, [])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    // Reset auto-play timer when manually changing slides
    setIsAutoPlaying(true)
  }

  // Handle touch events for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      goToNext()
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      goToPrevious()
    }
  }

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isAutoPlaying) {
      interval = setInterval(() => {
        goToNext()
      }, 5000) // Change slide every 5 seconds
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isAutoPlaying, goToNext])

  // Pause auto-play when user interacts with carousel
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-center text-white">
          Fascinating <span className="text-coral-500">Tollywood</span> Facts
        </h2>
        <div className="flex space-x-2">
          <Button
            onClick={goToPrevious}
            size="sm"
            variant="outline"
            className="rounded-full w-10 h-10 p-0 border-white/30 text-white hover:bg-white/10 hover:border-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            onClick={goToNext}
            size="sm"
            variant="outline"
            className="rounded-full w-10 h-10 p-0 border-white/30 text-white hover:bg-white/10 hover:border-white"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Carousel container */}
      <div className="relative h-[300px] md:h-[250px] overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {teluguCinemaFacts.map((fact, index) => (
            <div key={fact.id} className="w-full flex-shrink-0 px-4 h-full">
              <div className="bg-navy-800 rounded-lg p-6 h-full transform transition-all duration-500 shadow-lg hover:shadow-coral-500/20 hover:shadow-xl flex flex-col">
                <div className="w-12 h-12 bg-coral-500 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-white">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{fact.title}</h3>
                <p className="text-gray-300 flex-grow">{fact.fact}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Gradient overlays for fade effect */}
        <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-navy-700 to-transparent pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-navy-700 to-transparent pointer-events-none"></div>
      </div>

      {/* Dots navigation */}
      <div className="flex justify-center mt-6 space-x-2">
        {teluguCinemaFacts.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentIndex ? "bg-coral-500 w-6" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
