"use client"

import Image from "next/image"
import Link from "next/link"

interface TollywoodLogoProps {
  variant?: "navbar" | "hero"
}

export default function TollywoodLogo({ variant = "navbar" }: TollywoodLogoProps) {
  if (variant === "hero") {
    return (
      <div className="w-full max-w-7xl mx-auto mb-12">
        {/* Hero Logo Container */}
        <div className="relative">
          {/* Character Collage Background - Much Bigger */}
          <div className="relative w-full h-64 md:h-80 lg:h-96 xl:h-[28rem] overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src="/images/logo/tollywood-threads-logo.png"
              alt="Tollywood Stars Collage"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-navy-900/60 via-transparent to-coral-900/60"></div>
          </div>

          {/* Logo Text Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="relative">
              {/* Main Brand Text */}
              <h1 className="text-5xl md:text-7xl lg:text-9xl xl:text-[8rem] font-black text-white tracking-wider mb-3 relative z-10">
                <span className="bg-gradient-to-r from-white via-coral-200 to-white bg-clip-text text-transparent drop-shadow-2xl">
                  TOLLYWOOD
                </span>
              </h1>

              {/* Subtitle */}
              <div className="flex items-center justify-center space-x-6 mb-6">
                <div className="h-px bg-gradient-to-r from-transparent via-coral-400 to-transparent w-20 md:w-32 lg:w-40"></div>
                <h2 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-coral-400 tracking-[0.3em]">
                  THREADS
                </h2>
                <div className="h-px bg-gradient-to-r from-transparent via-coral-400 to-transparent w-20 md:w-32 lg:w-40"></div>
              </div>

              {/* Tagline */}
              <p className="text-base md:text-xl lg:text-2xl text-white/90 font-medium tracking-wide">
                Cinema Fashion • Character Style • Telugu Heritage
              </p>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -left-6 w-12 h-12 border-l-2 border-t-2 border-coral-400 opacity-60"></div>
              <div className="absolute -top-6 -right-6 w-12 h-12 border-r-2 border-t-2 border-coral-400 opacity-60"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 border-l-2 border-b-2 border-coral-400 opacity-60"></div>
              <div className="absolute -bottom-6 -right-6 w-12 h-12 border-r-2 border-b-2 border-coral-400 opacity-60"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Link
      href="/"
      className="flex items-center group"
      onClick={(e) => {
        // Ensure clean navigation without side effects
        e.currentTarget.style.transform = "none"
      }}
    >
      <div className="relative">
        {/* Compact Logo for Navbar - Bigger */}
        <div className="flex items-center space-x-4">
          {/* Character Collage Thumbnail - Much Bigger */}
          <div className="relative w-16 h-16 md:w-20 md:h-20 overflow-hidden rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300">
            <Image
              src="/images/logo/tollywood-threads-logo.png"
              alt="Tollywood Stars"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-navy-600/20 to-coral-600/20"></div>
          </div>

          {/* Brand Text - Bigger */}
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-black text-navy-700 tracking-wider leading-none">TOLLYWOOD</span>
            <span className="text-sm md:text-base font-bold text-coral-500 tracking-[0.2em] leading-none">THREADS</span>
          </div>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-navy-100/0 via-coral-100/0 to-navy-100/0 group-hover:from-navy-100/20 group-hover:via-coral-100/20 group-hover:to-navy-100/20 transition-all duration-300 -z-10"></div>
      </div>
    </Link>
  )
}
