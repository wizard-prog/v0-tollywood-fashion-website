"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface LazyImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  priority?: boolean
}

// Component for lazy loading images with blur placeholder
export function LazyImage({ src, alt, width, height, fill = false, className, priority = false }: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={`relative overflow-hidden ${fill ? "w-full h-full" : ""}`}>
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        className={`${className || ""} ${
          isLoading ? "scale-110 blur-sm" : "scale-100 blur-0"
        } transition-all duration-500`}
        onLoadingComplete={() => setIsLoading(false)}
        priority={priority}
      />
    </div>
  )
}

// Component for responsive images with art direction
export function ResponsiveImage({
  mobileImage,
  desktopImage,
  alt,
  className,
}: {
  mobileImage: string
  desktopImage: string
  alt: string
  className?: string
}) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  return <Image src={isMobile ? mobileImage : desktopImage} alt={alt} fill className={className || "object-cover"} />
}

// Component for image gallery with thumbnails
export function ImageGallery({
  images,
  alt,
}: {
  images: { thumbnail: string; full: string }[]
  alt: string
}) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="space-y-2">
      <div className="relative h-96 rounded-lg overflow-hidden">
        <Image
          src={images[selectedImage].full || "/placeholder.svg"}
          alt={`${alt} - full view`}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 ${
              selectedImage === index ? "ring-2 ring-coral-500" : ""
            }`}
          >
            <Image
              src={image.thumbnail || "/placeholder.svg"}
              alt={`${alt} - thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
