"use client"
import { useState } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"

export default function CharacterSuggestionForm() {
  const [formData, setFormData] = useState({
    characterName: "",
    movieName: "",
    actorName: "",
    whyLove: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        characterName: "",
        movieName: "",
        actorName: "",
        whyLove: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <div className="max-w-2xl mx-auto">
      {isSubmitted ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-green-800 mb-2">Thank You for Your Suggestion!</h3>
          <p className="text-green-700">
            We appreciate your input. Our team will review your character suggestion and consider adding it to our
            collection.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="characterName" className="block text-sm font-medium text-gray-700 mb-1">
              Character Name*
            </label>
            <input
              type="text"
              id="characterName"
              name="characterName"
              value={formData.characterName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., Pushpa Raj"
            />
          </div>

          <div>
            <label htmlFor="movieName" className="block text-sm font-medium text-gray-700 mb-1">
              Movie Name*
            </label>
            <input
              type="text"
              id="movieName"
              name="movieName"
              value={formData.movieName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., Pushpa: The Rise"
            />
          </div>

          <div>
            <label htmlFor="actorName" className="block text-sm font-medium text-gray-700 mb-1">
              Actor Name*
            </label>
            <input
              type="text"
              id="actorName"
              name="actorName"
              value={formData.actorName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., Allu Arjun"
            />
          </div>

          <div>
            <label htmlFor="whyLove" className="block text-sm font-medium text-gray-700 mb-1">
              Why do you love this character's style?*
            </label>
            <textarea
              id="whyLove"
              name="whyLove"
              value={formData.whyLove}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Tell us what makes this character's style special to you..."
            ></textarea>
          </div>

          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Suggestion"}
          </Button>
        </form>
      )}
    </div>
  )
}
