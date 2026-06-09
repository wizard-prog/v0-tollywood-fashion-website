"use client"

import { useState } from "react"
import { Ruler } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Actor measurements (fictional data for demonstration)
const actorMeasurements = {
  men: [
    {
      name: "Allu Arjun",
      height: "178 cm",
      chest: "42 inches",
      waist: "32 inches",
      shoulders: "46 inches",
      wears: "M-L",
    },
    {
      name: "Mahesh Babu",
      height: "187 cm",
      chest: "40 inches",
      waist: "32 inches",
      shoulders: "44 inches",
      wears: "L",
    },
    {
      name: "Prabhas",
      height: "188 cm",
      chest: "44 inches",
      waist: "34 inches",
      shoulders: "48 inches",
      wears: "XL",
    },
    {
      name: "NTR Jr",
      height: "170 cm",
      chest: "42 inches",
      waist: "34 inches",
      shoulders: "44 inches",
      wears: "M",
    },
    {
      name: "Ram Charan",
      height: "175 cm",
      chest: "42 inches",
      waist: "32 inches",
      shoulders: "44 inches",
      wears: "M",
    },
  ],
  women: [
    {
      name: "Samantha",
      height: "165 cm",
      bust: "34 inches",
      waist: "26 inches",
      hips: "34 inches",
      wears: "S",
    },
    {
      name: "Anushka Shetty",
      height: "175 cm",
      bust: "36 inches",
      waist: "28 inches",
      hips: "36 inches",
      wears: "M",
    },
    {
      name: "Rashmika Mandanna",
      height: "168 cm",
      bust: "34 inches",
      waist: "26 inches",
      hips: "35 inches",
      wears: "S",
    },
    {
      name: "Pooja Hegde",
      height: "174 cm",
      bust: "34 inches",
      waist: "26 inches",
      hips: "36 inches",
      wears: "S-M",
    },
    {
      name: "Kajal Aggarwal",
      height: "165 cm",
      bust: "34 inches",
      waist: "26 inches",
      hips: "35 inches",
      wears: "S",
    },
  ],
}

// Size charts
const sizeCharts = {
  men: {
    shirts: [
      { size: "S", chest: "36-38", waist: "28-30", shoulders: "40-42" },
      { size: "M", chest: "38-40", waist: "30-32", shoulders: "42-44" },
      { size: "L", chest: "40-42", waist: "32-34", shoulders: "44-46" },
      { size: "XL", chest: "42-44", waist: "34-36", shoulders: "46-48" },
      { size: "XXL", chest: "44-46", waist: "36-38", shoulders: "48-50" },
    ],
    pants: [
      { size: "28", waist: "28", hips: "35", inseam: "30" },
      { size: "30", waist: "30", hips: "37", inseam: "31" },
      { size: "32", waist: "32", hips: "39", inseam: "32" },
      { size: "34", waist: "34", hips: "41", inseam: "33" },
      { size: "36", waist: "36", hips: "43", inseam: "34" },
    ],
    kurtas: [
      { size: "S", chest: "38", length: "40", shoulders: "17" },
      { size: "M", chest: "40", length: "42", shoulders: "18" },
      { size: "L", chest: "42", length: "44", shoulders: "19" },
      { size: "XL", chest: "44", length: "46", shoulders: "20" },
      { size: "XXL", chest: "46", length: "48", shoulders: "21" },
    ],
  },
  women: {
    sarees: [
      { size: "Standard", length: "5.5 meters", width: "45-48 inches" },
      { size: "Petite", length: "5 meters", width: "45 inches" },
    ],
    kurtis: [
      { size: "XS", bust: "32", waist: "24", hips: "34", length: "38" },
      { size: "S", bust: "34", waist: "26", hips: "36", length: "39" },
      { size: "M", bust: "36", waist: "28", hips: "38", length: "40" },
      { size: "L", bust: "38", waist: "30", hips: "40", length: "41" },
      { size: "XL", bust: "40", waist: "32", hips: "42", length: "42" },
    ],
    blouses: [
      { size: "XS", bust: "30", waist: "24", length: "14" },
      { size: "S", bust: "32", waist: "26", length: "15" },
      { size: "M", bust: "34", waist: "28", length: "16" },
      { size: "L", bust: "36", waist: "30", length: "17" },
      { size: "XL", bust: "38", waist: "32", length: "18" },
    ],
  },
}

// How to measure guides
const measurementGuides = {
  men: [
    {
      part: "Chest",
      instructions: "Measure around the fullest part of your chest, keeping the tape horizontal.",
    },
    {
      part: "Waist",
      instructions: "Measure around your natural waistline, at the narrowest part of your torso.",
    },
    {
      part: "Shoulders",
      instructions: "Measure from the edge of one shoulder across to the other edge.",
    },
    {
      part: "Neck",
      instructions: "Measure around the base of your neck, where a collar would sit.",
    },
    {
      part: "Sleeve",
      instructions: "Measure from shoulder edge to wrist with arm slightly bent.",
    },
  ],
  women: [
    {
      part: "Bust",
      instructions: "Measure around the fullest part of your bust, keeping the tape horizontal.",
    },
    {
      part: "Waist",
      instructions: "Measure around your natural waistline, at the narrowest part of your torso.",
    },
    {
      part: "Hips",
      instructions: "Measure around the fullest part of your hips, about 8 inches below your waist.",
    },
    {
      part: "Shoulder to Waist",
      instructions: "Measure from the shoulder seam to your natural waistline.",
    },
  ],
}

export default function SizeGuide({ gender = "all", category = "all" }) {
  const [activeGender, setActiveGender] = useState(gender === "all" ? "men" : gender)
  const [activeCategory, setActiveCategory] = useState(
    category === "all" ? (activeGender === "men" ? "shirts" : "sarees") : category,
  )

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1 text-navy-700 border-navy-300">
          <Ruler className="h-4 w-4" />
          <span>Size Guide</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-navy-700">Size Guide</DialogTitle>
          <DialogDescription>
            Find your perfect fit with our comprehensive size guide and actor comparisons
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue={activeGender} onValueChange={setActiveGender} className="mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="men">Men</TabsTrigger>
            <TabsTrigger value="women">Women</TabsTrigger>
          </TabsList>

          {/* Men's Content */}
          <TabsContent value="men" className="pt-6">
            <Tabs defaultValue={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="shirts">Shirts</TabsTrigger>
                <TabsTrigger value="pants">Pants</TabsTrigger>
                <TabsTrigger value="kurtas">Kurtas</TabsTrigger>
              </TabsList>

              {Object.keys(sizeCharts.men).map((category) => (
                <TabsContent key={category} value={category} className="pt-6">
                  <div className="space-y-8">
                    {/* Size Chart */}
                    <div>
                      <h3 className="text-lg font-bold mb-4 text-navy-700">Size Chart (in inches)</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-navy-100">
                              <th className="border p-2 text-left">Size</th>
                              {Object.keys(sizeCharts.men[category][0])
                                .filter((key) => key !== "size")
                                .map((key) => (
                                  <th key={key} className="border p-2 text-left capitalize">
                                    {key}
                                  </th>
                                ))}
                            </tr>
                          </thead>
                          <tbody>
                            {sizeCharts.men[category].map((item, index) => (
                              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                <td className="border p-2 font-medium">{item.size}</td>
                                {Object.keys(item)
                                  .filter((key) => key !== "size")
                                  .map((key) => (
                                    <td key={key} className="border p-2">
                                      {item[key]}
                                    </td>
                                  ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Actor Comparisons */}
                    <div>
                      <h3 className="text-lg font-bold mb-4 text-navy-700">Actor Measurements</h3>
                      <p className="text-gray-600 mb-4">
                        Compare your measurements with these Telugu actors to find your best fit:
                      </p>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-navy-100">
                              <th className="border p-2 text-left">Actor</th>
                              <th className="border p-2 text-left">Height</th>
                              <th className="border p-2 text-left">Chest</th>
                              <th className="border p-2 text-left">Waist</th>
                              <th className="border p-2 text-left">Shoulders</th>
                              <th className="border p-2 text-left">Typically Wears</th>
                            </tr>
                          </thead>
                          <tbody>
                            {actorMeasurements.men.map((actor, index) => (
                              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                <td className="border p-2 font-medium">{actor.name}</td>
                                <td className="border p-2">{actor.height}</td>
                                <td className="border p-2">{actor.chest}</td>
                                <td className="border p-2">{actor.waist}</td>
                                <td className="border p-2">{actor.shoulders}</td>
                                <td className="border p-2">{actor.wears}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* How to Measure */}
                    <div>
                      <h3 className="text-lg font-bold mb-4 text-navy-700">How to Measure</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {measurementGuides.men.map((guide, index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium text-navy-700 mb-2">{guide.part}</h4>
                            <p className="text-gray-600 text-sm">{guide.instructions}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>

          {/* Women's Content */}
          <TabsContent value="women" className="pt-6">
            <Tabs defaultValue={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="sarees">Sarees</TabsTrigger>
                <TabsTrigger value="kurtis">Kurtis</TabsTrigger>
                <TabsTrigger value="blouses">Blouses</TabsTrigger>
              </TabsList>

              {Object.keys(sizeCharts.women).map((category) => (
                <TabsContent key={category} value={category} className="pt-6">
                  <div className="space-y-8">
                    {/* Size Chart */}
                    <div>
                      <h3 className="text-lg font-bold mb-4 text-navy-700">Size Chart (in inches)</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-navy-100">
                              <th className="border p-2 text-left">Size</th>
                              {Object.keys(sizeCharts.women[category][0])
                                .filter((key) => key !== "size")
                                .map((key) => (
                                  <th key={key} className="border p-2 text-left capitalize">
                                    {key}
                                  </th>
                                ))}
                            </tr>
                          </thead>
                          <tbody>
                            {sizeCharts.women[category].map((item, index) => (
                              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                <td className="border p-2 font-medium">{item.size}</td>
                                {Object.keys(item)
                                  .filter((key) => key !== "size")
                                  .map((key) => (
                                    <td key={key} className="border p-2">
                                      {item[key]}
                                    </td>
                                  ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Actress Comparisons */}
                    <div>
                      <h3 className="text-lg font-bold mb-4 text-navy-700">Actress Measurements</h3>
                      <p className="text-gray-600 mb-4">
                        Compare your measurements with these Telugu actresses to find your best fit:
                      </p>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-navy-100">
                              <th className="border p-2 text-left">Actress</th>
                              <th className="border p-2 text-left">Height</th>
                              <th className="border p-2 text-left">Bust</th>
                              <th className="border p-2 text-left">Waist</th>
                              <th className="border p-2 text-left">Hips</th>
                              <th className="border p-2 text-left">Typically Wears</th>
                            </tr>
                          </thead>
                          <tbody>
                            {actorMeasurements.women.map((actress, index) => (
                              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                <td className="border p-2 font-medium">{actress.name}</td>
                                <td className="border p-2">{actress.height}</td>
                                <td className="border p-2">{actress.bust}</td>
                                <td className="border p-2">{actress.waist}</td>
                                <td className="border p-2">{actress.hips}</td>
                                <td className="border p-2">{actress.wears}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* How to Measure */}
                    <div>
                      <h3 className="text-lg font-bold mb-4 text-navy-700">How to Measure</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {measurementGuides.women.map((guide, index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium text-navy-700 mb-2">{guide.part}</h4>
                            <p className="text-gray-600 text-sm">{guide.instructions}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>
        </Tabs>

        <div className="mt-6 pt-6 border-t">
          <p className="text-sm text-gray-500">
            Note: All measurements are approximate and may vary slightly between different brands and styles. For the
            best fit, we recommend taking your own measurements and comparing them with our size charts.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
