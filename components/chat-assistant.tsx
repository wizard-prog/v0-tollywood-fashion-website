"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MessageSquare, Send, X, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { spotlightCharacters } from "@/lib/data"

type Message = {
  role: "user" | "assistant"
  content: string
}

type SuggestionAction = {
  type: "navigate" | "search" | "outfit" | "style"
  label: string
  value: string
}

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your Tollywood Threads style assistant. How can I help you find the perfect Telugu cinema-inspired look today?",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<SuggestionAction[]>([
    { type: "navigate", label: "Show me trending looks", value: "Show me trending looks" },
    {
      type: "style",
      label: "Help me dress like Mahesh Babu in Maharshi",
      value: "Help me dress like Mahesh Babu in Maharshi",
    },
    { type: "outfit", label: "Create an outfit inspired by Pushpa", value: "Create an outfit inspired by Pushpa" },
    { type: "search", label: "Find traditional Telugu outfits", value: "Find traditional Telugu outfits" },
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (!inputValue.trim()) return

    const userMessage = inputValue.trim()
    setInputValue("")

    // Add user message to chat
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])

    // Show loading state
    setIsLoading(true)

    try {
      // For demo purposes, we'll create a mock response
      // In a real app, you would use the OpenAI API to generate the response

      // Generate a response based on the user's message
      let responseText = ""
      let extractedSuggestions: SuggestionAction[] = []

      if (userMessage.toLowerCase().includes("pushpa")) {
        responseText =
          "Allu Arjun's style in Pushpa is characterized by rugged, earthy tones and bold patterns. His iconic floral shirts paired with cargo pants created a nationwide fashion trend."
        extractedSuggestions = [
          { type: "outfit", label: "Create Pushpa-inspired outfit", value: "Create an outfit inspired by Pushpa" },
          { type: "navigate", label: "Browse Pushpa collection", value: "Show me Pushpa collection" },
          { type: "style", label: "Try on Pushpa's style", value: "Help me dress like Allu Arjun in Pushpa" },
        ]
      } else if (userMessage.toLowerCase().includes("baahubali")) {
        responseText =
          "Prabhas's royal attire in Baahubali combines traditional elements with warrior aesthetics. The costumes feature intricate embroidery, layered fabrics, and regal accessories."
        extractedSuggestions = [
          {
            type: "outfit",
            label: "Create Baahubali-inspired outfit",
            value: "Create an outfit inspired by Baahubali",
          },
          { type: "navigate", label: "See royal collections", value: "Show me royal Telugu movie outfits" },
          { type: "style", label: "Try on Baahubali's style", value: "Help me dress like Prabhas in Baahubali" },
        ]
      } else if (userMessage.toLowerCase().includes("trending")) {
        responseText =
          "Currently trending looks include Pushpa's rugged style, RRR's period-inspired fashion, and Sita Ramam's vintage elegance. These films have significantly influenced contemporary fashion."
        extractedSuggestions = [
          { type: "navigate", label: "See trending looks", value: "Show me trending looks" },
          { type: "outfit", label: "Create a trending outfit", value: "Create a trending Telugu movie outfit" },
          { type: "search", label: "Find vintage styles", value: "Find vintage Telugu movie styles" },
        ]
      } else {
        responseText =
          "I can help you find character-inspired fashion from Telugu cinema. Would you like to explore outfits based on a specific character, movie, or style?"
        extractedSuggestions = [
          { type: "navigate", label: "Browse characters", value: "Show me character styles" },
          { type: "style", label: "Find my style match", value: "Help me find my Telugu cinema style match" },
          { type: "outfit", label: "Create a custom outfit", value: "Create a custom Telugu movie inspired outfit" },
        ]
      }

      // Add assistant response to chat
      setMessages((prev) => [...prev, { role: "assistant", content: responseText }])

      // Update suggestions
      setSuggestions(extractedSuggestions)
    } catch (error) {
      console.error("Error getting response:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, I'm having trouble responding right now. Please try again later.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestionClick = (suggestion: SuggestionAction) => {
    // Handle different suggestion types
    switch (suggestion.type) {
      case "navigate":
        if (suggestion.value.toLowerCase().includes("trending")) {
          router.push("/collections")
        } else if (suggestion.value.toLowerCase().includes("character")) {
          router.push("/characters")
        } else {
          router.push("/")
        }
        setIsOpen(false)
        break

      case "search":
        setInputValue(suggestion.value)
        handleSubmit()
        break

      case "outfit":
        // Extract character name if present
        const outfitMatch = suggestion.value.match(/inspired by (.+?)($|\s|\.)/i)
        if (outfitMatch) {
          const character = spotlightCharacters.find((char) =>
            char.name.toLowerCase().includes(outfitMatch[1].toLowerCase()),
          )
          if (character) {
            router.push(`/ai-outfit-generator?character=${encodeURIComponent(character.name)}`)
            setIsOpen(false)
            return
          }
        }
        setInputValue(suggestion.value)
        handleSubmit()
        break

      case "style":
        // Extract character name if present
        const styleMatch = suggestion.value.match(/like (.+?) in/i)
        if (styleMatch) {
          const character = spotlightCharacters.find((char) =>
            char.name.toLowerCase().includes(styleMatch[1].toLowerCase()),
          )
          if (character) {
            router.push(`/ai-style-matcher?character=${encodeURIComponent(character.name)}`)
            setIsOpen(false)
            return
          }
        }
        setInputValue(suggestion.value)
        handleSubmit()
        break

      default:
        setInputValue(suggestion.value)
        handleSubmit()
    }
  }

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-coral-500 text-white flex items-center justify-center shadow-lg hover:bg-coral-600 transition-all z-50"
        aria-label="Open chat assistant"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      {/* Chat dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md h-[600px] max-h-[90vh] flex flex-col animate-fade-in">
            {/* Chat header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center">
                <div className="bg-coral-500 w-10 h-10 rounded-full flex items-center justify-center text-white mr-3">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-700">Style Assistant</h3>
                  <p className="text-xs text-gray-500">Powered by AI</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-coral-500 text-white rounded-tr-none"
                        : "bg-gray-100 text-gray-800 rounded-tl-none"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 text-gray-800 rounded-tl-none">
                    <div className="flex space-x-2">
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="p-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2">Suggestions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-xs bg-navy-50 hover:bg-navy-100 text-navy-700 px-3 py-1.5 rounded-full transition-colors"
                    >
                      {suggestion.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat input */}
            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex items-center">
                <input
                  type="text"
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about Telugu cinema fashion..."
                  className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-coral-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="bg-coral-500 text-white rounded-r-lg px-4 py-2 hover:bg-coral-600 disabled:bg-coral-300"
                  disabled={isLoading || !inputValue.trim()}
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick access buttons when chat is closed */}
      {!isOpen && (
        <div className="fixed bottom-24 right-6 flex flex-col gap-2 items-end z-50">
          <div className="bg-white rounded-lg shadow-md p-2 animate-slide-up">
            <Button
              size="sm"
              onClick={() => router.push("/ai-style-matcher")}
              className="bg-navy-700 hover:bg-navy-800 text-white"
            >
              <Sparkles className="mr-2 h-4 w-4" /> Find My Style Match
            </Button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-2 animate-slide-up" style={{ animationDelay: "100ms" }}>
            <Button
              size="sm"
              onClick={() => router.push("/ai-outfit-generator")}
              className="bg-navy-700 hover:bg-navy-800 text-white"
            >
              <ArrowRight className="mr-2 h-4 w-4" /> Generate Outfit
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
