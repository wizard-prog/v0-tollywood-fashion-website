"use client"
import { type ReactNode, useRef, useEffect, useState } from "react"

interface CinematicSectionProps {
  children: ReactNode
  className?: string
  darkMode?: boolean
  transitionDirection?: "up" | "down" | "left" | "right"
}

export default function CinematicSection({
  children,
  className = "",
  darkMode = false,
  transitionDirection = "up",
}: CinematicSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.1,
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  // Set initial transform based on direction
  const getInitialTransform = () => {
    switch (transitionDirection) {
      case "up":
        return "translateY(50px)"
      case "down":
        return "translateY(-50px)"
      case "left":
        return "translateX(50px)"
      case "right":
        return "translateX(-50px)"
      default:
        return "translateY(50px)"
    }
  }

  return (
    <section
      ref={sectionRef}
      className={`overflow-hidden ${darkMode ? "bg-navy-800 text-white" : "bg-white"} ${className}`}
    >
      <div
        className="transition-all duration-1000 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translate(0, 0)" : getInitialTransform(),
        }}
      >
        {children}
      </div>
    </section>
  )
}
