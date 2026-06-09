"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, CreditCard, Truck } from "lucide-react"

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [isApplying, setIsApplying] = useState(false)
  const [couponApplied, setCouponApplied] = useState(false)
  const [discount, setDiscount] = useState(0)

  // Calculate subtotal
  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0)

  // Calculate shipping (free over ₹1500)
  const shipping = subtotal > 1500 ? 0 : 99

  // Calculate tax (5%)
  const tax = subtotal * 0.05

  // Calculate total
  const total = subtotal + shipping + tax - discount

  const handleApplyCoupon = () => {
    setIsApplying(true)

    // Simulate coupon application
    setTimeout(() => {
      if (couponCode.toLowerCase() === "cinema20") {
        const discountAmount = subtotal * 0.2
        setDiscount(discountAmount)
        setCouponApplied(true)
      }
      setIsApplying(false)
    }, 1000)
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 min-h-screen flex flex-col items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
            <ShoppingBag className="h-12 w-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Your cart is empty</h1>
          <p className="text-gray-400 mb-8">
            Looks like you haven't added any items to your cart yet. Explore our collections to find your favorite
            character-inspired fashion.
          </p>
          <Link href="/collections">
            <Button className="bg-coral-500 hover:bg-coral-600 text-white px-8 py-6 text-lg relative overflow-hidden group">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start Shopping
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-coral-600 to-coral-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-32">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Your Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Cart Items ({items.length})</h2>

              <div className="divide-y divide-white/10">
                {items.map((item) => (
                  <div key={item.product.id} className="py-6 first:pt-0 last:pb-0 flex gap-4">
                    <div className="relative w-24 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-black/50">
                      <Image
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-white">{item.product.name}</h3>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-gray-400 hover:text-coral-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <p className="text-sm text-gray-400 mb-2">
                        {item.product.character} • {item.product.movie}
                      </p>

                      <div className="flex justify-between items-end mt-4">
                        <div className="flex items-center border border-white/10 rounded-md bg-black/20">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="px-3 py-1 text-gray-400 hover:text-white transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-3 py-1 text-sm text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="px-3 py-1 text-gray-400 hover:text-white transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-sm text-gray-400">
                            ₹{item.product.price} × {item.quantity}
                          </span>
                          <p className="font-medium text-white">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-black/40 p-4 flex justify-between items-center">
              <button
                onClick={clearCart}
                className="text-sm text-gray-400 hover:text-coral-500 transition-colors flex items-center gap-1"
              >
                <Trash2 className="h-3 w-3" /> Clear Cart
              </button>

              <Link href="/collections">
                <button className="text-sm text-coral-500 hover:text-coral-400 transition-colors">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>

          {/* Coupon Code */}
          <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Apply Coupon</h2>

            <div className="flex gap-2">
              <div className="flex-grow">
                <Input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="bg-black/20 border-white/10 text-white"
                />
              </div>
              <Button
                onClick={handleApplyCoupon}
                disabled={isApplying || couponApplied || !couponCode}
                className={`${
                  couponApplied ? "bg-green-600 hover:bg-green-700" : "bg-coral-500 hover:bg-coral-600"
                } text-white`}
              >
                {isApplying ? "Applying..." : couponApplied ? "Applied" : "Apply"}
              </Button>
            </div>

            {couponApplied && (
              <p className="text-sm text-green-500 mt-2">
                Coupon applied successfully! You saved ₹{discount.toFixed(2)}
              </p>
            )}

            <p className="text-xs text-gray-400 mt-2">Try "CINEMA20" for 20% off your entire order!</p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-white mb-4">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-white">₹{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Shipping</span>
                <span className="text-white">{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Tax (5%)</span>
                <span className="text-white">₹{tax.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-500">
                  <span>Discount</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
              )}

              <div className="border-t border-white/10 pt-3 mt-3">
                <div className="flex justify-between font-semibold">
                  <span className="text-white">Total</span>
                  <span className="text-white text-lg">₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <Button className="w-full bg-coral-500 hover:bg-coral-600 text-white py-6 relative overflow-hidden group">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Proceed to Checkout
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-coral-600 to-coral-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Button>

              <div className="flex items-center justify-center gap-4 text-gray-400 text-sm">
                <div className="flex items-center gap-1">
                  <CreditCard className="h-4 w-4" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-1">
                  <Truck className="h-4 w-4" />
                  <span>Fast Delivery</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <h3 className="font-medium text-white mb-3">We Accept</h3>
              <div className="flex gap-2">
                <div className="bg-black/20 p-2 rounded-md">
                  <Image src="/placeholder.svg?height=24&width=36" alt="Visa" width={36} height={24} />
                </div>
                <div className="bg-black/20 p-2 rounded-md">
                  <Image src="/placeholder.svg?height=24&width=36" alt="Mastercard" width={36} height={24} />
                </div>
                <div className="bg-black/20 p-2 rounded-md">
                  <Image src="/placeholder.svg?height=24&width=36" alt="PayPal" width={36} height={24} />
                </div>
                <div className="bg-black/20 p-2 rounded-md">
                  <Image src="/placeholder.svg?height=24&width=36" alt="UPI" width={36} height={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
