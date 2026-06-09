"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, Share2, ArrowLeft, Plus, Minus, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/lib/cart-context"
import SizeGuide from "@/components/size-guide"
import type { Product } from "@/lib/types"

interface ProductDetailProps {
  product: Product
  relatedProducts: Product[]
}

export default function ProductDetail({ product, relatedProducts = [] }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const { addItem } = useCart()

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"]

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const handleAddToCart = () => {
    addItem({ ...product, quantity })
  }

  const handleBuyNow = () => {
    window.open(product.affiliateLink, "_blank")
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <Link href="/collections" className="text-navy-700 hover:text-navy-800 flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Collections
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="relative h-24 rounded-md overflow-hidden">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-navy-700 mb-2">{product.name}</h1>
            <div className="flex items-center mb-2">
              <div className="flex">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`h-4 w-4 ${index < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-2">4.0 (24 reviews)</span>
            </div>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-navy-700">₹{product.price}</span>
              <span className="ml-2 text-sm text-gray-500 line-through">₹{Math.round(product.price * 1.2)}</span>
              <span className="ml-2 text-sm text-green-600">20% off</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 mb-6">
              <span className="mr-4">
                <span className="font-medium">Character:</span> {product.character}
              </span>
              <span>
                <span className="font-medium">Movie:</span> {product.movie}
              </span>
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-navy-700">Select Size</h3>
              <SizeGuide gender={product.gender.toLowerCase()} category={product.category.toLowerCase()} />
            </div>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-md flex items-center justify-center border transition-all ${
                    selectedSize === size
                      ? "border-coral-500 bg-coral-50 text-coral-500"
                      : "border-gray-300 text-gray-700 hover:border-navy-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="font-medium text-navy-700 mb-2">Quantity</h3>
            <div className="flex items-center">
              <button
                onClick={decrementQuantity}
                className="w-10 h-10 rounded-l-md border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
              >
                <Minus className="h-4 w-4" />
              </button>
              <div className="w-14 h-10 border-t border-b border-gray-300 flex items-center justify-center">
                {quantity}
              </div>
              <button
                onClick={incrementQuantity}
                className="w-10 h-10 rounded-r-md border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Button
              className="flex-1 bg-coral-500 hover:bg-coral-600 text-white"
              size="lg"
              onClick={handleAddToCart}
              disabled={!selectedSize}
            >
              <Plus className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            <Button
              className="flex-1 bg-navy-700 hover:bg-navy-800 text-white"
              size="lg"
              onClick={handleBuyNow}
              disabled={!selectedSize}
            >
              <ShoppingBag className="mr-2 h-5 w-5" /> Buy Now
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={`w-12 h-12 border-gray-300 ${
                isFavorite ? "text-coral-500 border-coral-500" : "text-gray-600"
              }`}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={isFavorite ? "fill-coral-500 text-coral-500" : ""} />
            </Button>
            <Button variant="outline" size="icon" className="w-12 h-12 border-gray-300 text-gray-600">
              <Share2 />
            </Button>
          </div>

          {/* Product Details Tabs */}
          <Tabs defaultValue="details" className="mt-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="style">Style Tips</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="pt-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-navy-700 mb-1">Product Description</h4>
                  <p className="text-gray-600">{product.description}</p>
                </div>
                <div>
                  <h4 className="font-medium text-navy-700 mb-1">Material & Care</h4>
                  <p className="text-gray-600">
                    100% Cotton. Machine wash cold with similar colors, gentle cycle, only non-chlorine bleach when
                    needed, tumble dry low, warm iron if needed.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-navy-700 mb-1">Shipping Information</h4>
                  <p className="text-gray-600">
                    Delivery within 5-7 business days. Free shipping on orders above ₹999.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="style" className="pt-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-navy-700 mb-1">How to Style</h4>
                  <p className="text-gray-600">
                    This {product.name.toLowerCase()} can be paired with{" "}
                    {product.gender === "Men" ? "jeans or chinos" : "jeans or a skirt"} for a casual look inspired by{" "}
                    {product.character}'s style in {product.movie}.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-navy-700 mb-1">Character Style Notes</h4>
                  <p className="text-gray-600">
                    {product.character}'s style is characterized by {product.style.toLowerCase()} elements that reflect
                    their personality in the film. This piece captures the essence of their iconic look.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-navy-700 mb-1">Accessorize</h4>
                  <p className="text-gray-600">
                    Complete the look with accessories like{" "}
                    {product.gender === "Men"
                      ? "a watch, sunglasses, and casual footwear"
                      : "earrings, a necklace, and matching footwear"}{" "}
                    to fully embody the character's aesthetic.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="pt-4">
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`h-5 w-5 ${index < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-medium">4.0 out of 5</span>
                </div>

                <div className="space-y-4">
                  {/* Sample reviews */}
                  <div className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      <div className="flex mr-2">
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            className={`h-4 w-4 ${index < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="font-medium">Priya R.</span>
                    </div>
                    <p className="text-gray-600 mb-1">
                      Perfect replica of the character's style! The quality is excellent and it fits true to size.
                    </p>
                    <span className="text-sm text-gray-500">Posted 2 weeks ago</span>
                  </div>

                  <div className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      <div className="flex mr-2">
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            className={`h-4 w-4 ${index < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="font-medium">Karthik N.</span>
                    </div>
                    <p className="text-gray-600 mb-1">
                      Great product that really captures the essence of the character. Would recommend sizing up.
                    </p>
                    <span className="text-sm text-gray-500">Posted 1 month ago</span>
                  </div>

                  <div className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      <div className="flex mr-2">
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            className={`h-4 w-4 ${index < 3 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="font-medium">Ravi K.</span>
                    </div>
                    <p className="text-gray-600 mb-1">
                      The design is good but the material could be better. Still a decent purchase for fans.
                    </p>
                    <span className="text-sm text-gray-500">Posted 2 months ago</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full border-navy-300 text-navy-700">
                  View All Reviews
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Related Products */}
      <div className="border-t p-6">
        <h2 className="text-xl font-bold text-navy-700 mb-6">You May Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.slice(0, 4).map((relatedProduct) => (
            <div key={relatedProduct.id} className="group rounded-lg overflow-hidden shadow-sm hover:shadow-md">
              <div className="relative h-48">
                <Image
                  src={relatedProduct.image || "/placeholder.svg"}
                  alt={relatedProduct.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium text-navy-700 line-clamp-1">{relatedProduct.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{relatedProduct.character}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-navy-700">₹{relatedProduct.price}</span>
                  <Button size="sm" variant="outline" className="text-xs border-navy-300 text-navy-700">
                    View
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
