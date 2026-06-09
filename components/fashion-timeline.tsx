"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronRight, ChevronLeft } from "lucide-react"

interface TimelineEra {
  id: string
  decade: string
  title: string
  description: string
  image: string
  keyFilms: Array<{
    title: string
    year: number
    actor: string
    fashionNote: string
  }>
  collections: Array<{
    id: string
    name: string
    image: string
  }>
  styleElements: string[]
}

const timelineData: TimelineEra[] = [
  {
    id: "1950s",
    decade: "1950s",
    title: "Classical Beginnings",
    description:
      "The 1950s marked the early days of Telugu cinema fashion, characterized by traditional attire with minimal Western influence. Men typically wore dhoti-kurtas, while women were seen in traditional sarees with minimal makeup and jewelry.",
    image: "/placeholder.svg?height=400&width=600",
    keyFilms: [
      {
        title: "Pathala Bhairavi",
        year: 1951,
        actor: "N.T. Rama Rao",
        fashionNote: "Iconic traditional royal costumes that set the standard for mythological films",
      },
      {
        title: "Mayabazar",
        year: 1957,
        actor: "Savitri",
        fashionNote: "Elegant sarees and traditional jewelry that became a benchmark for classical beauty",
      },
    ],
    collections: [
      {
        id: "classical-collection",
        name: "Classical Heritage Collection",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
    styleElements: ["Traditional Sarees", "Dhoti-Kurtas", "Minimal Jewelry", "Natural Makeup"],
  },
  {
    id: "1960s",
    decade: "1960s",
    title: "Transition Era",
    description:
      "The 1960s saw a gradual shift towards more contemporary styles while maintaining traditional elements. This decade introduced more colorful fabrics, slightly modern cuts, and the beginning of Western influence in Telugu cinema fashion.",
    image: "/placeholder.svg?height=400&width=600",
    keyFilms: [
      {
        title: "Gundamma Katha",
        year: 1962,
        actor: "N.T. Rama Rao & Savitri",
        fashionNote: "Blend of traditional and early modern fashion elements",
      },
      {
        title: "Doctor Chakravarthy",
        year: 1969,
        actor: "Akkineni Nageswara Rao",
        fashionNote: "Introduction of formal Western wear like suits and ties in Telugu cinema",
      },
    ],
    collections: [
      {
        id: "transition-collection",
        name: "Transition Era Collection",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
    styleElements: ["Colorful Sarees", "Formal Suits", "Traditional with Modern Touches", "Bolder Jewelry"],
  },
  {
    id: "1970s",
    decade: "1970s",
    title: "Bold Experimentation",
    description:
      "The 1970s brought significant changes with bold patterns, bright colors, and distinctive styling. Bell-bottoms, large collars, and floral prints made their way into Telugu cinema, reflecting global fashion trends of the disco era.",
    image: "/placeholder.svg?height=400&width=600",
    keyFilms: [
      {
        title: "Adavi Ramudu",
        year: 1977,
        actor: "N.T. Rama Rao",
        fashionNote: "Iconic rugged look with patterned shirts and distinctive styling",
      },
      {
        title: "Premabhishekam",
        year: 1979,
        actor: "Akkineni Nageswara Rao",
        fashionNote: "Sophisticated urban fashion with tailored suits and modern casual wear",
      },
    ],
    collections: [
      {
        id: "retro-collection",
        name: "Retro Bold Collection",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
    styleElements: ["Bell-bottoms", "Floral Patterns", "Bright Colors", "Large Collars", "Platform Shoes"],
  },
  {
    id: "1980s",
    decade: "1980s",
    title: "Mass Appeal Era",
    description:
      "The 1980s defined the 'mass hero' look in Telugu cinema with leather jackets, denim, and statement accessories. This era established distinct fashion identities for lead actors that would influence fans across the state.",
    image: "/placeholder.svg?height=400&width=600",
    keyFilms: [
      {
        title: "Kondaveeti Donga",
        year: 1988,
        actor: "Chiranjeevi",
        fashionNote: "Trend-setting rugged look with leather jackets and boots that defined the 'mass hero' aesthetic",
      },
      {
        title: "Jagadeka Veerudu Athiloka Sundari",
        year: 1989,
        actor: "Chiranjeevi & Sridevi",
        fashionNote: "Glamorous costumes with sequins, bold colors, and statement accessories",
      },
    ],
    collections: [
      {
        id: "mass-hero-collection",
        name: "Mass Hero Collection",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
    styleElements: ["Leather Jackets", "Denim", "Statement Accessories", "Bold Prints", "Shoulder Pads"],
  },
  {
    id: "1990s",
    decade: "1990s",
    title: "Mainstream Modernization",
    description:
      "The 1990s saw Telugu cinema fully embrace contemporary fashion with branded clothing, international styles, and more casual everyday looks. This decade bridged the gap between film fashion and street style.",
    image: "/placeholder.svg?height=400&width=600",
    keyFilms: [
      {
        title: "Gharana Mogudu",
        year: 1992,
        actor: "Chiranjeevi",
        fashionNote: "Business formal wear and sophisticated styling that influenced professional fashion",
      },
      {
        title: "Pokiri",
        year: 2006,
        actor: "Mahesh Babu",
        fashionNote:
          "Urban street style with leather jackets and casual cool aesthetic that created a youth fashion revolution",
      },
    ],
    collections: [
      {
        id: "pokiri-collection",
        name: "Pokiri Collection",
        image: "/images/collections/pokiri-collection.jpg",
      },
    ],
    styleElements: ["Branded Clothing", "Casual Tees", "Denim Jeans", "Sporty Elements", "Minimalist Accessories"],
  },
  {
    id: "2000s",
    decade: "2000s",
    title: "Style Icon Era",
    description:
      "The 2000s established Telugu actors as genuine style icons with distinctive fashion identities. International brands, designer collaborations, and carefully crafted looks became the norm in major productions.",
    image: "/placeholder.svg?height=400&width=600",
    keyFilms: [
      {
        title: "Jalsa",
        year: 2008,
        actor: "Pawan Kalyan",
        fashionNote: "Effortlessly cool casual style with shirts and jeans that became widely imitated",
      },
      {
        title: "Magadheera",
        year: 2009,
        actor: "Ram Charan",
        fashionNote: "Contrast between historical royal costumes and modern urban fashion",
      },
    ],
    collections: [
      {
        id: "jalsa-collection",
        name: "Jalsa Collection",
        image: "/images/collections/jalsa-collection.jpg",
      },
      {
        id: "magadheera-collection",
        name: "Magadheera Collection",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
    styleElements: ["Designer Wear", "Layered Looks", "Athleisure", "Statement Watches", "Branded Footwear"],
  },
  {
    id: "2010s",
    decade: "2010s",
    title: "Global Fashion Integration",
    description:
      "The 2010s saw Telugu cinema fashion reach international standards with global brands, high-end designers, and sophisticated styling. Character-specific looks became more detailed and influential.",
    image: "/placeholder.svg?height=400&width=600",
    keyFilms: [
      {
        title: "Arjun Reddy",
        year: 2017,
        actor: "Vijay Deverakonda",
        fashionNote:
          "Grunge-inspired casual style with beards and minimalist clothing that created a youth fashion movement",
      },
      {
        title: "Baahubali",
        year: 2015,
        actor: "Prabhas",
        fashionNote:
          "Reimagined historical costumes with detailed armor and royal attire that influenced wedding and festival fashion",
      },
    ],
    collections: [
      {
        id: "arjun-reddy-collection",
        name: "Arjun Reddy Collection",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "baahubali-collection",
        name: "Baahubali Collection",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
    styleElements: ["Athleisure", "Minimalist Fashion", "Beards & Grooming", "Luxury Accessories", "Streetwear"],
  },
  {
    id: "2020s",
    decade: "2020s",
    title: "New Age Fashion",
    description:
      "The current era represents the pinnacle of Telugu cinema fashion with character-specific styling, international collaborations, and trend-setting looks that influence fashion across India and beyond.",
    image: "/placeholder.svg?height=400&width=600",
    keyFilms: [
      {
        title: "Pushpa: The Rise",
        year: 2021,
        actor: "Allu Arjun",
        fashionNote:
          "Distinctive rugged style with printed shirts and attitude-heavy styling that created a pan-India fashion trend",
      },
      {
        title: "RRR",
        year: 2022,
        actor: "Ram Charan & NTR Jr.",
        fashionNote: "Period-specific styling with attention to detail in both traditional and colonial-era fashion",
      },
    ],
    collections: [
      {
        id: "pushpa-collection",
        name: "Pushpa Collection",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "rrr-collection",
        name: "RRR Collection",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
    styleElements: [
      "Character-Specific Styling",
      "Sustainable Fashion",
      "Gender-Fluid Elements",
      "Fusion Wear",
      "Detailed Accessories",
    ],
  },
]

export default function FashionTimeline() {
  const [activeEra, setActiveEra] = useState<string>(timelineData[0].id)
  const [direction, setDirection] = useState<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100])

  const handleEraChange = (eraId: string) => {
    const currentIndex = timelineData.findIndex((era) => era.id === activeEra)
    const newIndex = timelineData.findIndex((era) => era.id === eraId)
    setDirection(newIndex > currentIndex ? 1 : -1)
    setActiveEra(eraId)
  }

  const handleNext = () => {
    const currentIndex = timelineData.findIndex((era) => era.id === activeEra)
    const nextIndex = (currentIndex + 1) % timelineData.length
    setDirection(1)
    setActiveEra(timelineData[nextIndex].id)
  }

  const handlePrev = () => {
    const currentIndex = timelineData.findIndex((era) => era.id === activeEra)
    const prevIndex = currentIndex === 0 ? timelineData.length - 1 : currentIndex - 1
    setDirection(-1)
    setActiveEra(timelineData[prevIndex].id)
  }

  const activeEraData = timelineData.find((era) => era.id === activeEra) || timelineData[0]

  return (
    <motion.div ref={containerRef} style={{ opacity, y }} className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-navy-700 p-6 text-white">
        <h2 className="text-2xl font-bold">Evolution of Telugu Cinema Fashion</h2>
        <p className="text-white/80">Explore how Tollywood fashion has evolved through the decades</p>
      </div>

      {/* Timeline Navigation */}
      <div className="border-b overflow-x-auto">
        <div className="flex min-w-max">
          {timelineData.map((era) => (
            <button
              key={era.id}
              className={`px-6 py-4 text-center transition-all ${
                activeEra === era.id
                  ? "border-b-2 border-coral-500 text-navy-700 font-medium"
                  : "text-gray-500 hover:text-navy-600"
              }`}
              onClick={() => handleEraChange(era.id)}
            >
              <span className="block text-sm sm:text-base">{era.decade}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Era Content */}
      <div className="relative overflow-hidden">
        <motion.div
          key={activeEra}
          initial={{ opacity: 0, x: direction * 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -direction * 200 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="p-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Image and Description */}
            <div>
              <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden mb-6">
                <Image
                  src={activeEraData.image || "/placeholder.svg"}
                  alt={`${activeEraData.decade} Telugu Cinema Fashion`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <h3 className="text-xl font-bold text-white">{activeEraData.title}</h3>
                </div>
              </div>
              <p className="text-gray-700 mb-6">{activeEraData.description}</p>

              <div className="mb-6">
                <h4 className="font-medium text-navy-700 mb-3">Key Style Elements:</h4>
                <div className="flex flex-wrap gap-2">
                  {activeEraData.styleElements.map((element, index) => (
                    <span key={index} className="px-3 py-1 bg-navy-50 text-navy-700 rounded-full text-sm">
                      {element}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Key Films and Collections */}
            <div>
              <div className="mb-6">
                <h4 className="font-medium text-navy-700 mb-3">Iconic Films & Looks:</h4>
                <div className="space-y-4">
                  {activeEraData.keyFilms.map((film, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between mb-1">
                        <h5 className="font-medium text-navy-700">{film.title}</h5>
                        <span className="text-coral-500">{film.year}</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">Starring: {film.actor}</p>
                      <p className="text-sm text-gray-600">{film.fashionNote}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-navy-700 mb-3">Shop Collections from this Era:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeEraData.collections.map((collection) => (
                    <Link key={collection.id} href={`/collections/${collection.id}`}>
                      <div className="group border rounded-lg overflow-hidden hover:shadow-md transition-all">
                        <div className="relative h-40">
                          <Image
                            src={collection.image || "/placeholder.svg"}
                            alt={collection.name}
                            fill
                            className="object-cover transition-transform group-hover:scale-105 duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                            <h5 className="text-white font-medium">{collection.name}</h5>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-navy-700 rounded-full shadow-md z-10"
          onClick={handlePrev}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-navy-700 rounded-full shadow-md z-10"
          onClick={handleNext}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </motion.div>
  )
}
