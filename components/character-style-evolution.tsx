"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface StyleEvolutionStep {
  id: number
  character: string
  movie: string
  year: number
  image: string
  description: string
  styleNotes: string[]
  relatedProductIds: string[]
}

interface CharacterStyleEvolutionProps {
  character: string
  steps: StyleEvolutionStep[]
}

export default function CharacterStyleEvolution({ character, steps }: CharacterStyleEvolutionProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [direction, setDirection] = useState(0)

  const goToNext = () => {
    setDirection(1)
    setCurrentStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1))
  }

  const goToPrev = () => {
    setDirection(-1)
    setCurrentStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1))
  }

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

  return (
    <div className="bg-navy-50 rounded-xl overflow-hidden">
      <div className="bg-navy-700 text-white py-4 px-6">
        <h3 className="text-xl font-bold">{character}'s Style Evolution</h3>
      </div>

      <div className="relative overflow-hidden" style={{ height: "600px" }}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 grid grid-cols-1 md:grid-cols-2"
          >
            {/* Image Side */}
            <div className="relative h-full">
              <Image
                src={steps[currentStep].image || "/placeholder.svg?height=600&width=500"}
                alt={`${character} in ${steps[currentStep].movie}`}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white text-sm">
                  {steps[currentStep].movie} ({steps[currentStep].year})
                </p>
              </div>
            </div>

            {/* Content Side */}
            <div className="bg-white p-6 flex flex-col h-full">
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1 ${
                        index === currentStep ? "w-8 bg-coral-500" : "w-4 bg-gray-200"
                      } mx-1 rounded-full transition-all duration-300`}
                      onClick={() => {
                        setDirection(index > currentStep ? 1 : -1)
                        setCurrentStep(index)
                      }}
                    />
                  ))}
                </div>
                <h4 className="text-2xl font-bold text-navy-700 mb-1">
                  {steps[currentStep].character} in {steps[currentStep].movie}
                </h4>
                <p className="text-gray-500 mb-4">{steps[currentStep].year}</p>
              </div>

              <p className="text-gray-700 mb-6">{steps[currentStep].description}</p>

              <div className="mb-6">
                <h5 className="font-medium text-navy-700 mb-2">Style Notes:</h5>
                <ul className="space-y-2">
                  {steps[currentStep].styleNotes.map((note, index) => (
                    <li key={index} className="flex items-start">
                      <span className="h-5 w-5 rounded-full bg-coral-100 text-coral-500 flex items-center justify-center text-xs mr-2 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-600">{note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto">
                <h5 className="font-medium text-navy-700 mb-3">Shop This Look:</h5>
                <div className="flex space-x-3">
                  <Button className="bg-coral-500 hover:bg-coral-600 text-white">View Collection</Button>
                  <Link href={`/collections?character=${encodeURIComponent(steps[currentStep].character)}`}>
                    <Button variant="outline" className="border-navy-300 text-navy-700">
                      Similar Styles
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
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
      </div>
    </div>
  )
}
