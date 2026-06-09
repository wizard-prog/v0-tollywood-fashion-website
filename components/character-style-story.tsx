"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Quote, Film, Shirt, Camera, Clock } from "lucide-react"
import Link from "next/link"

interface StyleStory {
  id: string
  character: string
  actor: string
  movie: string
  year: number
  mainImage: string
  description: string
  styleAnalysis: string
  culturalImpact: string
  behindTheScenes: string
  quotes: Array<{
    text: string
    source: string
  }>
  lookBreakdown: Array<{
    item: string
    description: string
    image: string
  }>
  relatedProducts: Array<{
    id: string
    name: string
    image: string
    price: number
  }>
  gallery: string[]
}

interface CharacterStyleStoryProps {
  story: StyleStory
}

const pushpaStory: StyleStory = {
  id: "pushpa-raj",
  character: "Pushpa Raj",
  actor: "Allu Arjun",
  movie: "Pushpa: The Rise",
  year: 2021,
  mainImage: "/images/characters/allu-arjun-pushpa.jpg",
  description:
    "Pushpa Raj, portrayed by Allu Arjun in the 2021 blockbuster 'Pushpa: The Rise', created a fashion revolution across India with his distinctive rugged style. The character's look was carefully crafted to reflect his journey from a daily wage laborer to a smuggling syndicate leader, combining earthy tones with bold patterns and a signature attitude.",
  styleAnalysis:
    "The styling of Pushpa Raj represents a masterclass in character-driven fashion. The costume design team, led by Deepali Noor, created a look that balances ruggedness with distinctive flair. The character's wardrobe evolves throughout the film, from simple earth-toned shirts to more vibrant patterns as his confidence and status grow. The half-tucked shirts, rolled-up sleeves, and distinctive beard became signature elements that millions of fans across India began to imitate. What makes this look particularly significant is how it blends rural authenticity with a fashion-forward sensibility that transcends class barriers.",
  culturalImpact:
    "Pushpa Raj's style created an unprecedented fashion wave that swept across India, transcending language barriers. The 'Pushpa hand gesture' and beard style became cultural phenomena, with everyone from street vendors to celebrities imitating the look. Clothing retailers reported a surge in demand for floral and patterned shirts similar to those worn by the character. The look's influence extended beyond clothing to grooming styles, with barbers across South India reporting requests for the 'Pushpa beard'. This character's style represents one of the most successful crossovers from Telugu cinema to pan-Indian fashion consciousness.",
  behindTheScenes:
    "Creating Pushpa Raj's iconic look was a months-long process. Allu Arjun and director Sukumar spent considerable time developing the character's physical appearance. The actor underwent a significant transformation, altering his posture, walking style, and even the way he held his shoulders to create the character's distinctive silhouette. The costume team sourced fabrics from local markets to maintain authenticity, while the makeup department worked on perfecting the rugged, sun-exposed skin tone. The now-famous beard style reportedly took several iterations to perfect, with the final look requiring nearly two hours of makeup and styling daily during shooting.",
  quotes: [
    {
      text: "The idea was to create a look that feels authentic to the character's background but still stands out on screen. We wanted something that would become iconic.",
      source: "Sukumar, Director",
    },
    {
      text: "I wanted Pushpa's style to feel like it could come from his world but still be aspirational. The half-tucked shirt, the way he rolls his sleeves - these small details tell his story.",
      source: "Allu Arjun, Actor",
    },
    {
      text: "We sourced fabrics from local markets in Chittoor and worked with the color palette of the forest. The transition in his wardrobe subtly mirrors his rise in power.",
      source: "Deepali Noor, Costume Designer",
    },
  ],
  lookBreakdown: [
    {
      item: "Floral Shirts",
      description:
        "Bold printed shirts in earthy tones, typically worn half-tucked with rolled-up sleeves to signify both style consciousness and readiness for action.",
      image: "/images/products/pushpa-floral-shirt.jpg",
    },
    {
      item: "Rugged Beard",
      description:
        "The distinctive beard style with grown sides and a slightly longer bottom became one of the most imitated elements of the look.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      item: "Jeans & Footwear",
      description:
        "Simple, worn-in jeans paired with practical footwear that reflects the character's working-class roots while maintaining a stylish silhouette.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      item: "Accessories",
      description:
        "Minimal but meaningful accessories, including a simple chain and occasionally a scarf, adding character without overwhelming the look.",
      image: "/placeholder.svg?height=200&width=200",
    },
  ],
  relatedProducts: [
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
  gallery: [
    "/images/characters/allu-arjun-pushpa.jpg",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ],
}

export default function CharacterStyleStory({ story = pushpaStory }: Partial<CharacterStyleStoryProps>) {
  const [activeTab, setActiveTab] = useState("style")
  const [activeImage, setActiveImage] = useState<string | null>(null)

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Character Header */}
      <div className="relative h-64 sm:h-80 md:h-96">
        <Image src={story.mainImage || "/placeholder.svg"} alt={story.character} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-6">
          <div className="max-w-3xl">
            <div className="flex items-center mb-2">
              <span className="px-3 py-1 bg-coral-500 text-white text-xs rounded-full">
                {story.movie} ({story.year})
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{story.character}</h1>
            <p className="text-white/90">Portrayed by {story.actor}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-lg text-gray-700 mb-8 max-w-3xl">{story.description}</p>

        <Tabs defaultValue="style" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="style" className="flex items-center gap-2">
              <Shirt className="h-4 w-4" /> Style Analysis
            </TabsTrigger>
            <TabsTrigger value="impact" className="flex items-center gap-2">
              <Film className="h-4 w-4" /> Cultural Impact
            </TabsTrigger>
            <TabsTrigger value="behind" className="flex items-center gap-2">
              <Camera className="h-4 w-4" /> Behind the Scenes
            </TabsTrigger>
            <TabsTrigger value="breakdown" className="flex items-center gap-2">
              <Clock className="h-4 w-4" /> Look Breakdown
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="style" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h3 className="text-xl font-bold text-navy-700 mb-4">Style Analysis</h3>
                    <p className="text-gray-700 mb-6">{story.styleAnalysis}</p>

                    <div className="bg-navy-50 p-5 rounded-lg mb-6">
                      <div className="flex items-start mb-3">
                        <Quote className="h-5 w-5 text-coral-500 mr-2 flex-shrink-0 mt-1" />
                        <div>
                          <p className="italic text-navy-700 mb-2">{story.quotes[0].text}</p>
                          <p className="text-sm text-gray-500">— {story.quotes[0].source}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-1">
                    <div className="sticky top-24">
                      <h3 className="text-xl font-bold text-navy-700 mb-4">Shop This Look</h3>
                      <div className="space-y-4">
                        {story.relatedProducts.slice(0, 2).map((product) => (
                          <Link key={product.id} href={`/collections/${product.id}`}>
                            <div className="group border rounded-lg overflow-hidden hover:shadow-md transition-all flex">
                              <div className="relative h-24 w-24 flex-shrink-0">
                                <Image
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  fill
                                  className="object-cover transition-transform group-hover:scale-105 duration-300"
                                />
                              </div>
                              <div className="p-3 flex flex-col justify-center">
                                <h5 className="font-medium text-navy-700 text-sm line-clamp-1 group-hover:text-coral-500 transition-colors">
                                  {product.name}
                                </h5>
                                <p className="text-coral-500">₹{product.price}</p>
                              </div>
                            </div>
                          </Link>
                        ))}

                        <Button className="w-full bg-coral-500 hover:bg-coral-600 text-white">
                          View All Products <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="impact" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h3 className="text-xl font-bold text-navy-700 mb-4">Cultural Impact</h3>
                    <p className="text-gray-700 mb-6">{story.culturalImpact}</p>

                    <div className="bg-navy-50 p-5 rounded-lg mb-6">
                      <div className="flex items-start mb-3">
                        <Quote className="h-5 w-5 text-coral-500 mr-2 flex-shrink-0 mt-1" />
                        <div>
                          <p className="italic text-navy-700 mb-2">{story.quotes[1].text}</p>
                          <p className="text-sm text-gray-500">— {story.quotes[1].source}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      {story.gallery.slice(0, 2).map((image, index) => (
                        <div
                          key={index}
                          className="relative h-48 rounded-lg overflow-hidden cursor-pointer"
                          onClick={() => setActiveImage(image)}
                        >
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`${story.character} style ${index + 1}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-1">
                    <div className="sticky top-24">
                      <h3 className="text-xl font-bold text-navy-700 mb-4">Fashion Influence</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium text-navy-700 mb-2">Social Media Impact</h4>
                          <p className="text-sm text-gray-600 mb-3">
                            Over 2 million Instagram posts featured the hashtag #PushpaStyle within 3 months of the
                            film's release.
                          </p>
                          <div className="flex space-x-2">
                            <span className="px-2 py-1 bg-navy-100 text-navy-700 rounded-full text-xs">
                              #PushpaStyle
                            </span>
                            <span className="px-2 py-1 bg-navy-100 text-navy-700 rounded-full text-xs">
                              #AlluArjunLook
                            </span>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium text-navy-700 mb-2">Celebrity Adoption</h4>
                          <p className="text-sm text-gray-600">
                            Numerous Bollywood celebrities and cricketers were spotted sporting elements of the Pushpa
                            look, particularly the beard style and hand gesture.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium text-navy-700 mb-2">Retail Impact</h4>
                          <p className="text-sm text-gray-600">
                            Major clothing retailers reported a 40% increase in sales of floral and patterned shirts
                            similar to those worn in the film.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="behind" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h3 className="text-xl font-bold text-navy-700 mb-4">Behind the Scenes</h3>
                    <p className="text-gray-700 mb-6">{story.behindTheScenes}</p>

                    <div className="bg-navy-50 p-5 rounded-lg mb-6">
                      <div className="flex items-start mb-3">
                        <Quote className="h-5 w-5 text-coral-500 mr-2 flex-shrink-0 mt-1" />
                        <div>
                          <p className="italic text-navy-700 mb-2">{story.quotes[2].text}</p>
                          <p className="text-sm text-gray-500">— {story.quotes[2].source}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      {story.gallery.slice(2, 4).map((image, index) => (
                        <div
                          key={index}
                          className="relative h-48 rounded-lg overflow-hidden cursor-pointer"
                          onClick={() => setActiveImage(image)}
                        >
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`${story.character} behind the scenes ${index + 1}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-1">
                    <div className="sticky top-24">
                      <h3 className="text-xl font-bold text-navy-700 mb-4">Creation Process</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium text-navy-700 mb-2">Character Development</h4>
                          <p className="text-sm text-gray-600">
                            Allu Arjun spent 3 months developing the character's physical mannerisms, including the
                            distinctive walking style and shoulder tilt.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium text-navy-700 mb-2">Costume Design</h4>
                          <p className="text-sm text-gray-600">
                            Over 200 fabric samples were considered before finalizing the character's wardrobe, with
                            special attention to how the colors would appear in the forest setting.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium text-navy-700 mb-2">Makeup & Hair</h4>
                          <p className="text-sm text-gray-600">
                            The iconic beard style went through 7 different iterations before the final look was
                            approved. Daily makeup application took approximately 2 hours.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="breakdown" className="mt-0">
                <h3 className="text-xl font-bold text-navy-700 mb-6">Look Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {story.lookBreakdown.map((item, index) => (
                    <div key={index} className="flex border rounded-lg overflow-hidden">
                      <div className="relative h-auto w-1/3 flex-shrink-0">
                        <Image src={item.image || "/placeholder.svg"} alt={item.item} fill className="object-cover" />
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-navy-700 mb-2">{item.item}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-bold text-navy-700 mb-4">Shop Complete Look</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {story.relatedProducts.map((product) => (
                      <Link key={product.id} href={`/collections/${product.id}`}>
                        <div className="border rounded-lg overflow-hidden hover:shadow-md transition-all">
                          <div className="relative h-48">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-3">
                            <h5 className="font-medium text-navy-700 text-sm line-clamp-1">{product.name}</h5>
                            <p className="text-coral-500">₹{product.price}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="flex justify-center mt-6">
                    <Button className="bg-coral-500 hover:bg-coral-600 text-white">
                      View All Products <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </div>

      {/* Lightbox for Gallery Images */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setActiveImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl max-h-[80vh]"
            >
              <Image
                src={activeImage || "/placeholder.svg"}
                alt={story.character}
                width={1200}
                height={800}
                className="object-contain max-h-[80vh]"
              />
              <button
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white"
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveImage(null)
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-x"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
