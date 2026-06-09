import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import Logo from "./logo"

export default function Footer() {
  return (
    <footer className="bg-navy-800 text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-gray-400 mb-4">Bringing iconic Telugu cinema fashion to your everyday wardrobe.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-coral-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-coral-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-coral-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-coral-500 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-coral-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-gray-400 hover:text-coral-500 transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/spotlight" className="text-gray-400 hover:text-coral-500 transition-colors">
                  Character Spotlight
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-coral-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-coral-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/collections/men" className="text-gray-400 hover:text-coral-500 transition-colors">
                  Men's Fashion
                </Link>
              </li>
              <li>
                <Link href="/collections/women" className="text-gray-400 hover:text-coral-500 transition-colors">
                  Women's Fashion
                </Link>
              </li>
              <li>
                <Link href="/collections/traditional" className="text-gray-400 hover:text-coral-500 transition-colors">
                  Traditional Wear
                </Link>
              </li>
              <li>
                <Link href="/collections/accessories" className="text-gray-400 hover:text-coral-500 transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/collections/jewelry" className="text-gray-400 hover:text-coral-500 transition-colors">
                  Jewelry
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: saiabhinavrentala@gmail.com</li>
              <li>Phone: +91 6300681726</li>
              <li>Address: Film Nagar, Hyderabad, Telangana, India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Tollywood Threads. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-gray-400 hover:text-coral-500 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-coral-500 text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/shipping" className="text-gray-400 hover:text-coral-500 text-sm transition-colors">
              Shipping Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
