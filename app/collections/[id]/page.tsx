"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { featuredProducts } from "@/lib/data"
import ProductDetail from "@/components/product-detail"

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      // Find the product by ID
      const foundProduct = featuredProducts.find((p) => p.id === params.id)

      if (foundProduct) {
        setProduct(foundProduct)

        // Find related products (same character or same category)
        const related = featuredProducts
          .filter(
            (p) =>
              p.id !== params.id && (p.character === foundProduct.character || p.category === foundProduct.category),
          )
          .slice(0, 4)

        setRelatedProducts(related)
      }

      setLoading(false)
    }
  }, [params.id])

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col pt-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 rounded"></div>
              <div>
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="h-24 bg-gray-200 rounded mb-6"></div>
                <div className="h-10 bg-gray-200 rounded mb-6"></div>
                <div className="h-12 bg-gray-200 rounded mb-6"></div>
                <div className="flex gap-4 mb-6">
                  <div className="h-12 bg-gray-200 rounded flex-1"></div>
                  <div className="h-12 bg-gray-200 rounded flex-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (!product) {
    return (
      <main className="flex min-h-screen flex-col pt-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-navy-700 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">The product you are looking for does not exist or has been removed.</p>
            <a href="/collections" className="text-coral-500 hover:text-coral-600">
              Return to Collections
            </a>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col pt-24">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        <ProductDetail product={product} relatedProducts={relatedProducts} />
      </div>
    </main>
  )
}
