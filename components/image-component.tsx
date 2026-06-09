import Image from "next/image"
import { characterImages, productImages } from "@/lib/image-data"

interface CharacterImageProps {
  character: string
  alt?: string
  className?: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
}

interface ProductImageProps {
  product: string
  alt?: string
  className?: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
}

export function CharacterImage({
  character,
  alt,
  className,
  width,
  height,
  fill = false,
  priority = false,
}: CharacterImageProps) {
  // Direct mapping for Pushpa Raj
  let imagePath = "/placeholder.svg?height=600&width=400&text=Character"

  if (character === "Pushpa Raj" || character.toLowerCase().includes("pushpa")) {
    imagePath = "/images/characters/allu-arjun-pushpa.jpg"
  } else {
    // Get the image path from our mapping, or use a default if not found
    imagePath = characterImages[character] || "/placeholder.svg?height=600&width=400&text=Character"
  }

  return (
    <Image
      src={imagePath || "/placeholder.svg"}
      alt={alt || `${character} character image`}
      className={className || "object-cover"}
      width={fill ? undefined : width || 400}
      height={fill ? undefined : height || 600}
      fill={fill}
      priority={priority}
    />
  )
}

export function ProductImage({
  product,
  alt,
  className,
  width,
  height,
  fill = false,
  priority = false,
}: ProductImageProps) {
  // Direct mapping for Pushpa products
  let imagePath = "/placeholder.svg?height=500&width=400&text=Product"

  if (product.toLowerCase().includes("pushpa")) {
    imagePath = "/images/characters/allu-arjun-pushpa.jpg"
  } else {
    // Get the image path from our mapping, or use a default if not found
    imagePath = productImages[product] || "/placeholder.svg?height=500&width=400&text=Product"
  }

  return (
    <Image
      src={imagePath || "/placeholder.svg"}
      alt={alt || `${product} product image`}
      className={className || "object-cover"}
      width={fill ? undefined : width || 400}
      height={fill ? undefined : height || 500}
      fill={fill}
      priority={priority}
    />
  )
}

export function BannerImage({
  src,
  alt,
  className,
  fill = true,
  priority = false,
}: {
  src: string
  alt: string
  className?: string
  fill?: boolean
  priority?: boolean
}) {
  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={alt}
      className={className || "object-cover"}
      fill={fill}
      priority={priority}
    />
  )
}
