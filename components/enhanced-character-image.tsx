"use client"

import { useState } from "react"
import Image from "next/image"

interface EnhancedCharacterImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  priority?: boolean
  quality?: number
}

export function EnhancedCharacterImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  priority = false,
  quality = 95,
}: EnhancedCharacterImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <div className={`relative overflow-hidden ${fill ? "w-full h-full" : ""}`}>
      <Image
        src={hasError ? "/placeholder.svg" : src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        quality={quality}
        priority={priority}
        className={`${className || ""} ${
          isLoading ? "scale-110 blur-sm opacity-0" : "scale-100 blur-0 opacity-100"
        } transition-all duration-700 ease-out`}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => {
          setHasError(true)
          setIsLoading(false)
        }}
        sizes={fill ? "100vw" : undefined}
      />

      {/* Loading shimmer effect */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
        </div>
      )}
    </div>
  )
}
