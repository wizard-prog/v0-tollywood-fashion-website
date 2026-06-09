"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, Check, RefreshCw } from "lucide-react"
import Link from "next/link"

interface QuizQuestion {
  id: number
  question: string
  options: Array<{
    id: string
    text: string
    image?: string
    character?: string
    movie?: string
  }>
}

interface QuizResult {
  character: string
  description: string
  image: string
  movie: string
  style: string
  products: Array<{
    id: string
    name: string
    image: string
    price: number
  }>
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which color palette do you prefer for your outfits?",
    options: [
      {
        id: "earthy",
        text: "Earthy tones (browns, greens, rusts)",
        image: "/images/quiz/earthy-tones.png",
        character: "Pushpa Raj",
      },
      {
        id: "royal",
        text: "Rich, royal colors (golds, deep reds, navy)",
        image: "/placeholder.svg?height=200&width=300&text=Royal+Colors",
        character: "Amarendra Baahubali",
      },
      {
        id: "monochrome",
        text: "Monochrome (blacks, whites, grays)",
        image: "/placeholder.svg?height=200&width=300&text=Monochrome+Palette",
        character: "Arjun Reddy",
      },
      {
        id: "pastel",
        text: "Soft pastels and vintage tones",
        image: "/placeholder.svg?height=200&width=300&text=Pastel+Colors",
        character: "Sita Mahalakshmi",
      },
    ],
  },
  {
    id: 2,
    question: "What's your preferred style aesthetic?",
    options: [
      {
        id: "rugged",
        text: "Rugged and raw",
        image: "/placeholder.svg?height=200&width=300&text=Rugged+Style",
        character: "Pushpa Raj",
        movie: "Pushpa: The Rise",
      },
      {
        id: "sophisticated",
        text: "Sophisticated and elegant",
        image: "/placeholder.svg?height=200&width=300&text=Sophisticated+Style",
        character: "Nandu",
        movie: "Athadu",
      },
      {
        id: "casual",
        text: "Casual and comfortable",
        image: "/placeholder.svg?height=200&width=300&text=Casual+Style",
        character: "Sanjay Sahu",
        movie: "Jalsa",
      },
      {
        id: "traditional",
        text: "Traditional with a modern twist",
        image: "/placeholder.svg?height=200&width=300&text=Traditional+Style",
        character: "Seetha",
        movie: "Seethamma Vakitlo Sirimalle Chettu",
      },
    ],
  },
  {
    id: 3,
    question: "Which occasion do you dress up for most often?",
    options: [
      {
        id: "casual-outings",
        text: "Casual outings with friends",
        image: "/placeholder.svg?height=200&width=300&text=Casual+Outings",
        character: "Prabha",
        movie: "Darling",
      },
      {
        id: "formal-events",
        text: "Formal events and gatherings",
        image: "/placeholder.svg?height=200&width=300&text=Formal+Events",
        character: "Rishi",
        movie: "Maharshi",
      },
      {
        id: "parties",
        text: "Parties and celebrations",
        image: "/placeholder.svg?height=200&width=300&text=Parties",
        character: "Lucky",
        movie: "Race Gurram",
      },
      {
        id: "cultural-events",
        text: "Cultural events and festivals",
        image: "/placeholder.svg?height=200&width=300&text=Cultural+Events",
        character: "Kala Bhairava",
        movie: "Magadheera",
      },
    ],
  },
  {
    id: 4,
    question: "Which accessory do you value most in your outfit?",
    options: [
      {
        id: "statement-pieces",
        text: "Statement pieces that stand out",
        image: "/placeholder.svg?height=200&width=300&text=Statement+Accessories",
        character: "Tony",
        movie: "Oosaravelli",
      },
      {
        id: "minimal",
        text: "Minimal, subtle accessories",
        image: "/placeholder.svg?height=200&width=300&text=Minimal+Accessories",
        character: "Vijay Govind",
        movie: "Geetha Govindam",
      },
      {
        id: "functional",
        text: "Functional items (watches, belts, etc.)",
        image: "/placeholder.svg?height=200&width=300&text=Functional+Accessories",
        character: "Pandu",
        movie: "Pokiri",
      },
      {
        id: "traditional",
        text: "Traditional jewelry and accessories",
        image: "/placeholder.svg?height=200&width=300&text=Traditional+Accessories",
        character: "Shakuntala",
        movie: "Shakuntalam",
      },
    ],
  },
  {
    id: 5,
    question: "Which of these Tollywood characters' style appeals to you most?",
    options: [
      {
        id: "allu-arjun",
        text: "Allu Arjun's trendsetting looks",
        image: "/images/characters/allu-arjun-pushpa.jpg",
        character: "Pushpa Raj",
        movie: "Pushpa: The Rise",
      },
      {
        id: "mahesh-babu",
        text: "Mahesh Babu's sophisticated style",
        image: "/images/characters/mahesh-babu-athadu.jpg",
        character: "Nandu",
        movie: "Athadu",
      },
      {
        id: "prabhas",
        text: "Prabhas's versatile fashion",
        image: "/images/characters/prabhas-darling.jpg",
        character: "Prabha",
        movie: "Darling",
      },
      {
        id: "samantha",
        text: "Samantha's elegant ensembles",
        image: "/images/characters/samantha-seethamma.jpg",
        character: "Seetha",
        movie: "Seethamma Vakitlo Sirimalle Chettu",
      },
    ],
  },
]

const quizResults: Record<string, QuizResult> = {
  "Pushpa Raj": {
    character: "Pushpa Raj",
    description:
      "You have a bold, rugged style with a preference for statement pieces and earthy tones. Like Pushpa Raj, you're not afraid to stand out and make a fashion statement that's uniquely yours.",
    image: "/images/characters/allu-arjun-pushpa.jpg",
    movie: "Pushpa: The Rise",
    style: "Rugged, Bold, Earthy, Distinctive",
    products: [
      {
        id: "1",
        name: "Pushpa Raj Red Floral Shirt",
        image: "/images/products/pushpa-floral-shirt.jpg",
        price: 1299,
      },
      {
        id: "5",
        name: "RRR Komaram Bheem Dhoti Set",
        image: "/images/products/rrr-komaram-bheem-dhoti.jpg",
        price: 1899,
      },
      {
        id: "16",
        name: "Race Gurram Party Outfit",
        image: "/images/products/race-gurram-party-outfit.jpg",
        price: 2899,
      },
    ],
  },
  Nandu: {
    character: "Nandu",
    description:
      "Your style is sophisticated and mysterious with a preference for structured outfits and formal wear. Like Nandu from Athadu, you appreciate clean lines, elegant silhouettes, and a composed appearance.",
    image: "/images/characters/mahesh-babu-athadu.jpg",
    movie: "Athadu",
    style: "Sophisticated, Elegant, Structured, Formal",
    products: [
      {
        id: "13",
        name: "Athadu Formal Shirt",
        image: "/images/products/athadu-formal-shirt.jpg",
        price: 1899,
      },
      {
        id: "2",
        name: "Maharshi Urban Casual Jacket",
        image: "/images/products/maharshi-urban-jacket.jpg",
        price: 2499,
      },
      {
        id: "9",
        name: "Pokiri Leather Jacket",
        image: "/images/products/pokiri-leather-jacket.jpg",
        price: 3299,
      },
    ],
  },
  Prabha: {
    character: "Prabha",
    description:
      "You have a charming, casual style that's approachable and comfortable. Like Prabha from Darling, you prefer denim, casual tees, and a relaxed aesthetic that's perfect for everyday wear.",
    image: "/images/characters/prabhas-darling.jpg",
    movie: "Darling",
    style: "Casual, Charming, Comfortable, Approachable",
    products: [
      {
        id: "11",
        name: "Darling Denim Collection",
        image: "/images/products/darling-denim-collection.jpg",
        price: 2499,
      },
      {
        id: "18",
        name: "Geetha Govindam Casual Set",
        image: "/images/products/geetha-govindam-casual-set.jpg",
        price: 1999,
      },
      {
        id: "10",
        name: "Jalsa Casual Shirt Set",
        image: "/images/products/jalsa-casual-shirt.jpg",
        price: 1599,
      },
    ],
  },
  Seetha: {
    character: "Seetha",
    description:
      "Your style is traditional and graceful with an appreciation for cultural aesthetics. Like Seetha from Seethamma Vakitlo, you prefer elegant sarees, simple jewelry, and a natural beauty that celebrates tradition.",
    image: "/images/characters/samantha-seethamma.jpg",
    movie: "Seethamma Vakitlo Sirimalle Chettu",
    style: "Traditional, Graceful, Elegant, Cultural",
    products: [
      {
        id: "15",
        name: "Seethamma Vakitlo Traditional Saree",
        image: "/images/products/seethamma-vakitlo-traditional-saree.jpg",
        price: 4599,
      },
      {
        id: "3",
        name: "Sita Floral Saree",
        image: "/images/products/shakuntalam-floral-saree.jpg",
        price: 3999,
      },
      {
        id: "7",
        name: "Fidaa Traditional Anarkali",
        image: "/images/products/fidaa-traditional-anarkali.jpg",
        price: 3499,
      },
    ],
  },
}

export default function StyleQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [result, setResult] = useState<QuizResult | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleAnswer = (optionId: string) => {
    if (isAnimating) return

    setIsAnimating(true)
    setAnswers({ ...answers, [currentQuestion]: optionId })

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        calculateResult()
      }
      setIsAnimating(false)
    }, 500)
  }

  const calculateResult = () => {
    // This is a simplified algorithm - in a real app, you'd have a more sophisticated matching system
    // For demo purposes, we'll just count which character was selected most often
    const characterCounts: Record<string, number> = {}

    Object.values(answers).forEach((optionId) => {
      // Find the question and option
      for (const question of quizQuestions) {
        const option = question.options.find((opt) => opt.id === optionId)
        if (option?.character) {
          characterCounts[option.character] = (characterCounts[option.character] || 0) + 1
        }
      }
    })

    // Find the character with the highest count
    let maxCount = 0
    let matchedCharacter = ""

    Object.entries(characterCounts).forEach(([character, count]) => {
      if (count > maxCount) {
        maxCount = count
        matchedCharacter = character
      }
    })

    setResult(quizResults[matchedCharacter] || Object.values(quizResults)[0])
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setResult(null)
  }

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-navy-700 p-6 text-white">
        <h2 className="text-2xl font-bold">Tollywood Style Quiz</h2>
        <p className="text-white/80">Discover which Telugu cinema character matches your style</p>
      </div>

      {!result ? (
        <div className="p-6">
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>
                Question {currentQuestion + 1} of {quizQuestions.length}
              </span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-medium text-navy-700 mb-6">{quizQuestions[currentQuestion].question}</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quizQuestions[currentQuestion].options.map((option) => (
                  <motion.div
                    key={option.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                      answers[currentQuestion] === option.id
                        ? "border-coral-500 ring-2 ring-coral-200"
                        : "hover:border-navy-300"
                    }`}
                    onClick={() => handleAnswer(option.id)}
                  >
                    {option.image && (
                      <div className="relative h-48">
                        <Image
                          src={option.image || "/placeholder.svg"}
                          alt={option.text}
                          fill
                          className="object-cover"
                        />
                        {option.character && option.movie && (
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                            <p className="text-white text-sm font-medium">{option.character}</p>
                            <p className="text-white/80 text-xs">{option.movie}</p>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="p-4 flex justify-between items-center">
                      <span className="text-navy-700">{option.text}</span>
                      {answers[currentQuestion] === option.id && (
                        <span className="h-6 w-6 rounded-full bg-coral-500 flex items-center justify-center">
                          <Check className="h-4 w-4 text-white" />
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {currentQuestion > 0 && (
                <Button
                  variant="outline"
                  className="mt-6 border-navy-300 text-navy-700"
                  onClick={() => setCurrentQuestion(currentQuestion - 1)}
                >
                  Previous Question
                </Button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <div className="p-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="text-center mb-8">
              <div className="w-24 h-24 rounded-full bg-coral-100 mx-auto mb-4 flex items-center justify-center">
                <Image
                  src={result.image || "/placeholder.svg"}
                  alt={result.character}
                  width={80}
                  height={80}
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-navy-700 mb-1">You match with {result.character}!</h3>
              <p className="text-gray-500">{result.movie}</p>
            </div>

            <div className="bg-navy-50 rounded-lg p-6 mb-8">
              <h4 className="font-medium text-navy-700 mb-3">Your Style Profile</h4>
              <p className="text-gray-600 mb-4">{result.description}</p>
              <div className="flex flex-wrap gap-2">
                {result.style.split(",").map((style, index) => (
                  <span key={index} className="px-3 py-1 bg-navy-100 text-navy-700 rounded-full text-sm">
                    {style.trim()}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h4 className="font-medium text-navy-700 mb-4">Recommended Products for You</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {result.products.map((product) => (
                  <Link key={product.id} href={`/collections/${product.id}`}>
                    <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative h-40">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <p className="font-medium text-navy-700 text-sm line-clamp-1">{product.name}</p>
                        <p className="text-coral-500">₹{product.price}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="bg-coral-500 hover:bg-coral-600 text-white flex-1">
                <ArrowRight className="mr-2 h-4 w-4" /> Shop Your Style
              </Button>
              <Button variant="outline" className="border-navy-300 text-navy-700" onClick={resetQuiz}>
                <RefreshCw className="mr-2 h-4 w-4" /> Retake Quiz
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
