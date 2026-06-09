"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, ChevronLeft, ChevronRight, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BehindTheScenesStep {
  id: number
  title: string
  description: string
  image: string
  videoUrl?: string
}

interface BehindTheScenesProps {
  productName: string
  character: string
  movie: string
  steps: BehindTheScenesStep[]
}

export default function BehindTheScenes({ productName, character, movie, steps }: BehindTheScenesProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showInfo, setShowInfo] = useState(false)

  const goToNext = () => {
    setCurrentStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1))
  }

  const goToPrev = () => {
    setCurrentStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1))
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }

  return (
    <div className="bg-navy-800 rounded-xl overflow-hidden">
      <div className="p-6 border-b border-navy-700">
        <h2 className="text-2xl font-bold text-white">Behind The Scenes</h2>
        <p className="text-white/80">
          See how we recreated {character}'s iconic look from {movie}
        </p>
      </div>

      <div className="relative">
        {/* Main Content */}
        <div className="relative h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={steps[currentStep].image || "/placeholder.svg"}
                alt={steps[currentStep].title}
                fill
                className="object-cover"
              />

              {/* Video Play Button */}
              {steps[currentStep].videoUrl && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    size="icon"
                    className="h-16 w-16 rounded-full bg-coral-500/90 hover:bg-coral-600/90 text-white"
                    onClick={togglePlay}
                  >
                    {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
                  </Button>
                </div>
              )}

              {/* Info Button */}
              <Button
                size="icon"
                className="absolute top-4 right-4 h-10 w-10 rounded-full bg-navy-800/50 hover:bg-navy-800/70 text-white"
                onClick={toggleInfo}
              >
                <Info className="h-5 w-5" />
              </Button>

              {/* Info Panel */}
              <AnimatePresence>
                {showInfo && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-900/95 to-navy-900/0 p-6 pt-16"
                  >
                    <h3 className="text-xl font-bold text-white mb-2">{steps[currentStep].title}</h3>
                    <p className="text-white/90">{steps[currentStep].description}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full z-10"
            onClick={goToPrev}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full z-10"
            onClick={goToNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Step Indicators */}
        <div className="bg-navy-900 p-4 flex justify-center">
          <div className="flex space-x-2">
            {steps.map((step, index) => (
              <button
                key={step.id}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentStep ? "bg-coral-500 w-6" : "bg-white/30 hover:bg-white/50"
                }`}
                onClick={() => setCurrentStep(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Steps Timeline */}
      <div className="bg-navy-900 p-6">
        <div className="flex overflow-x-auto space-x-4 pb-2">
          {steps.map((step, index) => (
            <button
              key={step.id}
              className={`flex-shrink-0 w-32 group ${index === currentStep ? "opacity-100" : "opacity-60"}`}
              onClick={() => setCurrentStep(index)}
            >
              <div
                className={`relative h-20 rounded-lg overflow-hidden mb-2 ${
                  index === currentStep ? "ring-2 ring-coral-500" : ""
                }`}
              >
                <Image src={step.image || "/placeholder.svg"} alt={step.title} fill className="object-cover" />
                {step.videoUrl && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="h-6 w-6 text-white opacity-70 group-hover:opacity-100" />
                  </div>
                )}
              </div>
              <p
                className={`text-xs text-center line-clamp-2 ${index === currentStep ? "text-white" : "text-white/70"}`}
              >
                {step.title}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
