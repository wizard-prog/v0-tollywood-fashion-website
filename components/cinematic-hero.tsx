"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Play, Sparkles, ArrowRight, Film } from "lucide-react"
import Link from "next/link"

const heroSlides = [
  {
    id: 1,
    title: "ENTER THE CINEMATIC UNIVERSE",
    subtitle: "Fashion Portal",
    description: "Step into your favorite characters' wardrobes",
    genre: "action",
    cta: "Explore Collections",
    href: "/collections",
    background: "bg-gradient-to-br from-genre-action-primary/30 via-cinema-dark to-genre-action-secondary/20",
  },
  {
    id: 2,
    title: "AI STYLE MATCHING",
    subtitle: "Future Fashion",
    description: "Let AI find your perfect character match",
    genre: "thriller",
    cta: "Take Style Quiz",
    href: "/style-quiz",
    background: "bg-gradient-to-br from-genre-thriller-primary/30 via-cinema-dark to-genre-thriller-secondary/20",
  },
  {
    id: 3,
    title: "LEGENDARY LOOKS",
    subtitle: "Iconic Styles",
    description: "Curated fashion from cinema's greatest moments",
    genre: "fantasy",
    cta: "Shop Now",
    href: "/collections",
    background: "bg-gradient-to-br from-genre-fantasy-primary/30 via-cinema-dark to-genre-fantasy-secondary/20",
  },
]

export default function CinematicHero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

  const currentSlideData = heroSlides[currentSlide]

  return (
    <motion.section
      ref={heroRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${currentSlideData.background}`}
      style={{ y, opacity }}
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 cinema-grid opacity-20" />

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-blue rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Parallax Background Elements */}
      <motion.div
        className="absolute inset-0"
        style={{
          x: mousePosition.x * 20,
          y: mousePosition.y * 20,
        }}
      >
        <div className="absolute top-20 left-20 w-32 h-32 border border-neon-pink/30 rounded-full animate-float" />
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-neon-blue/30 rounded-lg animate-float animation-delay-500" />
        <div className="absolute top-1/2 left-10 w-16 h-16 border border-neon-green/30 rounded-full animate-float animation-delay-300" />
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          {/* Logo with Neon Effect */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="mb-8"
          >
            <div className="inline-flex items-center space-x-3 p-4 glass-effect rounded-2xl neon-border">
              <Film className="w-8 h-8 text-neon-blue animate-glow" />
              <span className="text-2xl font-black neon-text">TOLLYWOOD THREADS</span>
            </div>
          </motion.div>

          {/* Hero Content */}
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.p
              className="text-lg md:text-xl text-neon-pink font-medium mb-4 tracking-wider animate-neon-pulse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {currentSlideData.subtitle}
            </motion.p>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              {currentSlideData.title.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  className="inline-block mr-4"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {currentSlideData.description}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Link href={currentSlideData.href}>
                <motion.button
                  className="group relative px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-pink rounded-full text-white font-bold text-lg overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center">
                    <Play className="w-5 h-5 mr-2" />
                    {currentSlideData.cta}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-pink to-neon-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              </Link>

              <Link href="/characters">
                <motion.button
                  className="group px-8 py-4 border-2 border-neon-green rounded-full text-neon-green font-bold text-lg hover:bg-neon-green hover:text-cinema-dark transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Browse Characters
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {heroSlides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-neon-blue scale-125 shadow-lg shadow-neon-blue/50"
                : "bg-white/40 hover:bg-white/60"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <div className="w-6 h-10 border-2 border-neon-blue/60 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-neon-blue rounded-full mt-2"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>
      </motion.div>
    </motion.section>
  )
}
