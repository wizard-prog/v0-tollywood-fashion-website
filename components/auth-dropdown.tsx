"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { User, Settings, Heart, ShoppingBag, LogOut } from "lucide-react"

export default function AuthDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSignedIn, setIsSignedIn] = useState(false) // This would come from your auth state
  const router = useRouter()

  const handleGoogleSignIn = async () => {
    try {
      // This is where you'd integrate with your actual Google Auth
      // For now, we'll simulate sign-in
      console.log("Signing in with Google...")

      // Simulate successful sign-in
      setTimeout(() => {
        setIsSignedIn(true)
        setIsOpen(false)
      }, 1000)

      // In a real app, you'd use something like:
      // const { signIn } = useAuth()
      // await signIn('google')
    } catch (error) {
      console.error("Sign-in failed:", error)
    }
  }

  const handleSignOut = () => {
    setIsSignedIn(false)
    setIsOpen(false)
    // In a real app: signOut()
  }

  const navigateToLogin = () => {
    router.push("/login")
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-300 hover:text-coral-500 transition-colors rounded-full hover:bg-white/5"
        aria-label="Account"
      >
        <User className="w-5 h-5" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-64 bg-black/80 backdrop-blur-md rounded-lg shadow-lg border border-white/10 z-20">
            {!isSignedIn ? (
              // Not signed in menu
              <div className="p-4">
                <div className="text-center mb-4">
                  <h3 className="font-semibold text-white mb-2">Welcome to Tollywood Threads</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    Sign in to access your account and personalized recommendations
                  </p>
                </div>

                <button
                  onClick={navigateToLogin}
                  className="w-full flex items-center justify-center gap-2 bg-coral-500 hover:bg-coral-600 transition-colors rounded-lg px-4 py-2 text-white mb-3"
                >
                  Sign In / Create Account
                </button>

                <button
                  onClick={handleGoogleSignIn}
                  className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg px-4 py-2 text-white hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </button>
              </div>
            ) : (
              // Signed in menu
              <div className="py-2">
                <div className="px-4 py-3 border-b border-white/10">
                  <p className="font-medium text-white">Welcome back!</p>
                  <p className="text-sm text-gray-300">user@example.com</p>
                </div>

                <div className="py-2">
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-white/10 transition-colors">
                    <User className="w-4 h-4" />
                    My Profile
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-white/10 transition-colors">
                    <ShoppingBag className="w-4 h-4" />
                    My Orders
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-white/10 transition-colors">
                    <Heart className="w-4 h-4" />
                    Wishlist
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-white/10 transition-colors">
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                </div>

                <div className="border-t border-white/10 pt-2">
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
