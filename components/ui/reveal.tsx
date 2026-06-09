"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface RevealProps {
  children: React.ReactNode
  width?: "fit-content" | "100%"
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  once?: boolean
  className?: string
}

export default function Reveal({
  children,
  width = "fit-content",
  delay = 0,
  direction = "up",
  once = true,
  className = "",
}: RevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: 0.5 })

  // Set initial and animate values based on direction
  const getDirectionValues = () => {
    switch (direction) {
      case "up":
        return { initial: { y: 75 }, animate: { y: 0 } }
      case "down":
        return { initial: { y: -75 }, animate: { y: 0 } }
      case "left":
        return { initial: { x: 75 }, animate: { x: 0 } }
      case "right":
        return { initial: { x: -75 }, animate: { x: 0 } }
      default:
        return { initial: { y: 75 }, animate: { y: 0 } }
    }
  }

  const { initial, animate } = getDirectionValues()

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }} className={className}>
      <motion.div
        variants={{
          hidden: { opacity: 0, ...initial },
          visible: { opacity: 1, ...animate },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.5, delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}
