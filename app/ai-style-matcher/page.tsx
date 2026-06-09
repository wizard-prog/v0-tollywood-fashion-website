"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Upload, Camera, Trash2, RefreshCw, Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { spotlightCharacters } from "@/lib/data"

export default function AIStyleMatcherPage() {
  const [image, setImage] = useState<string | null>(null)
  const [isCapturing, setIsCapturing] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [results, setResults] = useState<any | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const router = useRouter()

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
        setResults(null) // Clear previous results
        setAnalysisProgress(0) // Reset progress
      }
      reader.readAsDataURL(file)
    }
  }

  // Trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  // Handle camera capture
  const handleCameraCapture = async () => {
    setIsCapturing(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      setIsCapturing(false)
    }
  }

  // Take photo from camera
  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      // Draw video frame to canvas
      context?.drawImage(video, 0, 0, canvas.width, canvas.height)

      // Convert canvas to data URL
      const dataUrl = canvas.toDataURL("image/jpeg")
      setImage(dataUrl)

      // Stop camera stream
      const stream = video.srcObject as MediaStream
      const tracks = stream.getTracks()
      tracks.forEach((track) => track.stop())
      setIsCapturing(false)
      setResults(null) // Clear previous results
      setAnalysisProgress(0) // Reset progress
    }
  }

  // Clear the selected image
  const clearImage = () => {
    setImage(null)
    setResults(null)
    setAnalysisProgress(0)
    setIsAnalyzing(false)
  }

  // Analyze the image with AI
  const analyzeImage = async () => {
    if (!image) {
      console.log("No image to analyze")
      return
    }

    console.log("Starting analysis...")
    setIsAnalyzing(true)
    setAnalysisProgress(0)
    setResults(null)

    // Simulate realistic progress with multiple steps
    const progressSteps = [
      { progress: 15, delay: 300, message: "Processing image..." },
      { progress: 35, delay: 500, message: "Analyzing facial features..." },
      { progress: 55, delay: 700, message: "Matching style preferences..." },
      { progress: 75, delay: 600, message: "Finding character matches..." },
      { progress: 90, delay: 400, message: "Generating recommendations..." },
      { progress: 100, delay: 300, message: "Analysis complete!" },
    ]

    try {
      // Execute progress steps
      for (const step of progressSteps) {
        await new Promise((resolve) => setTimeout(resolve, step.delay))
        setAnalysisProgress(step.progress)
        console.log(step.message)
      }

      // Generate random results for variety
      const characters = [
        {
          name: "Rishi",
          movie: "Maharshi",
          actor: "Mahesh Babu",
          style: "Urban & Modern",
          percentage: 85 + Math.floor(Math.random() * 10),
          description:
            "Your features and build suggest you'd look great in sleek, contemporary outfits with clean lines and minimal styling, similar to Mahesh Babu's sophisticated urban look in Maharshi.",
          recommendations: [
            "Navy blue blazer with fitted t-shirt",
            "Slim-fit chinos",
            "Minimalist watches and accessories",
          ],
        },
        {
          name: "Pushpa Raj",
          movie: "Pushpa",
          actor: "Allu Arjun",
          style: "Bold & Flamboyant",
          percentage: 80 + Math.floor(Math.random() * 15),
          description:
            "Your bold personality shines through! You'd rock vibrant, statement pieces with unique patterns and colors, just like Allu Arjun's iconic Pushpa style.",
          recommendations: ["Colorful printed shirts", "Statement accessories", "Bold color combinations"],
        },
        {
          name: "Arjun Reddy",
          movie: "Arjun Reddy",
          actor: "Vijay Deverakonda",
          style: "Casual & Edgy",
          percentage: 75 + Math.floor(Math.random() * 20),
          description:
            "Your style matches the effortless, casual-cool vibe of Arjun Reddy. Simple yet impactful pieces that make a statement without trying too hard.",
          recommendations: ["Plain casual shirts", "Denim jackets", "Minimalist accessories"],
        },
      ]

      // Select a random character match
      const randomCharacter = characters[Math.floor(Math.random() * characters.length)]

      const mockResults = {
        primaryStyle: randomCharacter.style,
        matchedCharacter: `${randomCharacter.name} from ${randomCharacter.movie}`,
        matchPercentage: randomCharacter.percentage,
        styleDescription: randomCharacter.description,
        recommendations: randomCharacter.recommendations,
        actor: randomCharacter.actor,
      }

      console.log("Analysis results:", mockResults)
      setResults(mockResults)
    } catch (error) {
      console.error("Error during analysis:", error)
      // Fallback results
      const fallbackResults = {
        primaryStyle: "Urban & Modern",
        matchedCharacter: "Rishi from Maharshi",
        matchPercentage: 85,
        styleDescription:
          "Your features and build suggest you'd look great in sleek, contemporary outfits with clean lines and minimal styling, similar to Mahesh Babu's sophisticated urban look in Maharshi.",
        recommendations: [
          "Navy blue blazer with fitted t-shirt",
          "Slim-fit chinos",
          "Minimalist watches and accessories",
        ],
        actor: "Mahesh Babu",
      }
      setResults(fallbackResults)
    } finally {
      setIsAnalyzing(false)
      console.log("Analysis completed")
    }
  }

  // Find the character object based on the matched character name
  const getMatchedCharacter = () => {
    if (!results) return null

    const characterName = results.matchedCharacter.split(" from ")[0]
    return spotlightCharacters.find(
      (char) =>
        char.name.toLowerCase().includes(characterName.toLowerCase()) ||
        characterName.toLowerCase().includes(char.name.toLowerCase()),
    )
  }

  const matchedCharacter = getMatchedCharacter()

  // Navigate to outfit generator with the matched style
  const goToOutfitGenerator = () => {
    if (results && matchedCharacter) {
      router.push(`/ai-outfit-generator?character=${matchedCharacter.name}&style=${results.primaryStyle}`)
    }
  }

  return (
    <main className="flex min-h-screen flex-col pt-24 bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-64">
        <Image
          src="/placeholder.svg?height=400&width=1920&text=AI+Style+Matcher"
          alt="AI Style Matcher"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy-800/70 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">AI Style Matcher</h1>
            <p className="text-white/90 max-w-2xl mx-auto px-4">
              Discover which Telugu movie character's style suits you best
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 md:p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">Find Your Tollywood Style Match</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image Upload/Display Section */}
                <div className="space-y-6">
                  <div className="bg-gray-700 rounded-lg border-2 border-dashed border-gray-600 p-4 h-80 flex flex-col items-center justify-center relative">
                    {image ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt="Uploaded"
                          fill
                          className="object-contain rounded-lg"
                        />
                        <button
                          onClick={clearImage}
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 rounded-full p-1 shadow-sm transition-colors"
                          aria-label="Remove image"
                        >
                          <Trash2 className="h-5 w-5 text-white" />
                        </button>
                      </div>
                    ) : isCapturing ? (
                      <div className="relative w-full h-full flex flex-col items-center justify-center">
                        <video
                          ref={videoRef}
                          className="w-full h-full object-cover rounded-lg"
                          autoPlay
                          playsInline
                          muted
                        />
                        <canvas ref={canvasRef} className="hidden" />
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                          <Button onClick={takePhoto} className="bg-coral-500 hover:bg-coral-600 text-white">
                            Take Photo
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-white mb-2">Upload your photo</h3>
                        <p className="text-gray-400 text-sm mb-4">
                          Upload a clear photo of yourself to find your Telugu cinema style match
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <Button onClick={handleUploadClick} className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Upload className="mr-2 h-4 w-4" /> Upload Photo
                          </Button>
                          <Button
                            onClick={handleCameraCapture}
                            variant="outline"
                            className="border-gray-600 text-white hover:bg-gray-700"
                          >
                            <Camera className="mr-2 h-4 w-4" /> Use Camera
                          </Button>
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {image && !results && !isAnalyzing && (
                    <div className="flex justify-center">
                      <Button
                        onClick={analyzeImage}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg font-semibold"
                      >
                        Find My Style Match <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  )}

                  {isAnalyzing && (
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Analyzing your style...</span>
                        <span className="text-blue-400 font-medium">{analysisProgress}%</span>
                      </div>
                      <Progress value={analysisProgress} className="h-3 bg-gray-700" />
                      <div className="flex items-center justify-center space-x-2">
                        <RefreshCw className="h-5 w-5 animate-spin text-blue-400" />
                        <span className="text-gray-300">Processing your image...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Results Section */}
                <div>
                  {results ? (
                    <div className="space-y-6 animate-fade-in">
                      <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-lg p-6 border border-blue-500/30">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-white">Your Style Match</h3>
                          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-sm font-bold rounded-full px-3 py-1">
                            {results.matchPercentage}% Match
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-gray-400 mb-1">Primary Style</p>
                            <p className="font-medium text-white">{results.primaryStyle}</p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-400 mb-1">Character Match</p>
                            <p className="font-medium text-white">{results.matchedCharacter}</p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-400 mb-1">Style Analysis</p>
                            <p className="text-gray-300">{results.styleDescription}</p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-400 mb-1">Recommended Items</p>
                            <ul className="list-disc list-inside text-gray-300">
                              {results.recommendations.map((item: string, index: number) => (
                                <li key={index} className="mb-1">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {matchedCharacter && (
                        <div className="bg-gray-800 rounded-lg p-6 border border-gray-600">
                          <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                              <Image
                                src={matchedCharacter.image || "/placeholder.svg"}
                                alt={matchedCharacter.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-bold text-white">{matchedCharacter.name}</h3>
                              <p className="text-sm text-gray-400">
                                {matchedCharacter.movie} • {matchedCharacter.actor}
                              </p>
                            </div>
                          </div>
                          <div className="mt-4">
                            <Button
                              onClick={goToOutfitGenerator}
                              className="w-full bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 text-white"
                            >
                              Generate Outfit Based on This Style <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-center">
                        <Button
                          variant="outline"
                          onClick={clearImage}
                          className="border-gray-600 text-white hover:bg-gray-700"
                        >
                          Try Another Photo
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-800 rounded-lg p-6 h-full flex flex-col justify-center border border-gray-600">
                      <h3 className="text-xl font-bold text-white mb-4">How It Works</h3>
                      <ul className="space-y-4">
                        <li className="flex items-start">
                          <div className="bg-blue-600 rounded-full p-1 mr-3 mt-0.5">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                          <p className="text-gray-300">Upload a clear, front-facing photo of yourself</p>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-blue-600 rounded-full p-1 mr-3 mt-0.5">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                          <p className="text-gray-300">Our AI analyzes your features, style, and appearance</p>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-blue-600 rounded-full p-1 mr-3 mt-0.5">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                          <p className="text-gray-300">
                            Get matched with a Telugu movie character whose style suits you best
                          </p>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-blue-600 rounded-full p-1 mr-3 mt-0.5">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                          <p className="text-gray-300">
                            Receive personalized outfit recommendations based on your match
                          </p>
                        </li>
                      </ul>
                      <p className="text-sm text-gray-500 mt-6">
                        Your photos are processed securely and are not stored on our servers.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="mt-6 bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
              <h3 className="text-lg font-bold text-white mb-2">Privacy Notice</h3>
              <p className="text-gray-400 text-sm">
                Your privacy is important to us. Photos uploaded to our AI Style Matcher are processed securely and are
                not stored on our servers after analysis. The AI analysis is performed using state-of-the-art technology
                to provide you with accurate style recommendations. We do not use your photos for any other purpose, and
                they are automatically deleted after processing.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
