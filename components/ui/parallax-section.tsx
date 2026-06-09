"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxSectionProps {
  children: React.ReactNode
  speed?: number
  className?: string
  direction?: "up" | "down" | "left" | "right"
  overflow?: boolean
}

export default function ParallaxSection({
  children,
  speed = 0.2,
  className = "",
  direction = "up",
  overflow = false,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [elementTop, setElementTop] = useState(0)
  const [clientHeight, setClientHeight] = useState(0)

  const { scrollY } = useScroll()

  // Update element position on resize or scroll
  useEffect(() => {
    const element = ref.current
    if (!element) return

    const updatePosition = () => {
      const rect = element.getBoundingClientRect()
      setElementTop(rect.top + window.scrollY)
      setClientHeight(window.innerHeight)
    }

    updatePosition()
    window.addEventListener("resize", updatePosition)
    return () => window.removeEventListener("resize", updatePosition)
  }, [])

  // Calculate parallax values based on direction
  const getParallaxValues = () => {
    switch (direction) {
      case "up":
        return [speed * 100, -speed * 100]
      case "down":
        return [-speed * 100, speed * 100]
      case "left":
        return [speed * 100, -speed * 100]
      case "right":
        return [-speed * 100, speed * 100]
      default:
        return [speed * 100, -speed * 100]
    }
  }

  const [startValue, endValue] = getParallaxValues()

  // Transform based on scroll position
  const transformValue = useTransform(
    scrollY,
    [elementTop - clientHeight, elementTop + clientHeight],
    [startValue, endValue],
  )

  // Apply transform based on direction
  const getTransformStyle = () => {
    if (direction === "left" || direction === "right") {
      return { x: transformValue }
    }
    return { y: transformValue }
  }

  return (
    <div ref={ref} className={`${overflow ? "overflow-hidden" : ""} ${className}`}>
      <motion.div style={getTransformStyle()}>{children}</motion.div>
    </div>
  )
}
