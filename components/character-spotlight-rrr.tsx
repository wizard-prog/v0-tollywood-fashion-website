import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function KomaramBheemSpotlight() {
  return (
    <div className="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative w-full md:w-2/5 h-64 md:h-auto">
        <Image src="/images/characters/ntr-rrr.jpg" alt="Komaram Bheem from RRR" fill className="object-cover" />
      </div>

      <div className="p-6 flex-1">
        <h3 className="text-2xl font-bold mb-2 text-navy-700">Komaram Bheem</h3>
        <p className="text-coral-500 mb-4">RRR • Tribal Revolutionary</p>
        <p className="text-gray-600 mb-6">
          The powerful yet gentle tribal leader portrayed by NTR Jr. in RRR combines raw strength with emotional depth.
          His distinctive style blends traditional tribal elements with practical workwear, creating a unique look that
          reflects his character's journey.
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {["Tribal", "Rugged", "Earthy", "Revolutionary", "Authentic"].map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-navy-100 text-navy-700 text-sm rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <Button variant="outline" className="border-coral-500 text-coral-500 hover:bg-coral-500 hover:text-white">
          Shop This Look <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
