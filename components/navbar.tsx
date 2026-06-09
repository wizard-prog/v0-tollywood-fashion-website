"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingBag, Menu, X, Heart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import TollywoodLogo from "./tollywood-logo"
import VoiceSearch from "./voice-search"
import AuthDropdown from "./auth-dropdown"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { toggleCart, itemCount } = useCart()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <TollywoodLogo variant="navbar" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/collections" className="text-gray-700 hover:text-coral-500 transition-colors">
              Collections
            </Link>
            <Link href="/characters" className="text-gray-700 hover:text-coral-500 transition-colors">
              Characters
            </Link>
            <Link href="/style-quiz" className="text-gray-700 hover:text-coral-500 transition-colors">
              Style Quiz
            </Link>
            <Link href="/ai-style-matcher" className="text-gray-700 hover:text-coral-500 transition-colors">
              AI Matcher
            </Link>
            <Link href="/community" className="text-gray-700 hover:text-coral-500 transition-colors">
              Community
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Voice Search */}
            <div className="hidden md:block">
              <VoiceSearch />
            </div>

            {/* Wishlist */}
            <button className="p-2 text-gray-600 hover:text-coral-500 transition-colors">
              <Heart className="w-5 h-5" />
            </button>

            {/* User Account */}
            <AuthDropdown />

            {/* Cart */}
            <button onClick={toggleCart} className="relative p-2 text-gray-600 hover:text-coral-500 transition-colors">
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-coral-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button onClick={toggleMenu} className="md:hidden p-2 text-gray-600 hover:text-coral-500 transition-colors">
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/collections"
                className="block px-3 py-2 text-gray-700 hover:text-coral-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Collections
              </Link>
              <Link
                href="/characters"
                className="block px-3 py-2 text-gray-700 hover:text-coral-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Characters
              </Link>
              <Link
                href="/style-quiz"
                className="block px-3 py-2 text-gray-700 hover:text-coral-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Style Quiz
              </Link>
              <Link
                href="/ai-style-matcher"
                className="block px-3 py-2 text-gray-700 hover:text-coral-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                AI Style Matcher
              </Link>
              <Link
                href="/community"
                className="block px-3 py-2 text-gray-700 hover:text-coral-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Community
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
