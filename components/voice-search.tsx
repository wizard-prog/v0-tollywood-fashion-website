"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Search, Mic, MicOff, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { featuredProducts } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/lib/types"

export default function VoiceSearch() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [relatedCharacters, setRelatedCharacters] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const recognitionRef = useRef<any>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      // @ts-ignore - webkitSpeechRecognition is not in the types
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = "en-IN" // Set to Indian English for better Telugu name recognition

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex
        const transcriptText = event.results[current][0].transcript
        setTranscript(transcriptText)
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error)
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        if (isListening) {
          recognitionRef.current.start()
        }
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [isListening])

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
      // Perform search with the final transcript
      if (transcript) {
        performSearch(transcript)
      }
    } else {
      setTranscript("")
      recognitionRef.current?.start()
      setIsListening(true)
    }
  }

  const handleManualSearch = () => {
    if (transcript.trim()) {
      performSearch(transcript)
    }
  }

  const performSearch = (query: string) => {
    setIsSearching(true)

    // Simulate API call with timeout
    setTimeout(() => {
      // Search logic - filter products based on query
      // This is a simple implementation - in a real app, you'd have more sophisticated search
      const normalizedQuery = query.toLowerCase()

      const results = featuredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(normalizedQuery) ||
          product.description.toLowerCase().includes(normalizedQuery) ||
          product.character.toLowerCase().includes(normalizedQuery) ||
          product.movie.toLowerCase().includes(normalizedQuery) ||
          product.style.toLowerCase().includes(normalizedQuery) ||
          product.category.toLowerCase().includes(normalizedQuery),
      )

      // Find related characters based on search
      const characters = Array.from(
        new Set(
          featuredProducts
            .filter(
              (p) =>
                p.character.toLowerCase().includes(normalizedQuery) || p.movie.toLowerCase().includes(normalizedQuery),
            )
            .map((p) => p.character),
        ),
      ).slice(0, 3)

      setSearchResults(results)
      setRelatedCharacters(characters)
      setIsSearching(false)
    }, 1000)
  }

  const clearSearch = () => {
    setTranscript("")
    setSearchResults([])
    setRelatedCharacters([])
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTranscript(e.target.value)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Search className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0 overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                ref={searchInputRef}
                value={transcript}
                onChange={handleInputChange}
                placeholder="Search for characters, styles, or products..."
                className="pl-10 pr-10 py-6 text-base"
                onKeyDown={(e) => e.key === "Enter" && handleManualSearch()}
                autoFocus
              />
              {transcript && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-full ${isListening ? "bg-coral-100 text-coral-500" : ""}`}
              onClick={toggleListening}
            >
              {isListening ? <Mic className="h-5 w-5 animate-pulse" /> : <MicOff className="h-5 w-5" />}
            </Button>
            <Button onClick={handleManualSearch}>Search</Button>
          </div>

          {isListening && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 text-sm text-gray-500 flex items-center"
            >
              <span className="h-2 w-2 bg-coral-500 rounded-full mr-2 animate-pulse"></span>
              Listening... Speak now
            </motion.div>
          )}
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-4">
          {isSearching ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 text-coral-500 animate-spin mb-4" />
              <p className="text-gray-500">Searching Telugu cinema styles...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div>
              <h3 className="font-medium text-lg mb-4">Search Results</h3>

              {relatedCharacters.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Related Characters</h4>
                  <div className="flex flex-wrap gap-2">
                    {relatedCharacters.map((character, index) => (
                      <Link
                        key={index}
                        href={`/characters?name=${encodeURIComponent(character)}`}
                        onClick={() => setOpen(false)}
                      >
                        <span className="px-3 py-1 bg-navy-50 hover:bg-navy-100 text-navy-700 rounded-full text-sm transition-colors">
                          {character}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {searchResults.map((product) => (
                  <Link key={product.id} href={`/collections/${product.id}`} onClick={() => setOpen(false)}>
                    <div className="flex border rounded-lg overflow-hidden hover:shadow-md transition-all">
                      <div className="relative h-24 w-24 flex-shrink-0">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-3 flex flex-col justify-center">
                        <h5 className="font-medium text-navy-700 text-sm line-clamp-1">{product.name}</h5>
                        <p className="text-xs text-gray-500 mb-1">
                          {product.character} • {product.movie}
                        </p>
                        <p className="text-coral-500">₹{product.price}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Button variant="outline" className="border-navy-300 text-navy-700" onClick={() => setOpen(false)}>
                  View All Results
                </Button>
              </div>
            </div>
          ) : transcript ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-2">No results found for "{transcript}"</p>
              <p className="text-sm text-gray-400">Try searching for character names, movies, or style elements</p>
            </div>
          ) : (
            <div>
              <h3 className="font-medium text-lg mb-4">Popular Searches</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => {
                    setTranscript("Pushpa Raj style")
                    performSearch("Pushpa Raj style")
                  }}
                >
                  Pushpa Raj style
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => {
                    setTranscript("Baahubali royal outfit")
                    performSearch("Baahubali royal outfit")
                  }}
                >
                  Baahubali royal outfit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => {
                    setTranscript("Arjun Reddy look")
                    performSearch("Arjun Reddy look")
                  }}
                >
                  Arjun Reddy look
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => {
                    setTranscript("Traditional sarees")
                    performSearch("Traditional sarees")
                  }}
                >
                  Traditional sarees
                </Button>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-3">Voice Search Tips</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="h-5 w-5 rounded-full bg-navy-50 text-navy-500 flex items-center justify-center text-xs mr-2 mt-0.5">
                      1
                    </span>
                    <span>Try saying character names like "Pushpa Raj" or "Arjun Reddy"</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 rounded-full bg-navy-50 text-navy-500 flex items-center justify-center text-xs mr-2 mt-0.5">
                      2
                    </span>
                    <span>Search by movie names like "Baahubali" or "RRR"</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 rounded-full bg-navy-50 text-navy-500 flex items-center justify-center text-xs mr-2 mt-0.5">
                      3
                    </span>
                    <span>Describe styles like "rugged look" or "traditional outfit"</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
