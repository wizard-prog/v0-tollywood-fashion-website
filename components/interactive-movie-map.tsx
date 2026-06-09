"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Film, X } from "lucide-react"
import Link from "next/link"

interface MovieLocation {
  id: string
  name: string
  description: string
  coordinates: { x: number; y: number }
  image: string
  movie: string
  character: string
  year: number
  products: Array<{
    id: string
    name: string
    image: string
    price: number
  }>
}

interface InteractiveMovieMapProps {
  mapImage: string
  locations: MovieLocation[]
}

export default function InteractiveMovieMap({ mapImage, locations }: InteractiveMovieMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<MovieLocation | null>(null)
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null)

  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden bg-navy-900">
      {/* Map Background */}
      <div className="absolute inset-0">
        <Image
          src={mapImage || "/placeholder.svg"}
          alt="Tollywood Movie Locations Map"
          fill
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/20 to-transparent" />
      </div>

      {/* Map Title */}
      <div className="absolute top-6 left-6 right-6 z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Iconic Tollywood Fashion Locations</h2>
        <p className="text-white/80 mt-2">Explore the filming locations of famous Telugu cinema fashion moments</p>
      </div>

      {/* Location Pins */}
      {locations.map((location) => (
        <button
          key={location.id}
          className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 group"
          style={{ left: `${location.coordinates.x}%`, top: `${location.coordinates.y}%` }}
          onClick={() => setSelectedLocation(location)}
          onMouseEnter={() => setHoveredLocation(location.id)}
          onMouseLeave={() => setHoveredLocation(null)}
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={{
              scale: hoveredLocation === location.id || selectedLocation?.id === location.id ? 1.3 : 1,
              y: hoveredLocation === location.id || selectedLocation?.id === location.id ? -5 : 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="relative"
          >
            <MapPin
              className={`h-8 w-8 ${
                selectedLocation?.id === location.id
                  ? "text-coral-500"
                  : hoveredLocation === location.id
                    ? "text-coral-400"
                    : "text-white"
              } drop-shadow-glow transition-colors duration-200`}
              fill={
                selectedLocation?.id === location.id
                  ? "#f97316"
                  : hoveredLocation === location.id
                    ? "#fb923c"
                    : "transparent"
              }
            />
            <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-navy-800 text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-white">
              <Film className="h-3 w-3" />
            </span>
          </motion.div>

          {/* Hover Tooltip */}
          <AnimatePresence>
            {hoveredLocation === location.id && !selectedLocation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-lg shadow-lg p-2 w-48 pointer-events-none z-20"
              >
                <p className="font-medium text-navy-700 text-sm">{location.name}</p>
                <p className="text-xs text-gray-500">
                  {location.movie} ({location.year})
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      ))}

      {/* Location Detail Panel */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute top-0 right-0 bottom-0 w-full md:w-1/3 bg-white shadow-xl z-20 overflow-y-auto"
          >
            <button
              className="absolute top-4 right-4 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              onClick={() => setSelectedLocation(null)}
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>

            <div className="relative h-48">
              <Image
                src={selectedLocation.image || "/placeholder.svg"}
                alt={selectedLocation.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                <h3 className="text-xl font-bold text-white">{selectedLocation.name}</h3>
                <p className="text-white/90 text-sm">
                  {selectedLocation.movie} • {selectedLocation.year}
                </p>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h4 className="font-medium text-navy-700 mb-2">About this location</h4>
                <p className="text-gray-600 text-sm">{selectedLocation.description}</p>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-navy-700 mb-2">Iconic Style Moment</h4>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 relative overflow-hidden">
                    <Image
                      src={`/images/characters/${selectedLocation.character.toLowerCase().replace(/\s+/g, "-")}.jpg`}
                      alt={selectedLocation.character}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-navy-700">{selectedLocation.character}</p>
                    <p className="text-sm text-gray-500">{selectedLocation.movie}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-navy-700 mb-3">Shop this look</h4>
                <div className="grid grid-cols-2 gap-3">
                  {selectedLocation.products.map((product) => (
                    <Link key={product.id} href={`/collections/${product.id}`}>
                      <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="relative h-32">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-2">
                          <p className="font-medium text-navy-700 text-sm line-clamp-1">{product.name}</p>
                          <p className="text-coral-500 text-sm">₹{product.price}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map Legend */}
      <div className="absolute bottom-6 left-6 bg-navy-800/80 backdrop-blur-sm rounded-lg p-3 text-white z-10">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-white mr-1" />
            <span className="text-sm">Film Location</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-coral-500 mr-1" fill="#f97316" />
            <span className="text-sm">Selected Location</span>
          </div>
        </div>
      </div>
    </div>
  )
}
