"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import CinematicHero from "@/components/cinematic-hero"
import FloatingProductCard from "@/components/floating-product-card"
import TeluguCinemaFactsCarousel from "@/components/telugu-cinema-facts-carousel"
import { products } from "@/lib/data"
import { Sparkles, Zap, Star, Film, Camera, Wand2, Award, Globe, TrendingUp } from "lucide-react"

// Show Sita Ramam pink saree, Mirchi jacket, and other diverse products
const featuredProducts = [
  ...products.filter((p) => p.id === "29"), // Sita Ramam Elegant Pink Saree
  ...products.filter((p) => p.id === "30"), // Mirchi Stylish Leather Jacket
  ...products
    .filter(
      (p) => !p.movie.includes("Sita Ramam") && !p.movie.includes("Seethamma Vakitlo") && !p.movie.includes("Mirchi"),
    )
    .slice(0, 6), // Other products
].slice(0, 8)

const iconicMoments = [
  {
    id: 1,
    title: "Baahubali's Royal Entrance",
    movie: "Baahubali",
    description: "The majestic introduction scene that redefined Indian cinema's scale and grandeur",
    impact: "Global Recognition",
    year: "2015",
    icon: Award,
    gradient: "from-amber-600 to-orange-600",
  },
  {
    id: 2,
    title: "Pushpa's Iconic Hand Gesture",
    movie: "Pushpa: The Rise",
    description: "The signature hand gesture that became a nationwide phenomenon and cultural trend",
    impact: "Viral Sensation",
    year: "2021",
    icon: TrendingUp,
    gradient: "from-red-600 to-rose-600",
  },
  {
    id: 3,
    title: "RRR's Naatu Naatu Dance",
    movie: "RRR",
    description: "The energetic dance sequence that won an Academy Award and captivated global audiences",
    impact: "Oscar Winner",
    year: "2022",
    icon: Globe,
    gradient: "from-green-600 to-emerald-600",
  },
  {
    id: 4,
    title: "Sita Ramam's Timeless Romance",
    movie: "Sita Ramam",
    description: "The ethereal love story that captured hearts with its vintage charm and poetic beauty",
    impact: "Period Romance",
    year: "2022",
    icon: Star,
    gradient: "from-pink-600 to-rose-600",
  },
]

const cinemaFacts = [
  {
    fact: "Baahubali 2 became the highest-grossing Indian film worldwide, earning over ₹1,800 crore",
    category: "Box Office",
  },
  {
    fact: "Ramoji Film City in Hyderabad is the world's largest film studio complex spanning 1,666 acres",
    category: "Infrastructure",
  },
  {
    fact: "RRR's 'Naatu Naatu' is the first Telugu song to win an Academy Award for Best Original Song",
    category: "Global Recognition",
  },
  {
    fact: "Sita Ramam's vintage aesthetic and period costumes set new trends in Telugu cinema fashion",
    category: "Fashion Impact",
  },
]

const genreMapping = {
  Pushpa: "action",
  Baahubali: "fantasy",
  "Arjun Reddy": "thriller",
  "Sita Ramam": "romance",
  Mirchi: "action",
} as const

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div ref={containerRef} className="min-h-screen bg-cinema-dark">
      {/* Hero Section */}
      <motion.div style={{ y, opacity }}>
        <CinematicHero />
      </motion.div>

      {/* Featured Collections Section */}
      <section className="relative py-20 bg-gradient-to-b from-cinema-dark via-cinema-light to-cinema-dark">
        {/* Background Effects */}
        <div className="absolute inset-0 cinema-grid opacity-10" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 mb-4 px-4 py-2 glass-effect rounded-full neon-border"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <Sparkles className="w-5 h-5 text-neon-pink" />
              <span className="text-neon-pink font-medium">Featured Collections</span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              <span className="neon-text">ICONIC</span> LOOKS
            </h2>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Step into the wardrobes of cinema's most memorable characters
            </p>
          </motion.div>

          {/* Products Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {featuredProducts.map((product, index) => {
              // Determine genre based on movie/character
              let genre: "action" | "fantasy" | "romance" | "thriller" = "action"

              if (product.movie.includes("Baahubali")) genre = "fantasy"
              else if (product.movie.includes("Sita Ramam")) genre = "romance"
              else if (product.movie.includes("Arjun Reddy")) genre = "thriller"
              else if (product.movie.includes("Mirchi")) genre = "action"

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    type: "spring",
                  }}
                  viewport={{ once: true }}
                >
                  <FloatingProductCard product={product} genre={genre} />
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Iconic Moments Section */}
      <section className="relative py-20 bg-gradient-to-r from-cinema-dark via-gray-900 to-cinema-dark">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cinema-accent/10 to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 mb-4 px-4 py-2 glass-effect rounded-full border border-amber-500/30"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <Film className="w-5 h-5 text-amber-400" />
              <span className="text-amber-400 font-medium">Cinema Legacy</span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                ICONIC
              </span>{" "}
              MOMENTS
            </h2>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Relive the scenes that defined Telugu cinema and inspired fashion trends worldwide
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {iconicMoments.map((moment, index) => {
              const Icon = moment.icon
              return (
                <motion.div
                  key={moment.id}
                  className="relative group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${moment.gradient} opacity-20 rounded-2xl blur-xl group-hover:opacity-30 transition-opacity`}
                  />

                  <div className="relative p-8 glass-effect rounded-2xl border border-white/10 group-hover:border-white/20 transition-all duration-500 group-hover:transform group-hover:-translate-y-2">
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-r ${moment.gradient} flex items-center justify-center`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">{moment.year}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                      {moment.title}
                    </h3>

                    <p className="text-gray-400 mb-4 leading-relaxed">{moment.description}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-amber-400">{moment.movie}</span>
                      <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${moment.gradient} text-white`}>
                        {moment.impact}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Cinema Facts */}
          <motion.div
            className="bg-gradient-to-r from-cinema-dark via-gray-900 to-cinema-dark rounded-3xl p-8 border border-white/10"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                <span className="neon-text-blue">FASCINATING</span> FACTS
              </h3>
              <p className="text-gray-400">Discover the incredible achievements and milestones of Telugu cinema</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cinemaFacts.map((item, index) => (
                <motion.div
                  key={index}
                  className="p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50 hover:border-neon-blue/30 transition-all duration-300 group"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-neon-blue rounded-full mt-2 group-hover:shadow-lg group-hover:shadow-neon-blue/50 transition-all" />
                    <div className="flex-1">
                      <span className="text-xs text-neon-blue font-medium mb-2 block">{item.category}</span>
                      <p className="text-gray-300 group-hover:text-white transition-colors">{item.fact}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Telugu Cinema Facts Carousel */}
      <section className="py-20 bg-navy-700 text-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <TeluguCinemaFactsCarousel />
        </div>
      </section>

      {/* AI Tools Section */}
      <section className="relative py-20 bg-gradient-to-r from-cinema-dark via-cinema-accent to-cinema-dark">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              <span className="neon-text-blue">AI-POWERED</span> FASHION
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience the future of character-inspired fashion with our AI tools
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* AI Style Matcher */}
            <Link href="/ai-style-matcher">
              <motion.div
                className="p-8 rounded-2xl bg-gradient-to-br from-purple-900 to-indigo-900 border border-purple-500/30 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-500 group"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="flex items-start">
                  <div className="mr-6">
                    <div className="w-16 h-16 rounded-full bg-purple-700/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Camera className="w-8 h-8 text-purple-300" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-black mb-3 group-hover:text-purple-700 transition-colors">
                      AI Style Matcher
                    </h3>
                    <p className="text-gray-800 mb-6">
                      Upload your photo and discover which Telugu movie character's style matches yours perfectly
                    </p>
                    <div className="flex items-center text-purple-700 font-medium">
                      <span>Find your match</span>
                      <div className="ml-2 w-6 h-0.5 bg-purple-700 group-hover:w-10 transition-all"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* AI Outfit Generator */}
            <Link href="/ai-outfit-generator">
              <motion.div
                className="p-8 rounded-2xl bg-gradient-to-br from-teal-900 to-emerald-900 border border-teal-500/30 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transition-all duration-500 group"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="flex items-start">
                  <div className="mr-6">
                    <div className="w-16 h-16 rounded-full bg-teal-700/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Wand2 className="w-8 h-8 text-teal-300" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-black mb-3 group-hover:text-teal-700 transition-colors">
                      AI Outfit Generator
                    </h3>
                    <p className="text-gray-800 mb-6">
                      Generate complete character-inspired outfits customized to your style preferences
                    </p>
                    <div className="flex items-center text-teal-700 font-medium">
                      <span>Create your outfit</span>
                      <div className="ml-2 w-6 h-0.5 bg-teal-700 group-hover:w-10 transition-all"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 bg-gradient-to-b from-cinema-dark via-cinema-light to-cinema-dark">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {[
              {
                icon: Zap,
                title: "Fast Delivery",
                description: "Quick shipping for all your character-inspired fashion",
                color: "neon-blue",
              },
              {
                icon: Star,
                title: "Curated Collections",
                description: "Handpicked outfits from cinema's greatest moments",
                color: "neon-pink",
              },
              {
                icon: Film,
                title: "Cinematic Experience",
                description: "Immersive shopping like stepping into a movie",
                color: "neon-green",
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  className="text-center p-8 glass-effect rounded-2xl neon-border group hover:scale-105 transition-all duration-500"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <motion.div
                    className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-${feature.color} to-${feature.color}/50 flex items-center justify-center`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-neon-blue transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{feature.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
