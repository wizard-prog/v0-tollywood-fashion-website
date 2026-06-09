"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, Plus, Minus, ShoppingBag, AlertCircle } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"

export default function CartDrawer() {
  const { items, isCartOpen, closeCart, removeItem, updateQuantity, itemCount } = useCart()

  // Close cart when pressing escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart()
    }

    if (isCartOpen) {
      document.addEventListener("keydown", handleEscape)
      // Prevent scrolling when cart is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "auto"
    }
  }, [isCartOpen, closeCart])

  // Calculate total price
  const totalPrice = items.reduce((total, item) => total + item.product.price * item.quantity, 0)

  if (!isCartOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeCart} aria-hidden="true" />

      {/* Cart drawer */}
      <div className="relative w-full max-w-md bg-black/90 backdrop-blur-md h-full overflow-auto shadow-xl flex flex-col border-l border-white/10">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Your Cart ({itemCount})
          </h2>
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-white/10 text-gray-300"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-grow overflow-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
                <ShoppingBag className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Your cart is empty</h3>
              <p className="text-gray-400 mb-6">Looks like you haven't added any items to your cart yet.</p>
              <Button onClick={closeCart} className="bg-coral-500 hover:bg-coral-600 text-white">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-white/10">
              {items.map((item) => (
                <li key={item.product.id} className="p-4 flex">
                  <div className="relative w-20 h-24 flex-shrink-0 rounded overflow-hidden bg-black/50">
                    <Image
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-grow">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-white">{item.product.name}</h3>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-gray-400 hover:text-coral-500"
                        aria-label="Remove item"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">
                      {item.product.character} • {item.product.movie}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center border border-white/10 rounded-md bg-black/30">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-400 hover:text-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2 py-1 text-sm text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-400 hover:text-white"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="font-medium text-white">₹{item.product.price}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-white/10 p-4 bg-black/50">
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Subtotal</span>
                <span className="font-medium text-white">₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Shipping</span>
                <span className="font-medium text-white">Calculated at checkout</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/10">
                <span className="font-bold text-white">Total</span>
                <span className="font-bold text-white">₹{totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Button className="w-full bg-coral-500 hover:bg-coral-600 text-white relative overflow-hidden group">
                <span className="relative z-10">Checkout</span>
                <span className="absolute inset-0 bg-gradient-to-r from-coral-600 to-coral-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </Button>
              <Link href="/cart" onClick={closeCart}>
                <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/10">
                  View Cart
                </Button>
              </Link>
            </div>

            <div className="mt-4 flex items-start text-xs text-gray-400">
              <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0 mt-0.5" />
              <p>
                This is a demo site. The "Buy Now" button redirects to the original retailer, while "Add to Cart" lets
                you collect items you're interested in.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
