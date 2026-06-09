"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import TollywoodLogo from "./tollywood-logo"
import Reveal from "@/components/ui/reveal"
import AnimatedText from "@/components/animated-text"
import EnhancedButton from "@/components/ui/enhanced-button"

const heroSlides = [
  {
    id: 1,
    title: "Iconic Character Styles",
    subtitle: "From Screen to Street",
    description: "Discover fashion inspired by your favorite Telugu cinema characters",
    cta: "Explore Collections",
    href: "/collections",
    background: "bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700",
  },
  {
    id: 2,
    title: "AI Style Matching",
    subtitle: "Find Your Perfect Look",
    description: "Let our AI match you with character styles that suit your personality",
    cta: "Take Style Quiz",
    href: "/style-quiz",
    background: "bg-gradient-to-br from-coral-900 via-coral-800 to-coral-700",
  },
  {
    id: 3,
    title: "Authentic Telugu Fashion",
    subtitle: "Heritage Meets Modern",
    description: "Shop curated collections inspired by Tollywood's greatest fashion moments",
    cta: "Shop Now",
    href: "/collections",
    background: "bg-gradient-to-br from-navy-900 via-coral-900 to-navy-800",
  },
]

export default function EnhancedHeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const currentSlideData = heroSlides[currentSlide]

  return (
    <section
      className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-all duration-1000 ${currentSlideData.background}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-20"></div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Logo */}
          <Reveal>
            <TollywoodLogo variant="hero" />
          </Reveal>

          {/* Hero Content */}
          <div className="max-w-4xl mx-auto">
            <Reveal delay={0.3}>
              <AnimatedText
                text={currentSlideData.subtitle}
                className="text-lg md:text-xl text-coral-300 font-medium mb-4 tracking-wide"
                type="words"
                delay={0.1}
              />
            </Reveal>

            <Reveal delay={0.5}>
              <AnimatedText
                text={currentSlideData.title}
                className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight"
                type="chars"
                delay={0.05}
              />
            </Reveal>

            <Reveal delay={0.7}>
              <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
                {currentSlideData.description}
              </p>
            </Reveal>

            <Reveal delay={0.9}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link href={currentSlideData.href}>
                  <EnhancedButton
                    variant="primary"
                    size="lg"
                    icon={<ArrowRight className="w-5 h-5" />}
                    iconPosition="right"
                    glowEffect
                  >
                    {currentSlideData.cta}
                  </EnhancedButton>
                </Link>

                <Link href="/characters">
                  <EnhancedButton
                    variant="outline"
                    size="lg"
                    icon={<Sparkles className="w-5 h-5" />}
                    iconPosition="left"
                  >
                    Browse Characters
                  </EnhancedButton>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation Arrows */}
      <EnhancedButton
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
        rippleEffect
      >
        <ChevronLeft className="h-6 w-6" />
      </EnhancedButton>

      <EnhancedButton
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
        rippleEffect
      >
        <ChevronRight className="h-6 w-6" />
      </EnhancedButton>

      {/* Enhanced Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
              index === currentSlide
                ? "bg-coral-400 scale-125 shadow-lg shadow-coral-400/50"
                : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
