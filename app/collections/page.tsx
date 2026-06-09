import Image from "next/image"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import { featuredProducts } from "@/lib/data"

export default function CollectionsPage() {
  return (
    <main className="flex min-h-screen flex-col pt-24">
      {/* Hero Banner */}
      <section className="relative h-64 md:h-80">
        <Image src="/images/banners/collections-banner.jpg" alt="Collections Banner" fill className="object-cover" />
        <div className="absolute inset-0 bg-navy-800/70 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Collections</h1>
            <p className="text-white/90 max-w-2xl mx-auto px-4">
              Explore our curated fashion collections inspired by iconic Telugu cinema characters
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Products */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-sm h-fit">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-navy-700">Filters</h2>
                <Button variant="ghost" size="sm" className="text-gray-500">
                  Reset
                </Button>
              </div>

              {/* Character Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3 text-navy-600">Character</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="pushpa" className="mr-2" />
                    <label htmlFor="pushpa" className="text-gray-700">
                      Pushpa Raj
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="baahubali" className="mr-2" />
                    <label htmlFor="baahubali" className="text-gray-700">
                      Baahubali
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="arjun" className="mr-2" />
                    <label htmlFor="arjun" className="text-gray-700">
                      Arjun Reddy
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="sita" className="mr-2" />
                    <label htmlFor="sita" className="text-gray-700">
                      Sita
                    </label>
                  </div>
                </div>
              </div>

              {/* Movie Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3 text-navy-600">Movie</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="pushpa-movie" className="mr-2" />
                    <label htmlFor="pushpa-movie" className="text-gray-700">
                      Pushpa
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="baahubali-movie" className="mr-2" />
                    <label htmlFor="baahubali-movie" className="text-gray-700">
                      Baahubali
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="rrr" className="mr-2" />
                    <label htmlFor="rrr" className="text-gray-700">
                      RRR
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="arjun-movie" className="mr-2" />
                    <label htmlFor="arjun-movie" className="text-gray-700">
                      Arjun Reddy
                    </label>
                  </div>
                </div>
              </div>

              {/* Style Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3 text-navy-600">Style</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="rugged" className="mr-2" />
                    <label htmlFor="rugged" className="text-gray-700">
                      Rugged
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="royal" className="mr-2" />
                    <label htmlFor="royal" className="text-gray-700">
                      Royal
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="urban" className="mr-2" />
                    <label htmlFor="urban" className="text-gray-700">
                      Urban
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="traditional" className="mr-2" />
                    <label htmlFor="traditional" className="text-gray-700">
                      Traditional
                    </label>
                  </div>
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3 text-navy-600">Price Range</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="price-1" className="mr-2" />
                    <label htmlFor="price-1" className="text-gray-700">
                      Under ₹1000
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="price-2" className="mr-2" />
                    <label htmlFor="price-2" className="text-gray-700">
                      ₹1000 - ₹2000
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="price-3" className="mr-2" />
                    <label htmlFor="price-3" className="text-gray-700">
                      ₹2000 - ₹3000
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="price-4" className="mr-2" />
                    <label htmlFor="price-4" className="text-gray-700">
                      Above ₹3000
                    </label>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-coral-500 hover:bg-coral-600 text-white">Apply Filters</Button>
            </div>

            {/* Products Grid */}
            <div className="w-full md:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-navy-700">All Products</h2>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Sort by:</span>
                  <select className="border rounded-md px-2 py-1">
                    <option>Popularity</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest First</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="mt-12 flex justify-center">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="w-10 h-10 p-0 border-navy-300 text-navy-700">
                    1
                  </Button>
                  <Button variant="outline" size="sm" className="w-10 h-10 p-0 border-navy-300 text-navy-700">
                    2
                  </Button>
                  <Button variant="outline" size="sm" className="w-10 h-10 p-0 border-navy-300 text-navy-700">
                    3
                  </Button>
                  <Button variant="outline" size="sm" className="w-10 h-10 p-0 border-navy-300 text-navy-700">
                    ...
                  </Button>
                  <Button variant="outline" size="sm" className="w-10 h-10 p-0 border-navy-300 text-navy-700">
                    10
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
